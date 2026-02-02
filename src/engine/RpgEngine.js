import jsyaml from 'js-yaml';

// ============================================================================
// EXPRESSION CACHE - Avoid recompiling the same expressions
// ============================================================================

const EXPRESSION_CACHE = new Map();
const MAX_CACHE_SIZE = 2000;

function getCachedFunction(expr) {
    if (EXPRESSION_CACHE.has(expr)) {
        return EXPRESSION_CACHE.get(expr);
    }

    try {
        const fn = new Function(
            'stats', 'attributes', 'meta', 'skills', 'saves', 'activities', 'progression', 'local', 'formatBonus',
            `return ${expr}`
        );

        // Limit cache size to prevent memory bloat
        if (EXPRESSION_CACHE.size >= MAX_CACHE_SIZE) {
            const firstKey = EXPRESSION_CACHE.keys().next().value;
            EXPRESSION_CACHE.delete(firstKey);
        }

        EXPRESSION_CACHE.set(expr, fn);
        return fn;
    } catch (e) {
        return null;
    }
}

export function clearExpressionCache() {
    EXPRESSION_CACHE.clear();
}

// ============================================================================
// BUILD PIPELINE CONFIGURATION
// ============================================================================

/**
 * CHARACTER ENGINE - BUILD PIPELINE
 * 
 * Properties are processed in 4 stages:
 * 
 * 1. FOUNDATION (Meta, Input, Stat)
 *    - Establishes character context (name, level, ability scores)
 *    - Conditions checked at collection time
 * 
 * 2. ATTRIBUTES (Attribute, Skill, Save)
 *    - Derived values (AC, proficiency bonus, skill modifiers)
 *    - Conditions checked at collection time
 * 
 * 3. CONTENT (Resource, Card)
 *    - Character abilities and actions
 *    - Conditions checked at collection time
 *    - Expressions evaluated so Effects can target by tag
 * 
 * 4. EFFECTS (Effect)
 *    - Modifications to existing data
 *    - Conditions checked at APPLY time (can depend on Attributes)
 *    - Final expression evaluation
 * 
 * Each stage evaluates expressions before the next stage begins,
 * ensuring dependencies are resolved in order.
 */

const PIPELINE_STAGES = [
    {
        name: 'Foundation',
        types: ['Meta', 'Input', 'Stat'],
        conditionTiming: 'apply',   // Check conditions when applying
        evaluateAfter: true          // Run expression evaluation after this stage
    },
    {
        name: 'Attributes',
        types: ['Attribute', 'Skill', 'Save'],
        conditionTiming: 'apply',
        evaluateAfter: true
    },
    {
        name: 'Content',
        types: ['Resource', 'Activity', 'Feature', 'Extra'],
        conditionTiming: 'apply',
        evaluateAfter: 'tags'        // Only evaluate 'tags' fields (so Effects can target by tag)
    },
    {
        name: 'Effects',
        types: ['Effect'],
        conditionTiming: 'apply',    // Check conditions when applying (deferred)
        evaluateAfter: true          // Full evaluation after Effects
    }
];

// Build a lookup map for quick stage finding by type
const TYPE_TO_STAGE = new Map();
PIPELINE_STAGES.forEach(stage => {
    stage.types.forEach(type => {
        TYPE_TO_STAGE.set(type, stage);
    });
});

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Formats a number as a bonus string (e.g. +5, -2, 0)
 */
export const formatBonus = (value, alwaysShow = false) => {
    if (typeof value === 'number') {
        const num = Number(value);
        if (isNaN(num)) return value;
        if (num === 0) return alwaysShow ? '+0' : '';
        return num > 0 ? `+${num}` : `${num}`;
    }
    return value;
};

/**
 * Generic boolean expression evaluator
 * Supports AND, OR, NOT, ( ), and implicit AND
 * @param {string} expression - The query string (e.g. "a AND (b OR c)")
 * @param {function} matcher - Function that takes a token and returns boolean
 */
