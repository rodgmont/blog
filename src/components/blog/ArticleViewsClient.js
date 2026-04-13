'use client';

import { useEffect, useState } from 'react';
import { formatCountDigits, formatViewsCount } from '@/lib/formatViews';
import { Eye } from 'lucide-react';

export default function ArticleViewsClient({ slug, locale, baseline, initial }) {
  const [count, setCount] = useState(initial ?? baseline ?? 0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/views/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`,
          { method: 'POST' }
        );
        const data = await res.json();
        if (!cancelled && typeof data?.count === 'number') {
          setCount(data.count);
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, locale]);

  const label = formatViewsCount(count, locale);
  const digits = formatCountDigits(count, locale);

  return (
    <span className="article-byline-stat">
      <span className="article-byline-stat__sr-only">{label}</span>
      <span className="article-byline-stat__text text-muted" aria-hidden="true">
        {label}
      </span>
      <span className="article-byline-stat__icon-row text-muted" aria-hidden="true">
        <Eye className="article-byline-stat__icon" size={15} strokeWidth={2} aria-hidden />
        <span className="article-byline-stat__num">{digits}</span>
      </span>
    </span>
  );
}
