/**
 * FAQ y HowTo desde el frontmatter del MDX (sin JSX en el cuerpo).
 *
 * --- 
 * faq:
 *   heading: "Optional title"   # omitir → usa "FAQ" / "Preguntas frecuentes" en la página
 *   items:
 *     - question: "…"
 *       answer: "Texto plano."
 * howTo:
 *   name: "Título del procedimiento"
 *   description: "Opcional"
 *   steps:
 *     - name: "Paso corto"
 *       text: "Detalle del paso."
 * ---
 */

function trimStr(v) {
  return typeof v === 'string' ? v.trim() : '';
}

/**
 * @param {Record<string, unknown>} data — `data` de gray-matter
 * @returns {{ heading?: string, items: { question: string, answer: string }[] } | null}
 */
export function parsePostFaqBlock(data) {
  const raw = data?.faq;
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const items = raw.items;
  if (!Array.isArray(items)) return null;

  const pairs = items
    .map((row) => ({
      question: trimStr(row?.question),
      answer: trimStr(row?.answer),
    }))
    .filter((row) => row.question && row.answer);

  if (pairs.length === 0) return null;

  const headingRaw = trimStr(raw.heading);
  const out = { items: pairs };
  if (headingRaw) out.heading = headingRaw;
  return out;
}

/**
 * @param {Record<string, unknown>} data
 * @returns {{ name: string, description?: string, steps: { name: string, text: string }[] } | null}
 */
export function parsePostHowToBlock(data) {
  const raw = data?.howTo ?? data?.how_to;
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;

  const name = trimStr(raw.name);
  const stepsIn = Array.isArray(raw.steps) ? raw.steps : [];
  const steps = stepsIn
    .map((s) => ({
      name: trimStr(s?.name),
      text: trimStr(s?.text),
    }))
    .filter((s) => s.name && s.text);

  if (!name || steps.length === 0) return null;

  const desc = trimStr(raw.description);
  const out = { name, steps };
  if (desc) out.description = desc;
  return out;
}
