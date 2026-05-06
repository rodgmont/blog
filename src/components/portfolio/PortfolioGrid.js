/**
 * PortfolioGrid — Cuadrícula de proyectos al estilo Meta
 *
 * Cada card navega a /portfolio/[slug] (EN) o /es/portafolio/[slug] (ES).
 */

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { portfolioProjectPath } from '@/lib/paths';

/* ─────────────────────────────────────────────────────────────────────────────────
   ProjectCard
   Navega siempre a la página de detalle interna (/portfolio/[slug]).
──────────────────────────────────────────────────────────────────────────────── */
function ProjectCard({ project, featured = false, locale = 'en' }) {
  const router = useRouter();
  // Siempre va a la página de detalle interna del portafolio
  const detailPath = portfolioProjectPath(locale, project.id);

  const handleClick = () => router.push(detailPath);

  // Clases BEM compuestas dinámicamente
  const cardClass = [
    'pf-card',
    featured       ? 'pf-card--featured'  : '',
    'pf-card--clickable',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClass}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Ver proyecto: ${project.title}`}
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

      {/* ── Chips: posicionadas arriba a la derecha ── */}
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

      {/* ── Gradiente oscuro para legibilidad del texto ── */}
      <div className="pf-card__gradient" aria-hidden="true" />

      {/* ── Contenido de texto (posicionado al fondo) ── */}
      <div className="pf-card__body">

        {/* Título principal */}
        <h3 className="pf-card__title">{project.title}</h3>

        {/* Subtítulo / descripción corta */}
        <p className="pf-card__subtitle">{project.subtitle}</p>

        {/* Meta: autor · fecha */}
        <div className="pf-card__meta">
          <span>@{project.author}</span>
          <span aria-hidden="true">·</span>
          <span>{project.date}</span>
        </div>

      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PortfolioGrid (componente principal)
   Organiza los proyectos en bloques alternados: par → featured → par → …
───────────────────────────────────────────────────────────────────────────── */
export default function PortfolioGrid({ projects, locale = 'en' }) {
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
              locale={locale}
            />
          );
        }
        // Bloque par: grid de 2 columnas
        return (
          <div key={`pair-${idx}`} className="pf-masonry__pair">
            {block.items.map((p) => (
              <ProjectCard key={p.id} project={p} locale={locale} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
