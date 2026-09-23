import { ExpressionEvaluator } from '../engine/ExpressionEvaluator.js';

export const DAMAGE_TYPES_ES = {
    acid: 'Ácido',
    bludgeoning: 'Contundente',
    cold: 'Frío',
    fire: 'Fuego',
    force: 'Fuerza',
    lightning: 'Relámpago',
    necrotic: 'Necrótico',
    piercing: 'Perforante',
    poison: 'Veneno',
    psychic: 'Psíquico',
    radiant: 'Radiante',
    slashing: 'Cortante',
    thunder: 'Trueno'
};

export const CONDITIONS_ES = {
    blinded: 'Cegado',
    charmed: 'Hechizado',
    deafened: 'Ensordecido',
    frightened: 'Asustado',
    grappled: 'Agarrado',
    incapacitated: 'Incapacitado',
    invisible: 'Invisible',
    paralyzed: 'Paralizado',
    petrified: 'Petrificado',
    poisoned: 'Envenenado',
    prone: 'Derribado',
    restrained: 'Apresado',
    stunned: 'Aturdido',
    unconscious: 'Inconsciente',
    exhaustion: 'Agotamiento'
};

export const SENSES_ES = {
    darkvision: 'Visión en la oscuridad',
    blindsight: 'Vista ciega',
    tremorsense: 'Sentido del temblor',
    truesight: 'Visión verdadera'
};

export const MOVEMENT_ES = {
    fly: 'Vuelo',
    swim: 'Nado',
    climb: 'Escalada',
    burrow: 'Excavación',
    walk: 'Caminar'
};

/**
 * Strips title prefixes/suffixes to extract the core subclass name (works for EN and ES)
 */
export function cleanSubclassName(name) {
    if (!name || typeof name !== 'string') return name;

    let clean = name.trim();

    const prefixes = [
        /^Path of (the )?/i,
        /^College of (the )?/i,
        /^Circle of (the )?/i,
        /^Warrior of (the )?/i,
        /^Oath of (the )?/i,
        /^Patron (the )?/i,
        /^(the )?Patron of (the )?/i,
        // Spanish prefixes
        /^Senda de(l| los| las)?\s+/i,
        /^Colegio de(l| los| las)?\s+/i,
        /^C[íi]rculo de(l| la| los| las)?\s+/i,
        /^Guerrero de(l| la| los| las)?\s+/i,
        /^Juramento de(l| la| los| las)?\s+/i,
        /^Patr[oó]n de(l| la| los| las)?\s+/i,
        /^Dominio de(l| la)?\s+/i
    ];

    for (const prefix of prefixes) {
        clean = clean.replace(prefix, '');
    }

    clean = clean
        .replace(/\s+Domain$/i, '')
        .replace(/^Domain\s+/i, '')
        .replace(/\s+Patron$/i, '')
        .replace(/^Patron\s+/i, '')
        .replace(/\s+Sorcery$/i, '')
        .replace(/^Sorcery\s+/i, '')
        .replace(/\s+Dominio$/i, '')
        .replace(/^Dominio\s+/i, '')
        .replace(/\s+Patr[oó]n$/i, '')
        .replace(/^Patr[oó]n\s+/i, '')
        .replace(/\s+Hechicer[íi]a$/i, '')
        .replace(/^Hechicer[íi]a\s+/i, '')
        .trim();

    if (clean.length > 0) {
        clean = clean.charAt(0).toUpperCase() + clean.slice(1);
    }

    return clean;
}

/**
 * Converts a string to camelCase, safely stripping apostrophes first (e.g. "Thieves' Tools" -> "thievesTools")
 */
