import { NextResponse } from 'next/server';
import { getShareCount, incrementShare } from '@/lib/shares';
import { getPostBySlug } from '@/lib/posts';
import { DEFAULT_LOCALE, normalizeLocale } from '@/i18n/config';
import { rateLimit } from '@/lib/rateLimit';

export async function GET(req, { params }) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const locale = normalizeLocale(searchParams.get('locale')) ?? DEFAULT_LOCALE;
  const post = getPostBySlug(slug, locale);
  const stored = await getShareCount(slug);
  const count = stored ?? post?.shares ?? 0;
  return NextResponse.json({ count });
}

export async function POST(req, { params }) {
  if (!rateLimit(req).ok) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const locale = normalizeLocale(searchParams.get('locale')) ?? DEFAULT_LOCALE;

  const post = getPostBySlug(slug, locale);
  const baseline = post?.shares ?? 0;

  const count = await incrementShare(slug, baseline);
  return NextResponse.json({ count });
}
