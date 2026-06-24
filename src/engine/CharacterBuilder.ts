import { ExpressionEvaluator, clearExpressionCache } from './ExpressionEvaluator.js';
import { TYPE_TO_STAGE, PIPELINE_STAGES } from './pipeline.js';
import { formatBonus, evaluateBoolean } from './helpers.js';
import { PropertyLibrary } from './PropertyLibrary.js';
import { CharacterData, PropertyNode, Recipe, RecipeInput, RecipeSlot } from './types.js';

/**
 * Builds a character from property tree
 */
export class CharacterBuilder {
    private library: PropertyLibrary;
    private basePropertyTree: PropertyNode | null = null; // Original unprocessed tree structure
    private propertyTree: PropertyNode | null = null;  // Processed tree with expanded slots
    private characterData: CharacterData;
    private fieldPriorities = new Map<string, number>();

    constructor(library: PropertyLibrary) {
        this.library = library;
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
            children: this.processChildren(this.basePropertyTree.children || [], {}, 'base')
        };

        this.rebuild();
    }

    /**
     * Process children to add UI state and expand slots with quantity > 1
     * Also resolves Reference nodes into the tree structure
     */
    processChildren(children: PropertyNode[], inheritedVariables: Record<string, any> = {}, parentId: string | null = null): PropertyNode[] {
        if (!children) return [];
        const processed: PropertyNode[] = [];

        for (const child of children) {
            // Auto-generate name and description paths from id
            // If a child has an id, build its localization path from parent
            if (child.id) {
                const fullId = parentId ? `${parentId}.${child.id}` : child.id;
                if (!child.name) {
                    child.name = child.id;
                }
                if (!child.description) {
                    child.description = '';
                }
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
            let appliedOverwrite: Record<string, any> = {};
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
                    effectiveNode = { ...child, ...appliedOverwrite };
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

                        // Merge context from reference node into the content node
                        const contentNode: PropertyNode = {
                            ...prop,
                            ...appliedOverwrite, // Apply overwrites to the resolved node
                            // Preserve metadata from the reference node (using evaluated variables)
                            priority: effectiveNode.priority !== undefined ? effectiveNode.priority : prop.priority,
                            variables: { ...nodeVariables, ...(prop.variables || {}) },
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
    createEmptyCharacter(): CharacterData {
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
    fillSlot(slotPath: number[], propertyId: string) {
        if (!this.propertyTree) return;
        const property = this.library.getProperty(propertyId);
        if (!property) return;

        // Navigate to slot in tree
        let current = this.propertyTree;
        for (let i = 0; i < slotPath.length - 1; i++) {
            current = current.children![slotPath[i]];
        }

        const slotIndex = slotPath[slotPath.length - 1];
        const slot = current.children![slotIndex];

        // Fill the slot - store filled property info
        const evaluator = new ExpressionEvaluator(this.characterData);
        slot.filled = {
            id: property.id,
            name: property.name || property.id,
            displayName: evaluator.evaluate(property.name || property.id, slot.variables || {}),
            type: property.type,
            tags: property.tags
        };

        // Populate children immediately so the initial rebuild pass can find effects/properties
        let items: PropertyNode[] = [];
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
    clearSlot(slotPath: number[]) {
        if (!this.propertyTree) return;
        let current = this.propertyTree;
        for (let i = 0; i < slotPath.length - 1; i++) {
            current = current.children![slotPath[i]];
        }

        const slotIndex = slotPath[slotPath.length - 1];
        const slot = current.children![slotIndex];
        slot.filled = null;
        slot.children = []; // Clear children when clearing the slot

        this.rebuild();
    }

    /**
     * Update an input value
     */
    updateInput(inputPath: number[], value: any) {
        if (!this.basePropertyTree) return;
        // Navigate to the input in the base tree to update its value persisted there
        let current = this.basePropertyTree;
        for (let i = 0; i < inputPath.length - 1; i++) {
            current = current.children![inputPath[i]];
        }
        const inputIndex = inputPath[inputPath.length - 1];
        const input = current.children![inputIndex];
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
    private _reprocessTreeStructure() {
        if (!this.basePropertyTree) return;
        const state = this.extractTreeState(this.propertyTree);
        this.propertyTree = {
            ...this.basePropertyTree,
            children: this.processChildren(this.basePropertyTree.children || [], {}, 'base')
        };
        this.reapplyTreeState(this.propertyTree, state);
    }

    /**
     * Extract current selections and UI state (like expansion) from property tree
     */
    extractTreeState(node: PropertyNode | null, path: Array<{ id: string; slotIndex?: number }> = []): { slots: RecipeSlot[]; expanded: Array<Array<{ id: string; slotIndex?: number }>> } {
        const state: { slots: RecipeSlot[]; expanded: Array<Array<{ id: string; slotIndex?: number }>> } = { slots: [], expanded: [] };
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
    reapplyTreeState(root: PropertyNode, state: { slots: RecipeSlot[]; expanded: Array<Array<{ id: string; slotIndex?: number }>> }) {
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
                        name: property.name || property.id,
                        displayName: evaluator.evaluate(property.name || property.id, current.variables || {}),
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
    extractFilledSlots(node: PropertyNode | null, path: Array<{ id: string; slotIndex?: number }> = []): RecipeSlot[] {
        const filled: RecipeSlot[] = [];
        if (!node || !node.children) return filled;

        node.children.forEach((child) => {
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
    reapplyFilledSlots(root: PropertyNode, filledSlots: RecipeSlot[]) {
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
                        name: property.name || property.id,
                        displayName: evaluator.evaluate(property.name || property.id, current.variables || {}),
                        type: property.type,
                        tags: property.tags
                    };

                    // Re-process children
                    let items: PropertyNode[] = [];
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
    getRecipe(): Recipe {
        return {
            inputs: this.extractInputs(this.basePropertyTree),
            slots: this.extractFilledSlots(this.propertyTree)
        };
    }

    /**
     * Apply a "recipe" to rebuild a character
     */
    applyRecipe(recipe: Recipe) {
        // Reset base tree from fresh library data
        const baseProperty = this.library.getProperty('base');
        if (!baseProperty) return;
        this.basePropertyTree = JSON.parse(JSON.stringify({
            ...baseProperty,
            expanded: true,
            children: baseProperty.children || []
        }));

        // Reset character data
        this.characterData = this.createEmptyCharacter();

        // Apply inputs
        this.applyInputs(this.basePropertyTree!, recipe.inputs);

        // Process children to expand slots
        this.propertyTree = {
            ...this.basePropertyTree!,
            children: this.processChildren(this.basePropertyTree!.children || [], {}, 'base')
        };

        // Phase 1: Apply slots once
        this.reapplyFilledSlots(this.propertyTree, recipe.slots);

        // Phase 2: Run a rebuild pass
        this.runRebuildPasses();
        this._reprocessTreeStructure();

        // Phase 3: Re-apply ALL slots from the recipe
        this.reapplyFilledSlots(this.propertyTree!, recipe.slots);

        // Final rebuild
        this.rebuild();
    }

    /**
     * Extract all input values from a tree
     */
    extractInputs(node: PropertyNode | null, path: number[] = []): RecipeInput[] {
        const inputs: RecipeInput[] = [];
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
    applyInputs(root: PropertyNode, inputs: RecipeInput[]) {
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
    refreshTreeLabels(node: PropertyNode | null = this.propertyTree) {
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
        if (!this.propertyTree) return;
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
        const inherentIds = new Set<string>();
        this.collectInherentIds(this.propertyTree, inherentIds);

        const alreadyChosenIds = new Set<string>();
        const modified = this.validateAndPruneSlotsRecursive(this.propertyTree, inherentIds, alreadyChosenIds);

        if (modified) {
            // Re-run the structural passes to update characterData with the pruned tree
            this.runRebuildPasses();
            this._reprocessTreeStructure();
            this.runRebuildPasses();
        }
    }

    /**
     * Run the standard character data construction passes using the pipeline stages
     */
    runRebuildPasses() {
        this.characterData = this.createEmptyCharacter();
        this.fieldPriorities = new Map<string, number>();

        // Single collection pass: gather all properties from the tree
        const allProperties: PropertyNode[] = [];
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
    groupPropertiesByStage(properties: PropertyNode[]): Map<string, PropertyNode[]> {
        const byStage = new Map<string, PropertyNode[]>();
        PIPELINE_STAGES.forEach(stage => byStage.set(stage.name, []));

        for (const prop of properties) {
            let stageName: string | null = null;
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
                byStage.get(stageName)!.push(prop);
            }
        }

        return byStage;
    }

    /**
     * Collect all properties from the tree, merging conditions along the path
     */
    collectAllProperties(
        node: PropertyNode | null,
        collection: PropertyNode[],
        inheritedPriority = 0,
        inheritedVariables: Record<string, any> = {},
        inheritedIgnoreCondition = false,
        inheritedCondition: string | null = null
    ) {
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
            mergedCondition = undefined;
        }

        // Add this property if it has a recognized type
        if (node.type && node.type !== 'Folder' && node.type !== 'Slot' && node.type !== 'Reference') {
            collection.push({
                ...node,
                priority,
                variables,
                ignoreCondition,
                condition: mergedCondition || undefined
            });
        }

        // Process children
        const children = node.children || [];
        for (const child of children) {
            this.collectAllProperties(child, collection, priority, variables, ignoreCondition, mergedCondition || null);
        }
    }

    /**
     * Recursively evaluate conditions in the tree to set the visible flag
     */
    syncVisibility(node: PropertyNode | null, evaluator: ExpressionEvaluator | null = null, parentVisible = true) {
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
    collectInherentIds(node: PropertyNode | null, inherentIds: Set<string>) {
        if (!node || (node.visible === false && node.type !== 'Meta' && node.type !== 'Input' && !node.earlyEval)) return;

        if (node.type !== 'Slot') {
            // Static content (Folder structure or children of an inherent feature)
            if (node.id) inherentIds.add(node.id);
            if (node.type === 'Reference') {
                const refId = node.reference || node.target;
                if (Array.isArray(refId)) {
                    refId.forEach(id => inherentIds.add(id));
                } else if (refId) {
                    inherentIds.add(refId);
                }
            }

            // Recurse into static children
            if (node.children) {
                node.children.forEach(child => this.collectInherentIds(child, inherentIds));
            }
        } else if (node.filled) {
            const prop = this.library.getProperty(node.filled.id);
            if (prop && prop.type === 'Folder') {
                // Choice is a Folder (e.g. Background selection). Its internal children are inherent.
                if (node.children) {
                    node.children.forEach(child => this.collectInherentIds(child, inherentIds));
                }
            }
        }
    }

    /**
     * Pass 2: Validates all filled slots in the tree:
     * 1. Removes choices whose conditions are no longer met
     * 2. Removes choices already provided inherently or by previous slots
     */
    validateAndPruneSlotsRecursive(node: PropertyNode | null, inherentIds: Set<string>, alreadyChosenIds: Set<string>): boolean {
        if (!node || node.visible === false) return false;
        let modified = false;

        if (node.type === 'Slot' && node.filled) {
            const propId = node.filled.id;
            const prop = this.library.getProperty(propId);

            if (prop) {
                let shouldClear = false;

                // 1. Condition validation
                if (prop.condition && !node.ignoreCondition) {
                    const evaluator = new ExpressionEvaluator(this.characterData);
                    const scope = { ...node.variables, ...(prop.variables || {}) };
                    if (!evaluator.evaluate(prop.condition, scope)) {
                        shouldClear = true;
                    }
                }

                // 2. Uniqueness validation
                if (!shouldClear && !prop.repeatable) {
                    if (inherentIds.has(propId) || alreadyChosenIds.has(propId)) {
                        shouldClear = true;
                    }
                }

                // 3. Slot requirement validation
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
    resolvePaths(path: string, createMissing = false, evaluator: ExpressionEvaluator | null = null): Array<{ parent: any; key: string }> {
        if (!path) return [];
        const parts = path.split('.');
        let currentNodes: any[] = [this.characterData];

        for (let i = 0; i < parts.length - 1; i++) {
            let part = parts[i];
            let nextNodes: any[] = [];

            // Match: collectionName[query]
            const match = part.match(/^(\w+)\[([^\]]+)\]$/);
            if (match) {
                const [_, collectionName, query] = match;

                for (const node of currentNodes) {
                    let collection = node[collectionName];
                    if (!collection) {
                        if (createMissing) {
                            collection = [];
                            node[collectionName] = collection;
                        } else continue;
                    }

                    const items = Array.isArray(collection) ? collection : Object.values(collection);

                    const matches = items.filter(item => {
                        return evaluateBoolean(query, (token) => {
                            const operatorMatch = token.match(/^([^>=<!]+)(>=|<=|>|<|=)(.+)$/);
                            if (operatorMatch) {
                                const [_, key, operator, rawValue] = operatorMatch;
                                const expectedValue = rawValue.replace(/^['"]|['"]$/g, '');
                                let actualValue = item[key];

                                // Resolve expressions in the property value
                                if (evaluator && typeof actualValue === 'string' && actualValue.includes('$')) {
                                    actualValue = evaluator.evaluate(actualValue, item.variables || {});
                                }

                                const val1 = (isNaN(actualValue as any) || actualValue === "" || actualValue === null) ? actualValue : Number(actualValue);
                                const val2 = (isNaN(expectedValue as any) || expectedValue === "" || expectedValue === null) ? expectedValue : Number(expectedValue);

                                switch (operator) {
                                    case '>=': return (val1 as any) >= (val2 as any);
                                    case '<=': return (val1 as any) <= (val2 as any);
                                    case '>': return (val1 as any) > (val2 as any);
                                    case '<': return (val1 as any) < (val2 as any);
                                    case '=':
                                        if (Array.isArray(actualValue)) {
                                            return actualValue.some(val => String(val) === expectedValue);
                                        }
                                        return String(actualValue ?? '') === expectedValue;
                                }
                            }

                            let id = item.id;
                            let tags = item.tags || [];

                            if (evaluator) {
                                if (typeof id === 'string' && id.includes('$')) {
                                    id = evaluator.evaluate(id, item.variables || {});
                                }
                                if (Array.isArray(tags)) {
                                    tags = tags.map(t => (typeof t === 'string' && t.includes('$')) ? evaluator.evaluate(t, item.variables || {}) : t);
                                }
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
                        if (createMissing) {
                            node[part] = {};
                        } else continue;
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
    setFieldWithPriority(path: string, value: any, priority = 0, evaluator: ExpressionEvaluator | null = null): boolean {
        const currentPriority = this.fieldPriorities.get(path);
        if (currentPriority !== undefined && priority < currentPriority) return false;

        const resolutions = this.resolvePaths(path, true, evaluator);
        if (resolutions.length === 0) return false;

        resolutions.forEach(resolved => {
            const oldValue = resolved.parent[resolved.key];

            if (value && typeof value === 'object' && !Array.isArray(value) &&
                oldValue && typeof oldValue === 'object' && !Array.isArray(oldValue)) {

                for (const k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        const subPath = `${path}.${k}`;
                        const subPriority = this.fieldPriorities.get(subPath);
                        if (subPriority === undefined || priority >= subPriority) {
                            oldValue[k] = value[k];
                            this.fieldPriorities.set(subPath, priority);
                        }
                    }
                }
            } else {
                resolved.parent[resolved.key] = value;
                this.fieldPriorities.set(path, priority);

                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    for (const k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            this.fieldPriorities.set(`${path}.${k}`, priority);
                        }
                    }
                }
            }
        });

        return true;
    }

    /**
     * Add or merge a resource into characterData
     */
    addResource(name: string, quantity: number, restore?: string, icon?: string, color?: string, id: string | null = null) {
        const existingResource = this.characterData.resources.find(r => r.name === name);
        if (existingResource) {
            if (icon && !(existingResource as any).icon) (existingResource as any).icon = icon;
            if (color && !(existingResource as any).color) (existingResource as any).color = color;
        } else {
            this.characterData.resources.push({
                id: id || name,
                name: name,
                quantity: quantity,
                ...(icon ? { icon } : {}),
                ...(color ? { color } : {})
            } as any);
        }
    }

    /**
     * Apply a single property to character data
     */
    applyProperty(prop: PropertyNode, evaluator: ExpressionEvaluator) {
        if (!evaluator) evaluator = new ExpressionEvaluator(this.characterData);
        const type = prop.type;
        const priority = prop.priority || 0;
        const scope = prop.variables || {};

        switch (type) {
            case 'Meta':
                const metaKey = (prop.id || '').replace(/^ui\./i, '').toLowerCase();
                this.characterData.meta[metaKey] = evaluator.evaluate(prop.value !== undefined ? prop.value : prop.default);
                break;

            case 'Input':
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
                    let resolvedKey = evaluator.evaluate(prop.target, scope);
                    if (!resolvedKey) {
                        resolvedKey = evaluator.evaluate(prop.id, scope);
                    }

                    let bakedValue = evaluator.bakeVariables(prop.value, scope);

                    if (typeof bakedValue === 'string' && bakedValue.includes('$') && (bakedValue.includes('stats.') || bakedValue.includes('attributes.') || bakedValue.includes('meta.'))) {
                        this.setFieldWithPriority(`attributes.${resolvedKey}`, bakedValue, priority, evaluator);
                    } else {
                        let val = evaluator.evaluate(bakedValue, scope);
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
                    this.addResource(prop.name || prop.id, evaluatedQuantity, prop.restore, prop.icon, prop.color, prop.id);

                    if (prop.sr) {
                        const quantity = prop.sr;
                        this.applyEffect({
                            target: 'activities[shortRest].extra',
                            operation: 'push',
                            value: `**${prop.name || prop.id}.** Restore ${quantity !== 1 ? quantity : 'a'} ${prop.name || prop.id} charge${quantity !== 1 ? 's' : ''}.`
                        }, evaluator);
                    }
                }
                break;

            case 'Activity':
                {
                    const cardVariables = { ...scope, ...(prop.variables || {}) };
                    const cardClone = structuredClone(prop);
                    const description = prop.description;
                    const existingExtras = Array.isArray(prop.extra) ? prop.extra : (prop.extra ? [prop.extra] : []);

                    const cardObj = {
                        ...cardClone,
                        id: evaluator.bakeVariables(prop.id, scope),
                        name: prop.name || prop.id,
                        time: cardClone.time || 'free action',
                        range: cardClone.range || 'self',
                        duration: cardClone.duration || 'instantaneous',
                        resource: cardClone.resource || '',
                        tags: evaluator.bakeVariables(prop.tags, scope),
                        type: evaluator.bakeVariables(prop.subtype, scope),
                        description: description,
                        extra: existingExtras,
                        variables: cardVariables
                    };

                    this.characterData.activities.push(cardObj as any);
                }
                break;

            case 'Effect':
                this.applyEffect(prop, evaluator);
                break;

            case 'Extra':
                {
                    const scopeVars = prop.variables || {};
                    const namePath = prop.name || (prop.id ? `${prop.id}.name` : '');
                    const descPath = prop.description || (prop.id ? `${prop.id}.description` : '');
                    const extraString = `**${namePath}.** ${descPath}`;
                    const targetQuery = evaluator.evaluate(prop.target, scopeVars) || prop.id;

                    this.applyEffect({
                        target: `activities[${targetQuery}].extra`,
                        operation: 'push',
                        value: extraString,
                        variables: scopeVars
                    }, evaluator);
                }
                break;
            case 'Statblock':
                {
                    const scopeVars = prop.variables || {};
                    const statblockClone = structuredClone(prop);

                    const statblockObj = {
                        ...statblockClone,
                        id: evaluator.bakeVariables(prop.id, scopeVars),
                        name: prop.name || prop.id,
                        tags: evaluator.bakeVariables(prop.tags, scopeVars),
                        variables: { ...scopeVars, ...(prop.variables || {}) }
                    };

                    this.characterData.statblocks.push(statblockObj as any);
                }
                break;
        }
    }

    /**
     * Apply an effect to modify character data
     */
    applyEffect(effect: any, evaluator: ExpressionEvaluator | null = null) {
        if (!evaluator) evaluator = new ExpressionEvaluator(this.characterData);
        const { target, operation, value } = effect;
        const priority = effect.priority || 0;
        const scope = effect.variables || {};

        let substring: string | null = null;
        let targetForEval = target;
        if (typeof target === 'string') {
            const rawSubMatch = target.match(/^([\s\S]+)\["([^"]+)"\]$/);
            if (rawSubMatch) {
                targetForEval = rawSubMatch[1]; // Only evaluate the path portion
                substring = rawSubMatch[2];     // Keep substring verbatim
            }
        }

        let evaluatedTarget = evaluator.evaluate(targetForEval, scope);
        const dynamicValue = evaluator.bakeVariables(value, scope);

        if (operation === 'set' && !substring) {
            this.setFieldWithPriority(evaluatedTarget, dynamicValue, priority, evaluator);
            return;
        }

        const resolutions = this.resolvePaths(evaluatedTarget, true, evaluator);
        if (resolutions.length === 0) return;

        const evaluatedValue = evaluator.evaluate(dynamicValue, scope);

        resolutions.forEach(resolved => {
            let { parent: current, key: finalKey } = resolved;

            if (operation === 'push' && finalKey === 'description') {
                finalKey = 'extra';
            }

            switch (operation) {
                case 'add':
                    if (typeof current[finalKey] === 'string' && current[finalKey].includes('$')) {
                        current[finalKey] = `$(${current[finalKey]} + ${evaluatedValue})`;
                    } else if (typeof current[finalKey] === 'string') {
                        const feetMatch = current[finalKey].match(/^(\d+)\s+feet$/i);
                        if (feetMatch) {
                            const currentFeet = Number(feetMatch[1]);
                            const addVal = Number(evaluatedValue || 0);
                            current[finalKey] = `${currentFeet + addVal} feet`;
                        } else {
                            const addVal = Number(evaluatedValue || 0);
                            current[finalKey] = addVal;
                        }
                    } else {
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
                        let existing: any[];
                        if (Array.isArray(current[finalKey])) {
                            existing = current[finalKey];
                        } else if (current[finalKey] !== null && current[finalKey] !== undefined) {
                            existing = [current[finalKey]];
                        } else {
                            existing = [];
                        }

                        const itemsToPush = Array.isArray(evaluatedValue) ? evaluatedValue : [evaluatedValue];
                        const newItems = itemsToPush.filter(item => !existing.includes(item));

                        if (newItems.length > 0) {
                            current[finalKey] = [...existing, ...newItems];
                        }
                    }
                    break;
                case 'replace':
                    if (substring) {
                        const targetValue = current[finalKey];
                        if (Array.isArray(targetValue)) {
                            current[finalKey] = targetValue.map(item =>
                                (typeof item === 'string') ? item.replace(substring!, evaluatedValue) : item
                            );
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
     */
    evaluateObject(obj: any, evaluator: ExpressionEvaluator, scope: Record<string, any> = {}, lazy = false) {
        let changed = true;
        let pass = 0;
        const maxPasses = lazy ? 1 : 5;

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
     */
    private _evaluateRecursive(obj: any, evaluator: ExpressionEvaluator, scope: Record<string, any>, lazy: boolean): boolean {
        if (typeof obj !== 'object' || obj === null) return false;
        let modified = false;

        const currentScope = obj.variables ? { ...scope, ...obj.variables } : scope;

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
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
        }
        return modified;
    }

    /**
     * Evaluate only a specific field name in an object tree
     */
    evaluateSpecificField(obj: any, fieldName: string, evaluator: ExpressionEvaluator, scope: Record<string, any> = {}) {
        if (typeof obj !== 'object' || obj === null) return;

        const currentScope = obj.variables ? { ...scope, ...obj.variables } : scope;

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                if (key === fieldName) {
                    if (typeof obj[key] === 'string') {
                        const result = evaluator.evaluate(obj[key], currentScope);
                        if (result !== obj[key]) {
                            obj[key] = result;
                        }
                    } else if (Array.isArray(obj[key])) {
                        obj[key] = obj[key].map(item => {
                            if (typeof item === 'string') {
                                return evaluator.evaluate(item, currentScope);
                            }
                            return item;
                        });
                    }
                } else if (typeof obj[key] === 'object') {
                    this.evaluateSpecificField(obj[key], fieldName, evaluator, currentScope);
                }
            }
        }
    }

    /**
     * Get the current tag expression for a slot, evaluating any dynamic parts
     */
    getSlotTagExpression(slot: PropertyNode): string | null {
        const tagSource = slot.target || slot.tags;
        if (!tagSource) return null;

        let tagExpression = Array.isArray(tagSource) ? tagSource.join(' OR ') : tagSource;

        if (tagExpression.includes('$')) {
            const evaluator = new ExpressionEvaluator(this.characterData);
            tagExpression = evaluator.evaluate(tagExpression, slot.variables || {});
        }

        return tagExpression;
    }

    /**
     * Get available properties for a slot
     */
    getSlotOptions(slot: PropertyNode): PropertyNode[] {
        const tagExpression = this.getSlotTagExpression(slot);
        if (!tagExpression) return [];

        let candidates = this.library.findByTags(tagExpression);
        const existingIds = this.getAllActivePropertyIds(this.propertyTree);

        const evaluator = new ExpressionEvaluator(this.characterData);
        candidates = candidates.filter(prop => {
            if (prop.condition && !slot.ignoreCondition) {
                if (!evaluator.evaluate(prop.condition)) return false;
            }

            if (existingIds.has(prop.id) && !prop.repeatable) {
                return false;
            }

            return true;
        }).map(prop => ({
            ...prop,
            displayName: evaluator.evaluate(prop.name || prop.id)
        }));

        return candidates;
    }

    /**
     * Helper to collect all property IDs currently in the tree
     */
    getAllActivePropertyIds(node: PropertyNode | null, ids = new Set<string>()): Set<string> {
        if (!node) return ids;

        if (node.id) ids.add(node.id);

        if (node.type === 'Reference') {
            const refId = node.reference || node.target;
            if (Array.isArray(refId)) {
                refId.forEach(id => ids.add(id));
            } else if (refId) {
                ids.add(refId);
            }
        }

        if (node.type === 'Slot' && node.filled) {
            ids.add(node.filled.id);
        }

        if (node.children) {
            node.children.forEach(child => this.getAllActivePropertyIds(child, ids));
        }

        return ids;
    }

    /**
     * Get the current character data
     */
    getCharacterData(): CharacterData {
        return this.characterData;
    }

    /**
     * Get the property tree
     */
    getPropertyTree(): PropertyNode | null {
        return this.propertyTree;
    }
}
