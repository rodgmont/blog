import { createBrandMarkImageResponse } from '@/lib/brandMarkImageResponse';

export const runtime = 'edge';

export async function GET() {
  return createBrandMarkImageResponse({ diameter: 192, fontSize: 120 });
}
