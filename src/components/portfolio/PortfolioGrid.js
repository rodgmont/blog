'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

// ─── Popup ────────────────────────────────────────────────────────────────────
function ProjectPopup({ project, locale, messages, onClose }) {
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
        <button className="pf-popup__close text-muted" onClick={onClose}>✕</button>
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
            <span>@{project.author}</span><span>·</span>
            <span>{project.date}</span><span>·</span>
            <span>{project.views} {messages.views}</span><span>·</span>
            <span>{project.shares} {messages.shares}</span>
          </div>
          {project.link && project.link !== '#' && (
            <a href={href} target={isExternal ? '_blank' : undefined}
               rel={isExternal ? 'noopener noreferrer' : undefined} className="pf-popup__cta">
              {messages.openProject} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function ProjectCard({ project, onClick }) {
  return (
    <div className="pf-nf-card" onClick={() => onClick(project)}>
      <div className="pf-nf-card__thumb">
        {project.image
          ? <Image src={project.image} fill alt={project.title} style={{ objectFit: 'cover' }} sizes="480px" />
          : <div className="pf-nf-card__no-img" />}
        <div className="pf-nf-card__gradient" />
        <div className="pf-nf-card__overlay-text">
          <div className="pf-nf-card__tags-row">
            {project.tags.slice(0, 2).map((t) => (
              <span key={t} className="tag" style={{ margin: 0, fontSize: '0.68rem', padding: '2px 8px' }}>{t}</span>
            ))}
          </div>
          <h3 className="pf-nf-card__title">{project.title}</h3>
          <p className="pf-nf-card__subtitle">{project.subtitle}</p>
        </div>
      </div>
      <div className="pf-nf-card__meta text-muted">
        <span>@{project.author}</span>
        <span>·</span>
        <span>{project.date}</span>
        <span style={{ marginLeft: 'auto' }}>{project.views}v · {project.shares}s</span>
      </div>
    </div>
  );
}

// ─── Row ──────────────────────────────────────────────────────────────────────
function ProjectRow({ quadrant, locale, messages }) {
  const [popup, setPopup] = useState(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const vpRef = useRef(null);

  const STEP = 920;

  const updateArrows = () => {
    const vp = vpRef.current;
    if (!vp) return;
    setCanLeft(vp.scrollLeft > 4);
    setCanRight(vp.scrollLeft < vp.scrollWidth - vp.clientWidth - 4);
  };

  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    updateArrows();
    vp.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      vp.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, []);

  return (
    <div className="pf-nf-row">
      <h2 className="pf-nf-row__title">{quadrant.theme}</h2>
      <div className="pf-nf-row__outer">
        {canLeft && (
          <button className="pf-nf-arrow pf-nf-arrow--left" onClick={() => vpRef.current?.scrollBy({ left: -STEP, behavior: 'smooth' })}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg>
          </button>
        )}
        <div ref={vpRef} className="pf-nf-row__viewport">
          <div className="pf-nf-row__track">
            {quadrant.projects.map((p) => <ProjectCard key={p.id} project={p} onClick={setPopup} />)}
          </div>
        </div>
        {canRight && (
          <button className="pf-nf-arrow pf-nf-arrow--right" onClick={() => vpRef.current?.scrollBy({ left: STEP, behavior: 'smooth' })}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
          </button>
        )}
      </div>
      {popup && <ProjectPopup project={popup} locale={locale} messages={messages} onClose={() => setPopup(null)} />}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function PortfolioGrid({ quadrants, locale, messages }) {
  return (
    <div className="pf-nf-grid">
      {quadrants.map((q) => <ProjectRow key={q.id} quadrant={q} locale={locale} messages={messages} />)}
    </div>
  );
}
