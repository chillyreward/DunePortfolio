import { images, type ImagePath } from './images.generated';
import type { ImageRef } from './schema';

export function img(path: ImagePath, alt: string): ImageRef {
  const meta = images[path];
  return {
    src: path,
    width: meta.width,
    height: meta.height,
    alt,
  };
}

export function decorativeImg(path: ImagePath): ImageRef {
  const meta = images[path];
  return {
    src: path,
    width: meta.width,
    height: meta.height,
    alt: '',
  };
}

export type { ImagePath };
