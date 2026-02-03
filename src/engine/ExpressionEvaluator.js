import { formatBonus } from './helpers.js';

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

/**
 * Evaluates inline expressions like $(10 + stats.dex.mod)
 * Supports the progression() function for level-based values
 */
export class ExpressionEvaluator {
    constructor(context) {
        this.context = context || {};
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
