import Image from 'next/image';
import { getAllLocaleSlugParams, getPostBySlug, postAlternateLanguages } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DEFAULT_LOCALE, normalizeLocale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';
import remarkGfm from 'remark-gfm';
import { compileMDX } from 'next-mdx-remote/rsc';
import { getArticleMdxComponents } from '@/lib/mdxArticleComponents';
import ArticleQuicksCollapsible from '@/components/blog/ArticleQuicksCollapsible';
import ArticleScrollSpyLayout from '@/components/blog/ArticleScrollSpyLayout';
import ArticleViewsClient from '@/components/blog/ArticleViewsClient';
import { ArticleSharesBylineCount, ArticleTrackedShareLinks } from '@/components/blog/ArticleShareTracking';
import { getViewCount } from '@/lib/views';
import { getShareCount } from '@/lib/shares';
import { absolutePostUrl, blogPath, siteBaseUrl } from '@/lib/paths';
import JsonLd from '@/components/seo/JsonLd';
import {
  buildArticleJsonLd,
  estimateWordCountFromMdx,
  ogLocaleForUiLocale,
  SITE_DEFAULT_OG_IMAGE_PATH,
  SITE_SEO,
} from '@/lib/seo';
import { flattenInlineMarkdownLinks, renderSubtitleMarkdownToHtml } from '@/lib/inlineMarkdown';

export async function generateStaticParams() {
  return getAllLocaleSlugParams();
}

