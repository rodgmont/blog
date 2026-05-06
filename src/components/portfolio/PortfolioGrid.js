/**
 * PortfolioGrid — Cuadrícula de proyectos al estilo Meta
 *
 * Layout:
 *   - [par]      → 2 cards medianas side-by-side (aspect-ratio 16:9)
 *   - [featured] → 1 card ancha a full-width  (aspect-ratio 21:9)
 *   - [par]      → ...se repite el patrón
 *
 * Las cards son full-bleed: la imagen ocupa 100% del área y el texto
 * se posiciona absolutamente al fondo sobre un gradiente.
 *
 * Props del componente raíz:
 *   projects  – Array<Project>   Lista de proyectos ya preparada por el servidor
 *   locale    – string           'en' | 'es' (no usado internamente, pasa al padre)
 *   messages  – object           Textos i18n (no usados en cards, disponibles para extensión)
 */

'use client';

import Image from 'next/image';

/* ─────────────────────────────────────────────────────────────────────────────
   ProjectCard
   Una card individual. Puede ser "featured" (ancha) o normal (par).
   Si tiene `link`, toda la card se convierte en elemento interactivo.
───────────────────────────────────────────────────────────────────────────── */
function ProjectCard({ project, featured = false }) {
  const isExternal = project.link?.startsWith('http');
  const hasLink    = project.link && project.link !== '#';

  /** Navega al proyecto al hacer click */
  const handleClick = () => {
    if (!hasLink) return;
    if (isExternal) window.open(project.link, '_blank', 'noopener,noreferrer');
    else window.location.href = project.link;
  };

  // Clases BEM compuestas dinámicamente
  const cardClass = [
    'pf-card',
    featured       ? 'pf-card--featured'  : '',
    hasLink        ? 'pf-card--clickable' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClass}
      onClick={handleClick}
      role={hasLink ? 'button' : undefined}
      tabIndex={hasLink ? 0 : undefined}
      onKeyDown={hasLink ? (e) => e.key === 'Enter' && handleClick() : undefined}
      aria-label={hasLink ? `Abrir proyecto: ${project.title}` : undefined}
    >
      {/* ── Imagen de fondo a sangre completa ── */}
      {project.image && (
        <div className="pf-card__img">
          <Image
            src={project.image}
            fill
            alt={project.title}
            style={{ objectFit: 'cover' }}
            sizes={
              featured
                ? '(max-width: 900px) 100vw, 900px'
                : '(max-width: 620px) 100vw, 50vw'
            }
          />
        </div>
      )}

      {/* ── Gradiente oscuro para legibilidad del texto ── */}
      <div className="pf-card__gradient" aria-hidden="true" />

      {/* ── Contenido de texto (posicionado al fondo) ── */}
      <div className="pf-card__body">

        {/* Chips: tema (siempre) + un tag extra sin repetir el tema */}
        <div className="pf-card__chips">
          {project.theme && (
            <span className="pf-card__chip pf-card__chip--theme">
              {project.theme}
            </span>
          )}
          {project.tags
            ?.filter((t) => t !== project.theme)
            .slice(0, 1)
            .map((t) => (
              <span key={t} className="pf-card__chip">{t}</span>
            ))}
        </div>

        {/* Título principal */}
        <h3 className="pf-card__title">{project.title}</h3>

        {/* Subtítulo / descripción corta */}
        <p className="pf-card__subtitle">{project.subtitle}</p>

        {/* Meta: autor · fecha · vistas · shares */}
        <div className="pf-card__meta">
          <span>@{project.author}</span>
          <span aria-hidden="true">·</span>
          <span>{project.date}</span>
          <span style={{ marginLeft: 'auto' }}>
            {project.views}v · {project.shares}s
          </span>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PortfolioGrid (componente principal)
   Organiza los proyectos en bloques alternados: par → featured → par → …
───────────────────────────────────────────────────────────────────────────── */
export default function PortfolioGrid({ projects }) {
  /**
   * Construye la secuencia de bloques:
   *   1. Toma 2 proyectos → bloque "pair"
   *   2. Toma 1 proyecto  → bloque "featured"
   *   3. Repite hasta agotar el array
   */
  const blocks = [];
  let i = 0;

  while (i < projects.length) {
    // Par: hasta 2 cards medianas
    const pair = [];
    if (i < projects.length) { pair.push(projects[i]); i++; }
    if (i < projects.length) { pair.push(projects[i]); i++; }
    if (pair.length) blocks.push({ type: 'pair', items: pair });

    // Featured: 1 card a ancho completo
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
            <ProjectCard
              key={`featured-${block.item.id}-${idx}`}
              project={block.item}
              featured
            />
          );
        }
        // Bloque par: grid de 2 columnas
        return (
          <div key={`pair-${idx}`} className="pf-masonry__pair">
            {block.items.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
