import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const siteUrl = rawUrl && !rawUrl.includes('localhost') ? rawUrl : 'https://lennydev.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dev/', '/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
