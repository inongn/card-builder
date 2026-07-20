import { ExpressionEvaluator, clearExpressionCache } from './ExpressionEvaluator.js';
import { PIPELINE_STAGES, TYPE_TO_STAGE } from './pipeline.js';
import { formatBonus, evaluateBoolean, splitDescription } from './helpers.js';

const IGNORED_ACTIVITY_IDS = new Set([
    'wildResurgenceWildShape',
    'wildResurgenceSpellSlot',
    'uncannyMetabolism',
    'convertSlotToPoints',
    'createSpellSlot',
    'sorcerousRestoration',
    'magicalCunning',
    'arcaneRecovery',
    'naturalRecoveryRestore',
    'naturalRecoveryCast',
    'fontOfInspiration'
]);

/**
 * Builds a character from property tree
 */
export class CharacterBuilder {
    constructor(library) {
        this.library = library;
        this.basePropertyTree = null; // Original unprocessed tree structure
        this.propertyTree = null;  // Processed tree with expanded slots
        this.characterData = this.createEmptyCharacter();
    }

    /**
     * Initialize with base property
     */
    async initialize() {
        const baseProperty = this.library.getProperty('base');
        if (!baseProperty) {
            throw new Error('Base property not found');
        }

        // Store the base unprocessed tree
        this.basePropertyTree = {
            ...baseProperty,
            expanded: true,
            children: baseProperty.children || []
        };

        // Process the tree (this will evaluate quantities and expand slots)
        this.propertyTree = {
            ...this.basePropertyTree,
            children: this.processChildren(this.basePropertyTree.children, {}, 'base')
        };

        this.rebuild();
    }

