import { absolutePublicUrl, siteBaseUrl } from '@/lib/paths';
import { DEFAULT_LOCALE } from '@/i18n/config';

/** Imagen por defecto al compartir la home / URLs sin hero propio (ruta bajo /public). */
export const SITE_DEFAULT_OG_IMAGE_PATH = '/images/a_little_big_boy.jpg';

const base = () => siteBaseUrl();

/** Entidad principal del sitio (GEO: perfiles enlazados, nombre consistente). */
export const SITE_SEO = {
  name: 'Fran Rodgmont',
  legalName: 'Fran Rodgmont',
  alternateName: 'rodgmont',
  twitter: 'https://twitter.com/rodgmont',
  github: 'https://github.com/rodgmont',
  sameAs: [
    'https://twitter.com/rodgmont',
    'https://github.com/rodgmont',
    'https://franrodgmont.com',
    'https://www.obelysk.tech/',
  ],
};

const WEB_DESC = {
  en: 'Engineer, builder, and writer. Long-form articles on software, startups, and building in public — in English and Spanish.',
  es: 'Ingeniero, creador y escritor. Artículos sobre software, startups y construir en público — en español e inglés.',
};

const PERSON_DESC = {
  en: 'Computer science engineer. Building AI solutions, machine learning models, and advanced software systems from El Salvador.',
  es: 'Ingeniero en ciencias de la computación. Construyendo soluciones de IA, modelos de machine learning y sistemas de software avanzados desde El Salvador.',
};

export function ogLocaleForUiLocale(locale) {
  if (locale === 'es') return 'es_ES';
  return 'en_US';
}

function absImageUrl(maybePath) {
  if (!maybePath || typeof maybePath !== 'string') return undefined;
  const p = maybePath.trim();
  if (!p) return undefined;
  if (p.startsWith('http')) return p;
  return `${base()}${p.startsWith('/') ? p : `/${p}`}`;
}

/** Grafo global por idioma: Organization + Person + WebSite (SearchAction para AEO/descubrimiento). */
export function buildSiteGraphJsonLd(locale) {
  const url = base();
  const isEs = locale === 'es';
  const desc = isEs ? WEB_DESC.es : WEB_DESC.en;
  const personDesc = isEs ? PERSON_DESC.es : PERSON_DESC.en;
  const inLang = isEs ? 'es-ES' : 'en-US';
  const blogUrl = absolutePublicUrl(locale, '/blog');

  const profileImage = absImageUrl(SITE_DEFAULT_OG_IMAGE_PATH);

  const organization = {
    '@type': 'Organization',
    '@id': `${url}/#organization`,
    name: SITE_SEO.name,
    legalName: SITE_SEO.legalName,
    url,
    logo: { '@type': 'ImageObject', url: profileImage },
    sameAs: SITE_SEO.sameAs,
    description: personDesc,
  };

  const person = {
    '@type': 'Person',
    '@id': `${url}/#person`,
    name: SITE_SEO.name,
    alternateName: SITE_SEO.alternateName,
    url,
    sameAs: SITE_SEO.sameAs,
    jobTitle: isEs ? 'Ingeniero de IA' : 'AI Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Obelysk',
      url: 'https://www.obelysk.tech/',
      description: isEs
        ? 'Soluciones de Inteligencia Artificial y Machine Learning'
        : 'Artificial Intelligence and Machine Learning solutions',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Universidad Don Bosco',
      address: { '@type': 'PostalAddress', addressLocality: 'San Salvador', addressCountry: 'SV' },
    },
    nationality: { '@type': 'Country', name: 'El Salvador' },
    knowsAbout: isEs
      ? ['Inteligencia Artificial', 'Machine Learning', 'Ingeniería de software', 'Startups', 'Deep Tech', 'Blockchain']
      : ['Artificial Intelligence', 'Machine Learning', 'Software Engineering', 'Startups', 'Deep Tech', 'Blockchain'],
    description: personDesc,
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    name: SITE_SEO.name,
    alternateName: SITE_SEO.alternateName,
    url,
    inLanguage: ['en-US', 'es-ES'],
    publisher: { '@id': `${url}/#organization` },
    about: { '@id': `${url}/#person` },
    description: desc,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${blogUrl}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, person, website],
  };
}

