const pattern = () => /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;

/** Para meta tags y listados: [etiqueta](url) → solo la etiqueta. */
export function flattenInlineMarkdownLinks(text) {
  if (text == null || text === '') return '';
  return String(text).replace(pattern(), '$1');
}

/**
 * Escapa HTML y convierte [texto](https://...) en enlaces seguros.
 */
export function renderSubtitleMarkdownToHtml(text) {
  if (text == null || text === '') return '';
  let s = String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  return s.replace(
    pattern(),
    '<a href="$2" rel="noopener noreferrer" target="_blank" class="no-fade" style="text-decoration:underline;text-underline-offset:3px;color:inherit">$1</a>'
  );
}

/** About y otros textos de confianza (sin escapar antes del replace). */
export function renderInlineMarkdownLinks(text) {
  if (text == null || text === '') return '';
  let s = String(text).replace(
    pattern(),
    '<a href="$2" rel="noopener noreferrer" target="_blank" style="text-decoration:underline;text-underline-offset:3px">$1</a>',
  );
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
  return s;
}
