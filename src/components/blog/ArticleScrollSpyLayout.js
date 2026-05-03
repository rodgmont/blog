'use client';

import { useEffect, useState } from 'react';

/**
 * Índice lateral sticky + resaltado según scroll (scroll spy).
 * Los anchors deben coincidir con `id="section-N"` (prop `section={N}` en ArticleSection).
 */
export default function ArticleScrollSpyLayout({ items, lead = '', locale, children }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const ids = items.map((i) => i.id);
    if (ids.length === 0) return undefined;

    const HEADER_OFFSET = 96;

    const updateActive = () => {
      let current = ids[0];
      for (let i = 0; i < ids.length; i++) {
        const el = document.getElementById(ids[i]);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= HEADER_OFFSET) current = ids[i];
      }
      setActiveId(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [items]);

  const ariaNav = locale === 'es' ? 'Índice del artículo' : 'On this page';

  return (
    <div className="article-with-toc">
      <nav className="article-toc" aria-label={ariaNav}>
        {lead ? <p className="article-toc__lead">{lead}</p> : null}
        <ul className="article-toc__list">
          {items.map((item, index) => {
            const line = `${index + 1}. ${item.label}`;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`article-toc__link ${activeId === item.id ? 'is-active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(item.id);
                    if (!el) return;
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    if (typeof window !== 'undefined' && window.history?.replaceState) {
                      window.history.replaceState(null, '', `#${item.id}`);
                    }
                  }}
                >
                  {line}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="article-with-toc__main">{children}</div>
    </div>
  );
}
