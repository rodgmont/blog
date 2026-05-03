/**
 * Gráfico de barras simple para MDX (sin dependencias).
 * Uso: <BarChart labels={["A","B"]} values={[10,20]} />
 */
export default function BarChart({ labels = [], values = [] }) {
  const max = Math.max(1, ...values.map((v) => Number(v) || 0));
  return (
    <div
      style={{
        margin: '1.5rem 0',
        padding: '16px 18px',
        borderRadius: 12,
        border: '1px solid var(--glass-border)',
        background: 'rgba(255,255,255,0.03)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140 }}>
        {labels.map((label, i) => {
          const h = Math.round(((Number(values[i]) || 0) / max) * 100);
          return (
            <div key={label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: '100%',
                  height: `${h}%`,
                  minHeight: 4,
                  borderRadius: 8,
                  background: 'linear-gradient(180deg, rgba(18,255,177,0.35), rgba(88,101,242,0.25))',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              />
              <span className="text-muted" style={{ fontSize: '0.78rem' }}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
