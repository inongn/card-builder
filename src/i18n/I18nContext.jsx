import React, { createContext, useContext, useState, useCallback } from 'react';
import {
    dictionaries,
    STORAGE_KEY,
    getLocale,
    setLocaleGlobal,
    translate,
    subscribeLocaleChange
} from './i18nCore';

export {
    dictionaries,
    STORAGE_KEY,
    getLocale,
    setLocaleGlobal,
    translate,
    subscribeLocaleChange
};

export const I18nContext = createContext({
    locale: 'en',
    setLocale: () => {},
    t: (path, fallback) => translate(path, 'en', fallback),
    availableLocales: ['en', 'es']
});

export const I18nProvider = ({ children }) => {
    const [locale, setLocaleState] = useState(getLocale);

    const setLocale = useCallback((newLocale) => {
        setLocaleGlobal(newLocale);
        setLocaleState(newLocale);
    }, []);

    const t = useCallback((path, fallback) => {
        return translate(path, locale, fallback);
    }, [locale]);

    return (
        <I18nContext.Provider value={{ locale, setLocale, t, availableLocales: ['en', 'es'] }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => useContext(I18nContext);