    /**
     * Process children to add UI state and expand slots with quantity > 1
     * Also resolves Reference nodes into the tree structure
     * @param {Array} children - Child nodes to process
     * @param {Object} inheritedVariables - Variables inherited from parent node
     * @param {String} parentId - Parent property ID for building child localization paths
     */
    processChildren(children, inheritedVariables = {}, parentId = null) {
        if (!children) return [];
        const processed = [];

        const camelCase = (str) => {
            if (!str) return '';
            return String(str)
                .replace(/[^a-zA-Z0-9\s-_]/g, '')
                .trim()
                .split(/[-_\s]+/)
                .map((word, index) =>
                    index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join('');
        };

        for (let i = 0; i < children.length; i++) {
            // Clone the child object to avoid mutating shared library structures
            const child = { ...children[i] };

            // Auto-generate fallback id if missing
            if (!child.id) {
                if (child.name) {
                    child.id = camelCase(child.name);
                } else {
                    child.id = `child_${i}`;
                }
            }

            const fullId = parentId ? `${parentId}.${child.id}` : child.id;
            if (!child.name) {
                child.name = child.id;
            }
            if (!child.description) {
                child.description = '';
            }

            // Evaluate variables first so they can be used by both References and Slots
            // Merge inherited variables with child's own variables (child takes precedence)
            const nodeVariables = { ...inheritedVariables };
            if (child.variables) {
                const evaluator = new ExpressionEvaluator(this.characterData);
                for (const [key, val] of Object.entries(child.variables)) {
                    nodeVariables[key] = evaluator.evaluate(val);
                }
            } else if (Object.keys(inheritedVariables).length > 0) {
                // If child has no variables but inherited some, evaluate them
                const evaluator = new ExpressionEvaluator(this.characterData);
                for (const [key, val] of Object.entries(inheritedVariables)) {
                    if (typeof val === 'string' && val.includes('$')) {
                        nodeVariables[key] = evaluator.evaluate(val);
                    }
                }
            }

            // Apply overwrites if present
            let effectiveNode = child;
            let appliedOverwrite = {};
            if (child.overwrite) {
                const evaluator = new ExpressionEvaluator(this.characterData);
                for (const [key, val] of Object.entries(child.overwrite)) {
                    if (typeof val === 'string' && val.includes('$')) {
                        appliedOverwrite[key] = evaluator.evaluate(val, nodeVariables);
                    } else {
                        appliedOverwrite[key] = val;
                    }
                }

                // For Slot and Reference nodes, overwrites are intended for the content that fills or is 
                // resolved by them, not the node itself. Overwriting 'target' on a Slot would break its filter.
                if (child.type !== 'Slot' && child.type !== 'Reference') {
                    const childVars = { ...(child.variables || {}) };
                    let hasVarOverwrite = false;
                    for (const [key, val] of Object.entries(appliedOverwrite)) {
                        if (key.startsWith('variables.')) {
                            const varName = key.substring('variables.'.length);
                            childVars[varName] = val;
                            hasVarOverwrite = true;
                        }
                    }
                    effectiveNode = { ...child, ...appliedOverwrite };
                    if (hasVarOverwrite) {
                        effectiveNode.variables = childVars;
                    }
                    // For tags, merge into existing array instead of replacing
                    if ('tags' in appliedOverwrite) {
                        const existing = child.tags || [];
                        const added = Array.isArray(appliedOverwrite.tags) ? appliedOverwrite.tags : (appliedOverwrite.tags != null ? [appliedOverwrite.tags] : []);
                        effectiveNode.tags = [...existing, ...added];
                    }
                }
            }

            // Determine the ID to pass to children for path building
            const currentId = effectiveNode.id || parentId;

            // Handle References - flatten them directly into the tree
            if (effectiveNode.type === 'Reference') {
                const evaluator = new ExpressionEvaluator(this.characterData);
                const refKey = effectiveNode.reference || effectiveNode.target || effectiveNode.value;
                const refIdsRaw = Array.isArray(refKey) ? refKey : [refKey];
                const refIds = refIdsRaw.map(id => evaluator.evaluate(id, nodeVariables));

                for (const refId of refIds) {
                    if (!refId) continue;
                    const prop = this.library.getProperty(refId);
                    if (prop) {
                        // Smart Condition Merging
                        const shouldIgnore = effectiveNode.ignoreCondition || prop.ignoreCondition;
                        let finalCondition = prop.condition;

                        if (shouldIgnore) {
                            // If minimizing requirements (e.g. racial spell), use ONLY the reference's condition
                            finalCondition = effectiveNode.condition;
                        } else {
                            // Otherwise enforce BOTH (e.g. class feature needing level AND slot)
                            if (effectiveNode.condition && prop.condition) {
                                finalCondition = `$(${effectiveNode.condition} && ${prop.condition})`;
                            } else {
                                finalCondition = effectiveNode.condition || prop.condition;
                            }
                        }

                        const contentVars = { ...nodeVariables, ...(prop.variables || {}) };
                        if (appliedOverwrite) {
                            for (const [key, val] of Object.entries(appliedOverwrite)) {
                                if (key.startsWith('variables.')) {
                                    const varName = key.substring('variables.'.length);
                                    contentVars[varName] = val;
                                }
                            }
                        }

                        // Merge context from reference node into the content node
                        const contentNode = {
                            ...prop,
                            ...appliedOverwrite, // Apply overwrites to the resolved node
                            // Preserve metadata from the reference node (using evaluated variables)
                            priority: effectiveNode.priority !== undefined ? effectiveNode.priority : prop.priority,
                            variables: contentVars,
                            condition: finalCondition,
                            // We consumed the ignore flag to decide the condition, now force check
                            ignoreCondition: false,
                            expanded: true
                        };
                        // For tags, merge into existing array instead of replacing
                        if (appliedOverwrite && 'tags' in appliedOverwrite) {
                            const existing = prop.tags || [];
                            const added = Array.isArray(appliedOverwrite.tags) ? appliedOverwrite.tags : (appliedOverwrite.tags != null ? [appliedOverwrite.tags] : []);
                            contentNode.tags = [...existing, ...added];
                        }

                        // Recurse to handle nested references or slots within the referenced item
                        processed.push(...this.processChildren([contentNode], nodeVariables, prop.id));
                    }
                }
                continue;
            }

            // Evaluate quantity if it's an expression
            let quantity = effectiveNode.quantity;
            if (typeof quantity === 'string' && quantity.match(/^\$\(/)) {
                const evaluator = new ExpressionEvaluator(this.characterData);
                quantity = evaluator.evaluate(quantity, nodeVariables);
            }

            // Evaluate fields that might contain translation keys or expressions
            const evaluator = new ExpressionEvaluator(this.characterData);

            let displayName = effectiveNode.name;
            let description = effectiveNode.description;

            let subtype = effectiveNode.subtype;
            let target = effectiveNode.target;

            // Check if this is a slot with quantity > 1
            if (effectiveNode.type === 'Slot' && quantity && quantity > 1) {
                // Create multiple instances of this slot
                for (let i = 0; i < quantity; i++) {
                    processed.push({
                        ...effectiveNode,
                        displayName: `${displayName} #${i + 1}`,
                        description,
                        subtype,
                        target,
                        slotIndex: i,
                        variables: nodeVariables,
                        expanded: true,
                        children: (effectiveNode.children && !effectiveNode.filled) ? this.processChildren(effectiveNode.children, nodeVariables, currentId) : []
                    });
                }
            } else {
                processed.push({
                    ...effectiveNode,
                    displayName,
                    description,
                    subtype,
                    target,
                    variables: nodeVariables,
                    expanded: true,
                    children: (effectiveNode.children && !effectiveNode.filled) ? this.processChildren(effectiveNode.children, nodeVariables, currentId) : []
                });
            }
        }

        return processed;
    }

    /**
     * Create empty character data structure
     */
    createEmptyCharacter() {
        return {
            meta: {},
            stats: {},
            attributes: {
                proficiencies: []
            },
            skills: {},
            saves: {},
            resources: [],
            features: [],
            activities: [],
            statblocks: []
        };
    }

    /**
     * Fill a slot with a property from the library
     */
    fillSlot(slotPath, propertyId) {
        const property = this.library.getProperty(propertyId);
        if (!property) return;

        // Navigate to slot in tree
        let current = this.propertyTree;
        for (let i = 0; i < slotPath.length - 1; i++) {
            current = current.children[slotPath[i]];
        }

        const slotIndex = slotPath[slotPath.length - 1];
        const slot = current.children[slotIndex];

        // Fill the slot - store filled property info
        const evaluator = new ExpressionEvaluator(this.characterData);
        slot.filled = {
            id: property.id,
            name: property.name,
            displayName: evaluator.evaluate(property.name, slot.variables || {}),
            type: property.type,
            tags: property.tags
        };

        // Populate children immediately so the initial rebuild pass can find effects/properties
        let items = [];
        if (property.type === 'Folder' || property.type === 'Reference') {
            items = (property.type === 'Reference') ? [property] : (property.children || []);
        } else {
            items = [property];
        }

        if (slot.overwrite) {
            items = items.map(item => ({
                ...item,
                overwrite: { ...(item.overwrite || {}), ...slot.overwrite }
            }));
        }

        slot.children = this.processChildren(items, slot.variables || {}, property?.id || null);

        this.rebuild();
    }

    /**
     * Clear a filled slot
     */
    clearSlot(slotPath) {
        let current = this.propertyTree;
        for (let i = 0; i < slotPath.length - 1; i++) {
            current = current.children[slotPath[i]];
        }

        const slotIndex = slotPath[slotPath.length - 1];
        const slot = current.children[slotIndex];
        slot.filled = null;
        slot.children = []; // Clear children when clearing the slot

        this.rebuild();
    }

    /**
     * Update an input value
     */
    updateInput(inputPath, value) {
        // Navigate to the input in the active tree to update its value persisted there
        let current = this.propertyTree;
        for (let i = 0; i < inputPath.length - 1; i++) {
            current = current.children[inputPath[i]];
        }
        const inputIndex = inputPath[inputPath.length - 1];
        const input = current.children[inputIndex];
        input.value = value;

        // IMMEDIATE UPDATE: Update characterData context so expressions use the NEW value
        if (input.type === 'Input') {
            // Use id for meta key (e.g., species, background)
            const key = (input.id || input.name || '').replace(/^ui\./i, '').toLowerCase();
            if (key) {
                if (!this.characterData.meta) this.characterData.meta = {};
                this.characterData.meta[key] = value;
            }
        }

        this.rebuild();
    }

    /**
     * Internal helper to rebuild the processed tree structure from base definitions,
     * preserving current slot selections.
     */
    _reprocessTreeStructure() {
        const state = this.extractTreeState(this.propertyTree);
        const inputs = this.extractInputs(this.propertyTree);

        this.propertyTree = {
            ...this.basePropertyTree,
            children: this.processChildren(this.basePropertyTree.children, {}, 'base')
        };
        // Restore static inputs so slots calculate correct constraints
        this.applyInputs(this.propertyTree, inputs);

        this.reapplyTreeState(this.propertyTree, state);

        // Restore all inputs again after references are expanded
        this.applyInputs(this.propertyTree, inputs);
    }

    /**
     * Extract current selections and UI state (like expansion) from property tree
     */
    extractTreeState(node, path = []) {
        const state = { slots: [], expanded: [] };
        if (!node || !node.children) return state;

        node.children.forEach((child) => {
            const step = { id: child.id, slotIndex: child.slotIndex };
            const currentPath = [...path, step];

            if (child.expanded) {
                state.expanded.push(currentPath);
            }

            if (child.type === 'Slot' && child.filled) {
                state.slots.push({
                    path: currentPath,
                    propertyId: child.filled.id
                });
            }

            // Recurse into children
            const childState = this.extractTreeState(child, currentPath);
            state.slots.push(...childState.slots);
            state.expanded.push(...childState.expanded);
        });

        return state;
    }

    /**
     * Reapply selections and UI state to a newly built tree
     */
    reapplyTreeState(root, state) {
        // Sort slots by path length so parents are filled before children
        const sortedSlots = [...state.slots].sort((a, b) => a.path.length - b.path.length);

        sortedSlots.forEach(slotData => {
            let current = root;
            let found = true;

            for (let i = 0; i < slotData.path.length; i++) {
                const step = slotData.path[i];
                if (!current.children) {
                    found = false;
                    break;
                }
                const child = current.children.find(c => c.id === step.id && c.slotIndex === step.slotIndex);
                if (!child) {
                    found = false;
                    break;
                }
                current = child;
            }

            if (found && current.type === 'Slot') {
                const property = this.library.getProperty(slotData.propertyId);
                if (property) {
                    const evaluator = new ExpressionEvaluator(this.characterData);
                    current.filled = {
                        id: property.id,
                        name: property.name,
                        displayName: evaluator.evaluate(property.name, current.variables || {}),
                        type: property.type,
                        tags: property.tags
                    };

                    let items = (property.type === 'Reference' || property.type === 'Folder')
                        ? (property.type === 'Reference' ? [property] : (property.children || []))
                        : [property];

                    if (current.overwrite) {
                        items = items.map(item => ({
                            ...item,
                            overwrite: { ...(item.overwrite || {}), ...current.overwrite }
                        }));
                    }

                    let newChildren = this.processChildren(items, current.variables || {}, property?.id || null);
                    if (current.ignoreCondition) {
                        newChildren = newChildren.map(child => ({ ...child, ignoreCondition: true }));
                    }
                    current.children = newChildren;
                }
            }
        });

        // Reapply expansion state
        state.expanded.forEach(path => {
            let current = root;
            for (const step of path) {
                if (!current.children) break;
                const child = current.children.find(c => c.id === step.id && c.slotIndex === step.slotIndex);
                if (!child) break;
                current = child;
            }
            current.expanded = true;
        });
    }

    /**
     * Extract all filled slot information from a tree
     */
    extractFilledSlots(node, path = []) {
        const filled = [];
        if (!node || !node.children) return filled;

        node.children.forEach((child) => {
            // Logical step: name + slotIndex (for expanded slots)
            const step = { id: child.id, slotIndex: child.slotIndex };
            const currentPath = [...path, step];
            if (child.type === 'Slot' && child.filled) {
                filled.push({
                    path: currentPath,
                    propertyId: child.filled.id // Store the ID to re-fill properly
                });
            }

            // Recurse into children
            filled.push(...this.extractFilledSlots(child, currentPath));
        });

        return filled;
    }

    /**
     * Reapply filled slot data to a newly built tree
     */
    reapplyFilledSlots(root, filledSlots) {
        // Sort slots by path length so parents are filled before children
        const sortedSlots = [...filledSlots].sort((a, b) => a.path.length - b.path.length);

        sortedSlots.forEach(slotData => {
            // Navigate to the slot in the new tree using logical path steps
            let current = root;
            let found = true;

            for (let i = 0; i < slotData.path.length; i++) {
                const step = slotData.path[i];
                if (!current.children) {
                    found = false;
                    break;
                }

                // Find child by name and slotIndex
                const child = current.children.find(c =>
                    c.id === step.id &&
                    c.slotIndex === step.slotIndex
                );

                if (!child) {
                    found = false;
                    break;
                }
                current = child;
            }

            // If we found the slot, re-fill it
            if (found && current.type === 'Slot') {
                // Re-fetch property from library to get fresh children for re-processing
                const property = this.library.getProperty(slotData.propertyId);
                if (property) {
                    const evaluator = new ExpressionEvaluator(this.characterData);
                    current.filled = {
                        id: property.id,
                        name: property.name,
                        displayName: evaluator.evaluate(property.name, current.variables || {}),
                        type: property.type,
                        tags: property.tags
                    };

                    // Re-process children
                    let items = [];
                    if (property.type === 'Folder' || property.type === 'Reference') {
                        items = (property.type === 'Reference') ? [property] : (property.children || []);
                    } else {
                        items = [property];
                    }

                    // Apply slot-level overrides (overwrite)
                    if (current.overwrite) {
                        items = items.map(item => ({
                            ...item,
                            overwrite: { ...(item.overwrite || {}), ...current.overwrite }
                        }));
                    }

                    let newChildren = this.processChildren(items, current.variables || {}, property?.id || null);

                    // Propagate ignoreCondition from the slot to its children
                    // This ensures that "Choice" nodes (like the spell Card) respect the slot's override
                    if (current.ignoreCondition) {
                        newChildren = newChildren.map(child => ({
                            ...child,
                            // If slot ignores condition, force child to ignore it too (or we could smarter merge, but this sufficient for bypassing checks)
                            ignoreCondition: true
                        }));
                    }

                    current.children = newChildren;
                }
            }
        });
    }

    /**
     * Get the "recipe" (selections and inputs) of the current character
     */
    getRecipe() {
        return {
            inputs: this.extractInputs(this.propertyTree),
            slots: this.extractFilledSlots(this.propertyTree)
        };
    }

    /**
     * Find the display name of the active subclass by traversing the tree
     * for a filled slot whose tags include a *Subclass tag.
     */
    getSubclassName() {
        return this._findSubclassInNode(this.propertyTree);
    }

    _findSubclassInNode(node) {
        if (!node || !node.children) return null;
        for (const child of node.children) {
            if (child.type === 'Slot' && child.filled) {
                const tags = child.filled.tags || [];
                if (tags.some(t => typeof t === 'string' && t.endsWith('Subclass'))) {
                    return child.filled.displayName || child.filled.name || null;
                }
            }
            const found = this._findSubclassInNode(child);
            if (found) return found;
        }
        return null;
    }

    /**
     * Apply a "recipe" to rebuild a character
     */
    applyRecipe(recipe) {
        // Reset base tree from fresh library data
        const baseProperty = this.library.getProperty('base');
        this.basePropertyTree = JSON.parse(JSON.stringify({
            ...baseProperty,
            expanded: true,
            children: baseProperty.children || []
        }));

        // Reset character data
        this.characterData = this.createEmptyCharacter();

        // Apply inputs
        this.applyInputs(this.basePropertyTree, recipe.inputs);

        // Process children to expand slots (this uses the NEW inputs like level).
        // At this point characterData is empty, so dynamic slot quantities that depend
        // on proficiencies (e.g. armamentSlot) will evaluate to their minimum value.
        this.propertyTree = {
            ...this.basePropertyTree,
            children: this.processChildren(this.basePropertyTree.children, {}, 'base')
        };

        // Phase 1: Apply slots once so that class/species/background are filled,
        // which populates proficiencies and other attributes into characterData.
        this.reapplyFilledSlots(this.propertyTree, recipe.slots);
        this.applyInputs(this.propertyTree, recipe.inputs);

        // Phase 2: Run a rebuild pass so characterData now has the correct proficiencies,
        // then re-expand the tree structure. This ensures dynamic slot quantities
        // (like armamentSlot whose count depends on proficiencies) are correctly computed.
        this.runRebuildPasses();
        this._reprocessTreeStructure();

        // Phase 3: Re-apply ALL slots from the recipe now that the tree has the correct
        // number of dynamic slot instances (e.g. armamentSlot #2, #3 now exist).
        this.reapplyFilledSlots(this.propertyTree, recipe.slots);
        this.applyInputs(this.propertyTree, recipe.inputs);

        // Final rebuild
        this.rebuild();
    }

    /**
     * Extract all input values from a tree
     */
    extractInputs(node, path = []) {
        const inputs = [];
        if (!node || !node.children) return inputs;

        node.children.forEach((child, index) => {
            const currentPath = [...path, index];

            if (child.type === 'Input') {
                inputs.push({
                    path: currentPath,
                    value: child.value
                });
            }

            // Recurse into children
            inputs.push(...this.extractInputs(child, currentPath));
        });

        return inputs;
    }

    /**
     * Apply input values to a tree
     */
    applyInputs(root, inputs) {
        if (!inputs) return;

        inputs.forEach(inputData => {
            let current = root;
            let found = true;

            for (let i = 0; i < inputData.path.length - 1; i++) {
                const index = inputData.path[i];
                if (current.children && current.children[index]) {
                    current = current.children[index];
                } else {
                    found = false;
                    break;
                }
            }

            if (found) {
                const lastIndex = inputData.path[inputData.path.length - 1];
                if (current.children && current.children[lastIndex]) {
                    const input = current.children[lastIndex];
                    if (input.type === 'Input') {
                        input.value = inputData.value;

                        // Seed CharacterData meta using id
                        const key = (input.id || input.name || '').replace(/^ui\./i, '').toLowerCase();
                        if (key) {
                            if (!this.characterData.meta) this.characterData.meta = {};
                            this.characterData.meta[key] = inputData.value;
                        }
                    }
                }
            }
        });
    }

    /**
     * Refresh all labels and descriptions in the tree (useful on language change)
     */
    refreshTreeLabels(node = this.propertyTree) {
        if (!node) return;

        const evaluator = new ExpressionEvaluator(this.characterData);
        const nodeVariables = node.variables || {};

        // Refresh displayName
        if (node.name) {
            let displayName = evaluator.evaluate(node.name, nodeVariables);
            if (node.slotIndex !== undefined) {
                displayName = `${displayName} #${node.slotIndex + 1}`;
            }
            node.displayName = displayName;
        }

        if (node.filled) {
            node.filled.displayName = evaluator.evaluate(node.filled.name, nodeVariables);
        }

        // Refresh description
        if (node.description) {
            if (Array.isArray(node.description)) {
                node.description = node.description.map(line => evaluator.evaluate(line, nodeVariables));
            } else if (typeof node.description === 'string') {
                node.description = evaluator.evaluate(node.description, nodeVariables);
            }
        }

        // Refresh target
        if (node.target && typeof node.target === 'string') {
            node.target = evaluator.evaluate(node.target, nodeVariables);
        }

        // Refresh children
        if (node.children) {
            node.children.forEach(child => this.refreshTreeLabels(child));
        }
    }

    /**
     * Rebuild character data from property tree
     */
    rebuild() {
        // Clear expression cache to ensure fresh translations and dependency resolution
        clearExpressionCache();

        // 1. Initial pass to get all effects into characterData (including the new selection)
        this.runRebuildPasses();

        // 2. Structural Refresh: Rebuild tree from symbols to restore and re-evaluate original expressions
        // This ensures reactive targets (like Weapon proficiencies) are correctly baked.
        this._reprocessTreeStructure();

        // 3. Sync pass: update characterData with the final structural children
        this.runRebuildPasses();

        // 4. Update labels and descriptions
        this.refreshTreeLabels();

        // 5. Perform two-pass validation for slot selections
        const inherentIds = new Set();
        this.collectInherentIds(this.propertyTree, inherentIds);

        const alreadyChosenIds = new Set();
        const modified = this.validateAndPruneSlotsRecursive(this.propertyTree, inherentIds, alreadyChosenIds);

        if (modified) {
            // Re-run the structural passes to update characterData with the pruned tree
            this.runRebuildPasses();
            this._reprocessTreeStructure();
            this.runRebuildPasses();
        }

        // Apply runtime distance rounding (nearest multiple of 5)
        this.roundDistancesInObject(this.characterData);
    }

    /**
     * Recursively traverses an object and rounds any distance strings or numeric speed/sense fields to the nearest multiple of 5.
     */
    roundDistancesInObject(obj) {
        if (!obj) return obj;
        if (typeof obj === 'string') {
            let modified = obj;
            // Round any 'N feet'
            modified = modified.replace(/(\d+)\s*feet/gi, (match, p1) => {
                const val = parseInt(p1, 10);
                const rounded = Math.round(val / 5) * 5;
                return `${rounded} feet`;
            });
            // Round any 'N-foot'
            modified = modified.replace(/(\d+)\s*-\s*foot/gi, (match, p1) => {
                const val = parseInt(p1, 10);
                const rounded = Math.round(val / 5) * 5;
                return `${rounded}-foot`;
            });
            return modified;
        } else if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                if (typeof obj[i] === 'string') {
                    obj[i] = this.roundDistancesInObject(obj[i]);
                } else if (typeof obj[i] === 'object') {
                    this.roundDistancesInObject(obj[i]);
                }
            }
        } else if (typeof obj === 'object') {
            for (const key of Object.keys(obj)) {
                const val = obj[key];
                if (typeof val === 'string') {
                    obj[key] = this.roundDistancesInObject(val);
                } else if (typeof val === 'number' && (key === 'walk' || key === 'fly' || key === 'swim' || key === 'burrow' || key === 'climb' || key === 'darkvision' || key === 'blindsight' || key === 'tremorsense' || key === 'truesight')) {
                    obj[key] = Math.round(val / 5) * 5;
                } else if (typeof val === 'object') {
                    this.roundDistancesInObject(val);
                }
            }
        }
        return obj;
    }

