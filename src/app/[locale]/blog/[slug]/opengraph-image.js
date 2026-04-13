import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/posts';
import { DEFAULT_LOCALE, normalizeLocale } from '@/i18n/config';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function hash32(input) {
  const s = String(input ?? '');
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rngFromSeed(seed) {
  let t = seed >>> 0;
  return () => {
    // xorshift32
    t ^= t << 13;
    t ^= t >>> 17;
    t ^= t << 5;
    return (t >>> 0) / 4294967296;
  };
}

function hashToHue(input) {
  const s = String(input ?? '');
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 360;
}

function clampText(s, n) {
  const str = String(s ?? '').trim();
  if (!str) return '';
  return str.length > n ? `${str.slice(0, n - 1)}…` : str;
}

function pickLayout(r) {
  // 0..4 different “styles”, plus param variations => effectively unique per slug
  const x = r();
  if (x < 0.2) return 0;
  if (x < 0.4) return 1;
  if (x < 0.6) return 2;
  if (x < 0.8) return 3;
  return 4;
}

export default async function OpenGraphImage({ params }) {
  const { locale: localeParam, slug } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const post = getPostBySlug(slug, locale);

  const title = clampText(post?.title ?? 'Post', 72);
  const subtitle = clampText(post?.subtitle ?? '', 140);
  const domain = 'franrodgmont.com';
  const hue = hashToHue(slug);
  const r = rngFromSeed(hash32(`${slug}::${locale}`));
  const layout = pickLayout(r);

  const hue2 = (hue + 90 + Math.floor(r() * 180)) % 360;
  const hue3 = (hue + 180 + Math.floor(r() * 120)) % 360;
  const grainOpacity = 0.035 + r() * 0.04;
  const vignette = 0.75 + r() * 0.18;
  const cardRadius = 22 + Math.floor(r() * 18);
  const cardPad = 48 + Math.floor(r() * 18);
  const titleSize = 50 + Math.floor(r() * 10);
  const subtitleSize = 24 + Math.floor(r() * 8);
  const rightBlock = 220 + Math.floor(r() * 120);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: 64,
          backgroundColor: '#05070B',
          position: 'relative',
          color: '#EAF0FF',
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              `radial-gradient(900px 520px at 22% 28%, hsla(${hue}, 90%, 68%, 0.10), transparent 60%), radial-gradient(820px 540px at 76% 70%, hsla(${hue2}, 92%, 70%, 0.12), transparent 60%), radial-gradient(620px 420px at 52% 62%, hsla(${hue3}, 85%, 70%, 0.06), transparent 60%)`,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 2px)',
            opacity: grainOpacity,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(1200px 700px at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.80) 100%)',
            opacity: vignette,
          }}
        />

        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: cardRadius,
            border: '1px solid rgba(255,255,255,0.10)',
            background: 'rgba(255,255,255,0.035)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
            padding: cardPad,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Procedural “no repeat” motifs */}
          {layout === 0 ? (
            // Layout A: ribbon + right poster tile
            <>
              <div
                style={{
                  position: 'absolute',
                  left: cardPad,
                  right: cardPad,
                  top: cardPad,
                  height: 10 + Math.floor(r() * 8),
                  borderRadius: 999,
                  background: `linear-gradient(90deg, hsla(${hue}, 90%, 70%, 0.0), hsla(${hue}, 90%, 70%, 0.35), hsla(${hue2}, 90%, 70%, 0.35), hsla(${hue2}, 90%, 70%, 0.0))`,
                  opacity: 0.9,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: cardPad,
                  top: cardPad + 56 + Math.floor(r() * 40),
                  width: rightBlock,
                  height: rightBlock,
                  borderRadius: 26 + Math.floor(r() * 16),
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: 'rgba(0,0,0,0.18)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: -60,
                    background: `radial-gradient(220px 180px at 35% 40%, hsla(${hue}, 90%, 70%, 0.20), transparent 62%), radial-gradient(240px 200px at 70% 75%, hsla(${hue2}, 90%, 70%, 0.18), transparent 65%), radial-gradient(220px 200px at 45% 85%, hsla(${hue3}, 85%, 70%, 0.10), transparent 60%)`,
                    filter: 'blur(0.2px)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.00) 55%, rgba(0,0,0,0.18))',
                  }}
                />
              </div>
            </>
          ) : layout === 1 ? (
            // Layout B: diagonal beam + repeating word watermark
            <>
              <div
                style={{
                  position: 'absolute',
                  left: -180,
                  top: 80 + Math.floor(r() * 80),
                  width: 1600,
                  height: 220,
                  transform: `rotate(${(-10 + r() * 18).toFixed(2)}deg)`,
                  background: `linear-gradient(90deg, transparent, hsla(${hue2}, 90%, 70%, 0.22), hsla(${hue}, 90%, 70%, 0.10), transparent)`,
                  opacity: 0.9,
                  filter: 'blur(0.2px)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: cardPad,
                  top: cardPad,
                  width: 360,
                  textAlign: 'right',
                  opacity: 0.22,
                  letterSpacing: '0.22em',
                  fontSize: 20,
                  color: 'rgba(234,240,255,0.55)',
                  lineHeight: 1.7,
                }}
              >
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i}>{title.split(' ')[0]?.toUpperCase() || 'FOCUS'}</div>
                ))}
              </div>
            </>
          ) : layout === 2 ? (
            // Layout C: “window” scene blocks (sky/ground split)
            <>
              <div
                style={{
                  position: 'absolute',
                  left: cardPad,
                  top: cardPad,
                  width: 420 + Math.floor(r() * 120),
                  height: 280 + Math.floor(r() * 120),
                  borderRadius: 28 + Math.floor(r() * 18),
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: 'rgba(0,0,0,0.12)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: `linear-gradient(180deg, hsla(${hue2}, 85%, 60%, 0.18), hsla(${hue}, 85%, 55%, 0.10))`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '58%',
                    bottom: 0,
                    background: `linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.35))`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 26,
                    top: 22,
                    width: 160,
                    height: 90,
                    borderRadius: 999,
                    background: `radial-gradient(circle at 35% 40%, hsla(${hue3}, 90%, 70%, 0.28), transparent 60%)`,
                    opacity: 0.9,
                  }}
                />
              </div>
            </>
          ) : layout === 3 ? (
            // Layout D: concentric arcs (target-like)
            <>
              <div
                style={{
                  position: 'absolute',
                  right: cardPad - 10,
                  top: cardPad + 22,
                  width: 380,
                  height: 380,
                  borderRadius: 9999,
                  border: `1px solid hsla(${hue2}, 90%, 70%, 0.26)`,
                  boxShadow: `inset 0 0 0 10px hsla(${hue}, 90%, 70%, 0.10), inset 0 0 0 22px hsla(${hue3}, 90%, 70%, 0.08)`,
                  background: 'rgba(0,0,0,0.12)',
                  opacity: 0.9,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: cardPad + 130,
                  top: cardPad + 170,
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                  background: `hsla(${hue2}, 90%, 70%, 0.65)`,
                }}
              />
            </>
          ) : (
            // Layout E: stacked poster strips
            <>
              {Array.from({ length: 4 }).map((_, i) => {
                const y = cardPad + 16 + i * (26 + Math.floor(r() * 18));
                const h = 10 + Math.floor(r() * 12);
                const alpha = 0.10 + r() * 0.18;
                const hh = (hue + i * 35 + Math.floor(r() * 60)) % 360;
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: cardPad,
                      right: cardPad + (i % 2 === 0 ? 220 : 120),
                      top: y,
                      height: h,
                      borderRadius: 999,
                      background: `linear-gradient(90deg, hsla(${hh}, 90%, 70%, 0.0), hsla(${hh}, 90%, 70%, ${alpha}), hsla(${(hh + 110) % 360}, 90%, 70%, ${alpha}), hsla(${(hh + 110) % 360}, 90%, 70%, 0.0))`,
                      opacity: 0.9,
                    }}
                  />
                );
              })}
            </>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              style={{
                fontSize: titleSize,
                fontWeight: 650 + Math.floor(r() * 150),
                letterSpacing: '-0.04em',
                lineHeight: 1.07,
                maxWidth: 1040,
              }}
            >
              {title}
            </div>
            {subtitle ? (
              <div
                style={{
                  fontSize: subtitleSize,
                  lineHeight: 1.35,
                  color: 'rgba(234,240,255,0.78)',
                  maxWidth: 980,
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(0,0,0,0.20)',
                fontSize: 22,
                color: 'rgba(234,240,255,0.75)',
              }}
            >
              {domain}
            </div>

            <div
              style={{
                padding: '10px 14px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(0,0,0,0.20)',
                fontSize: 22,
                color: 'rgba(234,240,255,0.75)',
              }}
            >
              {locale.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

