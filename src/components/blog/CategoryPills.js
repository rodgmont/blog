'use client';

const TAG_KEYS = ['all', 'engineering', 'ideas', 'openSource', 'startup', 'design'];

export default function CategoryPills({ active, onChange, messages }) {
  const tags = messages?.blog?.tags ?? {};
  const resolvedActive = active ?? 'all';

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
      {TAG_KEYS.map(key => (
        <button
          key={key}
          onClick={() => onChange && onChange(key)}
          style={{
            padding: '6px 16px', borderRadius: '9999px',
            border: '1px solid var(--glass-border)',
            background: resolvedActive === key ? 'var(--accent)' : 'transparent',
            color: resolvedActive === key ? 'var(--accent-foreground)' : 'var(--muted)',
            fontSize: '0.82rem', fontWeight: 500,
            cursor: 'pointer', transition: 'all 0.2s ease',
          }}
        >
          {tags[key] ?? key}
        </button>
      ))}
    </div>
  );
}