    /**
     * Run the standard character data construction passes using the pipeline stages
     */
    runRebuildPasses() {
        this.characterData = this.createEmptyCharacter();
        this.fieldPriorities = new Map();

        // Single collection pass: gather all properties from the tree
        const allProperties = [];
        this.collectAllProperties(this.propertyTree, allProperties);

        // Group properties by pipeline stage
        const byStage = this.groupPropertiesByStage(allProperties);

        // Process each stage in order
        const numStages = PIPELINE_STAGES.length;
        for (let i = 0; i < numStages; i++) {
            const stage = PIPELINE_STAGES[i];
            const isFinalStage = i === numStages - 1;
            const properties = byStage.get(stage.name) || [];

            // Sort by priority within stage to allow explicit ordering
            properties.sort((a, b) => (a.priority || 0) - (b.priority || 0));

            const evaluator = new ExpressionEvaluator(this.characterData);
            for (const prop of properties) {
                // For 'apply' timing stages, check condition now (deferred from collection)
                if (stage.conditionTiming === 'apply' && prop.condition && !prop.ignoreCondition) {
                    const result = evaluator.evaluate(prop.condition, prop.variables || {});

                    // Strict truthiness: treat null, false, undefined, and unresolvable expressions as false
                    if (!result || (typeof result === 'string' && result.includes('$('))) continue;
                }

                this.applyProperty(prop, evaluator);
            }

            // Evaluate expressions after each stage if configured
            if (stage.evaluateAfter === true) {
                // Evaluate with lazy=true for intermediate stages to avoid "burning" expressions 
                // that depend on stats/attributes/meta which might be modified by later stages.
                this.evaluateObject(this.characterData, evaluator, {}, !isFinalStage);
            } else if (typeof stage.evaluateAfter === 'string') {
                // Partial evaluation - only evaluate the specified field (e.g., 'tags')
                // This is used for Content stage to resolve tags before Effect targeting.
                this.evaluateSpecificField(this.characterData, stage.evaluateAfter, evaluator);
            }

            // Sync visibility after every stage to ensure the tree accurately reflects
            // changes made by Foundation (level), Attributes (proficiencies), and Effects (weapons).
            this.syncVisibility(this.propertyTree, evaluator);
        }
    }

