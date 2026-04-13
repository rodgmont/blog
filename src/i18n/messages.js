import { DEFAULT_LOCALE } from './config';

const MESSAGES = {
  en: {
    nav: { about: 'About', followMe: 'Follow me', backToBlog: '← Back to blog' },
    home: { latest: 'Latest posts', viewAll: 'View all →' },
    blog: {
      title: 'Blog',
      subtitle: 'Ideas, engineering, and reflections in public.',
      empty: 'No posts found.',
      searchPlaceholder: 'Search a post…',
      tags: {
        all: 'All',
        engineering: 'Engineering',
        ideas: 'Ideas',
        openSource: 'Open Source',
        startup: 'Startup',
        design: 'Design',
      },
    },
    hero: {
      title1: 'Fran Rodgmont.',
      title2: 'Building a future that endures.',
      body:
        'Fran Rodgmont is the Founder and CEO of Obelysk, a computer science engineer building cognitive infrastructure and advanced AI systems from El Salvador.',
      ctaBlog: 'Read posts',
    },
  },
  es: {
    nav: { about: 'Sobre', followMe: 'Sígueme', backToBlog: '← Volver al blog' },
    home: { latest: 'Últimos artículos', viewAll: 'Ver todos →' },
    blog: {
      title: 'Blog',
      subtitle: 'Ideas, ingeniería y reflexiones en público.',
      empty: 'No se encontraron artículos.',
      searchPlaceholder: 'Busca un artículo…',
      tags: {
        all: 'Todos',
        engineering: 'Ingeniería',
        ideas: 'Ideas',
        openSource: 'Open source',
        startup: 'Startup',
        design: 'Diseño',
      },
    },
    hero: {
      title1: 'Fran Rodgmont.',
      title2: 'Construyendo el futuro que trasciende.',
      body:
        'Fran Rodgmont es el Fundador y CEO de Obelysk, un ingeniero en ciencias de la computación construyendo infraestructura cognitiva y sistemas avanzados de IA desde El Salvador.',
      ctaBlog: 'Ver artículos',
    },
  },
};

export function getMessages(locale) {
  return MESSAGES[locale] ?? MESSAGES[DEFAULT_LOCALE];
}

