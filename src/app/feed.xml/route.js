import { getAllPosts } from '@/lib/posts';
import { absolutePublicUrl, siteBaseUrl } from '@/lib/paths';

export async function GET() {
  const base = siteBaseUrl();
  const enPosts = getAllPosts('en');
  const esPosts = getAllPosts('es');

  const allItems = [
    ...enPosts.map((p) => ({ ...p, locale: 'en' })),
    ...esPosts.map((p) => ({ ...p, locale: 'es' })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  const escapeXml = (s) =>
    String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const items = allItems
    .map((post) => {
      const url = absolutePublicUrl(post.locale, `/blog/${post.slug}`);
      const pubDate = new Date(post.date).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.subtitle ?? '')}</description>
      <dc:language>${post.locale}</dc:language>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Fran Rodgmont</title>
    <link>${base}</link>
    <description>Articles on AI, software engineering, and building in public.</description>
    <language>en</language>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
