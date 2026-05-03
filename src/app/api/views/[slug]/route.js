import { NextResponse } from 'next/server';
import { incrementView, getViewCount } from '@/lib/views';
import { getPostBySlug } from '@/lib/posts';
import { DEFAULT_LOCALE, normalizeLocale } from '@/i18n/config';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(req, { params }) {
  if (!rateLimit(req).ok) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const locale = normalizeLocale(searchParams.get('locale')) ?? DEFAULT_LOCALE;

  const post = getPostBySlug(slug, locale);
  const baseline = post?.views ?? 0;

  const cookieName = `viewed_${slug}`;
  const hasViewed = req.cookies.get(cookieName);

  if (hasViewed) {
    let currentCount = await getViewCount(slug);
    if (currentCount !== null) {
      return NextResponse.json({ count: currentCount });
    }
  }

  const count = await incrementView(slug, baseline);
  const response = NextResponse.json({ count });
  
  response.cookies.set(cookieName, 'true', {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: 'lax',
  });

  return response;
}
