import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const title = 'Fran Rodgmont';
  const subtitle =
    'Engineer, builder & writer. Exploring the intersection of technology, ideas, and real-world impact.';
  const domain = 'franrodgmont.com';

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
        {/* nocturnal poster wash */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(900px 520px at 22% 28%, rgba(56, 255, 223, 0.10), transparent 60%), radial-gradient(820px 540px at 76% 70%, rgba(106, 110, 255, 0.12), transparent 60%), radial-gradient(620px 420px at 52% 62%, rgba(255, 199, 129, 0.06), transparent 60%)',
          }}
        />

        {/* dreamy grain */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.06), rgba(255,255,255,0.06) 1px, transparent 1px, transparent 2px)',
            opacity: 0.05,
          }}
        />

        {/* vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(1200px 700px at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.80) 100%)',
            opacity: 0.9,
          }}
        />

        {/* glass card */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: 28,
            border: '1px solid rgba(255,255,255,0.10)',
            background: 'rgba(255,255,255,0.035)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
            padding: 56,
            display: 'flex',
            gap: 44,
          }}
        >
          {/* abstract poster tile */}
          <div
            style={{
              width: 156,
              height: 156,
              borderRadius: 28,
              background:
                'linear-gradient(135deg, rgba(56,255,223,0.14), rgba(106,110,255,0.16))',
              border: '1px solid rgba(255,255,255,0.14)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flex: '0 0 auto',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: -40,
                background:
                  'radial-gradient(140px 120px at 35% 35%, rgba(255,255,255,0.25), transparent 55%), radial-gradient(180px 140px at 70% 75%, rgba(255, 212, 164, 0.14), transparent 60%)',
                filter: 'blur(0.2px)',
                opacity: 0.9,
              }}
            />
            <div
              style={{
                fontSize: 92,
                fontWeight: 700,
                letterSpacing: '-0.06em',
                color: '#EAF0FF',
                lineHeight: 1,
              }}
            >
              R
            </div>
          </div>

          {/* text */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div
                style={{
                  fontSize: 60,
                  fontWeight: 700,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontSize: 28,
                  lineHeight: 1.35,
                  color: 'rgba(234,240,255,0.78)',
                  maxWidth: 820,
                }}
              >
                {subtitle}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
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
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}