export function toCamelCase(str) {
    if (!str || typeof str !== 'string') return '';
    return str
        .replace(/['’]/g, '')
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
        .replace(/^[A-Z]/, c => c.toLowerCase());
}

/**
 * Localizes a subclass name, attempting subId, camelCase, cleaned name, and lowercased lookups.
 */
export function localizeSubclass(subName, subId, localize, lang) {
    if (!subName && !subId) return '';
    if (lang !== 'es' || !localize) return subName ? cleanSubclassName(subName) : '';

    if (subId) {
        const byId = localize(subId, 'name');
        if (byId && byId !== subId) {
            return cleanSubclassName(byId);
        }
    }

    if (!subName) return '';

    const camel = toCamelCase(subName);
    const byCamel = localize(camel, 'name');
    if (byCamel && byCamel !== camel) {
        return cleanSubclassName(byCamel);
    }

    const cleaned = cleanSubclassName(subName);
    const cleanedCamel = toCamelCase(cleaned);
    const byCleanedCamel = localize(cleanedCamel, 'name');
    if (byCleanedCamel && byCleanedCamel !== cleanedCamel) {
        return cleanSubclassName(byCleanedCamel);
    }

    const byLower = localize(subName.toLowerCase(), 'name');
    if (byLower && byLower !== subName.toLowerCase()) {
        return cleanSubclassName(byLower);
    }

    const byCleanedLower = localize(cleaned.toLowerCase(), 'name');
    if (byCleanedLower && byCleanedLower !== cleaned.toLowerCase()) {
        return cleanSubclassName(byCleanedLower);
    }

    return cleaned;
}

function cleanPrefix(str) {
    if (!str || typeof str !== 'string') return str;
    let s = str
        .replace(/^Resistencia a(l| la)?\s+/i, '')
        .replace(/^Inmunidad a(l| la)?\s+/i, '')
        .replace(/^Ventaja en (estado )?/i, '')
        .replace(/^Ventaja en\s+/i, '')
        .trim();
    if (s.length > 0) s = s.charAt(0).toUpperCase() + s.slice(1);
    return s;
}

/**
 * Localizes an item from the passive infobox (tools, resistances, immunities, advantages).
 */
export function localizeInfoboxValue(val, category, localize, lang) {
    if (!val || lang !== 'es' || !localize) return val;
    if (typeof val !== 'string') return val;

    const trimmed = val.trim();
    const lower = trimmed.toLowerCase();
    const camel = toCamelCase(trimmed);

    if (category === 'tools') {
        const toolData = localize(camel, 'name') || localize(lower, 'name');
        if (toolData && toolData !== camel) return toolData;
        if (camel === 'thievesTools') return 'Herramientas de ladrón';
        return trimmed;
    }

    if (category === 'resistances') {
        const type = lower.replace(/\s+damage$/i, '').trim();
        const resEntry = localize(`${type}Resistance`, 'name');
        if (resEntry && resEntry !== `${type}Resistance`) return cleanPrefix(resEntry);
        if (DAMAGE_TYPES_ES[type]) return DAMAGE_TYPES_ES[type];
        return trimmed;
    }

    if (category === 'immunities') {
        const isDamage = lower.endsWith(' damage');
        if (isDamage) {
            const type = lower.replace(/\s+damage$/i, '').trim();
            const immEntry = localize(`${type}Immunity`, 'name');
            if (immEntry && immEntry !== `${type}Immunity`) return cleanPrefix(immEntry);
            if (DAMAGE_TYPES_ES[type]) return `Daño ${DAMAGE_TYPES_ES[type].toLowerCase()}`;
        }
        const condType = lower.replace(/^(state\s+|cond\s+)/i, '').trim();
        if (CONDITIONS_ES[condType]) return CONDITIONS_ES[condType];
        const immCondEntry = localize(`${toCamelCase(condType)}Immunity`, 'name');
        if (immCondEntry && immCondEntry !== `${toCamelCase(condType)}Immunity`) return cleanPrefix(immCondEntry);
        return trimmed;
    }

    if (category === 'advantages') {
        if (lower === 'death saves' || lower === 'deathsaves') {
            const ds = localize('deathSaveAdvantage', 'name');
            if (ds && ds !== 'deathSaveAdvantage') return cleanPrefix(ds);
            return 'Tirada de salvación contra muerte';
        }
        if (CONDITIONS_ES[lower]) return CONDITIONS_ES[lower];
        const advEntry = localize(`${camel}Advantage`, 'name');
        if (advEntry && advEntry !== `${camel}Advantage`) return cleanPrefix(advEntry);
        return trimmed;
    }

    return trimmed;
}

/**
 * Localizes senses and movement keys and values for display in passive infobox.
 */
export function localizeSenseOrMovement(key, value, category, localize, lang) {
    if (lang !== 'es') {
        const label = key.charAt(0).toUpperCase() + key.slice(1);
        const unit = typeof value === 'number' ? ' ft' : '';
        return `${label} (${value}${unit})`;
    }

    if (category === 'senses') {
        const label = SENSES_ES[key.toLowerCase()] || (localize && localize(key.toLowerCase(), 'name')) || (key.charAt(0).toUpperCase() + key.slice(1));
        const unit = typeof value === 'number' ? ' pies' : '';
        return `${label} (${value}${unit})`;
    }

    if (category === 'movement') {
        const label = MOVEMENT_ES[key.toLowerCase()] || (key.charAt(0).toUpperCase() + key.slice(1));
        const unit = typeof value === 'number' ? ' pies' : '';
        return `${label} (${value}${unit})`;
    }

    const label = key.charAt(0).toUpperCase() + key.slice(1);
    const unit = typeof value === 'number' ? ' pies' : '';
    return `${label} (${value}${unit})`;
}

/**
 * Evaluates inline dynamic expressions like $(Math.floor(...)) inside localized text.
 */
export function evaluateText(text, context) {
    if (!text || typeof text !== 'string') return text;
    if (!text.includes('$') && !text.includes('local.')) return text;
    try {
        const evaluator = new ExpressionEvaluator(context || {});
        return String(evaluator.evaluate(text));
    } catch (e) {
        return text;
    }
}
