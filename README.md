# blog

Sitio personal de **Fran Rodgmont**: App Router, MDX en disco, i18n enrutada y estado mínimo en Redis. Pensado para publicar en público, medir lecturas/compartidos sin panel de administración y salir bien parado en SEO / AEO / datos estructurados.

---

## Stack

| Capa | Elección |
|------|----------|
| Framework | **Next.js 16** (Turbopack en dev), **React 19** |
| Contenido | **MDX** vía `next-mdx-remote` + **gray-matter**, fuentes en `content/posts/{en,es}/` |
| i18n | Segmento dinámico `[locale]`, cookie `blog_locale`, `Accept-Language`, query `?setLocale=` |
| Estado compartido | **Upstash Redis** (vistas por slug, contador de shares); sin Redis → `Map` en memoria en desarrollo |
| Estilo | CSS global + pocos componentes; **Inter** (`next/font/google`) |
| Iconos | **lucide-react** |

---

## Arquitectura (mental model)

1. **Rutas públicas** viven bajo `src/app/[locale]/…`. El inglés es **default** y **canónico sin prefijo** (`/blog`, `/blog/slug`). Español bajo `/es/...`.
2. **Middleware** (`src/middleware.js`) decide locale, reescribe cuando hace falta y fija cookie. El query `?setLocale=en|es` evita carreras cookie ↔ middleware en despliegue (redirect 307 + cookie, luego URL limpia).
3. **Posts** = un archivo `.mdx` por `(locale, slug)`. `getPostBySlug` hace fallback al locale default si falta traducción.
4. **Vistas**: el cliente hace `POST /api/views/[slug]` al cargar el artículo; el listado usa contadores agregados + baseline del frontmatter.
5. **Shares**: los enlaces X/LinkedIn disparan `POST /api/shares/[slug]` y un evento DOM para actualizar el byline sin recargar.

No hay CMS: el flujo de publicación es git + redeploy (o preview en PR).

---

## Estructura del repo (lo que importa)

```
content/posts/
  en/*.mdx
  es/*.mdx
src/
  app/
    [locale]/          # home, about, blog, blog/[slug]
    api/views/[slug]/
    api/shares/[slug]/
    layout.js          # fuente, metadata global
    sitemap.js, robots.js, opengraph-image.js
  components/
  i18n/
  lib/
    posts.js           # lectura MDX + frontmatter
    postStructuredBlocks.js  # faq / howTo desde YAML
    seo.js             # JSON-LD builders + helpers OG
    views.js, shares.js
  middleware.js
```

---

## Frontmatter del post

Campos habituales: `title`, `subtitle`, `date`, `author`, `tags`, `image`, `imageAlt`, `views`, `shares`, `updated` (opcional).

**FAQ y HowTo (SEO)** — se renderizan automáticamente al final del cuerpo si el YAML es válido:

```yaml
faq:
  heading: "Opcional"
  items:
    - question: "…"
      answer: "Texto plano."
howTo:
  name: "…"
  description: "Opcional"
  steps:
    - name: "…"
      text: "…"
```

También acepta `how_to`. Los componentes `<FaqList />` / `<HowToSeo />` siguen disponibles en MDX para casos excepcionales; lo recomendable es no duplicar con el frontmatter.

---

## SEO, JSON-LD y discoverability

- **Layout por locale**: grafo `Organization` + `Person` + `WebSite` (incluye `SearchAction` → `/blog?q=`).
- **Por página**: `WebPage` / `CollectionPage`, `ItemList`, artículo con `Article`, `BreadcrumbList`, `SpeakableSpecification` (selectores `.article-speakable-*`, `.article-prose`).
- **FAQ / HowTo**: scripts adicionales cuando aplica (frontmatter o MDX).
- **Metadatos**: `alternates.languages` para hreflang, `authors` en posts, OG dinámico en artículos (`opengraph-image` por ruta).
- **`sitemap.xml`** y **`robots.txt`** generados en app.

`NEXT_PUBLIC_SITE_URL` debe ser el origen canónico (con o sin `www`, pero **uno solo**).

---

## Variables de entorno

| Variable | Uso |
|----------|-----|
| `NEXT_PUBLIC_SITE_URL` | URLs absolutas (OG, JSON-LD, sitemap, canonical) |
| `UPSTASH_REDIS_REST_URL` | Redis HTTP |
| `UPSTASH_REDIS_REST_TOKEN` | Token REST Upstash |

Sin Redis, el proyecto arranca; los contadores en producción no persistirían entre instancias.

Para sincronizar env a Vercel hay script y plantilla: `env.vercel.push.example` → copiar a `.env.vercel.push` y `npm run vercel:env-push`.

---

## Comandos

```bash
npm install
npm run dev      # usa webpack (Turbopack en algunos entornos Windows deja el puerto abierto sin responder)
npm run build
npm run start
npm run lint
```

Desarrollo: las rutas con locale suelen ser `/` (en) y `/es/...`. Comprueba cookie + interruptor de idioma en el footer (`?setLocale=`).

---

## Contenido e imágenes

- Estáticos: `public/images/…`.
- Imágenes en posts: rutas `/images/...` o URL absoluta si el dominio está permitido en `next.config` (actualmente sin `remotePatterns` extra).
- Subidas locales ignoradas: `public/images/uploads/` en `.gitignore`.

---

## Despliegue

Target natural: **Vercel** (Edge middleware, Redis regionalmente cercano). Asegura env vars y que el dominio en `NEXT_PUBLIC_SITE_URL` coincida con el que sirves.

---

## Licencia y créditos

Código del blog: uso personal del autor. Si reutilizas trozos, menciona la procedencia.

Next.js, Vercel, Upstash y el resto de dependencias siguen sus propias licencias.
