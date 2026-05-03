export const SUPPORTED_LOCALES = ['en', 'es'];

/** Primary: canonical URLs sin prefijo (/blog). Español en /es/... */
export const DEFAULT_LOCALE = 'en';

/** Idioma secundario (prefijo /es). */
export const SECONDARY_LOCALE = 'es';

export function normalizeLocale(input) {
  if (!input) return null;
  const lc = String(input).toLowerCase();
  const base = lc.split('-')[0];
  return SUPPORTED_LOCALES.includes(base) ? base : null;
}