export const evaluateBoolean = (expression, matcher) => {
    if (!expression) return true;

    const tokens = expression
        .replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ')
        .replace(/,/g, ' OR ')
        .split(/\s+/)
        .filter(t => t.trim());

    let pos = 0;

    const parseExpression = () => {
        let result = parseTerm();
        while (pos < tokens.length && tokens[pos].toUpperCase() === 'OR') {
            pos++;
            const right = parseTerm();
            result = result || right;
        }
        return result;
    };

    const parseTerm = () => {
        let result = parseFactor();
        while (pos < tokens.length) {
            const token = tokens[pos].toUpperCase();
            if (token === 'OR' || token === ')') break;

            if (token === 'AND') {
                pos++;
                const right = parseFactor();
                result = result && right;
            } else if (token === 'NOT') {
                pos++;
                const right = parseFactor();
                result = result && !right;
            } else {
                // Implicit AND
                const right = parseFactor();
                result = result && right;
            }
        }
        return result;
    };

    const parseFactor = () => {
        if (pos >= tokens.length) return false;

        const token = tokens[pos];
        if (token === '(') {
            pos++;
            const result = parseExpression();
            if (pos < tokens.length && tokens[pos] === ')') pos++;
            return result;
        }

        if (token.toUpperCase() === 'NOT') {
            pos++;
            return !parseFactor();
        }

        pos++;
        return matcher(token);
    };

    try {
        return parseExpression();
    } catch (e) {
        return false;
    }
};

/**
 * Splits a description into standard text and "extra" lines (starting with **)
 */
export const splitDescription = (description) => {
    if (!description) return { description: null, extra: [] };

    const lines = Array.isArray(description) ? description : String(description).split('\n');
    const desc = [];
    const extra = [];

    lines.forEach(line => {
        const trimmed = String(line).trim();
        if (trimmed.startsWith('**')) {
            extra.push(line);
        } else if (trimmed !== "" || line === "") {
            desc.push(line);
        }
    });

    return {
        description: Array.isArray(description) ? desc : desc.join('\n'),
        extra
    };
};

// ============================================================================
// EXPRESSION EVALUATOR
// ============================================================================

/**
 * Evaluates inline expressions like $(10 + stats.dex.mod)
 * Supports the progression() function for level-based values
 */
export class ExpressionEvaluator {
    constructor(context) {
        this.context = context;
    }

    /**
     * progression() function for level-based progression
     */
    progression(...values) {
        const level = this.context.meta?.level || 1;
        const list = (values.length === 1 && Array.isArray(values[0])) ? values[0] : values;
        return list[Math.min(level - 1, list.length - 1)] || 0;
    }

    /**
     * Bakes local variables into an expression string by replacing local.key with its value.
     * This allows deferred expressions to retain their context once flattened into characterData.
     */
    bakeVariables(val, scope = {}) {
        if (val === null || val === undefined) return val;

        // Recursively handle arrays
        if (Array.isArray(val)) {
            return val.map(item => this.bakeVariables(item, scope));
        }

        // Recursively handle objects
        if (typeof val === 'object') {
            const result = {};
            for (const key in val) {
                result[key] = this.bakeVariables(val[key], scope);
            }
            return result;
        }

        // Base case: strings that might contain local variables
        if (typeof val !== 'string' || !val.includes('local.')) return val;

        // Optimized replacement using a single pass over the string
        return val.replace(/local\.(\w+)\b/g, (match, key) => {
            if (Object.prototype.hasOwnProperty.call(scope, key)) {
                const scopeVal = scope[key];
                // If it's a string, wrap in quotes, otherwise use raw value
                return (typeof scopeVal === 'string' && !scopeVal.includes('$')) ? `'${scopeVal}'` : scopeVal;
            }
            return match;
        });
    }