    /**
     * Group properties by their pipeline stage
     */
    groupPropertiesByStage(properties) {
        const byStage = new Map();
        PIPELINE_STAGES.forEach(stage => byStage.set(stage.name, []));

        for (const prop of properties) {
            let stageName = null;
            if (prop.type === 'Effect') {
                // Smart Effect Routing:
                // Move effects targeting core attributes to the 'Attributes' stage so they're 
                // available when Activities in the 'Content' stage check their conditions.
                // We only move direct paths; targets with queries ([]) stay in 'Effects'
                // as they typically depend on the final state of the collection.
                const target = prop.target || '';
                const isCorePath = /^(attributes|stats|meta|skills|saves)\./.test(target) && !target.includes('[');

                if (isCorePath) {
                    stageName = 'Attributes';
                } else {
                    stageName = 'Effects';
                }
            } else {
                const stage = TYPE_TO_STAGE.get(prop.type);
                if (stage) stageName = stage.name;
            }

            if (stageName) {
                byStage.get(stageName).push(prop);
            }
        }

        return byStage;
    }

    /**
     * Collect all properties from the tree, merging conditions along the path
     */
    collectAllProperties(node, collection, inheritedPriority = 0, inheritedVariables = {}, inheritedIgnoreCondition = false, inheritedCondition = null) {
        if (!node) return;

        const priority = node.priority !== undefined ? node.priority : inheritedPriority;
        const variables = node.variables ? { ...inheritedVariables, ...node.variables } : inheritedVariables;
        const ignoreCondition = node.ignoreCondition || inheritedIgnoreCondition;

        // SMART PRUNING: Respect visibility calculated in previous passes
        // Folders and Slots are always traversed (as they might have visible children even if they themselves aren't 'Applied' nodes)
        if (node.visible === false && !node.earlyEval && node.type !== 'Folder' && node.type !== 'Slot') return;

        // Smart Condition Merging
        let mergedCondition = node.condition;
        if (!ignoreCondition) {
            if (inheritedCondition && mergedCondition) {
                mergedCondition = `$(${inheritedCondition} && ${mergedCondition})`;
            } else if (inheritedCondition) {
                mergedCondition = inheritedCondition;
            }
        } else {
            // If ignore flag is set, clear the condition for this node and its children
            mergedCondition = null;
        }

        // Add this property if it has a recognized type
        if (node.type && node.type !== 'Folder' && node.type !== 'Slot' && node.type !== 'Reference') {
            collection.push({
                ...node,
                priority,
                variables,
                ignoreCondition,
                condition: mergedCondition
            });
        }

        // Process children
        const children = node.children || [];
        for (const child of children) {
            this.collectAllProperties(child, collection, priority, variables, ignoreCondition, mergedCondition);
        }
    }

