import { NextResponse } from 'next/server';
import { SUPPORTED_LOCALES } from './i18n/config';
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  preferredLocaleFromAcceptLanguage,
  readLocaleCookie,
} from './i18n/localeFromRequest';

function setLocaleCookie(res, value) {
  res.cookies.set(LOCALE_COOKIE, value, {
    path: '/',
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: 'lax',
  });
}

function isLocaleablePath(pathname) {
  if (pathname === '/' || pathname === '/blog' || pathname === '/about' || pathname === '/portfolio' || pathname === '/portafolio') return true;
  if (/^\/blog\/[^/]+$/.test(pathname)) return true;
  if (pathname === '/es' || pathname.startsWith('/es/')) {
    const rest = pathname === '/es' ? '/' : pathname.slice(3) || '/';
    return isLocaleablePath(rest);
  }
  return false;
}

export function proxy(req) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/icon') ||
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/apple-icon') ||
    pathname.startsWith('/manifest') ||
    pathname.startsWith('/robots') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/fonts') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const setLocale = req.nextUrl.searchParams.get('setLocale');
  if ((setLocale === 'en' || setLocale === 'es') && isLocaleablePath(pathname)) {
    const url = req.nextUrl.clone();
    url.searchParams.delete('setLocale');
    const segments = pathname.split('/').filter(Boolean);
    const firstSeg = segments[0];

    if (setLocale === 'en') {
      const clean =
        firstSeg === 'es'
          ? pathname === '/es'
            ? '/'
            : pathname.slice(3) || '/'
          : pathname;
      url.pathname = clean;
      const res = NextResponse.redirect(url, 307);
      setLocaleCookie(res, 'en');
      return res;
    }

    if (setLocale === 'es') {
      url.pathname =
        firstSeg === 'es' ? pathname : `/es${pathname === '/' ? '' : pathname}`;
      const res = NextResponse.redirect(url, 307);
      setLocaleCookie(res, 'es');
      return res;
    }
  }

  // /en/* → URLs canónicas sin prefijo (inglés)
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const stripped = pathname === '/en' ? '/' : pathname.slice(3) || '/';
    const url = req.nextUrl.clone();
    url.pathname = stripped;
    const res = NextResponse.redirect(url, 308);
    setLocaleCookie(res, 'en');
    return res;
  }

  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];

  if (first === 'es') {
    // Rewrite /es/portafolio → /es/portfolio (ES-localized slug)
    if (pathname === '/es/portafolio') {
      const url = req.nextUrl.clone();
      url.pathname = '/es/portfolio';
      const res = NextResponse.rewrite(url);
      setLocaleCookie(res, 'es');
      return res;
    }
    const res = NextResponse.next();
    setLocaleCookie(res, 'es');
    return res;
  }

  if (SUPPORTED_LOCALES.includes(first)) {
    return NextResponse.next();
  }

  const isLocaleable =
    pathname === '/' ||
    pathname === '/blog' ||
    pathname === '/about' ||
    pathname === '/portfolio' ||
    pathname === '/portafolio' ||
    /^\/blog\/[^/]+$/.test(pathname);

  if (isLocaleable) {
    const fromCookie = readLocaleCookie(req.cookies.get(LOCALE_COOKIE)?.value);
    const preferred =
      fromCookie ?? preferredLocaleFromAcceptLanguage(req.headers.get('accept-language'));

    if (preferred === 'es') {
      const url = req.nextUrl.clone();
      url.pathname = `/es${pathname === '/' ? '' : pathname}`;
      const res = NextResponse.redirect(url, 307);
      setLocaleCookie(res, 'es');
      return res;
    }

    const url = req.nextUrl.clone();
    url.pathname = `/en${pathname === '/' ? '' : pathname}`;
    const res = NextResponse.rewrite(url);
    setLocaleCookie(res, 'en');
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
