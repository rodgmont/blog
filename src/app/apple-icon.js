import { createBrandMarkImageResponse } from '@/lib/brandMarkImageResponse';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function AppleIcon() {
  return createBrandMarkImageResponse({ diameter: 180, fontSize: 112 });
}