    /**
     * Recursively evaluate conditions in the tree to set the visible flag
     */
    syncVisibility(node, evaluator = null, parentVisible = true) {
        if (!node) return;

        if (!evaluator) evaluator = new ExpressionEvaluator(this.characterData);

        if (!parentVisible) {
            node.visible = false;
        } else if (node.condition) {
            const result = evaluator.evaluate(node.condition);
            // Strict truthiness for tree visibility
            node.visible = !!result && !(typeof result === 'string' && result.includes('$('));
        } else {
            node.visible = true;
        }

        if (node.children) {
            node.children.forEach(child => this.syncVisibility(child, evaluator, node.visible));
        }
    }

    /**
     * Pass 1: Collect IDs of properties that are inherent/static
     * (meaning they aren't themselves direct choices in a slot, but are provided by one)
     */
    collectInherentIds(node, inherentIds, parentSlotFilledId = null) {
        if (!node || (node.visible === false && node.type !== 'Meta' && node.type !== 'Input' && !node.earlyEval)) return;

        let currentSlotFilledId = parentSlotFilledId;
        if (node.type === 'Slot' && node.filled) {
            currentSlotFilledId = node.filled.id;
        }

        if (node.type !== 'Slot') {
            // Static content (Folder structure or children of an inherent feature)
            if (node.id && node.id !== parentSlotFilledId) inherentIds.add(node.id);
            if (node.type === 'Reference') {
                const refId = node.reference || node.target;
                if (Array.isArray(refId)) {
                    refId.forEach(id => { if (id !== parentSlotFilledId) inherentIds.add(id); });
                } else if (refId && refId !== parentSlotFilledId) {
                    inherentIds.add(refId);
                }
            }

            // Recurse into static children
            if (node.children) {
                node.children.forEach(child => this.collectInherentIds(child, inherentIds, currentSlotFilledId));
            }
        } else if (node.filled) {
            const prop = this.library.getProperty(node.filled.id);
            if (prop && prop.type === 'Folder') {
                // Choice is a Folder (e.g. Background selection). Its internal children are inherent.
                // We DON'T add the Choice ID itself to inherentIds yet (uniqueness is checked in Pass 2).
                if (node.children) {
                    node.children.forEach(child => this.collectInherentIds(child, inherentIds, currentSlotFilledId));
                }
            }
            // Non-folder choices (Card, Effect, etc.) are skipped in Pass 1 as they are the 'selections'
        }
    }

    /**
     * Pass 2: Validates all filled slots in the tree:
     * 1. Removes choices whose conditions are no longer met
     * 2. Removes choices already provided inherently or by previous slots
     */
    validateAndPruneSlotsRecursive(node, inherentIds, alreadyChosenIds) {
        if (!node || node.visible === false) return false;
        let modified = false;

        if (node.type === 'Slot' && node.filled) {
            const propId = node.filled.id;
            const prop = this.library.getProperty(propId);

            if (prop) {
                let shouldClear = false;

                // 1. Condition validation
                // Check the property's own condition against the current character state
                if (prop.condition && !node.ignoreCondition) {
                    const evaluator = new ExpressionEvaluator(this.characterData);
                    const scope = { ...node.variables, ...(prop.variables || {}) };
                    if (!evaluator.evaluate(prop.condition, scope)) {
                        shouldClear = true;
                    }
                }

                // 2. Uniqueness validation
                if (!shouldClear && !prop.repeatable) {
                    // Prune if ID exists inherently or was already chosen in a previous slot
                    if (inherentIds.has(propId) || alreadyChosenIds.has(propId)) {
                        shouldClear = true;
                    }
                }

                // 3. Slot requirement validation
                // Ensure the current selection still matches the slot's target/tags requirement
                if (!shouldClear) {
                    const tagExpression = this.getSlotTagExpression(node);
                    if (tagExpression) {
                        const validOptions = this.library.findByTags(tagExpression);
                        if (!validOptions.some(opt => opt.id === propId)) {
                            shouldClear = true;
                        }
                    }
                }

                if (shouldClear) {
                    node.filled = null;
                    node.children = [];
                    return true;
                } else {
                    alreadyChosenIds.add(propId);
                }
            }
        }

        // Process children recursively
        if (node.children) {
            for (const child of node.children) {
                if (this.validateAndPruneSlotsRecursive(child, inherentIds, alreadyChosenIds)) {
                    modified = true;
                }
            }
        }

        return modified;
    }

