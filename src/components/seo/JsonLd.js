/**
 * Emite JSON-LD sin romper el HTML si el JSON contiene "</script>".
 * Uso: páginas servidor con datos de @/lib/seo.
 */
export default function JsonLd({ data }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
