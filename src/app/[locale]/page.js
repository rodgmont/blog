import Hero from '@/components/home/Hero';
import ArticleCard from '@/components/blog/ArticleCard';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { DEFAULT_LOCALE, normalizeLocale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';
import { getViewCounts } from '@/lib/views';
import { absolutePublicUrl, blogPath, siteBaseUrl } from '@/lib/paths';
import JsonLd from '@/components/seo/JsonLd';
import {
  buildHomePageJsonLd,
  ogLocaleForUiLocale,
  SITE_DEFAULT_OG_IMAGE_PATH,
  staticPageAlternates,
} from '@/lib/seo';

const HOME_DESC_EN =
  'Fran Rodgmont is the Founder and CEO of Obelysk, a computer science engineer building cognitive infrastructure and advanced AI systems from El Salvador.';
const HOME_DESC_ES =
  'Fran Rodgmont es el Fundador y CEO de Obelysk, un ingeniero en ciencias de la computación construyendo infraestructura cognitiva y sistemas avanzados de IA desde El Salvador.';
const HOME_TITLE = 'Fran Rodgmont';

export async function generateMetadata({ params }) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const description = locale === 'es' ? HOME_DESC_ES : HOME_DESC_EN;
  const ogImage = `${siteBaseUrl()}${SITE_DEFAULT_OG_IMAGE_PATH}`;
  const canonical = absolutePublicUrl(locale, '/');

  return {
    title: { absolute: HOME_TITLE },
    description,
    alternates: { canonical, ...staticPageAlternates('/') },
    openGraph: {
      title: HOME_TITLE,
      description,
      url: canonical,
      siteName: 'Fran Rodgmont',
      locale: ogLocaleForUiLocale(locale),
      type: 'website',
      images: [{ url: ogImage, width: 1024, height: 571, type: 'image/png', alt: 'Fran Rodgmont — blog' }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@rodgmont',
      creator: '@rodgmont',
      title: HOME_TITLE,
      description,
      images: [{ url: ogImage, alt: 'Fran Rodgmont — blog' }],
    },
  };
}

export default async function Home({ params }) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const messages = getMessages(locale);

  const articles = getAllPosts(locale);
  const latest = articles.slice(0, 3);
  const viewCounts = await getViewCounts(latest.map((a) => a.slug));

  const homeLd = buildHomePageJsonLd({
    locale,
    title: HOME_TITLE,
    description: locale === 'es' ? HOME_DESC_ES : HOME_DESC_EN,
    latestPosts: latest,
  });

  return (
    <>
      <JsonLd data={homeLd} />
      <Hero locale={locale} messages={messages} />

      <section style={{ paddingBottom: '80px' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '16px',
            }}
          >
            <h2 style={{ fontSize: '0.95rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
              {messages.home.latest}
            </h2>
            <Link href={blogPath(locale)} className="text-muted" style={{ fontSize: '0.85rem' }}>
              {messages.home.viewAll}
            </Link>
          </div>

          {latest.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              locale={locale}
              viewCount={(viewCounts[article.slug] ?? article.views) ?? 0}
            />
          ))}
        </div>
      </section>
    </>
  );
}

