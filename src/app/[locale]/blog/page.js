import BlogClient from '@/components/blog/BlogClient';
import { getAllPosts } from '@/lib/posts';
import { DEFAULT_LOCALE, normalizeLocale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';
import { getViewCounts } from '@/lib/views';
import { absolutePublicUrl, siteBaseUrl } from '@/lib/paths';
import JsonLd from '@/components/seo/JsonLd';
import {
  buildBlogIndexJsonLd,
  ogLocaleForUiLocale,
  SITE_DEFAULT_OG_IMAGE_PATH,
  staticPageAlternates,
} from '@/lib/seo';

export async function generateMetadata({ params }) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const messages = getMessages(locale);
  const canonical = absolutePublicUrl(locale, '/blog');
  const ogImage = `${siteBaseUrl()}${SITE_DEFAULT_OG_IMAGE_PATH}`;
  const title = `${messages.blog.title} — Fran Rodgmont`;
  const description = messages.blog.subtitle;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical, ...staticPageAlternates('/blog') },
    openGraph: {
      title: messages.blog.title,
      description,
      url: canonical,
      siteName: 'Fran Rodgmont',
      locale: ogLocaleForUiLocale(locale),
      type: 'website',
      images: [{ url: ogImage, width: 1024, height: 571, type: 'image/png', alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@rodgmont',
      creator: '@rodgmont',
      title: messages.blog.title,
      description,
      images: [{ url: ogImage, alt: title }],
    },
  };
}

export default async function BlogPage({ params, searchParams }) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const messages = getMessages(locale);
  const posts = getAllPosts(locale);
  const viewCounts = await getViewCounts(posts.map((p) => p.slug));

  const sp = searchParams instanceof Promise ? await searchParams : searchParams ?? {};
  const initialQuery = typeof sp.q === 'string' ? sp.q : '';

  const blogLd = buildBlogIndexJsonLd({
    locale,
    title: `${messages.blog.title} — Fran Rodgmont`,
    description: messages.blog.subtitle,
    posts,
  });

  return (
    <>
      <JsonLd data={blogLd} />
      <BlogClient
        posts={posts}
        locale={locale}
        messages={messages}
        viewCounts={viewCounts}
        initialQuery={initialQuery}
      />
    </>
  );
}

