import Link from 'next/link';
import { DEFAULT_LOCALE, normalizeLocale } from '@/i18n/config';
import { absolutePublicUrl, homePath, siteBaseUrl } from '@/lib/paths';
import { renderInlineMarkdownLinks } from '@/lib/inlineMarkdown';
import {
  ogLocaleForUiLocale,
  SITE_DEFAULT_OG_IMAGE_PATH,
  staticPageAlternates,
} from '@/lib/seo';

const portfolioByLocale = {
  en: {
    title: 'Portfolio',
    subtitle: 'Selected technical projects, AI engineering infrastructure, and open-source contributions.',
    backToHome: '← Back to main site',
    sections: [
      {
        title: 'Technical Projects',
        items: [
          {
            name: 'Obelysk Cognitive Infrastructure',
            description: 'Architecting and building the core infrastructure for deploying small language models (SLMs) tailored for resource-constrained environments. Focused on lowering inference latency and optimizing model weights for enterprise use cases in Latin America.',
            tags: ['AI Engineering', 'LLMOps', 'Distributed Systems'],
            link: 'https://www.obelysk.tech/',
          },
          {
            name: 'HAIKU Adaptive Learning Engine',
            description: 'Developed an AI-powered adaptive learning platform that combines educational pedagogy with personalized machine learning models. Built the backend systems to dynamically adjust curriculum difficulty based on real-time student performance.',
            tags: ['Machine Learning', 'Backend Architecture', 'EdTech'],
            link: '#',
          },
          {
            name: 'Decentralized Analytics Pipeline',
            description: 'Designed a high-throughput data pipeline to process and analyze on-chain data, applying heuristic-based anomaly detection algorithms to identify specific patterns in real-time.',
            tags: ['Data Engineering', 'Blockchain', 'Go'],
            link: '#',
          }
        ]
      },
      {
        title: 'Open Source Contributions',
        items: [
          {
            name: 'AI Model Optimization Tools',
            description: 'Contributed to open-source libraries focused on quantizing and fine-tuning transformer models, specifically improving documentation and adding support for novel hardware architectures.',
            tags: ['Open Source', 'PyTorch', 'Transformers'],
            link: 'https://github.com/franrodgmont',
          }
        ]
      }
    ],
  },
  es: {
    title: 'Portafolio',
    subtitle: 'Selección de proyectos técnicos, infraestructura de ingeniería en IA y contribuciones open-source.',
    backToHome: '← Volver al sitio principal',
    sections: [
      {
        title: 'Proyectos Técnicos',
        items: [
          {
            name: 'Infraestructura Cognitiva Obelysk',
            description: 'Arquitectura y desarrollo de la infraestructura central para el despliegue de modelos de lenguaje pequeños (SLMs) adaptados a entornos con recursos limitados. Enfoque en reducir la latencia de inferencia y optimizar los pesos de los modelos para casos de uso empresariales en América Latina.',
            tags: ['Ingeniería de IA', 'LLMOps', 'Sistemas Distribuidos'],
            link: 'https://www.obelysk.tech/',
          },
          {
            name: 'Motor de Aprendizaje Adaptativo HAIKU',
            description: 'Desarrollo de una plataforma de aprendizaje adaptativo impulsada por IA que combina pedagogía educativa con modelos de machine learning personalizados. Construcción del backend para ajustar dinámicamente la dificultad del plan de estudios en función del rendimiento del estudiante en tiempo real.',
            tags: ['Machine Learning', 'Arquitectura Backend', 'EdTech'],
            link: '#',
          },
          {
            name: 'Pipeline de Analítica Descentralizada',
            description: 'Diseño de un pipeline de datos de alto rendimiento para procesar y analizar datos on-chain, aplicando algoritmos de detección de anomalías basados en heurísticas para identificar patrones específicos en tiempo real.',
            tags: ['Ingeniería de Datos', 'Blockchain', 'Go'],
            link: '#',
          }
        ]
      },
      {
        title: 'Contribuciones Open Source',
        items: [
          {
            name: 'Herramientas de Optimización de Modelos de IA',
            description: 'Contribución a librerías open-source enfocadas en la cuantización y fine-tuning de modelos transformer, específicamente mejorando la documentación y añadiendo soporte para nuevas arquitecturas de hardware.',
            tags: ['Open Source', 'PyTorch', 'Transformers'],
            link: 'https://github.com/franrodgmont',
          }
        ]
      }
    ],
  },
};

export async function generateMetadata({ params }) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const content = portfolioByLocale[locale] ?? portfolioByLocale.en;
  const canonical = absolutePublicUrl(locale, '/portfolio');
  const ogImage = `${siteBaseUrl()}${SITE_DEFAULT_OG_IMAGE_PATH}`;
  const title = `Fran Rodgmont — ${content.title}`;
  const description = content.subtitle;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical, ...staticPageAlternates('/portfolio') },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Fran Rodgmont',
      locale: ogLocaleForUiLocale(locale),
      type: 'website',
      images: [{ url: ogImage, width: 1024, height: 571, type: 'image/png', alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@rodgmont',
      creator: '@rodgmont',
      title,
      description,
      images: [{ url: ogImage, alt: title }],
    },
  };
}

export default async function PortfolioPage({ params }) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const content = portfolioByLocale[locale] ?? portfolioByLocale.en;

  return (
    <section style={{ paddingBottom: '100px' }}>
      <div className="container" style={{ paddingTop: '40px', maxWidth: '680px' }}>
        <Link 
          href={homePath(locale)} 
          className="text-muted no-fade" 
          style={{ display: 'inline-block', marginBottom: '24px', fontSize: '0.9rem', textDecoration: 'none' }}
        >
          {content.backToHome}
        </Link>
        <h1 style={{ marginBottom: '16px', fontSize: '2rem' }}>{content.title}</h1>
        <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '48px' }}>
          {content.subtitle}
        </p>

        {content.sections.map((section, sIdx) => (
          <div key={sIdx} style={{ marginBottom: '56px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '24px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px' }}>
              {section.title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {section.items.map((item, iIdx) => (
                <div key={iIdx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 500, margin: 0 }}>
                    {item.link !== '#' ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="no-fade" style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>
                        {item.name}
                      </a>
                    ) : (
                      item.name
                    )}
                  </h3>
                  <p className="text-muted" style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="tag" style={{ margin: 0 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
