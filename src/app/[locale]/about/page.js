import { DEFAULT_LOCALE, normalizeLocale } from '@/i18n/config';
import { absolutePublicUrl, siteBaseUrl } from '@/lib/paths';
import { renderInlineMarkdownLinks } from '@/lib/inlineMarkdown';
import { getAllPosts } from '@/lib/posts';
import JsonLd from '@/components/seo/JsonLd';
import {
  buildAboutPageJsonLd,
  ogLocaleForUiLocale,
  SITE_DEFAULT_OG_IMAGE_PATH,
  staticPageAlternates,
} from '@/lib/seo';

const aboutByLocale = {
  en: {
    name: 'Fran Rodgmont',
    title: 'About',
    paragraphs: [
      "I'm a computer science engineer and Founder & CEO of [Obelysk](https://www.obelysk.tech/). I'm originally from the East of San Salvador, El Salvador, The Land of Volcanoes, a country where constraints are not obstacles but parameters that sharpen how you think about systems, leverage, and what it actually takes to build something that lasts.",
      "My first encounter with technology wasn't through code. It was through film. Watching *The Matrix* as a kid, I didn't fixate on the action. I fixated on the green code cascading across the screen and the idea that reality itself could be modeled as a system. That image left a question I've never stopped asking: what sits beneath the interface of the world we experience?",
      'That question moved me through software, then architecture, then into the logic of how complex systems are composed, how they scale, and how they fail. At some point the unit of thinking shifted from building applications to designing layers.',
      "Today I'm building [Obelysk](https://www.obelysk.tech/), an initiative focused on small language models, cognitive infrastructure, and advanced AI systems. The premise is structural: intelligence is becoming a foundational layer of modern software, not a feature on top of it. Obelysk is designed around that shift.",
      "My current trajectory is rooted in the question Turing left open: can machines think? From that starting point, I work through specialized and context-aware systems today with one direction in mind: reaching ASI, and ultimately a new form of intelligence we have theoretically conceived, pioneering what we believe is a new era in artificial intelligence. We call it OSI, Organic Superintelligence. The goal is to combine AI as mind with robotics as body: systems that don't just reason in isolation, but perceive, decide, and act in the physical world.",
    ],
    sectionTitle: 'Work and contributions',
    bullets: [
      'Founded [Obelysk](https://www.obelysk.tech/), building cognitive infrastructure and small language models for organizations in Latin America and beyond.',
      'Developing HAIKU, an AI-powered adaptive learning platform combining educational pedagogy with personalized intelligence.',
      'Building research infrastructure for training and deploying domain-specific language models optimized for resource-constrained environments.',
      'Designing community and accelerator-style programs to grow the deep tech ecosystem in El Salvador and the broader Latin American region.',
      'Currently a student at Universidad Don Bosco, El Salvador, studying computer science while building in parallel.',
    ],
    closing: '*The Matrix* introduced me to the question. [Obelysk](https://www.obelysk.tech/) is my answer.',
  },
  es: {
    name: 'Fran Rodgmont',
    title: 'Sobre',
    paragraphs: [
      'Soy ingeniero en ciencias de la computación, fundador & CEO de [Obelysk](https://www.obelysk.tech/). Originario del Este de San Salvador, El Salvador, la Tierra de Volcanes, un país donde las limitaciones no son obstáculos sino parámetros que afinan cómo piensas sobre sistemas, apalancamiento y lo que realmente se necesita para construir algo que dure.',
      'Mi primer encuentro con la tecnología no fue a través del código. Fue a través del cine. Viendo *The Matrix* de niño, no me quedé con la acción sino con el código verde cayendo por la pantalla y la idea de que la realidad misma podía modelarse como un sistema. Esa imagen dejó una pregunta que nunca he dejado de hacerme: ¿qué hay debajo de la interfaz del mundo que experimentamos?',
      'Esa pregunta me llevó a través del software, luego la arquitectura, y finalmente hacia la lógica de cómo los sistemas complejos se componen, cómo escalan y cómo fallan. En algún punto la unidad de pensamiento cambió: dejé de construir aplicaciones y empecé a diseñar capas.',
      'Hoy estoy construyendo [Obelysk](https://www.obelysk.tech/), una iniciativa enfocada en modelos pequeños de lenguaje, infraestructura cognitiva y sistemas avanzados de IA. La premisa es estructural: la inteligencia se está convirtiendo en una capa fundacional del software moderno, no en una funcionalidad encima de él. Obelysk está diseñado alrededor de ese cambio.',
      'Mi trayectoria actual parte de la pregunta que Turing dejó abierta: ¿pueden pensar las máquinas? Desde ese punto de partida, recorro el camino de los sistemas especializados y contextuales de hoy con una sola dirección: llegar a la ASI, y finalmente a una nueva forma de inteligencia que hemos concebido teóricamente, siendo pioneros en lo que consideramos una nueva era de la inteligencia artificial. La llamamos OSI, Superinteligencia Orgánica. La meta es combinar IA como mente con robótica como cuerpo: sistemas que no solo razonan de forma aislada, sino que perciben, deciden y actúan en el mundo físico.',
    ],
    sectionTitle: 'Trabajo y contribuciones',
    bullets: [
      'Fundé [Obelysk](https://www.obelysk.tech/), construyendo infraestructura cognitiva y modelos pequeños de lenguaje para organizaciones en América Latina y más allá.',
      'Desarrollando HAIKU, una plataforma de aprendizaje adaptativo con IA que combina pedagogía educativa con inteligencia personalizada.',
      'Construyendo infraestructura de investigación para entrenar y desplegar modelos de lenguaje especializados, optimizados para entornos con recursos limitados.',
      'Diseñando programas de comunidad y mentoría estilo acelerador para hacer crecer el ecosistema de deep tech en El Salvador y América Latina.',
      'Actualmente estudiante de ciencias de la computación en la Universidad Don Bosco, El Salvador, construyendo en paralelo.',
    ],
    closing: '*The Matrix* me introdujo a la pregunta. [Obelysk](https://www.obelysk.tech/) es mi respuesta.',
  },
};

