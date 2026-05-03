'use client';

import { useEffect, useState } from 'react';
import { formatCountDigits, formatSharesCount } from '@/lib/formatViews';
import { Share2 } from 'lucide-react';
import { IconX, IconLinkedin } from '@/components/shared/SocialIcons';

const EVENT = 'blog-shares-updated';

/** Contador junto a las vistas; se actualiza al usar los botones de compartir abajo. */
export function ArticleSharesBylineCount({ slug, locale, initial, baseline }) {
  const [count, setCount] = useState(initial ?? baseline ?? 0);

  useEffect(() => {
    const handler = (e) => {
      if (e.detail?.slug === slug && typeof e.detail.count === 'number') {
        setCount(e.detail.count);
      }
    };
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, [slug]);

  const label = formatSharesCount(count, locale);
  const digits = formatCountDigits(count, locale);

  return (
    <span className="article-byline-stat">
      <span className="article-byline-stat__sr-only">{label}</span>
      <span className="article-byline-stat__text text-muted" aria-hidden="true">
        {label}
      </span>
      <span className="article-byline-stat__icon-row text-muted" aria-hidden="true">
        <Share2 className="article-byline-stat__icon" size={15} strokeWidth={2} aria-hidden />
        <span className="article-byline-stat__num">{digits}</span>
      </span>
    </span>
  );
}

export function ArticleTrackedShareLinks({ slug, locale, title, postUrl, shareHeading }) {
  async function recordShare() {
    try {
      const res = await fetch(
        `/api/shares/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`,
        { method: 'POST' }
      );
      const data = await res.json();
      if (typeof data?.count === 'number') {
        window.dispatchEvent(new CustomEvent(EVENT, { detail: { slug, count: data.count } }));
      }
    } catch {
      // ignore
    }
  }

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(postUrl)}`;
  const inUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;

  return (
    <div style={{ marginTop: '60px', paddingTop: '32px', borderTop: '1px solid var(--glass-border)' }}>
      <p style={{ fontSize: '0.85rem', marginBottom: '16px' }} className="text-muted">
        {shareHeading}
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={async (e) => {
            e.preventDefault();
            await recordShare();
            window.open(xUrl, '_blank', 'noopener,noreferrer');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            border: '1px solid var(--glass-border)',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            color: 'var(--muted)',
          }}
        >
          <IconX size={15} /> X (Twitter)
        </a>
        <a
          href={inUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={async (e) => {
            e.preventDefault();
            await recordShare();
            window.open(inUrl, '_blank', 'noopener,noreferrer');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            border: '1px solid var(--glass-border)',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            color: 'var(--muted)',
          }}
        >
          <IconLinkedin size={15} /> LinkedIn
        </a>
      </div>
    </div>
  );
}
