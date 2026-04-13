import { DEFAULT_LOCALE } from '@/i18n/config';

export function siteBaseUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://franrodgmont.com').replace(/\/$/, '');
}

/** Ruta canónica: inglés sin prefijo; español con /es. */
export function publicPath(locale, path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return p === '' ? '/' : p;
  return `/${locale}${p === '/' ? '' : p}`;
}

/** Absolute URL for a locale-aware path (e.g. `/`, `/blog`, `/blog/slug`). */
export function absolutePublicUrl(locale, path) {
  const rel = publicPath(locale, path.startsWith('/') ? path : `/${path}`);
  return `${siteBaseUrl()}${rel}`;
}

export function homePath(locale) {
  return publicPath(locale, '/');
}

export function blogPath(locale) {
  return publicPath(locale, '/blog');
}

export function aboutPath(locale) {
  return publicPath(locale, '/about');
}

export function postPath(locale, slug) {
  return publicPath(locale, `/blog/${slug}`);
}

/** Absolute URL for sharing (canonical domain). */
export function absolutePostUrl(locale, slug) {
  return absolutePublicUrl(locale, `/blog/${slug}`);
}
