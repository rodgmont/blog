import JsonLd from '@/components/seo/JsonLd';
import { buildHowToJsonLd } from '@/lib/seo';

/**
 * MDX: guía con pasos. Sin nombre o sin pasos válidos no renderiza nada (ni JSON-LD).
 *
 * @example
 * <HowToSeo
 *   name="Deploy"
 *   description="Optional short summary"
 *   steps={[{ name: 'Paso 1', text: 'Detalle del paso.' }]}
 * />
 */
export default function HowToSeo({ name, description, steps = [] }) {
  const title = typeof name === 'string' ? name.trim() : '';
  const desc = typeof description === 'string' ? description.trim() : '';
  const cleanSteps = (Array.isArray(steps) ? steps : [])
    .map((s) => ({
      name: typeof s?.name === 'string' ? s.name.trim() : '',
      text: typeof s?.text === 'string' ? s.text.trim() : '',
    }))
    .filter((s) => s.name && s.text);

  if (!title || cleanSteps.length === 0) return null;

  return (
    <>
      <JsonLd data={buildHowToJsonLd({ name: title, description: desc || undefined, steps: cleanSteps })} />
      <section className="article-howto" aria-label={title}>
        <h2 className="article-howto__title">{title}</h2>
        {desc ? <p className="article-howto__desc text-muted">{desc}</p> : null}
        <ol className="article-howto__steps">
          {cleanSteps.map((s, i) => (
            <li key={`howto-step-${i}`} className="article-howto__step">
              <strong className="article-howto__step-name">{s.name}</strong>
              <span className="article-howto__step-text">{s.text}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