export async function generateMetadata({ params }) {
  const { locale: localeParam, slug } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const post = getPostBySlug(slug, locale);
  if (!post) return {};
  const canonical = absolutePostUrl(locale, slug);
  const rawImage = post.image;
  const heroAltForOg = (post.imageAlt && String(post.imageAlt).trim()) || post.title;
  const fromPost =
    typeof rawImage === 'string' && rawImage.trim()
      ? rawImage.startsWith('http')
        ? rawImage
        : `${siteBaseUrl()}${rawImage.startsWith('/') ? rawImage : `/${rawImage}`}`
      : null;
  const ogImageUrl = fromPost || `${siteBaseUrl()}${SITE_DEFAULT_OG_IMAGE_PATH}`;
  const published = post.date ? new Date(post.date).toISOString() : undefined;
  const modified = post.updated ? new Date(post.updated).toISOString() : published;
  const descriptionPlain = flattenInlineMarkdownLinks(post.subtitle);

  const langMap = postAlternateLanguages(slug);

  return {
    title: { absolute: `${post.title} — Fran Rodgmont` },
    description: descriptionPlain,
    alternates: { canonical, ...(langMap ? { languages: langMap } : {}) },
    openGraph: {
      title: post.title,
      description: descriptionPlain,
      url: canonical,
      type: 'article',
      siteName: 'Fran Rodgmont',
      locale: ogLocaleForUiLocale(locale),
      publishedTime: published,
      modifiedTime: modified,
      images: [
        {
          url: ogImageUrl,
          width: 1024,
          height: 571,
          type: ogImageUrl.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg',
          alt: heroAltForOg,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@rodgmont',
      creator: '@rodgmont',
      title: post.title,
      description: descriptionPlain,
      images: [
        {
          url: ogImageUrl,
          alt: heroAltForOg,
        },
      ],
    },
    authors: [{ name: SITE_SEO.name, url: SITE_SEO.twitter }],
  };
}

function getMonthsAgo(dateString) {
  const published = new Date(dateString);
  const now = new Date();
  const months = (now.getFullYear() - published.getFullYear()) * 12 + (now.getMonth() - published.getMonth());
  if (months === 0) return 0;
  return months;
}

/** Tiempo relativo corto tipo "(6m ago)" / "(hace 6m)"; vacío si hay menos de 1 mes. */
function formatArticleRelativeMonths(monthsAgo, locale) {
  if (monthsAgo == null || monthsAgo < 1) return '';
  if (locale === 'es') return ` (hace ${monthsAgo}m)`;
  return ` (${monthsAgo}m ago)`;
}

export default async function ArticlePage({ params }) {
  const { locale: localeParam, slug } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const messages = getMessages(locale);

  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const storedViews = await getViewCount(slug);
  const storedShares = await getShareCount(slug);
  const {
    title,
    subtitle,
    date,
    image,
    imageAlt = '',
    author = 'rodgmont',
    authorUrl = '',
    views = 0,
    shares = 0,
    content,
    faq: faqBlock,
    howTo: howToBlock,
    toc = [],
    tocLead = '',
  } = post;
  const heroAlt = (imageAlt && imageAlt.trim()) || title;
  const authorHandle = String(author).replace(/^@/, '').trim() || 'rodgmont';
  const authorProfileHref =
    authorUrl || `https://twitter.com/${encodeURIComponent(authorHandle)}`;
  const initialViews = storedViews ?? views;
  const initialShares = storedShares ?? shares;
  const monthsAgo = getMonthsAgo(date);
  const relativeMonths = formatArticleRelativeMonths(monthsAgo, locale);
  const dateLocaleTag = locale === 'es' ? 'es-ES' : 'en-US';
  const formattedDate = new Date(date).toLocaleDateString(dateLocaleTag, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const publishedIso = date ? new Date(date).toISOString() : undefined;
  const modifiedIso = post.updated ? new Date(post.updated).toISOString() : publishedIso;
  const subtitlePlain = flattenInlineMarkdownLinks(subtitle);
  const wordCount = estimateWordCountFromMdx(content);

  const articleJsonLd = buildArticleJsonLd({
    locale,
    slug,
    title,
    subtitlePlain,
    datePublished: publishedIso,
    dateModified: modifiedIso,
    authorName: author,
    imageUrl: image || undefined,
    imageAlt: heroAlt,
    tags: post.tags,
    wordCount,
  });

  const mdxNode = (
    await compileMDX({
      source: content,
      options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
      components: getArticleMdxComponents(),
    })
  ).content;
  const hasArticleToc = Array.isArray(toc) && toc.length > 0;
  const tocNavItems = hasArticleToc ? toc.map((label, i) => ({ id: `section-${i + 1}`, label })) : [];

  return (
    <article style={{ paddingBottom: '100px' }}>
      <JsonLd data={articleJsonLd} />
      <div className="container" style={{ paddingTop: '20px' }}>
        {image && (
          <div className="article-hero-clip">
            <div className="article-hero-frame">
              <Image
                src={image}
                alt={heroAlt}
                fill
                sizes="(max-width: 900px) calc(100vw - 40px), 860px"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        )}

        <div className="article-header-sticky">
          <h1
            className="article-speakable-title"
            style={{ lineHeight: 1.1, marginBottom: '0' }}
          >
            {title}
          </h1>
        </div>

        <div style={{ marginBottom: '22px' }}>
          {subtitle && (
            <p
              className="text-muted article-speakable-subtitle"
              style={{
                fontSize: '1.02rem',
                marginBottom: '14px',
                lineHeight: 1.5,
                paddingTop: '10px',
              }}
              dangerouslySetInnerHTML={{ __html: renderSubtitleMarkdownToHtml(subtitle) }}
            />
          )}

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
            <div className="article-byline__primary" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'baseline' }}>
              <a
                href={authorProfileHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted no-fade article-byline__author"
              >
                @{authorHandle}
              </a>
              <span className="article-byline__sep text-muted" aria-hidden="true">
                |
              </span>
              <span className="article-byline__date text-muted">
                {formattedDate}
                {relativeMonths}
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                alignItems: 'baseline',
                justifyContent: 'flex-end',
                whiteSpace: 'nowrap',
              }}
            >
              <ArticleSharesBylineCount
                slug={slug}
                locale={locale}
                baseline={shares}
                initial={initialShares}
              />
              <span aria-hidden="true" className="text-muted">
                ·
              </span>
              <ArticleViewsClient slug={slug} locale={locale} baseline={views} initial={initialViews} />
            </div>
          </div>

          <div style={{ paddingTop: '10px' }}>
            <Link href={blogPath(locale)} className="text-muted" style={{ fontSize: '0.85rem' }}>
              {messages.nav.backToBlog}
            </Link>
          </div>
        </div>

        {hasArticleToc ? (
          <ArticleScrollSpyLayout items={tocNavItems} lead={tocLead} locale={locale}>
            <div
              className="article-prose article-prose--obelysk"
              style={{ lineHeight: '1.85', fontSize: '1.05rem' }}
            >
              {mdxNode}
            </div>
          </ArticleScrollSpyLayout>
        ) : (
          <div className="article-prose" style={{ lineHeight: '1.85', fontSize: '1.05rem' }}>
            {mdxNode}
          </div>
        )}

        <ArticleTrackedShareLinks
          slug={slug}
          locale={locale}
          title={title}
          postUrl={absolutePostUrl(locale, post.slug)}
          shareHeading={locale === 'es' ? 'Compartir este artículo' : 'Share this post'}
        />

        <ArticleQuicksCollapsible faqBlock={faqBlock} howToBlock={howToBlock} />
      </div>
    </article>
  );
}

