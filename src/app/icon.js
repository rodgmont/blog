import { createBrandMarkImageResponse } from '@/lib/brandMarkImageResponse';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default async function Icon() {
  return createBrandMarkImageResponse({ diameter: 32, fontSize: 20 });
}
