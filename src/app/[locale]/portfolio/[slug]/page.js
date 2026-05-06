/**
 * /portfolio/[slug] — Página de detalle de un proyecto del portafolio.
 *
 * Misma estructura visual que los artículos del blog:
 *   - Imagen hero full-bleed
 *   - Título sticky
 *   - Subtítulo + byline (@autor | fecha | shares · vistas)
 *   - Contenido del proyecto (body)
 *   - "← Back to Portfolio" en lugar de "← Back to blog"
 *
 * Rutas activas:
 *   EN → /portfolio/[slug]       (internamente /en/portfolio/[slug])
 *   ES → /es/portafolio/[slug]   (internamente /es/portfolio/[slug])
 */

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DEFAULT_LOCALE, normalizeLocale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';
import { getProjectBySlug, getPortfolioData } from '@/lib/portfolio';
import { portfolioPath } from '@/lib/paths';
import { siteBaseUrl } from '@/lib/paths';
import { SITE_SEO } from '@/lib/seo';

/* ─── Static params: genera una ruta por cada proyecto en EN y ES ─── */
export async function generateStaticParams() {
  const locales = ['en', 'es'];
  const params = [];

  for (const locale of locales) {
    const data = getPortfolioData(locale);
    for (const group of data) {
      for (const project of group.projects) {
        // Solo generamos una vez por ID (EN y ES usan el mismo slug)
        if (!params.find((p) => p.locale === locale && p.slug === project.id)) {
          params.push({ locale, slug: project.id });
        }
      }
    }
  }
  return params;
}

/* ─── SEO Metadata ─── */
export async function generateMetadata({ params }) {
  const { locale: localeParam, slug } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const result = getProjectBySlug(slug, locale);
  if (!result) return {};

  const { project } = result;
  const canonical = `${siteBaseUrl()}${locale === 'es' ? `/es/portafolio/${slug}` : `/portfolio/${slug}`}`;

  return {
    title: { absolute: `${project.title} — Fran Rodgmont` },
    description: project.subtitle,
    alternates: { canonical },
    openGraph: {
      title: project.title,
      description: project.subtitle,
      url: canonical,
      type: 'article',
      siteName: SITE_SEO.name,
      images: project.image
        ? [{ url: `${siteBaseUrl()}${project.image}`, width: 1200, height: 630 }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@rodgmont',
      creator: '@rodgmont',
      title: project.title,
      description: project.subtitle,
    },
  };
}

/* ─── Helpers de fecha ─── */
function formatDate(dateString, locale) {
  // Los proyectos usan fechas en texto como "May 2026" / "Mayo 2026"
  // Las devolvemos tal cual ya que están localizadas en la fuente de datos.
  return dateString ?? '';
}

/* ─── Página ─── */
export default async function PortfolioProjectPage({ params }) {
  const { locale: localeParam, slug } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const messages = getMessages(locale);

  const result = getProjectBySlug(slug, locale);
  if (!result) notFound();

  const { project } = result;
  const authorHandle = String(project.author ?? 'rodgmont').replace(/^@/, '').trim();
  const authorProfileUrl = `https://twitter.com/${encodeURIComponent(authorHandle)}`;

  return (
    <article style={{ paddingBottom: '100px' }}>
      <div className="container" style={{ paddingTop: '20px' }}>

        {/* ── Hero image ── */}
        {project.image && (
          <div className="article-hero-clip">
            <div className="article-hero-frame">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 900px) calc(100vw - 40px), 860px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        )}

        {/* ── Título sticky ── */}
        <div className="article-header-sticky">
          <h1 style={{ lineHeight: 1.1, marginBottom: '0' }}>
            {project.title}
          </h1>
        </div>

        {/* ── Subtítulo + byline + back link ── */}
        <div style={{ marginBottom: '22px' }}>

          {/* Subtítulo */}
          {project.subtitle && (
            <p
              className="text-muted"
              style={{ fontSize: '1.02rem', marginBottom: '14px', lineHeight: 1.5, paddingTop: '10px' }}
            >
              {project.subtitle}
            </p>
          )}

          {/* Byline: @autor | fecha | shares · vistas */}
          <div
            className="text-muted"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: '16px',
              paddingBottom: '18px',
              borderBottom: '1px solid var(--glass-border)',
              fontSize: '0.9rem',
            }}
          >
            {/* Lado izquierdo: autor y fecha */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'baseline' }}>
              <a
                href={authorProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted no-fade article-byline__author"
              >
                @{authorHandle}
              </a>
              <span className="article-byline__sep text-muted" aria-hidden="true">|</span>
              <span className="text-muted">{formatDate(project.date, locale)}</span>
            </div>

            {/* Lado derecho: shares · views */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', whiteSpace: 'nowrap' }}>
              <span>{project.shares ?? 0} {locale === 'es' ? 'compartidos' : 'shares'}</span>
              <span aria-hidden="true" className="text-muted">·</span>
              <span>{project.views ?? 0} {locale === 'es' ? 'vistas' : 'views'}</span>
            </div>
          </div>

          {/* ← Back to Portfolio */}
          <div style={{ paddingTop: '10px' }}>
            <Link href={portfolioPath(locale)} className="text-muted" style={{ fontSize: '0.85rem' }}>
              {messages.nav.backToPortfolio}
            </Link>
          </div>
        </div>

        {/* ── Contenido del proyecto ── */}
        {project.body && (
          <div className="article-prose" style={{ lineHeight: '1.85', fontSize: '1.05rem' }}>
            <p>{project.body}</p>

            {/* Tags del proyecto */}
            {project.tags?.length > 0 && (
              <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            )}

            {/* CTA externo si tiene link real */}
            {project.link && project.link !== '#' && (
              <div style={{ marginTop: '2.5rem' }}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ display: 'inline-flex' }}
                >
                  {locale === 'es' ? 'Ver proyecto →' : 'View project →'}
                </a>
              </div>
            )}
          </div>
        )}

      </div>
    </article>
  );
}
