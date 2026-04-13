import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/i18n/config';
import { getAllLocaleSlugParams, getPostBySlug } from '@/lib/posts';
import { publicPath, siteBaseUrl } from '@/lib/paths';

export default async function sitemap() {
  const base = siteBaseUrl();
  const entries = [];
  const staticPaths = ['/blog', '/about'];

  for (const locale of SUPPORTED_LOCALES) {
    entries.push({
      url: `${base}${publicPath(locale, '/')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: locale === DEFAULT_LOCALE ? 1 : 0.9,
    });
    for (const p of staticPaths) {
      entries.push({
        url: `${base}${publicPath(locale, p)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  for (const { locale, slug } of getAllLocaleSlugParams()) {
    const post = getPostBySlug(slug, locale);
    const lastModified = post?.date ? new Date(post.date) : new Date();
    entries.push({
      url: `${base}${publicPath(locale, `/blog/${slug}`)}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