    /**
     * Evaluate an expression string with optional scope variables
     */
    evaluate(expr, scope = {}) {
        if (typeof expr !== 'string') return expr;

        // Automatically resolve translation keys (e.g. data.fighter.name or ui.attack: ...)
        // Check for direct keys first (no spaces)
        // if (!expr.includes(' ') && !expr.includes('\n') && expr.includes('.') && i18next.exists(expr)) {
        //     expr = i18next.t(expr);
        // }

        // Check for "key: " prefixes (even if expressions follow)
        // const prefixMatch = expr.match(/^(ui\.|data\.)[\w\.]+: /);
        // if (prefixMatch) {
        //     const key = prefixMatch[0].replace(': ', '');
        //     if (i18next.exists(key)) {
        //         expr = i18next.t(key) + ': ' + expr.substring(prefixMatch[0].length);
        //     }
        // }

        // Extract and translate embedded localization paths
        // Matches patterns like: data.classes.fighter.name or ui.something.name
        // Even when surrounded by other text like **data.classes.fighter.name.**
        // const pathPattern = /\b(data\.|ui\.)[\w.]+\b/g;
        // expr = expr.replace(pathPattern, (match) => {
        //     if (i18next.exists(match)) {
        //         return i18next.t(match);
        //     }
        //     return match;
        // });

        if (!expr.includes('$')) return expr;

        // Bake local variables into the expression string so they persist even if deferred
        let result = this.bakeVariables(expr, scope);

        // Multi-pass inside-out evaluation
        while (true) {
            let start = result.lastIndexOf('$(');
            if (start === -1) break;

            let end = -1;
            let depth = 1;
            for (let i = start + 2; i < result.length; i++) {
                if (result[i] === '(') depth++;
                else if (result[i] === ')') depth--;

                if (depth === 0) {
                    end = i + 1;
                    break;
                }
            }

            if (end === -1) break; // Malformed

            const inner = result.substring(start + 2, end - 1);
            const fn = getCachedFunction(inner);
            if (!fn) break;

            try {
                const val = fn(
                    this.context.stats || {},
                    this.context.attributes || {},
                    this.context.meta || {},
                    this.context.skills || {},
                    this.context.saves || {},
                    this.context.activities || [],
                    this.progression.bind(this),
                    scope,
                    formatBonus
                );

                if (val === undefined || (typeof val === 'number' && isNaN(val)) || (typeof val === 'string' && val.includes('$('))) {
                    // Dependency not ready or returned another expression, wait for next full rebuild pass
                    break;
                }

                // If the entire expression is just this $() and the value is a primitive or object,
                // return it directly instead of converting to string
                if (start === 0 && end === result.length) {
                    return val;
                }

                const replacement = (val === null) ? "" : val.toString();
                result = result.substring(0, start) + replacement + result.substring(end);
            } catch (e) {
                break;
            }
        }

        // Final coercion for strings that look like booleans or numbers
        if (typeof result === 'string' && result !== "") {
            const trimmed = result.trim();
            if (trimmed === "true") return true;
            if (trimmed === "false") return false;

            if (!isNaN(trimmed) && !trimmed.includes(' ') && !trimmed.includes('\n')) {
                return Number(trimmed);
            }
        }

        return result;
    }
}
// ============================================================================
// PROPERTY LIBRARY
// ============================================================================

/**
 * Loads and indexes all properties from data files
 */
export class PropertyLibrary {
    constructor() {
        this.properties = new Map(); // id -> parsed property
        this.rawStore = new Map(); // id -> raw string
        this.byTag = new Map(); // tag -> id[]
        this.paths = new Map(); // id -> full path
    }

