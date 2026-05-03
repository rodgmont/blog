import { Fragment } from 'react';
import JsonLd from '@/components/seo/JsonLd';
import { buildFaqPageJsonLd } from '@/lib/seo';

/**
 * MDX: lista de { question, answer } en texto plano.
 * No emite nada si no hay al menos un par completo.
 *
 * @example
 * <FaqList items={[{ question: '…', answer: '…' }]} />
 */
export default function FaqList({ items = [], heading = 'FAQ' }) {
  const pairs = (Array.isArray(items) ? items : [])
    .map((row) => ({
      question: typeof row?.question === 'string' ? row.question.trim() : '',
      answer: typeof row?.answer === 'string' ? row.answer.trim() : '',
    }))
    .filter((row) => row.question && row.answer);

  if (pairs.length === 0) return null;

  return (
    <>
      <JsonLd data={buildFaqPageJsonLd(pairs)} />
      <section className="article-faq" aria-label={heading}>
        {heading ? <h2 className="article-faq__heading">{heading}</h2> : null}
        <dl className="article-faq__list">
          {pairs.map((row, i) => (
            <Fragment key={`faq-${i}`}>
              <dt className="article-faq__q">{row.question}</dt>
              <dd className="article-faq__a">{row.answer}</dd>
            </Fragment>
          ))}
        </dl>
      </section>
    </>
  );
}
