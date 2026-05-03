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
        research: 'Research',
        rodgmont: 'Rodgmont',
      },
    },
    hero: {
      title1: 'Fran Rodgmont.',
      title2: 'Building a future that endures.',
      body:
        'Field notes on AI engineering, machine learning, and software development. Exploring ideas around open-source software and startups.',
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
        research: 'Investigaciones',
        rodgmont: 'Rodgmont',
      },
    },
    hero: {
      title1: 'Fran Rodgmont.',
      title2: 'Construyendo el futuro que trasciende.',
      body:
        'Notas de campo sobre ingeniería en IA, machine learning y desarrollo de software. Explorando ideas sobre software open-source y startups.',
      ctaBlog: 'Ver artículos',
    },
  },
};

export function getMessages(locale) {
  return MESSAGES[locale] ?? MESSAGES[DEFAULT_LOCALE];
}

