import { MetadataRoute } from 'next';
import { profile } from '@/content/profile';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — Portfolio`,
    short_name: profile.name,
    description: profile.positioning,
    start_url: '/',
    display: 'standalone',
    background_color: '#D9CBB0',
    theme_color: '#D9CBB0',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
