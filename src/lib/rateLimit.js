const windowMs = 60_000;
const maxPerWindow = 10;

const hits = new Map();

setInterval(() => hits.clear(), windowMs);

/**
 * Simple in-memory rate limiter per IP.
 * Returns { ok: true } if under limit, { ok: false } if exceeded.
 */
export function rateLimit(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
  const count = (hits.get(ip) ?? 0) + 1;
  hits.set(ip, count);
  return { ok: count <= maxPerWindow };
}