    /**
     * Load all YAML files from the data directory
     */
    async loadFromData() {
        // Remove eager:true to reduce initial bundle size and allow the browser to breathe during load.
        // Vite will create separate chunks for the YAML content.
        const context = import.meta.glob('/data/**/*.yml', { query: '?raw', import: 'default' });

        const loadPromises = Object.entries(context).map(async ([path, loader]) => {
            try {
                const content = await loader();

                // Extract ID from YAML content (prioritize discrete id over filename)
                // Match: id: someId or id: "someId" or id: 'someId'
                const idMatch = content.match(/^id:\s*(['"]?)([^'"\n]+)\1/m);
                const id = idMatch ? idMatch[2].trim() : path.split('/').pop().replace('.yml', '');

                this.addRawProperty(id, content, path);
            } catch (e) {
                console.error('Error loading property:', path, e);
            }
        });

        await Promise.all(loadPromises);
    }

    /**
     * Add a raw property to the library and index its tags
     */
    addRawProperty(id, content, path = null) {
        this.rawStore.set(id, content);
        if (path) this.paths.set(id, path);

        // Fast tag extraction using regex to avoid full YAML parsing during initial load
        // Matches "tags: [tag1, tag2]", "tags: tag1", or multi-line "tags:\n  - tag1"
        const inlineTagMatch = content.match(/^tags:\s*\[(.*?)\]/m);
        const singleTagMatch = content.match(/^tags:\s*([^\[\s\n][^\n]*)$/m);
        const multiLineTagMatch = content.match(/^tags:\s*\n((?:\s+-\s+.+\n?)+)/m);

        let tags = [];
        if (inlineTagMatch) {
            tags = inlineTagMatch[1].split(',').map(t =>
                t.trim().replace(/^['"]|['"]$/g, '')
            ).filter(t => t !== "");
        } else if (multiLineTagMatch) {
            const matches = multiLineTagMatch[1].matchAll(/^\s+-\s+(.+)$/gm);
            for (const m of matches) {
                tags.push(m[1].trim().replace(/^['"]|['"]$/g, ''));
            }
        } else if (singleTagMatch) {
            tags = [singleTagMatch[1].trim().replace(/^['"]|['"]$/g, '')];
        }

        tags.forEach(tag => {
            if (!this.byTag.has(tag)) this.byTag.set(tag, []);
            if (!this.byTag.get(tag).includes(id)) {
                this.byTag.get(tag).push(id);
            }
        });
    }

    /**
     * Reload or update a property from new raw content
     */
    reloadProperty(id, content, path = null) {
        // Clear parsed cache
        this.properties.delete(id);

        // Remove from byTag indexes first to avoid duplicates or orphaned entries
        this.byTag.forEach((ids, tag) => {
            const index = ids.indexOf(id);
            if (index !== -1) ids.splice(index, 1);
        });

        // Re-process
        this.addRawProperty(id, content, path);
    }



    /**
     * Get property by ID, parsing it lazily if needed
     */
    getProperty(id) {
        // Check if already parsed
        if (this.properties.has(id)) return this.properties.get(id);

        // Check if raw content exists
        const content = this.rawStore.get(id);
        if (!content) return null;

        try {
            const property = jsyaml.load(content);
            property.id = id;

            // Auto-generate name and description paths from id
            // If property has an id, its name and description should resolve to localization paths
            if (property.id && !property.name) {
                property.name = property.id;
            }
            if (property.id && !property.description) {
                property.description = ''; // Default to empty string instead of path
            }

            this.properties.set(id, property);
            return property;
        } catch (e) {
            console.error('Error parsing YAML for', id, e);
            return null;
        }
    }



    /**
     * Find properties matching tag criteria using a boolean expression parser
     * Supports: AND, OR, NOT, ( ), and implicit AND
     */
    findByTags(tagExpression) {
        if (!tagExpression) return [];

        const tokens = tagExpression
            .replace(/\(/g, ' ( ')
            .replace(/\)/g, ' ) ')
            .replace(/,/g, ' OR ')
            .split(/\s+/)
            .filter(t => t.trim());

        let pos = 0;

        const parseExpression = () => {
            let result = parseTerm();
            while (pos < tokens.length && tokens[pos].toUpperCase() === 'OR') {
                pos++;
                const right = parseTerm();
                right.forEach(id => result.add(id)); // Union
            }
            return result;
        };

        const parseTerm = () => {
            let result = parseFactor();
            while (pos < tokens.length) {
                const token = tokens[pos].toUpperCase();
                if (token === 'OR' || token === ')') break;

                if (token === 'AND') {
                    pos++;
                    const right = parseFactor();
                    const next = new Set();
                    right.forEach(id => { if (result.has(id)) next.add(id); });
                    result = next;
                } else if (token === 'NOT') {
                    pos++;
                    const right = parseFactor();
                    right.forEach(id => result.delete(id)); // Subtraction
                } else {
                    // Implicit AND
                    const right = parseFactor();
                    const next = new Set();
                    right.forEach(id => { if (result.has(id)) next.add(id); });
                    result = next;
                }
            }
            return result;
        };

        const parseFactor = () => {
            if (pos >= tokens.length) return new Set();

            const token = tokens[pos];
            if (token === '(') {
                pos++;
                const result = parseExpression();
                if (pos < tokens.length && tokens[pos] === ')') pos++;
                return result;
            }

            if (token.toUpperCase() === 'NOT') {
                pos++;
                const right = parseFactor();
                const all = new Set(this.rawStore.keys());
                right.forEach(id => all.delete(id));
                return all;
            }

            pos++;
            const matches = new Set(this.byTag.get(token) || []);
            if (this.rawStore.has(token)) matches.add(token);
            return matches;
        };

        try {
            const candidateIds = parseExpression();
            const result = [];
            for (const id of candidateIds) {
                const prop = this.getProperty(id);
                if (prop) result.push(prop);
            }
            return result;
        } catch (e) {
            console.error("Error parsing tag expression:", tagExpression, e);
            return [];
        }
    }
}

// ============================================================================
// CHARACTER BUILDER
// ============================================================================

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
                effectiveNode = { ...child, ...appliedOverwrite };
            }

            // Determine the ID to pass to children for path building
            const currentId = effectiveNode.id || parentId;

            // Handle References - flatten them directly into the tree
            if (effectiveNode.type === 'Reference') {
                const refKey = effectiveNode.reference || effectiveNode.target || effectiveNode.value;
                const refIds = Array.isArray(refKey) ? refKey : [refKey];

                for (const refId of refIds) {
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
                        const contentNode = {
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
            if (displayName) displayName = evaluator.evaluate(displayName, nodeVariables);

            let description = effectiveNode.description;
            if (description) {
                if (Array.isArray(description)) {
                    description = description.map(line => evaluator.evaluate(line, nodeVariables));
                } else if (typeof description === 'string') {
                    description = evaluator.evaluate(description, nodeVariables);
                }
            }

            let subtype = effectiveNode.subtype;
            if (subtype) subtype = evaluator.evaluate(subtype, nodeVariables);

            let target = effectiveNode.target;
            if (target && typeof target === 'string') target = evaluator.evaluate(target, nodeVariables);

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
            attributes: {},
            skills: {},
            saves: {},
            resources: [],
            features: [],
            activities: []
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

        // If the property is a Folder or Reference, merge its resolved children into the slot
        // Otherwise, include the property itself as a child (for Cards, Effects, etc.)
        let items = [];
        if (property.type === 'Folder' || property.type === 'Reference') {
            items = (property.type === 'Reference') ? [property] : (property.children || []);
        } else {
            items = [property];
        }

        // Apply slot-level overrides (overwrite) to the items filling the slot
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
        // Navigate to the input in the base tree to update its value persisted there
        let current = this.basePropertyTree;
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

        // Extract filled slot data from current tree before rebuilding
        const filledSlots = this.extractFilledSlots(this.propertyTree);

        // Rebuild the processed tree with new quantity evaluations (for base slots)
        this.propertyTree = {
            ...this.basePropertyTree,
            children: this.processChildren(this.basePropertyTree.children, {}, 'base')
        };

        // Reapply filled slot data (this will re-process children of filled props)
        this.reapplyFilledSlots(this.propertyTree, filledSlots);

        this.rebuild();
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
            inputs: this.extractInputs(this.basePropertyTree),
            slots: this.extractFilledSlots(this.propertyTree)
        };
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

        // Process children to expand slots (this uses the NEW inputs like level)
        this.propertyTree = {
            ...this.basePropertyTree,
            children: this.processChildren(this.basePropertyTree.children, {}, 'base')
        };

        // Reapply filled slots
        this.reapplyFilledSlots(this.propertyTree, recipe.slots);

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

        this.runRebuildPasses();

        // Refresh labels to catch language changes or updated expressions
        this.refreshTreeLabels();

        // Perform two-pass validation for slot selections
        // Pass 1: Collect all 'inherent' property IDs (features from folders like Species/Background)
        const inherentIds = new Set();
        this.collectInherentIds(this.propertyTree, inherentIds);

        // Pass 2: Validate slot choices against inherent features and previous choices
        const alreadyChosenIds = new Set();
        const modified = this.validateAndPruneSlotsRecursive(this.propertyTree, inherentIds, alreadyChosenIds);

        if (modified) {
            // Re-run the passes to update characterData with the pruned tree
            this.runRebuildPasses();
        }
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

            const evaluator = new ExpressionEvaluator(this.characterData);
            for (const prop of properties) {
                // For 'apply' timing stages, check condition now (deferred from collection)
                if (stage.conditionTiming === 'apply' && prop.condition && !prop.ignoreCondition) {
                    const result = evaluator.evaluate(prop.condition, prop.variables || {});
                    if (!result) continue; // Skip this property
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

            // Sync visibility after Foundation stage (when meta.level is available)
            // AND after Attributes stage (when derived stats like weapon hands are available)
            if (stage.name === 'Foundation' || stage.name === 'Attributes') {
                this.syncVisibility(this.propertyTree);
            }
        }
    }

    /**
     * Group properties by their pipeline stage
     */
    groupPropertiesByStage(properties) {
        const byStage = new Map();
        PIPELINE_STAGES.forEach(stage => byStage.set(stage.name, []));

        for (const prop of properties) {
            const stage = TYPE_TO_STAGE.get(prop.type);
            if (stage) {
                byStage.get(stage.name).push(prop);
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
            node.visible = !!evaluator.evaluate(node.condition);
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
    collectInherentIds(node, inherentIds) {
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
                // We DON'T add the Choice ID itself to inherentIds yet (uniqueness is checked in Pass 2).
                if (node.children) {
                    node.children.forEach(child => this.collectInherentIds(child, inherentIds));
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
                    if (!node[collectionName]) {
                        if (createMissing) node[collectionName] = [];
                        else continue;
                    }

                    if (!Array.isArray(node[collectionName])) continue;

                    const matches = node[collectionName].filter(item => {
                        return evaluateBoolean(query, (token) => {
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
        const currentPriority = this.fieldPriorities.get(path);
        if (currentPriority !== undefined && priority < currentPriority) return false;

        const resolutions = this.resolvePaths(path, true, evaluator);
        if (resolutions.length > 0) {
            resolutions.forEach(resolved => {
                resolved.parent[resolved.key] = value;
            });
            this.fieldPriorities.set(path, priority);
            return true;
        }

        return false;
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
                const metaKey = (prop.id || prop.name || '').replace(/^ui\./i, '').toLowerCase();
                this.characterData.meta[metaKey] = evaluator.evaluate(prop.value || prop.default);
                break;

            case 'Input':
                // Use id for input key (e.g., 'species', 'background')
                const inputKey = (prop.id || prop.name || '').replace(/^ui\./i, '').toLowerCase();
                if (inputKey) {
                    const val = (prop.value !== undefined && prop.value !== null) ? prop.value : prop.default;
                    this.characterData.meta[inputKey] = evaluator.evaluate(val);
                }
                break;

            case 'Stat':
                {
                    const bakedScore = evaluator.bakeVariables(prop.score, scope);
                    const bakedMod = evaluator.bakeVariables(prop.mod, scope);

                    this.setFieldWithPriority(`stats.${prop.name}.score`, bakedScore, priority, evaluator);
                    this.setFieldWithPriority(`stats.${prop.name}.mod`, bakedMod, priority, evaluator);
                }
                break;

            case 'Attribute':
                {
                    // 1. Resolve the target path for the attribute
                    // Priority: Evaluated 'target' > Evaluated 'name'
                    let resolvedKey = evaluator.evaluate(prop.target, scope);
                    if (!resolvedKey) {
                        resolvedKey = evaluator.evaluate(prop.name, scope);
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
                this.setFieldWithPriority(`skills.${prop.name}.stat`, prop.stat, priority, evaluator);
                this.setFieldWithPriority(`skills.${prop.name}.proficiency`, prop.proficiency, priority, evaluator);
                this.setFieldWithPriority(`skills.${prop.name}.bonus`, prop.bonus, priority, evaluator);
                this.setFieldWithPriority(`skills.${prop.name}.adv`, prop.adv, priority, evaluator);
                this.setFieldWithPriority(`skills.${prop.name}.dis`, prop.dis, priority, evaluator);
                break;

            case 'Save':
                this.setFieldWithPriority(`saves.${prop.name}.stat`, prop.stat, priority, evaluator);
                this.setFieldWithPriority(`saves.${prop.name}.bonus`, prop.bonus, priority, evaluator);
                this.setFieldWithPriority(`saves.${prop.name}.proficiency`, prop.proficiency, priority, evaluator);
                this.setFieldWithPriority(`saves.${prop.name}.adv`, prop.adv, priority, evaluator);
                this.setFieldWithPriority(`saves.${prop.name}.dis`, prop.dis, priority, evaluator);
                break;

            case 'Feature':
                {
                    const name = evaluator.evaluate(prop.name);
                    const description = evaluator.evaluate(prop.description);
                    const id = prop.id;

                    this.characterData.features.push({
                        name: name || id,
                        description: description || '',
                    });
                }
                break;

            case 'Resource':
                {
                    const evaluatedQuantity = evaluator.evaluate(prop.quantity, scope);
                    this.addResource(prop.name, evaluatedQuantity, prop.restore, prop.icon, prop.color, prop.id);

                    // Parity with old Feature behavior: auto-add restore note to Short Rest card
                    if (prop.restore === 'short rest') {
                        const name = evaluator.evaluate(prop.name, scope);
                        const quantity = typeof evaluatedQuantity === 'number' ? evaluatedQuantity : '';
                        this.applyEffect({
                            target: 'activities[shortRest].extra',
                            operation: 'push',
                            value: `**${prop.name}..** Restore ${quantity > 1 ? quantity : 'a'} ${prop.name} charge${quantity > 1 ? 's' : ''}.`
                        }, evaluator);
                    }
                }
                break;



            case 'Activity':
                {
                    // Merge inherited tree variables with the card's own variables
                    const cardVariables = { ...scope, ...(prop.variables || {}) };

                    // DEEP CLONE the property to prevent mutating the library data during evaluation passes
                    const cardClone = structuredClone(prop);

                    // Split description into text and extras
                    const description = evaluator.bakeVariables(prop.description, scope);
                    const { description: finalDescription, extra: newExtras } = splitDescription(description);
                    const existingExtras = Array.isArray(prop.extra) ? prop.extra : (prop.extra ? [prop.extra] : []);

                    const cardObj = {
                        ...cardClone,
                        id: evaluator.bakeVariables(prop.id, scope),
                        name: evaluator.bakeVariables(prop.name, scope),
                        time: cardClone.time || 'free action',
                        duration: cardClone.duration || 'instantaneous',
                        resource: cardClone.resource || '',
                        tags: evaluator.bakeVariables(prop.tags, scope),
                        type: evaluator.bakeVariables(prop.subtype, scope),
                        description: finalDescription,
                        extra: [...existingExtras, ...newExtras],
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

                    // Construct the string to push with expressions that will be evaluated
                    // Use $() to trigger evaluation, which will auto-resolve translation keys
                    const extraString = `**${namePath}.** ${descPath}`;

                    // Determine target: if target is specified, use it; otherwise use the id
                    const targetQuery = evaluator.evaluate(prop.target, scope) || prop.id;

                    // Apply as an Effect that pushes to activities[query].extra
                    this.applyEffect({
                        target: `activities[${targetQuery}].extra`,
                        operation: 'push',
                        value: extraString,
                        variables: scope
                    }, evaluator);
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

        // Target path is baked with local tree variable context but target object must be found in characterData
        let evaluatedTarget = evaluator.evaluate(target, scope);

        // Handle substring targeting: path["substring"]
        let substring = null;
        if (typeof evaluatedTarget === 'string') {
            const subMatch = evaluatedTarget.match(/(.+)\["([^"]+)"\]$/);
            if (subMatch) {
                evaluatedTarget = subMatch[1];
                substring = subMatch[2];
            }
        }

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
                        const existing = Array.isArray(current[finalKey]) ? current[finalKey] : [];
                        const itemsToPush = Array.isArray(evaluatedValue) ? evaluatedValue : [evaluatedValue];

                        // Add only items that don't already exist
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
                                (typeof item === 'string') ? item.replace(substring, evaluatedValue) : item
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
