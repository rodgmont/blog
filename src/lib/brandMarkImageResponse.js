import { ImageResponse } from 'next/og';
import { brandMarkInner } from '@/lib/brandMarkIcon';

/** Inter Black (900), latín — CDN estable para runtime edge (favicon / PWA). */
const INTER_BLACK_WOFF =
  'https://cdn.jsdelivr.net/npm/@fontsource/inter@5.2.5/files/inter-latin-900-normal.woff';

export async function createBrandMarkImageResponse({ diameter, fontSize }) {
  const data = await fetch(INTER_BLACK_WOFF).then((res) => res.arrayBuffer());

  return new ImageResponse(brandMarkInner({ diameter, fontSize }), {
    width: diameter,
    height: diameter,
    fonts: [{ name: 'Inter', data, style: 'normal', weight: 900 }],
  });
}
