import { DEFAULT_LOCALE, SECONDARY_LOCALE } from './config';

/** Max-Age 1 year (seconds). */
export const LOCALE_COOKIE = 'blog_locale';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/**
 * Compares best q-value for es vs en. Ties → English (default).
 */
export function preferredLocaleFromAcceptLanguage(header) {
  if (!header || typeof header !== 'string') return DEFAULT_LOCALE;
  let esQ = 0;
  let enQ = 0;
  for (const part of header.split(',')) {
    const [tag, ...params] = part.trim().split(';');
    const base = tag.trim().toLowerCase().split('-')[0];
    let q = 1;
    for (const p of params) {
      const [k, v] = p.trim().split('=').map((s) => s.trim());
      if (k === 'q') q = Math.min(1, Math.max(0, parseFloat(v) || 0));
    }
    if (base === 'es') esQ = Math.max(esQ, q);
    if (base === 'en') enQ = Math.max(enQ, q);
  }
  if (esQ > enQ) return SECONDARY_LOCALE;
  return DEFAULT_LOCALE;
}

export function readLocaleCookie(cookieValue) {
  if (cookieValue === 'es' || cookieValue === 'en') return cookieValue;
  return null;
}
