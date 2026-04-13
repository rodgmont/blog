import Link from 'next/link';
import { DEFAULT_LOCALE } from '@/i18n/config';
import { blogPath } from '@/lib/paths';

export default function Hero({ locale = DEFAULT_LOCALE, messages }) {
  const headlineLocale = locale === 'es' ? 'es' : 'en';

  return (
    <section className="hero-section">
      <div className="container">
        <h1 className={`hero-headline hero-headline--${headlineLocale}`}>
          {messages?.hero?.title1 ?? 'Fran Rodgmont.'}{' '}
          <span className="hero-headline__muted">{messages?.hero?.title2 ?? 'Building things that matter.'}</span>
        </h1>

        <p className="text-muted hero-body">
          {messages?.hero?.body ??
            'Engineer, builder & writer. Exploring the intersection of technology, ideas, and real-world impact.'}{' '}
          <Link
            href={blogPath(locale)}
            className="text-muted hero-body__link"
          >
            {messages?.hero?.ctaBlog ?? 'Read posts'}
          </Link>
        </p>
      </div>
    </section>
  );
}
