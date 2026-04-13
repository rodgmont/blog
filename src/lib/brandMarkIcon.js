/**
 * Marca circular (R) para favicon / PWA vía next/og ImageResponse.
 * La tipografía real es Inter Black (900), cargada en `brandMarkImageResponse.js`.
 */
export function brandMarkInner({ diameter, fontSize, letter = 'R' }) {
  const r = diameter / 2;
  return (
    <div
      style={{
        width: diameter,
        height: diameter,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        borderRadius: r,
      }}
    >
      <span
        style={{
          color: '#ffffff',
          fontSize,
          fontWeight: 900,
          fontFamily: 'Inter',
          lineHeight: 1,
          marginTop: -Math.max(1, Math.round(fontSize * 0.06)),
        }}
      >
        {letter}
      </span>
    </div>
  );
}