    /**
     * Internal helper to resolve a path that may include array lookups like cards[id=secondWind]
     * Returns an array of { parent, key } matches
     */
    resolvePaths(path, createMissing = false, evaluator = null) {
        if (!path) return [];
        const parts = path.split('.');
        let currentNodes = [this.characterData];

        for (let i = 0; i < parts.length - 1; i++) {
            let part = parts[i];
            let nextNodes = [];

            // Match: collectionName[query]
            const match = part.match(/^(\w+)\[([^\]]+)\]$/);
            if (match) {
                const [_, collectionName, query] = match;

                for (const node of currentNodes) {
                    const collection = node[collectionName];
                    if (!collection) {
                        if (createMissing) node[collectionName] = [];
                        else continue;
                    }

                    const items = Array.isArray(collection) ? collection : Object.values(collection);

                    const matches = items.filter(item => {
                        return evaluateBoolean(query, (token) => {
                            // Support query operators (e.g., proficiency>=1, resource=wildShape or resource="wild Shape")
                            const operatorMatch = token.match(/^([^>=<!]+)(>=|<=|>|<|=)(.+)$/);
                            if (operatorMatch) {
                                const [_, key, operator, rawValue] = operatorMatch;
                                const expectedValue = rawValue.replace(/^['"]|['"]$/g, '');
                                let actualValue = item[key];

                                // Resolve expressions in the property value
                                if (evaluator && typeof actualValue === 'string' && actualValue.includes('$')) {
                                    actualValue = evaluator.evaluate(actualValue, item.variables || {});
                                }

                                const val1 = (isNaN(actualValue) || actualValue === "" || actualValue === null) ? actualValue : Number(actualValue);
                                const val2 = (isNaN(expectedValue) || expectedValue === "" || expectedValue === null) ? expectedValue : Number(expectedValue);

                                switch (operator) {
                                    case '>=': return val1 >= val2;
                                    case '<=': return val1 <= val2;
                                    case '>': return val1 > val2;
                                    case '<': return val1 < val2;
                                    case '=':
                                        if (Array.isArray(actualValue)) {
                                            return actualValue.some(val => String(val) === expectedValue);
                                        }
                                        return String(actualValue ?? '') === expectedValue;
                                }
                            }

                            let id = item.id;
                            let tags = item.tags || [];

                            // If an evaluator is provided, resolve any dynamic expressions in the property we're matching against
                            if (evaluator) {
                                if (typeof id === 'string' && id.includes('$')) {
                                    id = evaluator.evaluate(id, item.variables || {});
                                }
                                if (Array.isArray(tags)) {
                                    tags = tags.map(t => (typeof t === 'string' && t.includes('$')) ? evaluator.evaluate(t, item.variables || {}) : t);
                                }
                            }
                            if (token === 'weaponMastery') {
                                return this.characterData.attributes && (this.characterData.attributes.weaponMastery === true || this.characterData.attributes.weaponMastery === 1);
                            }

                            if (Array.isArray(id)) return id.includes(token) || (Array.isArray(tags) && tags.includes(token));
                            return id === token || (Array.isArray(tags) && tags.includes(token));
                        });
                    });

                    nextNodes.push(...matches);
                }
            } else {
                for (const node of currentNodes) {
                    if (!node[part]) {
                        if (createMissing) node[part] = {};
                        else continue;
                    }
                    nextNodes.push(node[part]);
                }
            }
            currentNodes = nextNodes;
            if (currentNodes.length === 0) return [];
        }

        const finalKey = parts[parts.length - 1];
        return currentNodes.map(node => ({ parent: node, key: finalKey }));
    }

    /**
     * Set a field value in characterData if priority allows
     */
    setFieldWithPriority(path, value, priority = 0, evaluator = null) {
        // 1. Basic priority check for the exact path
        const currentPriority = this.fieldPriorities.get(path);
        if (currentPriority !== undefined && priority < currentPriority) return false;

        const resolutions = this.resolvePaths(path, true, evaluator);
        if (resolutions.length === 0) return false;

        resolutions.forEach(resolved => {
            const oldValue = resolved.parent[resolved.key];

            // 2. Smart Merging for objects
            // If we are setting an object into an existing object, merge the keys
            // individually to avoid wiping out properties that were pinned by 
            // more specific sub-path effects.
            if (value && typeof value === 'object' && !Array.isArray(value) &&
                oldValue && typeof oldValue === 'object' && !Array.isArray(oldValue)) {

                for (const k in value) {
                    const subPath = `${path}.${k}`;
                    const subPriority = this.fieldPriorities.get(subPath);
                    if (subPriority === undefined || priority >= subPriority) {
                        oldValue[k] = value[k];
                        this.fieldPriorities.set(subPath, priority);
                    }
                }
            } else {
                // 3. Fallback to standard replacement
                resolved.parent[resolved.key] = value;
                this.fieldPriorities.set(path, priority);

                // If we've set a bulk object, record priorities for its known keys
                // which helps subsequent smart-merges know they can overwrite.
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    for (const k in value) {
                        this.fieldPriorities.set(`${path}.${k}`, priority);
                    }
                }
            }
        });

        return true;
    }

    /**
     * Add or merge a resource into characterData
     */
    addResource(name, quantity, restore, icon, color, id = null) {
        const existingResource = this.characterData.resources.find(r => r.name === name);
        if (existingResource) {
            // Merge quantity additively
            // Update other fields if provided and not already set
            if (icon && !existingResource.icon) existingResource.icon = icon;
            if (color && !existingResource.color) existingResource.color = color;
        } else {
            this.characterData.resources.push({
                id: id,
                name: name,
                quantity: quantity,
                icon: icon,
                color: color,
            });
        }
    }

