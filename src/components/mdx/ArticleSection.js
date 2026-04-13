/**
 * Sección numerada con anchor estable `section-N` para índice + scroll spy.
 * El título se muestra en el cuerpo (h2); el índice lateral viene del frontmatter `toc`.
 *
 * Props llegan como strings desde MDX (compileMDX no pasa expresiones JSX).
 * `[Obelysk]` dentro de `title` se convierte automáticamente en link a obelysk.tech.
 */
const OBELYSK_URL = 'https://www.obelysk.tech/';
const OBELYSK_RE = /\[Obelysk\]/g;

function renderTitle(raw) {
  if (typeof raw !== 'string') return raw ?? null;
  if (!OBELYSK_RE.test(raw)) return raw;
  OBELYSK_RE.lastIndex = 0;
  const parts = raw.split(OBELYSK_RE);
  const nodes = [];
  parts.forEach((part, i) => {
    if (part) nodes.push(part);
    if (i < parts.length - 1) {
      nodes.push(
        <a key={i} href={OBELYSK_URL} className="article-obelysk-link">
          Obelysk
        </a>,
      );
    }
  });
  return nodes;
}

export default function ArticleSection({ section, n, title, children }) {
  const raw = section ?? n;
  const num = typeof raw === 'string' ? parseInt(raw, 10) : Number(raw);
  const safeNum = Number.isFinite(num) && num >= 1 ? Math.floor(num) : 0;
  const id = `section-${safeNum}`;
  const headingId = `${id}-heading`;

  return (
    <section className="article-section" id={id} aria-labelledby={headingId}>
      <h2 className="article-section__heading" id={headingId}>
        <span className="article-section__num" aria-hidden="true">
          {safeNum}.{' '}
        </span>
        <span className="article-section__title-wrap">{renderTitle(title)}</span>
      </h2>
      <div className="article-section__body">{children}</div>
    </section>
  );
}