/**
 * Artículo + BreadcrumbList.
 * AEO: SpeakableSpecification (título, subtítulo, primer párrafo del cuerpo vía selectores CSS).
 * GEO: autor enlazado a Person del sitio, fechas ISO, imagen y palabras clave.
 */
export function buildArticleJsonLd({
  locale,
  slug,
  title,
  subtitlePlain,
  datePublished,
  dateModified,
  authorName,
  imageUrl,
  imageAlt,
  tags = [],
  wordCount,
}) {
  const root = base();
  const pageUrl = absolutePublicUrl(locale, `/blog/${slug}`);
  const inLanguage = locale === 'es' ? 'es-ES' : 'en-US';
  const authorLabel = (authorName && String(authorName).replace(/^@/, '').trim()) || SITE_SEO.name;

  const imageObject =
    imageUrl &&
    (() => {
      const abs = absImageUrl(imageUrl);
      if (!abs) return null;
      return {
        '@type': 'ImageObject',
        url: abs,
        caption: imageAlt || title,
      };
    })();

  const article = {
    '@type': 'Article',
    '@id': `${pageUrl}#article`,
    headline: title,
    description: subtitlePlain || undefined,
    url: pageUrl,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${pageUrl}#webpage` },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: authorLabel,
      url: `${root}/#person`,
      sameAs: SITE_SEO.sameAs,
    },
    publisher: { '@id': `${root}/#organization` },
    inLanguage,
    isAccessibleForFree: true,
    articleSection: tags[0] || undefined,
    keywords: tags.length ? tags.join(', ') : undefined,
    wordCount: wordCount > 0 ? wordCount : undefined,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [
        '.article-speakable-title',
        '.article-speakable-subtitle',
        '.article-prose h2:first-of-type',
      ],
    },
    ...(imageObject ? { image: [imageObject] } : {}),
  };

  const isEs = locale === 'es';
  const crumbs = [
    { name: isEs ? 'Inicio' : 'Home', url: absolutePublicUrl(locale, '/') },
    { name: 'Blog', url: absolutePublicUrl(locale, '/blog') },
    { name: title, url: pageUrl },
  ];

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };

  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description: subtitlePlain || title,
    inLanguage,
    isPartOf: { '@id': `${root}/#website` },
    primaryImageOfPage: imageObject || undefined,
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    mainEntity: { '@id': `${pageUrl}#article` },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [webPage, breadcrumb, article],
  };
}

export function buildHomePageJsonLd({ locale, title, description, latestPosts }) {
  const url = absolutePublicUrl(locale, '/');
  const isEs = locale === 'es';
  const inLanguage = isEs ? 'es-ES' : 'en-US';
  const root = base();

  const itemList =
    latestPosts?.length > 0
      ? {
          '@type': 'ItemList',
          '@id': `${url}#latest-posts`,
          numberOfItems: latestPosts.length,
          itemListElement: latestPosts.map((post, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'BlogPosting',
              '@id': absolutePublicUrl(locale, `/blog/${post.slug}`),
              url: absolutePublicUrl(locale, `/blog/${post.slug}`),
              name: post.title,
              headline: post.title,
            },
          })),
        }
      : undefined;

  const webPage = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage,
    isPartOf: { '@id': `${root}/#website` },
    about: { '@id': `${root}/#person` },
    ...(itemList ? { mainEntity: { '@id': `${url}#latest-posts` } } : {}),
  };

  const graph = [webPage];
  if (itemList) graph.push(itemList);

  return { '@context': 'https://schema.org', '@graph': graph };
}