export async function generateMetadata({ params }) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const content = aboutByLocale[locale] ?? aboutByLocale.en;
  const canonical = absolutePublicUrl(locale, '/about');
  const ogImage = `${siteBaseUrl()}${SITE_DEFAULT_OG_IMAGE_PATH}`;
  const title = `Fran Rodgmont — ${content.title}`;
  const description =
    locale === 'es'
      ? 'Conoce la trayectoria, trabajo y contribuciones de Fran Rodgmont en IA e ingeniería de software. Es el Fundador y CEO de Obelysk, construyendo infraestructura cognitiva y sistemas avanzados de IA desde El Salvador.'
      : 'Learn about Fran Rodgmont\'s career, work, and contributions in AI and software engineering. He is the Founder and CEO of Obelysk, building cognitive infrastructure and advanced AI systems from El Salvador.';

  return {
    title: { absolute: title },
    description,
    alternates: { canonical, ...staticPageAlternates('/about') },
    keywords: locale === 'es'
      ? 'Fran Rodgmont, rodgmont, Obelysk, ingeniero, CEO, IA, El Salvador'
      : 'Fran Rodgmont, rodgmont, Obelysk, engineer, CEO, AI, El Salvador',
    authors: [{ name: 'Fran Rodgmont', url: 'https://franrodgmont.com' }],
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Fran Rodgmont',
      locale: ogLocaleForUiLocale(locale),
      type: 'profile',
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

export default async function AboutPage({ params }) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const content = aboutByLocale[locale] ?? aboutByLocale.en;

  const allPosts = getAllPosts(locale);
  const pageUrl = absolutePublicUrl(locale, '/about');
  const aboutLd = buildAboutPageJsonLd({
    locale,
    title: `${content.title} — ${content.name}`,
    description: content.paragraphs[0],
    url: pageUrl,
    postCount: allPosts.length,
  });

  return (
    <section style={{ paddingBottom: '100px' }}>
      <JsonLd data={aboutLd} />
      <div className="container" style={{ paddingTop: '20px', maxWidth: '680px' }}>
        <p className="text-muted about-speakable-hero" style={{ marginBottom: '6px' }}>
          {content.name}
        </p>
        <h1 style={{ marginBottom: '18px' }}>{content.title}</h1>

        <div className="about-speakable-body" style={{ fontSize: '1.02rem', lineHeight: 1.85 }}>
          {content.paragraphs.map((p, idx) => (
            <p
              key={idx}
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdownLinks(p) }}
            />
          ))}
        </div>

        <h2 style={{ marginTop: '34px', marginBottom: '12px', fontSize: '1.1rem' }}>
          {content.sectionTitle}
        </h2>
        <ul style={{ paddingLeft: '18px' }}>
          {content.bullets.map((b, idx) => (
            <li
              key={idx}
              style={{ marginBottom: '10px' }}
              dangerouslySetInnerHTML={{ __html: renderInlineMarkdownLinks(b) }}
            />
          ))}
        </ul>

        {content.closing && (
          <p
            style={{ marginTop: '34px', fontSize: '1.02rem', fontStyle: 'italic' }}
            dangerouslySetInnerHTML={{ __html: renderInlineMarkdownLinks(content.closing) }}
          />
        )}
      </div>
    </section>
  );
}
