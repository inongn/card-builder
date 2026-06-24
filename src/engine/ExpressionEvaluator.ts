import { formatBonus } from './helpers.js';
import { CharacterData } from './types.js';

// ============================================================================
// EXPRESSION CACHE - Avoid recompiling the same expressions
// ============================================================================

const EXPRESSION_CACHE = new Map<string, Function>();
const MAX_CACHE_SIZE = 2000;

function getCachedFunction(expr: string): Function | null {
    if (EXPRESSION_CACHE.has(expr)) {
        return EXPRESSION_CACHE.get(expr)!;
    }

    try {
        const fn = new Function(
            'stats', 'attributes', 'meta', 'skills', 'saves', 'activities', 'progression', 'local', 'formatBonus', 'formatObject', 'capitalize',
            `return ${expr}`
        );

        // Limit cache size to prevent memory bloat
        if (EXPRESSION_CACHE.size >= MAX_CACHE_SIZE) {
            const firstKey = EXPRESSION_CACHE.keys().next().value;
            if (firstKey !== undefined) {
                EXPRESSION_CACHE.delete(firstKey);
            }
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

/**
 * Evaluates inline expressions like $(10 + stats.dex.mod)
 * Supports the progression() function for level-based values
 */
export class ExpressionEvaluator {
    private context: Partial<CharacterData>;

    constructor(context?: Partial<CharacterData>) {
        this.context = context || {};
    }

    /**
     * progression() function for level-based progression
     */
    progression(...values: any[]): any {
        const level = this.context.meta?.['level'] || 1;
        const list = (values.length === 1 && Array.isArray(values[0])) ? values[0] : values;
        return list[Math.min(level - 1, list.length - 1)] || 0;
    }

    /**
     * Bakes local variables into an expression string by replacing local.key with its value.
     * This allows deferred expressions to retain their context once flattened into characterData.
     */
    bakeVariables(val: any, scope: Record<string, any> = {}): any {
        if (val === null || val === undefined) return val;

        // Recursively handle arrays
        if (Array.isArray(val)) {
            return val.map(item => this.bakeVariables(item, scope));
        }

        // Recursively handle objects
        if (typeof val === 'object') {
            const result: Record<string, any> = {};
            for (const key in val) {
                if (Object.prototype.hasOwnProperty.call(val, key)) {
                    result[key] = this.bakeVariables(val[key], scope);
                }
            }
            return result;
        }

        // Base case: strings that might contain local variables
        if (typeof val !== 'string' || !val.includes('local.')) return val;

        // Robust replacement handling nested paths (e.g. local.stats.str) 
        // and avoiding baking objects which breaks JS expressions.
        return val.replace(/local\.([\w.]+)\b/g, (match, path) => {
            const parts = path.split('.');
            let current: any = scope;
            let i = 0;
            for (; i < parts.length; i++) {
                const part = parts[i];
                if (current && typeof current === 'object' && Object.prototype.hasOwnProperty.call(current, part)) {
                    current = current[part];
                } else {
                    break;
                }
            }

            // Only substitute if we matched segments
            if (i > 0) {
                // If it's an object/array, we MUST NOT bake it if there are more parts,
                // and even as a leaf it's usually better to let the JS engine handle it.
                if (typeof current === 'object' && current !== null) {
                    return match;
                }

                // Prepare replacement for the matched segment
                let replacement = current;
                if (typeof current === 'string' && !current.includes('$')) {
                    // Wrap strings in quotes for safety inside expressions
                    replacement = `'${current}'`;
                } else if (current === null) {
                    replacement = "";
                }

                // If we didn't consume all matched parts (e.g. local.foo.charAt),
                // only replace the consumed prefix and append the rest as-is.
                if (i < parts.length) {
                    return replacement + '.' + parts.slice(i).join('.');
                }
                return replacement;
            }

            // For unresolved paths, keep the original string
            return match;
        });
    }

    /**
     * Helper to format an object into a string based on a template.
     * Useful for skills, senses, and movement.
     */
    formatObject(obj: any, template: string, separator: string = ', '): string {
        if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return "";
        return Object.entries(obj)
            .map(([key, value]) => {
                return template
                    .replace(/\{key\}/g, key)
                    .replace(/\{value\}/g, value as string)
                    .replace(/\{bonus\}/g, formatBonus(value as number))
                    .replace(/\{Title\}/g, key.charAt(0).toUpperCase() + key.slice(1));
            })
            .join(separator);
    }

    /**
     * Helper to capitalize first letter
     */
    capitalize(str: string): string {
        if (!str || typeof str !== 'string') return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Evaluate an expression string with optional scope variables
     */
    evaluate(expr: any, scope: Record<string, any> = {}): any {
        if (typeof expr !== 'string') return expr;

        // Support local.key even without $() wrapper for simplicity
        if (!expr.includes('$')) {
            if (expr.includes('local.')) {
                return this.bakeVariables(expr, scope);
            }
            return expr;
        }

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
                    formatBonus,
                    this.formatObject.bind(this),
                    this.capitalize.bind(this)
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

            if (!isNaN(trimmed as any) && !trimmed.includes(' ') && !trimmed.includes('\n')) {
                return Number(trimmed);
            }
        }

        return result;
    }
}
