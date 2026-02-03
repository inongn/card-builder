import jsyaml from 'js-yaml';

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
