'use client';

import Image from 'next/image';

// ─── Single Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, featured }) {
  const isExternal = project.link?.startsWith('http');
  const href = project.link && project.link !== '#' ? project.link : null;

  const handleClick = () => {
    if (href) {
      if (isExternal) window.open(href, '_blank', 'noopener,noreferrer');
      else window.location.href = href;
    }
  };

  return (
    <div
      className={`pf-card${featured ? ' pf-card--featured' : ''}${href ? ' pf-card--clickable' : ''}`}
      onClick={handleClick}
      role={href ? 'button' : undefined}
      tabIndex={href ? 0 : undefined}
      onKeyDown={href ? (e) => e.key === 'Enter' && handleClick() : undefined}
    >
      {project.image && (
        <div className="pf-card__img">
          <Image
            src={project.image}
            fill
            alt={project.title}
            style={{ objectFit: 'cover' }}
            sizes={featured ? '(max-width: 900px) 100vw, 900px' : '(max-width: 640px) 100vw, 450px'}
          />
        </div>
      )}

      {/* Always-on gradient */}
      <div className="pf-card__gradient" />

      {/* Overlay content */}
      <div className="pf-card__body">
        {/* Theme + tags — no duplicates */}
        <div className="pf-card__chips">
          {project.theme && (
            <span className="pf-card__chip pf-card__chip--theme">{project.theme}</span>
          )}
          {project.tags
            ?.filter((t) => t !== project.theme)
            .slice(0, 1)
            .map((t) => (
              <span key={t} className="pf-card__chip">{t}</span>
            ))}
        </div>

        <h3 className="pf-card__title">{project.title}</h3>
        <p className="pf-card__subtitle">{project.subtitle}</p>

        {/* Meta row */}
        <div className="pf-card__meta">
          <span>@{project.author}</span>
          <span>·</span>
          <span>{project.date}</span>
          <span style={{ marginLeft: 'auto' }}>{project.views}v · {project.shares}s</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Grid ────────────────────────────────────────────────────────────────
// Layout pattern: [pair], [featured], [pair], [featured], …
export default function PortfolioGrid({ projects }) {
  const blocks = [];
  let i = 0;
  while (i < projects.length) {
    // Pair: 2 medium cards side by side
    const pair = [];
    if (i < projects.length) { pair.push(projects[i]); i++; }
    if (i < projects.length) { pair.push(projects[i]); i++; }
    if (pair.length) blocks.push({ type: 'pair', items: pair });

    // Featured: 1 full-width card
    if (i < projects.length) {
      blocks.push({ type: 'featured', item: projects[i] });
      i++;
    }
  }

  return (
    <div className="pf-masonry">
      {blocks.map((block, idx) => {
        if (block.type === 'featured') {
          return (
            <ProjectCard key={block.item.id + idx} project={block.item} featured />
          );
        }
        return (
          <div key={idx} className="pf-masonry__pair">
            {block.items.map((p) => (
              <ProjectCard key={p.id} project={p} featured={false} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
