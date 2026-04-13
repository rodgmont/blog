import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { DEFAULT_LOCALE, normalizeLocale, SUPPORTED_LOCALES } from '@/i18n/config';
import { absolutePublicUrl } from '@/lib/paths';
import { parsePostFaqBlock, parsePostHowToBlock } from '@/lib/postStructuredBlocks';

/** Re-export: FAQ/HowTo vía frontmatter (ver `postStructuredBlocks.js`). */
export { parsePostFaqBlock, parsePostHowToBlock } from '@/lib/postStructuredBlocks';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

function safeLocale(locale) {
  return normalizeLocale(locale) ?? DEFAULT_LOCALE;
}

function fileExists(p) {
  try {
    fs.accessSync(p, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function getPostPath(locale, slug) {
  return path.join(POSTS_DIR, locale, `${slug}.mdx`);
}

export function getAllPostSlugs(locale) {
  const lc = safeLocale(locale);
  const dir = path.join(POSTS_DIR, lc);
  if (!fileExists(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getPostSourceBySlug(slug, locale) {
  const lc = safeLocale(locale);
  const p = getPostPath(lc, slug);
  if (!fileExists(p)) return null;
  return fs.readFileSync(p, 'utf8');
}

export function getPostBySlug(slug, locale) {
  const lc = safeLocale(locale);
  let source = getPostSourceBySlug(slug, lc);

  // Fallback: try default locale if missing
  if (!source && lc !== DEFAULT_LOCALE) {
    source = getPostSourceBySlug(slug, DEFAULT_LOCALE);
  }
  if (!source) return null;

  const { data, content } = matter(source);
  if (data.draft === true && process.env.NODE_ENV === 'production') return null;

  const date = data.date ?? null;
  return {
    slug,
    locale: lc,
    title: data.title ?? slug,
    subtitle: data.subtitle ?? '',
    date,
    updated: data.updated ?? date,
    author: data.author ?? 'rodgmont',
    authorUrl: typeof data.authorUrl === 'string' ? data.authorUrl.trim() : '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    image: data.image ?? null,
    imageAlt: typeof data.imageAlt === 'string' ? data.imageAlt : '',
    views: Number.isFinite(data.views) ? data.views : 0,
    shares: Number.isFinite(data.shares) ? data.shares : 0,
    content,
    faq: parsePostFaqBlock(data),
    howTo: parsePostHowToBlock(data),
    toc: Array.isArray(data.toc)
      ? data.toc
          .filter((x) => typeof x === 'string' && x.trim())
          .map((x) => x.trim())
      : [],
    tocLead: typeof data.tocLead === 'string' ? data.tocLead.trim() : '',
  };
}

/** True if this locale has its own MDX file for the slug (no fallback). */
export function postExistsInLocale(slug, locale) {
  const lc = safeLocale(locale);
  return fileExists(getPostPath(lc, slug));
}

export function postAlternateLanguages(slug) {
  const languages = {};
  for (const loc of SUPPORTED_LOCALES) {
    if (postExistsInLocale(slug, loc)) {
      languages[loc] = absolutePublicUrl(loc, `/blog/${slug}`);
    }
  }
  if (Object.keys(languages).length === 0) return null;
  languages['x-default'] =
    languages[DEFAULT_LOCALE] ?? languages.es ?? languages.en ?? Object.values(languages)[0];
  return languages;
}

export function getAllPosts(locale) {
  const lc = safeLocale(locale);
  const slugs = getAllPostSlugs(lc);
  const posts = slugs
    .map((slug) => getPostBySlug(slug, lc))
    .filter(Boolean);

  return posts.sort((a, b) => new Date(b.date ?? 0) - new Date(a.date ?? 0));
}

export function getAllLocaleSlugParams() {
  const params = [];
  for (const locale of SUPPORTED_LOCALES) {
    for (const slug of getAllPostSlugs(locale)) {
      if (getPostBySlug(slug, locale)) {
        params.push({ locale, slug });
      }
    }
  }
  return params;
}