    /**
     * Apply a single property to character data
     */
    applyProperty(prop, evaluator) {
        if (!evaluator) evaluator = new ExpressionEvaluator(this.characterData);
        const type = prop.type;
        const priority = prop.priority || 0;
        const scope = prop.variables || {};

        switch (type) {
            case 'Meta':
                // Use id for meta key (e.g., 'level', 'class')
                const metaKey = (prop.id || '').replace(/^ui\./i, '').toLowerCase();
                this.characterData.meta[metaKey] = evaluator.evaluate(prop.value || prop.default);
                break;

            case 'Input':
                // Use id for input key (e.g., 'species', 'background')
                const inputKey = (prop.id || '').replace(/^ui\./i, '').toLowerCase();
                if (inputKey) {
                    const val = (prop.value !== undefined && prop.value !== null) ? prop.value : prop.default;
                    this.characterData.meta[inputKey] = evaluator.evaluate(val);
                }
                break;

            case 'Stat':
                {
                    const bakedScore = evaluator.bakeVariables(prop.score, scope);
                    const bakedMod = evaluator.bakeVariables(prop.mod, scope);

                    this.setFieldWithPriority(`stats.${prop.id}.score`, bakedScore, priority, evaluator);
                    this.setFieldWithPriority(`stats.${prop.id}.mod`, bakedMod, priority, evaluator);
                }
                break;

            case 'Attribute':
                {
                    // 1. Resolve the target path for the attribute
                    // Priority: Evaluated 'target' > Evaluated 'name'
                    let resolvedKey = evaluator.evaluate(prop.target, scope);
                    if (!resolvedKey) {
                        resolvedKey = evaluator.evaluate(prop.id, scope);
                    }

                    // 2. Process the value
                    // Use bakeVariables to resolve local context but delay full evaluation if it depends on other character data (stats, etc.)
                    let bakedValue = evaluator.bakeVariables(prop.value, scope);

                    if (typeof bakedValue === 'string' && bakedValue.includes('$') && (bakedValue.includes('stats.') || bakedValue.includes('attributes.') || bakedValue.includes('meta.'))) {
                        // Expression has external dependencies, delay until final evaluation pass
                        this.setFieldWithPriority(`attributes.${resolvedKey}`, bakedValue, priority, evaluator);
                    } else {
                        // No external dependencies or its a static value, evaluate now
                        let val = evaluator.evaluate(bakedValue, scope);
                        // Clone objects/arrays to prevent cross-contamination and mutation leaks
                        if (val && typeof val === 'object') {
                            val = structuredClone(val);
                        }
                        this.setFieldWithPriority(`attributes.${resolvedKey}`, val, priority, evaluator);
                    }
                }
                break;

            case 'Skill':
                this.setFieldWithPriority(`skills.${prop.id}.stat`, prop.stat, priority, evaluator);
                this.setFieldWithPriority(`skills.${prop.id}.proficiency`, prop.proficiency, priority, evaluator);
                this.setFieldWithPriority(`skills.${prop.id}.name`, prop.name, priority, evaluator);
                this.setFieldWithPriority(`skills.${prop.id}.bonus`, prop.bonus, priority, evaluator);
                this.setFieldWithPriority(`skills.${prop.id}.adv`, prop.adv, priority, evaluator);
                this.setFieldWithPriority(`skills.${prop.id}.dis`, prop.dis, priority, evaluator);
                break;

            case 'Save':
                this.setFieldWithPriority(`saves.${prop.id}.stat`, prop.stat, priority, evaluator);
                this.setFieldWithPriority(`saves.${prop.id}.bonus`, prop.bonus, priority, evaluator);
                this.setFieldWithPriority(`saves.${prop.id}.proficiency`, prop.proficiency, priority, evaluator);
                this.setFieldWithPriority(`saves.${prop.id}.adv`, prop.adv, priority, evaluator);
                this.setFieldWithPriority(`saves.${prop.id}.dis`, prop.dis, priority, evaluator);
                break;

            case 'Resource':
                {
                    const evaluatedQuantity = evaluator.evaluate(prop.quantity, scope);
                    this.addResource(prop.name, evaluatedQuantity, prop.restore, prop.icon, prop.color, prop.id);

                    // Parity with old Feature behavior: auto-add restore note to Short Rest card
                    if (prop.sr) {
                        const quantity = prop.sr;
                        this.applyEffect({
                            target: 'activities[shortRest].extra',
                            operation: 'push',
                            value: {
                                name: prop.name,
                                description: `Restore ${quantity !== 1 ? quantity : 'a'} ${prop.name} charge${quantity !== 1 ? 's' : ''}.`
                            }
                        }, evaluator);
                    }
                }
                break;



            case 'Activity':
                {
                    const cardId = evaluator.bakeVariables(prop.id, scope);
                    if (IGNORED_ACTIVITY_IDS.has(cardId)) {
                        break;
                    }
                    // Check for duplicate activity to avoid multiple card rendering
                    if (this.characterData.activities.some(act => act.id === cardId) && !cardId.includes('weaponAttack')) {
                        break;
                    }

                    // Merge inherited tree variables with the card's own variables
                    const cardVariables = { ...scope, ...(prop.variables || {}) };

                    // DEEP CLONE the property to prevent mutating the library data during evaluation passes
                    const cardClone = structuredClone(prop);

                    // Split description into text and extras
                    const description = prop.description;
                    const existingExtras = Array.isArray(prop.extra) ? prop.extra : (prop.extra ? [prop.extra] : []);

                    const cardObj = {
                        ...cardClone,
                        id: cardId,
                        name: prop.name,
                        time: cardClone.time || 'free action',
                        range: cardClone.range || 'self',
                        duration: cardClone.duration || 'instantaneous',
                        resource: cardClone.resource || '',
                        tags: evaluator.bakeVariables(prop.tags, scope),
                        type: evaluator.bakeVariables(prop.subtype, scope),
                        description: description,
                        extra: existingExtras,
                        variables: cardVariables // Store variables for dynamic evaluation
                    };

                    this.characterData.activities.push(cardObj);
                }
                break;

            case 'Effect':
                this.applyEffect(prop, evaluator);
                break;

            case 'Extra':
                {
                    // Extra type: simplified syntax for pushing to card extra arrays
                    // Automatically constructs the localization path and pushes to matching cards
                    const scope = prop.variables || {};

                    // Build the localization path from the property id
                    // e.g., id: 'extraAttack' with parent 'classes.fighter' -> 'classes.fighter.extraAttack'
                    const namePath = prop.name || (prop.id ? `${prop.id}.name` : '');
                    const descPath = prop.description || (prop.id ? `${prop.id}.description` : '');

                    // Determine target: if target is specified, use it; otherwise use the id
                    const targetQuery = evaluator.evaluate(prop.target, scope) || prop.id;

                    // Apply as an Effect that pushes to activities[query].extra
                    this.applyEffect({
                        target: `activities[${targetQuery}].extra`,
                        operation: 'push',
                        value: {
                            name: namePath,
                            description: descPath
                        },
                        variables: scope
                    }, evaluator);
                }
                break;
            case 'Statblock':
                {
                    const scope = prop.variables || {};
                    const statblockClone = structuredClone(prop);

                    // Statblock specific evaluation logic
                    // We want to evaluate fields but preserve the structure
                    const statblockObj = {
                        ...statblockClone,
                        id: evaluator.bakeVariables(prop.id, scope),
                        name: prop.name,
                        tags: evaluator.bakeVariables(prop.tags, scope),
                        variables: { ...scope, ...(prop.variables || {}) }
                    };

                    this.characterData.statblocks.push(statblockObj);
                }
                break;
        }
    }

    /**
     * Apply an effect to modify character data
     */
    applyEffect(effect, evaluator) {
        if (!evaluator) evaluator = new ExpressionEvaluator(this.characterData);
        const { target, operation, value } = effect;
        const priority = effect.priority || 0;
        const scope = effect.variables || {};

        // Handle substring targeting: path["substring"]
        // IMPORTANT: Extract the raw substring from the target string BEFORE evaluating,
        // so dynamic expressions like $(local.ac) inside ["..."] are preserved as literal
        // text. Evaluating first would resolve them to their computed values, which would
        // never match the unevaluated template text stored in the description.
        let substring = null;
        let targetForEval = target;
        if (typeof target === 'string') {
            const rawSubMatch = target.match(/^([\s\S]+)\["([^"]+)"\]$/);
            if (rawSubMatch) {
                targetForEval = rawSubMatch[1]; // Only evaluate the path portion
                substring = rawSubMatch[2];     // Keep substring verbatim (unexpanded)
            }
        }

        // Target path is baked with local tree variable context but target object must be found in characterData
        let evaluatedTarget = evaluator.evaluate(targetForEval, scope);

        // VALUE: Use bakeVariables instead of evaluate. 
        // This resolves local.treeVars but keeps $(characterVars) "LIVE" for final evaluation passes.
        const dynamicValue = evaluator.bakeVariables(value, scope);

        if (operation === 'set' && !substring) {
            this.setFieldWithPriority(evaluatedTarget, dynamicValue, priority, evaluator);
            return;
        }

        // Resolve target paths (multi-match support)
        const resolutions = this.resolvePaths(evaluatedTarget, true, evaluator);
        if (resolutions.length === 0) return;

        const evaluatedValue = evaluator.evaluate(dynamicValue, scope);

        resolutions.forEach(resolved => {
            let { parent: current, key: finalKey } = resolved;

            // Redirect push operations on 'description' to 'extra'
            if (operation === 'push' && finalKey === 'description') {
                finalKey = 'extra';
            }

            switch (operation) {
                case 'add':
                    // Check if target is currently an expression string
                    if (typeof current[finalKey] === 'string' && current[finalKey].includes('$')) {
                        // Wrap with $() to ensure the math is evaluated in subsequent passes
                        current[finalKey] = `$(${current[finalKey]} + ${evaluatedValue})`;
                    } else if (typeof current[finalKey] === 'string') {
                        // Check if the string is in the format "<n> feet"
                        const feetMatch = current[finalKey].match(/^(\d+)\s+feet$/i);
                        if (feetMatch) {
                            const currentFeet = Number(feetMatch[1]);
                            const addVal = Number(evaluatedValue || 0);
                            current[finalKey] = `${currentFeet + addVal} feet`;
                        } else {
                            // Not a recognized format, treat as 0 and convert to number
                            const addVal = Number(evaluatedValue || 0);
                            current[finalKey] = addVal;
                        }
                    } else {
                        // Force numeric addition to prevent string concatenation
                        const currentVal = Number(current[finalKey] || 0);
                        const addVal = Number(evaluatedValue || 0);
                        current[finalKey] = currentVal + addVal;
                    }
                    break;
                case 'softSet':
                    if (current[finalKey] === null || current[finalKey] === undefined) {
                        current[finalKey] = evaluatedValue;
                    }
                    break;
                case 'push':
                    {
                        // If the target is not an array, wrap the current value in an array
                        let existing;
                        if (Array.isArray(current[finalKey])) {
                            existing = current[finalKey];
                        } else if (current[finalKey] !== null && current[finalKey] !== undefined) {
                            existing = [current[finalKey]];
                        } else {
                            existing = [];
                        }

                        const itemsToPush = Array.isArray(evaluatedValue) ? evaluatedValue : [evaluatedValue];

                        // Helper to get normalized representation for comparison
                        const getNormalizedExtraString = (item) => {
                            if (typeof item === 'object' && item !== null) {
                                return `**${item.name || ''}.** ${item.description || ''}`.trim().toLowerCase();
                            }
                            return String(item).trim().toLowerCase();
                        };

                        // Add only items that don't already exist
                        const newItems = itemsToPush.filter(item => {
                            const normalizedItem = getNormalizedExtraString(item);
                            return !existing.some(existingItem => getNormalizedExtraString(existingItem) === normalizedItem);
                        });

                        if (newItems.length > 0) {
                            current[finalKey] = [...existing, ...newItems];
                        }
                    }
                    break;
                case 'replace':
                    if (substring) {
                        const targetValue = current[finalKey];
                        if (Array.isArray(targetValue)) {
                            current[finalKey] = targetValue.map(item => {
                                if (typeof item === 'string') {
                                    return item.replace(substring, evaluatedValue);
                                } else if (item && typeof item === 'object' && typeof item.description === 'string') {
                                    return {
                                        ...item,
                                        description: item.description.replace(substring, evaluatedValue)
                                    };
                                }
                                return item;
                            });
                        } else if (typeof targetValue === 'string') {
                            current[finalKey] = targetValue.replace(substring, evaluatedValue);
                        }
                    }
                    break;
            }
        });
    }

