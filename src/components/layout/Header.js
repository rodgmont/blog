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
        <Link href={homePath(locale)} className="site-header__brand" style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span>Fran Rodgmont</span>
          {isPortfolio && (
            <span style={{ fontWeight: 500, fontSize: '0.78em', color: 'var(--muted)', letterSpacing: '0.01em' }}>
              {messages?.nav?.portfolio ?? 'Portfolio'}
            </span>
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
