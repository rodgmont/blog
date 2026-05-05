'use client';

import { usePathname } from 'next/navigation';
import { Languages } from 'lucide-react';

/** Ruta pública equivalente en el otro idioma (pathname real del navegador). */
export function pathForOtherLocale(pathname, targetLocale) {
  const segs = pathname.split('/').filter(Boolean);
  let rest = pathname;
  if (segs[0] === 'es') {
    rest = segs.length > 1 ? `/${segs.slice(1).join('/')}` : '/';
  }
  // Map ES slug /portafolio → EN slug /portfolio
  if (rest === '/portafolio') rest = '/portfolio';

  if (targetLocale === 'es') {
    if (rest === '/' || rest === '') return '/es';
    // Map EN slug /portfolio → ES slug /portafolio
    if (rest === '/portfolio') return '/es/portafolio';
    return `/es${rest}`;
  }
  return rest === '' ? '/' : rest;
}

/**
 * Icono discreto. Usa ?setLocale= para que el middleware fije la cookie en el servidor
 * (fiable en Vercel; el cliente solo con cookie a veces pierde la carrera con el middleware).
 */
export default function LanguageSwitch({ locale }) {
  const pathname = usePathname() || '/';
  const other = locale === 'es' ? 'en' : 'es';
  const base = pathForOtherLocale(pathname, other);
  const qs = base.includes('?') ? '&' : '?';
  const href = `${base}${qs}setLocale=${other}`;
  const label =
    other === 'en' ? 'Switch to English' : 'Cambiar a español';

  return (
    <a
      href={href}
      className="site-lang-btn text-muted no-fade"
      aria-label={label}
      title={label}
    >
      <Languages size={18} strokeWidth={1.65} aria-hidden />
    </a>
  );
}
