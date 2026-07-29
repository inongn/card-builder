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
export function rollFormula(formulaStr, label = '', options = null) {
    const raw = String(formulaStr).trim();
    if (!raw) return null;

    let targetStr = raw;
    let mod = 0;
    let isSignedMod = false;

    // Check if it's just a signed modifier like "+4" or "-2"
    if (/^[\+\-]\d+$/.test(raw)) {
        isSignedMod = true;
        mod = parseInt(raw, 10);
        targetStr = `1d20${mod >= 0 ? '+' : ''}${mod}`;
    }

    const regex = /([\+\-]?)\s*(\d*d\d+|\d+)/gi;
    let match;
    let total = 0;
    const partsDesc = [];
    let isFirstD20 = true;

    const { adv, dis, min } = options || {};
    const hasAdv = adv && !dis;
    const hasDis = dis && !adv;

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
                let roll1 = Math.floor(Math.random() * sides) + 1;
                let roll2 = null;
                let selectedRoll = roll1;

                // Apply advantage/disadvantage to d20 rolls
                if (sides === 20 && isFirstD20 && (hasAdv || hasDis)) {
                    isFirstD20 = false;
                    roll2 = Math.floor(Math.random() * sides) + 1;
                    if (hasAdv) {
                        selectedRoll = Math.max(roll1, roll2);
                    } else if (hasDis) {
                        selectedRoll = Math.min(roll1, roll2);
                    }
                }

                // Apply minimum threshold rule if present
                let minApplied = false;
                if (min && typeof min === 'number' && selectedRoll < min) {
                    selectedRoll = min;
                    minApplied = true;
                }

                rolls.push({ roll1, roll2, selectedRoll, minApplied });
                total += sign * selectedRoll;
            }

            const prefix = partsDesc.length > 0 ? ` ${signChar} ` : (sign === -1 ? '-' : '');
            const rollDescs = rolls.map(r => {
                if (r.roll2 !== null) {
                    const tag = hasAdv ? 'ADV' : 'DIS';
                    const baseStr = `${r.roll1}, ${r.roll2} -> ${r.selectedRoll} (${tag})`;
                    return r.minApplied ? `${baseStr} [min ${min}]` : baseStr;
                }
                return r.minApplied ? `${r.roll1} -> ${r.selectedRoll} [min ${min}]` : `${r.selectedRoll}`;
            });

            if (count === 1) {
                partsDesc.push(`${prefix}[${rollDescs[0]}]`);
            } else {
                partsDesc.push(`${prefix}[${rollDescs.join('; ')}]`);
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
export function triggerDiceRoll(formulaStr, label = '', options = null) {
    const result = rollFormula(formulaStr, label, options);
    if (!result) return;

    // Show only the source (label) and total result (or formula and total if no label)
    const text = result.label
        ? `${result.label}: ${result.total}`
        : `${result.formula}: ${result.total}`;

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
