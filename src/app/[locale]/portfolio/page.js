import Link from 'next/link';
import { DEFAULT_LOCALE, normalizeLocale } from '@/i18n/config';
import { absolutePublicUrl, homePath, siteBaseUrl } from '@/lib/paths';
import { ogLocaleForUiLocale, SITE_DEFAULT_OG_IMAGE_PATH, staticPageAlternates } from '@/lib/seo';
import { getPortfolioData } from '@/lib/portfolio';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';

const MESSAGES = {
  en: {
    title: 'Portfolio',
    subtitle: 'Selected technical projects, AI engineering infrastructure, and open-source contributions.',
    backToHome: '← Back to main site',
    clickToExplore: 'Click to explore',
    back: 'Back',
    swipeHint: 'Swipe or scroll horizontally to browse · Click for details · Double-click to open',
    views: 'views',
    shares: 'shares',
    openProject: 'Open project',
    doubleClickHint: 'Double-click the card to open the full project.',
  },
  es: {
    title: 'Portafolio',
    subtitle: 'Proyectos técnicos seleccionados, infraestructura de ingeniería en IA y contribuciones open-source.',
    backToHome: '← Volver al sitio principal',
    clickToExplore: 'Clic para explorar',
    back: 'Volver',
    swipeHint: 'Desliza horizontalmente para ver más · Clic para detalles · Doble clic para abrir',
    views: 'vistas',
    shares: 'compartidos',
    openProject: 'Abrir proyecto',
    doubleClickHint: 'Haz doble clic en la tarjeta para abrir el proyecto completo.',
  },
};

export async function generateMetadata({ params }) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const msg = MESSAGES[locale] ?? MESSAGES.en;
  const canonical = absolutePublicUrl(locale, locale === 'es' ? '/portafolio' : '/portfolio');
  const ogImage = `${siteBaseUrl()}${SITE_DEFAULT_OG_IMAGE_PATH}`;
  const title = `Fran Rodgmont — ${msg.title}`;

  return {
    title: { absolute: title },
    description: msg.subtitle,
    alternates: { canonical, ...staticPageAlternates('/portfolio') },
    robots: { index: false, follow: false },
    openGraph: {
      title, description: msg.subtitle, url: canonical,
      siteName: 'Fran Rodgmont', locale: ogLocaleForUiLocale(locale), type: 'website',
      images: [{ url: ogImage, width: 1024, height: 571, type: 'image/png', alt: title }],
    },
  };
}

export default async function PortfolioPage({ params }) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const msg = MESSAGES[locale] ?? MESSAGES.en;
  const quadrants = getPortfolioData(locale);

  return (
    <section style={{ paddingBottom: '100px' }}>
      <div className="container" style={{ paddingTop: '40px', maxWidth: '900px' }}>
        <Link
          href={homePath(locale)}
          className="text-muted no-fade"
          style={{ display: 'inline-block', marginBottom: '24px', fontSize: '0.9rem', textDecoration: 'none' }}
        >
          {msg.backToHome}
        </Link>
        <h1 style={{ marginBottom: '10px', fontSize: '2rem' }}>{msg.title}</h1>
        <p className="text-muted" style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '48px' }}>
          {msg.subtitle}
        </p>

        <PortfolioGrid quadrants={quadrants} locale={locale} messages={msg} />
      </div>
    </section>
  );
}
