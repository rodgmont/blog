'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconX } from '@/components/shared/SocialIcons';
import { DEFAULT_LOCALE } from '@/i18n/config';
import { aboutPath, blogPath, homePath } from '@/lib/paths';

export default function Header({ locale = DEFAULT_LOCALE, messages }) {
  const pathname = usePathname() || '';
  const isPortfolio = pathname.includes('/portfolio') || pathname.includes('/portafolio');

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link href={homePath(locale)} className="site-header__brand" style={{ display: 'flex', alignItems: 'baseline', gap: '0' }}>
          {/* Nombre principal — siempre en bold (700 heredado de .site-header__brand) */}
          <span>Fran Rodgmont</span>

          {/* Subtítulo "Portfolio / Portafolio" — solo visible en rutas /portfolio y /portafolio */}
          {isPortfolio && (
            <>
              {/* Separador visual estilo editorial */}
              <span aria-hidden="true" style={{ fontWeight: 300, color: 'var(--muted)', margin: '0 6px', fontSize: '0.85em' }}>·</span>
              {/* Etiqueta ligera: font-weight 300 para diferenciarse del nombre sin desaparecer */}
              <span style={{ fontWeight: 300, fontSize: '0.85em', color: 'var(--muted)', letterSpacing: '0.02em' }}>
                {messages?.nav?.portfolio ?? 'Portfolio'}
              </span>
            </>
          )}
        </Link>

        <nav className="site-header__nav" aria-label="Main">
          <Link href={aboutPath(locale)} className="site-header__link text-muted">
            {messages?.nav?.about ?? 'About'}
          </Link>
          <a
            href="https://twitter.com/rodgmont"
            target="_blank"
            rel="noopener noreferrer"
            className="site-header__link site-header__follow text-muted no-fade"
            aria-label="X (Twitter) — @rodgmont"
          >
            <IconX size={17} />
            <span className="site-header__follow-text">{messages?.nav?.followMe ?? 'Follow me'}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