    /**
     * Recursively evaluate expressions in an object
     * @param {boolean} lazy - If true, delays evaluation of expressions that depend on character data
     */
    evaluateObject(obj, evaluator, scope = {}, lazy = false) {
        let changed = true;
        let pass = 0;
        const maxPasses = lazy ? 1 : 5; // Multiple passes only if not lazy

        while (changed && pass < maxPasses) {
            changed = false;
            pass++;
            if (this._evaluateRecursive(obj, evaluator, scope, lazy)) {
                changed = true;
            }
        }
    }

    /**
     * Internal recursive helper for evaluateObject
     * Returns true if any value was changed
     */
    _evaluateRecursive(obj, evaluator, scope, lazy) {
        if (typeof obj !== 'object' || obj === null) return false;
        let modified = false;

        const currentScope = obj.variables ? { ...scope, ...obj.variables } : scope;

        for (const key in obj) {
            if (['id', 'type', 'subtype', 'variables'].includes(key)) continue;

            if (typeof obj[key] === 'string') {
                if (lazy && obj[key].includes('$') && (obj[key].includes('stats.') || obj[key].includes('attributes.') || obj[key].includes('meta.'))) {
                    continue;
                }

                const result = evaluator.evaluate(obj[key], currentScope);
                if (result !== obj[key]) {
                    obj[key] = result;
                    modified = true;
                }
            } else if (typeof obj[key] === 'object') {
                if (this._evaluateRecursive(obj[key], evaluator, currentScope, lazy)) {
                    modified = true;
                }
            }
        }
        return modified;
    }

    /**
     * Evaluate only a specific field name in an object tree
     * Used for partial evaluation (e.g., only evaluate 'tags' fields after Content stage)
     */
    evaluateSpecificField(obj, fieldName, evaluator, scope = {}) {
        if (typeof obj !== 'object' || obj === null) return;

        const currentScope = obj.variables ? { ...scope, ...obj.variables } : scope;

        for (const key in obj) {
            if (key === fieldName) {
                // Evaluate this specific field
                if (typeof obj[key] === 'string') {
                    const result = evaluator.evaluate(obj[key], currentScope);
                    if (result !== obj[key]) {
                        obj[key] = result;
                    }
                } else if (Array.isArray(obj[key])) {
                    // If it's an array, evaluate each string element
                    obj[key] = obj[key].map(item => {
                        if (typeof item === 'string') {
                            return evaluator.evaluate(item, currentScope);
                        }
                        return item;
                    });
                }
            } else if (typeof obj[key] === 'object') {
                // Recurse into child objects to find more instances of the field
                this.evaluateSpecificField(obj[key], fieldName, evaluator, currentScope);
            }
        }
    }

    /**
     * Get the current tag expression for a slot, evaluating any dynamic parts
     */
    getSlotTagExpression(slot) {
        // Handle both 'tags' and 'target' field names
        // Priority: target (what the slot asks for) > tags (what the slot IS)
        const tagSource = slot.target || slot.tags;
        if (!tagSource) return null;

        let tagExpression = Array.isArray(tagSource) ? tagSource.join(' OR ') : tagSource;

        // Support dynamic tag expressions
        if (tagExpression.includes('$')) {
            const evaluator = new ExpressionEvaluator(this.characterData);
            tagExpression = evaluator.evaluate(tagExpression, slot.variables || {});
        }

        return tagExpression;
    }

    /**
     * Get available properties for a slot
     */
    getSlotOptions(slot) {
        const tagExpression = this.getSlotTagExpression(slot);
        if (!tagExpression) return [];

        let candidates = this.library.findByTags(tagExpression);

        // Get IDs of all properties currently in the character to filter duplicates
        const existingIds = this.getAllActivePropertyIds(this.propertyTree);

        // Filter by conditions AND uniqueness
        const evaluator = new ExpressionEvaluator(this.characterData);
        candidates = candidates.filter(prop => {
            // Check condition (unless the slot is marked to ignore them)
            if (prop.condition && !slot.ignoreCondition) {
                if (!evaluator.evaluate(prop.condition)) return false;
            }

            // Check if already exists (unless repeatable)
            if (existingIds.has(prop.id) && !prop.repeatable) {
                return false;
            }

            return true;
        }).map(prop => ({
            ...prop,
            displayName: evaluator.evaluate(prop.name)
        }));

        return candidates;
    }

    /**
     * Helper to collect all property IDs currently in the tree
     */
    getAllActivePropertyIds(node, ids = new Set()) {
        if (!node) return ids;

        // If this node has an ID (was loaded from library), add it
        if (node.id) ids.add(node.id);

        // If this is a Reference node, add the referenced ID
        if (node.type === 'Reference') {
            const refId = node.reference || node.target;
            if (Array.isArray(refId)) {
                refId.forEach(id => ids.add(id));
            } else if (refId) {
                ids.add(refId);
            }
        }

        // If this is a filled slot, add the filled property ID
        if (node.type === 'Slot' && node.filled) {
            ids.add(node.filled.id);
        }

        // Recurse into children
        if (node.children) {
            node.children.forEach(child => this.getAllActivePropertyIds(child, ids));
        }

        return ids;
    }

    /**
     * Get the current character data
     */
    getCharacterData() {
        return this.characterData;
    }

    /**
     * Get the property tree
     */
    getPropertyTree() {
        return this.propertyTree;
    }
}
