/** PWA ligero: iconos para Android Chrome / “Añadir a inicio” (rutas absolutas vía metadataBase en layout). */
export default function manifest() {
  return {
    name: 'Fran Rodgmont',
    short_name: 'Rodgmont',
    description:
      'Personal website, software engineering, and thoughts by Fran Rodgmont.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      { src: '/icon', sizes: '32x32', type: 'image/png', purpose: 'any' },
      { src: '/icons/192', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/512', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png', purpose: 'any' },
    ],
  };
}
