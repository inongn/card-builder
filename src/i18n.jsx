import React, { useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { LocaleContext } from './context/LocaleContext.js';
import enUi from './locales/en/ui.json';
import esUi from './locales/es/ui.json';
import { formatActivityMechanic as formatMechanicEn } from './utils/mechanicFormatter.js';
import { formatActivityMechanicEs, setMechanicFormatterEsTranslations } from './utils/mechanicFormatterEs.js';

export { LocaleContext };

const UI_LOCALES = {
  en: enUi,
  es: esUi
};

const dataCache = {};

export const LocaleProvider = ({ children }) => {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem('aspida_locale') || 'en';
    } catch {
      return 'en';
    }
  });

  const [dataTranslations, setDataTranslations] = useState(() => dataCache[lang] || {});

  const setLang = useCallback((newLang) => {
    const validLang = newLang === 'es' ? 'es' : 'en';
    setLangState(validLang);
    try {
      localStorage.setItem('aspida_locale', validLang);
    } catch (e) {
      console.warn('Failed to persist locale:', e);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'en' ? 'es' : 'en');
  }, [lang, setLang]);

  // Load database locale translations for the active language
  useEffect(() => {
    if (dataCache[lang]) {
      setDataTranslations(dataCache[lang]);
      if (lang === 'es') {
        setMechanicFormatterEsTranslations(dataCache['es']);
      }
      return;
    }

    let isCurrent = true;
    const baseUrl = import.meta.env.BASE_URL || '/';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    const dataUrl = `${cleanBase}locales/${lang}/data.json`;

    fetch(dataUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then(json => {
        dataCache[lang] = json;
        if (lang === 'es') {
          setMechanicFormatterEsTranslations(json);
        }
        if (isCurrent) {
          setDataTranslations(json);
        }
      })
      .catch(err => {
        console.warn(`Could not load data translations for ${lang}:`, err);
        if (isCurrent) {
          setDataTranslations({});
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [lang]);

  // UI translation lookup with dot notation (e.g. "dashboard.newCharacter")
  const t = useCallback((key, fallback = '') => {
    if (!key) return fallback;
    const parts = key.split('.');
    
    // Check current locale
    let curr = UI_LOCALES[lang];
    for (const part of parts) {
      if (curr && typeof curr === 'object' && part in curr) {
        curr = curr[part];
      } else {
        curr = undefined;
        break;
      }
    }
    if (curr !== undefined) return curr;

    // Fallback to English
    if (lang !== 'en') {
      let enVal = UI_LOCALES.en;
      for (const part of parts) {
        if (enVal && typeof enVal === 'object' && part in enVal) {
          enVal = enVal[part];
        } else {
          enVal = undefined;
          break;
        }
      }
      if (enVal !== undefined) return enVal;
    }

    return fallback || key;
  }, [lang]);

  // Database field localization (name, summary, description)
  const localize = useCallback((id, field, defaultVal) => {
    if (!id || !field) return defaultVal;
    const entry = dataTranslations[id];
    if (entry && entry[field]) {
      return entry[field];
    }
    return defaultVal;
  }, [dataTranslations]);

  // Mechanic formatter based on active language
  const formatMechanic = useCallback((activity, characterData) => {
    if (lang === 'es') {
      return formatActivityMechanicEs(activity, characterData, dataTranslations);
    }
    return formatMechanicEn(activity, characterData);
  }, [lang, dataTranslations]);

  // Recovery code translation (LR -> DL, SR -> DC)
  const formatRecovery = useCallback((code) => {
    if (!code) return '';
    const upper = String(code).toUpperCase();
    if (lang === 'es') {
      if (upper === 'LR') return 'DL';
      if (upper === 'SR') return 'DC';
    }
    return upper;
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    toggleLang,
    t,
    localize,
    formatMechanic,
    formatRecovery
  }), [lang, setLang, toggleLang, t, localize, formatMechanic, formatRecovery]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => useContext(LocaleContext);
export const useMechanicFormatter = () => {
  const { formatMechanic } = useLocale();
  return formatMechanic;
};
