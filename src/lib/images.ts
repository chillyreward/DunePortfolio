import type { ImageRef } from '@/content/schema';

/**
 * Picks the desktop capture or cover from an image list.
 */
export function pickDesktop(images: readonly ImageRef[] | ImageRef[], fallback: ImageRef): ImageRef {
  const desktop = images.find((img) => img.src.includes('desktop'));
  return desktop ?? fallback;
}

/**
 * Picks the mobile capture from an image list if available, otherwise desktop.
 */
export function pickMobile(images: readonly ImageRef[] | ImageRef[], fallback: ImageRef): ImageRef {
  const mobile = images.find((img) => img.src.includes('mobile'));
  return mobile ?? fallback;
}
