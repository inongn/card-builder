import en from './locales/en.json' with { type: 'json' };
import es from './locales/es.json' with { type: 'json' };

export const dictionaries = { en, es };
export const STORAGE_KEY = 'aspida_locale';

let currentLocale = 'en';
try {
    if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved && dictionaries[saved]) {
            currentLocale = saved;
        }
    }
} catch (e) {
    // ignore
}

const listeners = new Set();

export function getLocale() {
    return currentLocale;
}

export function setLocaleGlobal(newLocale) {
    if (!dictionaries[newLocale] || newLocale === currentLocale) return;
    currentLocale = newLocale;
    try {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, newLocale);
        }
    } catch (e) {
        // ignore
    }
    listeners.forEach(fn => fn(newLocale));
}

export function translate(path, locale = currentLocale, fallback = '') {
    const dict = dictionaries[locale] || dictionaries.en;
    const parts = path.split('.');
    let val = dict;
    for (const p of parts) {
        if (val && typeof val === 'object' && p in val) {
            val = val[p];
        } else {
            val = undefined;
            break;
        }
    }
    if (val !== undefined && typeof val === 'string') {
        return val;
    }

    // Fallback to English
    if (locale !== 'en') {
        let enVal = dictionaries.en;
        for (const p of parts) {
            if (enVal && typeof enVal === 'object' && p in enVal) {
                enVal = enVal[p];
            } else {
                enVal = undefined;
                break;
            }
        }
        if (enVal !== undefined && typeof enVal === 'string') {
            return enVal;
        }
    }

    return fallback || path;
}

export function subscribeLocaleChange(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
}
