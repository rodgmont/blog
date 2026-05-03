import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/seo/JsonLd';
import { DEFAULT_LOCALE, normalizeLocale } from '@/i18n/config';
import { getMessages } from '@/i18n/messages';
import { buildSiteGraphJsonLd } from '@/lib/seo';

export default async function LocaleLayout({ children, params }) {
  const { locale: localeParam } = await params;
  const locale = normalizeLocale(localeParam) ?? DEFAULT_LOCALE;
  const messages = getMessages(locale);

  return (
    <>
      <JsonLd data={buildSiteGraphJsonLd(locale)} />
      <Header locale={locale} messages={messages} />
      <main>{children}</main>
      <Footer locale={locale} />
    </>
  );
}

