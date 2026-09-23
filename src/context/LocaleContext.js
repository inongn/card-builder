import { createContext } from 'react';

export const LocaleContext = createContext({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  t: (key, fallback) => fallback || key,
  localize: (id, field, defaultVal) => defaultVal,
  formatMechanic: () => '',
  formatRecovery: (type) => type
});
