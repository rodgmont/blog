/** Solo el número localizado (p. ej. para icono + cantidad en móvil). */
export function formatCountDigits(n, locale) {
  const num = Number(n) || 0;
  return num.toLocaleString(locale === 'es' ? 'es-ES' : 'en-US');
}

export function formatViewsCount(n, locale) {
  const num = Number(n) || 0;
  const fmt = (v) => v.toLocaleString(locale === 'es' ? 'es-ES' : 'en-US');
  if (locale === 'es') return `${fmt(num)} ${num === 1 ? 'vista' : 'vistas'}`;
  return `${fmt(num)} ${num === 1 ? 'view' : 'views'}`;
}

export function formatSharesCount(n, locale) {
  const num = Number(n) || 0;
  const fmt = (v) => v.toLocaleString(locale === 'es' ? 'es-ES' : 'en-US');
  if (locale === 'es') return `${fmt(num)} ${num === 1 ? 'compartido' : 'compartidos'}`;
  return `${fmt(num)} ${num === 1 ? 'share' : 'shares'}`;
}
