import { formatActivityMechanic as formatActivityMechanicEn } from './mechanicFormatterEn.js';
import { formatActivityMechanic as formatActivityMechanicEs } from './mechanicFormatterEs.js';
import { getLocale } from '../i18n/i18nCore.js';

/**
 * Universal Activity Mechanic Formatter
 * Routes to English or Spanish engine based on active locale or options.lang
 */
export function formatActivityMechanic(activity, characterData, options = {}) {
    const lang = options?.lang || (typeof getLocale === 'function' ? getLocale() : 'en') || 'en';
    if (lang === 'es') {
        return formatActivityMechanicEs(activity, characterData, options);
    }
    return formatActivityMechanicEn(activity, characterData, options);
}

export { formatActivityMechanicEn, formatActivityMechanicEs };
