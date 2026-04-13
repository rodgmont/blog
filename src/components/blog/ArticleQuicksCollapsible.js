import JsonLd from '@/components/seo/JsonLd';
import { buildFaqPageJsonLd, buildHowToJsonLd } from '@/lib/seo';

/**
 * FAQ + HowTo del frontmatter: solo JSON-LD (sin UI en página).
 */
export default function ArticleQuicksCollapsible({ faqBlock, howToBlock }) {
  const faqItems = faqBlock?.items?.length
    ? faqBlock.items
        .map((row) => ({
          question: typeof row?.question === 'string' ? row.question.trim() : '',
          answer: typeof row?.answer === 'string' ? row.answer.trim() : '',
        }))
        .filter((row) => row.question && row.answer)
    : [];

  const howName = typeof howToBlock?.name === 'string' ? howToBlock.name.trim() : '';
  const howDesc = typeof howToBlock?.description === 'string' ? howToBlock.description.trim() : '';
  const howSteps = Array.isArray(howToBlock?.steps)
    ? howToBlock.steps
        .map((s) => ({
          name: typeof s?.name === 'string' ? s.name.trim() : '',
          text: typeof s?.text === 'string' ? s.text.trim() : '',
        }))
        .filter((s) => s.name && s.text)
    : [];

  const hasFaq = faqItems.length > 0;
  const hasHowTo = howName && howSteps.length > 0;
  if (!hasFaq && !hasHowTo) return null;

  return (
    <>
      {hasFaq ? <JsonLd data={buildFaqPageJsonLd(faqItems)} /> : null}
      {hasHowTo ? (
        <JsonLd data={buildHowToJsonLd({ name: howName, description: howDesc || undefined, steps: howSteps })} />
      ) : null}
    </>
  );
}
