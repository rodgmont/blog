'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ─── Popup ────────────────────────────────────────────────────────────────────
function ProjectPopup({ project, locale, onClose, messages }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const isExternal = project.link?.startsWith('http');
  const href = project.link && project.link !== '#'
    ? project.link
    : (locale === 'es' ? `/es/portafolio/${project.id}` : `/portfolio/${project.id}`);

  return (
    <div className="pf-overlay" onClick={onClose}>
      <div className="pf-popup glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="pf-popup__close text-muted" onClick={onClose} aria-label="Close">✕</button>

        {project.image && (
          <div className="pf-popup__img-wrap">
            <Image src={project.image} fill alt={project.title} style={{ objectFit: 'cover' }} sizes="600px" />
          </div>
        )}

        <div className="pf-popup__body">
          <div className="pf-popup__tags">
            {project.tags.map((t) => <span key={t} className="tag" style={{ margin: 0 }}>{t}</span>)}
          </div>
          <h2 className="pf-popup__title">{project.title}</h2>
          <p className="pf-popup__subtitle text-muted">{project.subtitle}</p>
          <p className="pf-popup__desc">{project.body}</p>
          <div className="pf-popup__meta text-muted">
            <span>@{project.author}</span>
            <span>·</span>
            <span>{project.date}</span>
            <span>·</span>
            <span>{project.views} {messages.views}</span>
            <span>·</span>
            <span>{project.shares} {messages.shares}</span>
          </div>
          {project.link && project.link !== '#' && (
            <a
              href={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="pf-popup__cta"
            >
              {messages.openProject} →
            </a>
          )}
          <p className="pf-popup__hint text-muted">{messages.doubleClickHint}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Single card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, style, isTop, onClick }) {
  return (
    <div className={`pf-card glass-card${isTop ? ' pf-card--top' : ''}`} style={style} onClick={isTop ? onClick : undefined}>
      {project.image && (
        <div className="pf-card__img">
          <Image src={project.image} fill alt={project.title} style={{ objectFit: 'cover' }} sizes="380px" />
        </div>
      )}
      <div className="pf-card__info">
        <h3 className="pf-card__title">{project.title}</h3>
        <p className="pf-card__subtitle text-muted">{project.subtitle}</p>
        <div className="pf-card__meta text-muted">
          <span>@{project.author}</span>
          <span>·</span>
          <span>{project.date}</span>
          <span style={{ marginLeft: 'auto' }}>{project.views}v · {project.shares}s</span>
        </div>
      </div>
    </div>
  );
}

// ─── Card deck ────────────────────────────────────────────────────────────────
function CardDeck({ projects, locale, messages, accent }) {
  const [idx, setIdx] = useState(0);
  const [popup, setPopup] = useState(null);
  const wheelAccum = useRef(0);
  const clickTimer = useRef(null);
  const dragStart = useRef(null);

  const canNext = idx < projects.length - 1;
  const canPrev = idx > 0;

  const goNext = useCallback(() => { if (canNext) setIdx((i) => i + 1); }, [canNext]);
  const goPrev = useCallback(() => { if (canPrev) setIdx((i) => i - 1); }, [canPrev]);

  const handleWheel = useCallback((e) => {
    wheelAccum.current += e.deltaX;
    if (wheelAccum.current > 70) { goNext(); wheelAccum.current = 0; }
    else if (wheelAccum.current < -70) { goPrev(); wheelAccum.current = 0; }
  }, [goNext, goPrev]);

  const handlePointerDown = (e) => { dragStart.current = e.clientX; };
  const handlePointerUp = (e) => {
    if (dragStart.current === null) return;
    const delta = dragStart.current - e.clientX;
    dragStart.current = null;
    if (delta > 50) goNext();
    else if (delta < -50) goPrev();
  };

  const handleCardClick = useCallback((project) => {
    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
      clickTimer.current = null;
      // double click → navigate
      const href = project.link && project.link !== '#' ? project.link : (locale === 'es' ? `/es/portafolio/${project.id}` : `/portfolio/${project.id}`);
      window.open(href, project.link?.startsWith('http') ? '_blank' : '_self');
    } else {
      clickTimer.current = setTimeout(() => {
        clickTimer.current = null;
        setPopup(project);
      }, 260);
    }
  }, [locale]);

  // Show at most 3 stacked cards
  const visible = projects.slice(idx, idx + 3);

  return (
    <>
      <div
        className="pf-deck"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {[...visible].reverse().map((project, revIdx) => {
          const stackIdx = visible.length - 1 - revIdx; // 0 = top
          const isTop = stackIdx === 0;
          const offset = stackIdx * 9;
          const rotate = stackIdx * 1.8;
          return (
            <ProjectCard
              key={project.id}
              project={project}
              isTop={isTop}
              style={{
                position: 'absolute',
                inset: 0,
                transform: `translateX(${offset}px) translateY(${offset * 0.4}px) rotate(${rotate}deg)`,
                zIndex: isTop ? 10 : 10 - stackIdx,
                pointerEvents: isTop ? 'auto' : 'none',
                transition: 'transform 0.25s ease',
              }}
              onClick={() => handleCardClick(project)}
            />
          );
        })}
      </div>

      {/* Dots */}
      <div className="pf-deck__dots">
        {projects.map((_, i) => (
          <button
            key={i}
            className="pf-deck__dot"
            style={{ background: i === idx ? accent : 'var(--glass-border)', opacity: i === idx ? 1 : 0.5 }}
            onClick={() => setIdx(i)}
            aria-label={`Card ${i + 1}`}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <p className="pf-deck__hint text-muted">{messages.swipeHint}</p>

      {popup && (
        <ProjectPopup
          project={popup}
          locale={locale}
          messages={messages}
          onClose={() => setPopup(null)}
        />
      )}
    </>
  );
}

// ─── Quadrant block ───────────────────────────────────────────────────────────
function Quadrant({ quadrant, locale, messages }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`pf-quadrant${expanded ? ' pf-quadrant--open' : ''}`} style={{ '--accent': quadrant.accent }}>
      {!expanded ? (
        <button className="pf-quadrant__cover" onClick={() => setExpanded(true)}>
          <span className="pf-quadrant__theme-label" style={{ color: quadrant.accent }}>{quadrant.theme}</span>
          <p className="pf-quadrant__desc text-muted">{quadrant.description}</p>
          <span className="pf-quadrant__cta text-muted">{messages.clickToExplore} →</span>
        </button>
      ) : (
        <div className="pf-quadrant__inner">
          <div className="pf-quadrant__header">
            <button className="pf-quadrant__back text-muted" onClick={() => setExpanded(false)}>← {messages.back}</button>
            <span className="pf-quadrant__theme-sm" style={{ color: quadrant.accent }}>{quadrant.theme}</span>
          </div>
          <CardDeck
            projects={quadrant.projects}
            locale={locale}
            messages={messages}
            accent={quadrant.accent}
          />
        </div>
      )}
    </div>
  );
}

// ─── Main grid ────────────────────────────────────────────────────────────────
export default function PortfolioGrid({ quadrants, locale, messages }) {
  return (
    <div className="pf-grid">
      {quadrants.map((q) => (
        <Quadrant key={q.id} quadrant={q} locale={locale} messages={messages} />
      ))}
    </div>
  );
}
