import { snackbar } from 'mdui/functions/snackbar.js';

/**
 * Parses and rolls a dice formula or signed modifier.
 * Examples:
 *  - "+4" -> rolls 1d20 + 4
 *  - "-2" -> rolls 1d20 - 2
 *  - "1d4+5" -> rolls 1d4, adds 5
 *  - "2d6-1" -> rolls 2 d6s, subtracts 1
 *  - "1d8+1d4+2" -> rolls 1d8 and 1d4, adds 2
 */
export function rollFormula(formulaStr, label = '') {
    const raw = String(formulaStr).trim();
    if (!raw) return null;

    let isD20Check = false;
    let targetStr = raw;

    // Check if it's just a signed modifier like "+4" or "-2"
    if (/^[\+\-]\d+$/.test(raw)) {
        isD20Check = true;
        const mod = parseInt(raw, 10);
        targetStr = `1d20${mod >= 0 ? '+' : ''}${mod}`;
    }

    const regex = /([\+\-]?)\s*(\d*d\d+|\d+)/gi;
    let match;
    let total = 0;
    const partsDesc = [];

    while ((match = regex.exec(targetStr)) !== null) {
        const sign = match[1] === '-' ? -1 : 1;
        const signChar = match[1] === '-' ? '-' : '+';
        const term = match[2];

        if (term.includes('d')) {
            const [countStr, sidesStr] = term.split('d');
            const count = parseInt(countStr || '1', 10);
            const sides = parseInt(sidesStr, 10);

            const rolls = [];
            for (let i = 0; i < count; i++) {
                const roll = Math.floor(Math.random() * sides) + 1;
                rolls.push(roll);
                total += sign * roll;
            }

            const prefix = partsDesc.length > 0 ? ` ${signChar} ` : (sign === -1 ? '-' : '');
            if (count === 1) {
                partsDesc.push(`${prefix}[${rolls[0]}]`);
            } else {
                partsDesc.push(`${prefix}[${rolls.join(', ')}]`);
            }
        } else {
            const val = parseInt(term, 10);
            total += sign * val;
            const prefix = partsDesc.length > 0 ? ` ${signChar} ` : (sign === -1 ? '-' : '');
            partsDesc.push(`${prefix}${val}`);
        }
    }

    const breakdown = partsDesc.join('');

    return {
        formula: raw,
        total,
        breakdown,
        label
    };
}

/**
 * Triggers roll and presents a clean, minimal single-line snackbar notification.
 */
export function triggerDiceRoll(formulaStr, label = '') {
    const result = rollFormula(formulaStr, label);
    if (!result) return;

    // Single line minimal text format: "Source (Formula): Breakdown = Total"
    const text = result.label
        ? `${result.label} (${result.formula}): ${result.breakdown} = ${result.total}`
        : `${result.formula}: ${result.breakdown} = ${result.total}`;

    try {
        snackbar({
            message: text,
            autoCloseDelay: 4000,
            closeable: true,
            placement: 'bottom-start'
        });
    } catch (err) {
        console.warn('Error opening snackbar:', err);
    }
}
