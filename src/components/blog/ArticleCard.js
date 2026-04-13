'use client';
import Link from 'next/link';
import { formatViewsCount } from '@/lib/formatViews';
import { postPath } from '@/lib/paths';
import { flattenInlineMarkdownLinks } from '@/lib/inlineMarkdown';

// Versión simplificada inspirada en rauchg.com:
// lista de artículos muy limpia, sin imagen ni tarjeta,
// dejando las imágenes solo para la página del artículo.

export default function ArticleCard({ article, locale, viewCount }) {
  const { slug, title, subtitle, date } = article;
  const year = new Date(date).getFullYear();
  const href = postPath(locale, slug);

  return (
    <article className="article-card">
      <Link
        href={href}
        className="article-card__link no-fade"
        aria-label={`${title}${subtitle ? `. ${flattenInlineMarkdownLinks(subtitle)}` : ''}`}
      >
        <span className="text-muted article-card__year">{year}</span>

        <div className="article-card__body">
          <h2 className="article-card__title">{title}</h2>
          {subtitle ? (
            <p className="text-muted article-card__subtitle">{flattenInlineMarkdownLinks(subtitle)}</p>
          ) : null}
        </div>

        {typeof viewCount === 'number' ? (
          <span className="text-muted article-card__views">{formatViewsCount(viewCount, locale)}</span>
        ) : null}
      </Link>
    </article>
  );
}
