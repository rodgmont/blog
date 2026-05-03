import BarChart from '@/components/mdx/BarChart';
import ArticleSection from '@/components/mdx/ArticleSection';
/** FAQ/HowTo: preferir frontmatter en el MDX (`faq` / `howTo`); estos componentes sirven para casos puntuales en el cuerpo. */
import FaqList from '@/components/mdx/FaqList';
import HowToSeo from '@/components/mdx/HowToSeo';

export function getArticleMdxComponents() {
  return {
    BarChart,
    ArticleSection,
    FaqList,
    HowToSeo,
    a: (props) => {
      const href = typeof props.href === 'string' ? props.href : '';
      const obelyskSite = /obelysk\.tech/i.test(href);
      const className = [props.className, obelyskSite ? 'article-obelysk-link' : '']
        .filter(Boolean)
        .join(' ');
      return (
        <a
          {...props}
          className={className || undefined}
          style={
            obelyskSite
              ? undefined
              : {
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }
          }
        />
      );
    },
    h2: (props) => (
      <h2
        {...props}
        style={{
          marginTop: '2rem',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
          fontSize: '1.25rem',
        }}
      />
    ),
    hr: () => (
      <hr
        style={{
          border: 'none',
          borderTop: '1px solid var(--glass-border)',
          margin: '2rem 0',
        }}
      />
    ),
    ul: (props) => (
      <ul
        {...props}
        style={{
          paddingLeft: '2.5rem',
          marginBottom: '1.5rem',
          color: 'var(--foreground)',
          fontSize: 'var(--text-md)',
          lineHeight: '1.85',
        }}
      />
    ),
    ol: (props) => (
      <ol
        {...props}
        style={{
          paddingLeft: '2.5rem',
          marginBottom: '1.5rem',
          color: 'var(--foreground)',
          fontSize: 'var(--text-md)',
          lineHeight: '1.85',
        }}
      />
    ),
    li: (props) => (
      <li
        {...props}
        style={{
          marginBottom: '0.6rem',
        }}
      />
    ),
    pre: (props) => (
      <pre
        {...props}
        style={{
          overflowX: 'auto',
          padding: '14px 16px',
          borderRadius: '12px',
          border: '1px solid var(--glass-border)',
          background: 'rgba(255,255,255,0.03)',
          margin: '1.25rem 0',
          fontSize: '0.9rem',
          lineHeight: 1.6,
        }}
      />
    ),
    code: (props) => (
      <code
        {...props}
        style={{
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: '0.92em',
        }}
      />
    ),
  };
}
