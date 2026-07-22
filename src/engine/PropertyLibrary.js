import jsyaml from 'js-yaml';

/**
 * Loads and indexes all properties from data files
 */
export class PropertyLibrary {
    constructor() {
        this.properties = new Map(); // id -> parsed property
        this.rawStore = new Map(); // id -> raw string (mostly used for hot updates)
        this.byTag = new Map(); // tag -> id[]
        this.paths = new Map(); // id -> full path
    }

    /**
     * Load the pre-bundled JSON database
     */
    async loadFromData() {
        try {
            console.log('Fetching database...');
            const response = await fetch(`${import.meta.env.BASE_URL}db.json`);
            if (!response.ok) throw new Error('Failed to load db.json');

            const db = await response.json();
            console.log(`Loaded ${db.length} properties from database.`);

            db.forEach(prop => {
                if (prop.id) {
                    this.addParsedProperty(prop);
                }
            });
        } catch (e) {
            console.error('Error loading property database:', e);
            // Fallback to old behavior or empty state
        }
    }

    /**
     * Add a pre-parsed property to the library
     */
    addParsedProperty(property, path = null) {
        const id = property.id;

        // Auto-generate name and description if missing
        if (!property.name) property.name = id;
        if (!property.description) property.description = '';

        this.properties.set(id, property);
        if (path) this.paths.set(id, path);

        if (property.tags) {
            const tags = Array.isArray(property.tags) ? property.tags : [property.tags];
            tags.forEach(tag => {
                if (!this.byTag.has(tag)) this.byTag.set(tag, []);
                if (!this.byTag.get(tag).includes(id)) {
                    this.byTag.get(tag).push(id);
                }
            });
        }
    }

    /**
     * Reload or update a property from new raw content (Hot Module Replacement)
     */
    reloadProperty(id, content, path = null) {
        try {
            const property = jsyaml.load(content);
            property.id = property.id || id;

            // Clear old parsed cache and tags
            this.properties.delete(id);
            this.byTag.forEach((ids) => {
                const index = ids.indexOf(id);
                if (index !== -1) ids.splice(index, 1);
            });

            // Re-process
            this.addParsedProperty(property, path);
        } catch (e) {
            console.error('Error hot-reloading property:', id, e);
        }
    }

    /**
     * Get property by ID
     */
    getProperty(id) {
        return this.properties.get(id) || null;
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
                const all = new Set(this.properties.keys());
                right.forEach(id => all.delete(id));
                return all;
            }

            pos++;

            // 1. Check if token is an operator check: key<=val
            const operatorMatch = token.match(/^([^>=<!]+)(>=|<=|>|<|=)(.+)$/);
            if (operatorMatch) {
                const [_, key, operator, rawValue] = operatorMatch;
                const expectedValue = rawValue.replace(/^['"]|['"]$/g, '');
                const matches = new Set();

                for (const [id, prop] of this.properties) {
                    const actualValue = this._getPropertyValue(prop, key);

                    const val1 = (isNaN(actualValue) || actualValue === "" || actualValue === null || actualValue === undefined) ? actualValue : Number(actualValue);
                    const val2 = (isNaN(expectedValue) || expectedValue === "" || expectedValue === null) ? expectedValue : Number(expectedValue);

                    let result = false;
                    switch (operator) {
                        case '>=': result = val1 >= val2; break;
                        case '<=': result = val1 <= val2; break;
                        case '>': result = val1 > val2; break;
                        case '<': result = val1 < val2; break;
                        case '=': result = String(val1 ?? '') === String(val2); break;
                    }
                    if (result) matches.add(id);
                }
                return matches;
            }

            // 2. Check if token is a property path (e.g. movement.fly)
            if (token.includes('.')) {
                const matches = new Set();
                for (const [id, prop] of this.properties) {
                    if (this._getPropertyValue(prop, token)) {
                        matches.add(id);
                    }
                }
                return matches;
            }

            // 3. Fallback to tags or ID
            const matches = new Set(this.byTag.get(token) || []);
            if (this.properties.has(token)) matches.add(token);
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

    /**
     * Helper to get a property value from a nested path
     */
    _getPropertyValue(obj, path) {
        if (!obj || !path) return undefined;
        const parts = path.split('.');
        let current = obj;
        for (const part of parts) {
            if (current === null || current === undefined) return undefined;
            current = current[part];
        }
        return current;
    }
}