export function buildAboutPageJsonLd({ locale, title, description, url, postCount = 0 }) {
  const root = base();
  const isEs = locale === 'es';
  const inLanguage = isEs ? 'es-ES' : 'en-US';
  const personDesc = isEs ? PERSON_DESC.es : PERSON_DESC.en;
  const profileImage = absImageUrl(SITE_DEFAULT_OG_IMAGE_PATH);
  const aboutUrl = absolutePublicUrl(locale, '/about');

  const personEntity = {
    '@type': 'Person',
    '@id': `${root}/#person`,
    name: SITE_SEO.name,
    alternateName: SITE_SEO.alternateName,
    url: root,
    description: personDesc,
    jobTitle: isEs ? 'Ingeniero de IA' : 'AI Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Obelysk',
      url: 'https://www.obelysk.tech/',
      description: isEs
        ? 'Soluciones de Inteligencia Artificial y Machine Learning'
        : 'Artificial Intelligence and Machine Learning solutions',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Universidad Don Bosco',
      address: { '@type': 'PostalAddress', addressLocality: 'San Salvador', addressCountry: 'SV' },
    },
    nationality: { '@type': 'Country', name: 'El Salvador' },
    knowsAbout: isEs
      ? ['Inteligencia Artificial', 'Machine Learning', 'Ingeniería de software', 'Startups', 'Deep Tech', 'Blockchain']
      : ['Artificial Intelligence', 'Machine Learning', 'Software Engineering', 'Startups', 'Deep Tech', 'Blockchain'],
    sameAs: SITE_SEO.sameAs,
    ...(postCount > 0
      ? {
          interactionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/WriteAction',
            userInteractionCount: postCount,
          },
        }
      : {}),
  };

  const profilePage = {
    '@type': 'ProfilePage',
    '@id': `${aboutUrl}#profilepage`,
    url: aboutUrl,
    name: title,
    description,
    inLanguage,
    dateCreated: '2025-03-01',
    dateModified: new Date().toISOString().split('T')[0],
    isPartOf: { '@id': `${root}/#website` },
    mainEntity: personEntity,
    primaryImageOfPage: { '@type': 'ImageObject', url: profileImage },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.about-speakable-hero', '.about-speakable-body'],
    },
  };

  const crumbs = [
    { name: isEs ? 'Inicio' : 'Home', url: absolutePublicUrl(locale, '/') },
    { name: title, url: aboutUrl },
  ];
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${aboutUrl}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [profilePage, breadcrumb],
  };
}

export function buildBlogIndexJsonLd({ locale, title, description, posts }) {
  const url = absolutePublicUrl(locale, '/blog');
  const root = base();
  const inLanguage = locale === 'es' ? 'es-ES' : 'en-US';

  const itemList = {
    '@type': 'ItemList',
    '@id': `${url}#post-list`,
    numberOfItems: posts.length,
    itemListElement: posts.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'BlogPosting',
        url: absolutePublicUrl(locale, `/blog/${post.slug}`),
        headline: post.title,
      },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: title,
        description,
        inLanguage,
        isPartOf: { '@id': `${root}/#website` },
        about: { '@id': `${root}/#person` },
        mainEntity: { '@id': `${url}#post-list` },
      },
      itemList,
    ],
  };
}

export function staticPageAlternates(pathSegment) {
  const languages = {
    es: absolutePublicUrl('es', pathSegment),
    en: absolutePublicUrl('en', pathSegment),
    'x-default': absolutePublicUrl(DEFAULT_LOCALE, pathSegment),
  };
  return { languages };
}

/** Palabras aproximadas del MDX (GEO: métrica de profundidad del contenido). */
export function estimateWordCountFromMdx(source) {
  if (!source || typeof source !== 'string') return 0;
  const text = source.replace(/```[\s\S]*?```/g, ' ').replace(/[#>*_[\]`|~-]/g, ' ');
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * FAQ embebido en un artículo (solo llamar con ítems reales; si el array queda vacío no debe usarse).
 * @param {{ question: string, answer: string }[]} items
 */
export function buildFaqPageJsonLd(items) {
  const mainEntity = items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  };
}

/**
 * Pasos con name + text obligatorios. Sin pasos válidos no debe renderizarse el componente.
 */
export function buildHowToJsonLd({ name, description, steps }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description: description || undefined,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}
