'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { DEFAULT_LOCALE } from '@/i18n/config';

const HTML_LANG = { es: 'es', en: 'en' };

export default function DocumentLang() {
  const pathname = usePathname();

  useEffect(() => {
    const first = pathname.split('/').filter(Boolean)[0];
    const code = first === 'es' ? 'es' : DEFAULT_LOCALE;
    document.documentElement.lang = HTML_LANG[code] ?? HTML_LANG.en;
  }, [pathname]);

  return null;
}
