/**
 * Formats a number as a bonus string (e.g. +5, -2, 0)
 */
export const formatBonus = (value: number | string | undefined, alwaysShow = false): string => {
    if (typeof value === 'number') {
        const num = Number(value);
        if (isNaN(num)) return String(value);
        if (num === 0) return alwaysShow ? '+0' : '';
        return num > 0 ? `+${num}` : `${num}`;
    }
    return value !== undefined ? String(value) : '';
};

/**
 * Generic boolean expression evaluator
 * Supports AND, OR, NOT, ( ), and implicit AND
 * @param expression - The query string (e.g. "a AND (b OR c)")
 * @param matcher - Function that takes a token and returns boolean
 */
export const evaluateBoolean = (expression: string, matcher: (token: string) => boolean): boolean => {
    if (!expression) return true;

    const tokens = expression
        .replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ')
        .replace(/,/g, ' OR ')
        .split(/\s+/)
        .filter(t => t.trim());

    let pos = 0;

    const parseExpression = (): boolean => {
        let result = parseTerm();
        while (pos < tokens.length && tokens[pos].toUpperCase() === 'OR') {
            pos++;
            const right = parseTerm();
            result = result || right;
        }
        return result;
    };

    const parseTerm = (): boolean => {
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

    const parseFactor = (): boolean => {
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
export const splitDescription = (description: string | string[] | undefined): { description: string | string[] | null; extra: string[] } => {
    if (!description) return { description: null, extra: [] };

    const lines = Array.isArray(description) ? description : String(description).split('\n');
    const desc: string[] = [];
    const extra: string[] = [];

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
