import { Redis } from '@upstash/redis';

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const devKey = '__shares';

function getDevMap() {
  if (typeof globalThis !== 'undefined' && !globalThis[devKey]) {
    globalThis[devKey] = new Map();
  }
  return globalThis[devKey];
}

function key(slug) {
  return `shares:${slug}`;
}

export async function getShareCount(slug) {
  if (redis) {
    const v = await redis.get(key(slug));
    if (v == null) return null;
    return Number(v);
  }
  const m = getDevMap();
  return m.has(slug) ? Number(m.get(slug)) : null;
}

/** @returns {Promise<number>} */
export async function incrementShare(slug, baselineFromFrontmatter = 0) {
  if (redis) {
    const k = key(slug);
    const cur = await redis.get(k);
    if (cur == null) {
      await redis.set(k, baselineFromFrontmatter);
    }
    return await redis.incr(k);
  }
  const m = getDevMap();
  const cur = m.has(slug) ? Number(m.get(slug)) : baselineFromFrontmatter;
  const next = cur + 1;
  m.set(slug, next);
  return next;
}
