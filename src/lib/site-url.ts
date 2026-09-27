/**
 * Safe site URL resolution for canonical URLs, metadataBase, sitemap, and schema.org.
 * Handles missing protocol, empty strings, whitespace, and Vercel system environment variables.
 */

export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (envUrl) {
    return envUrl.startsWith('http://') || envUrl.startsWith('https://')
      ? envUrl
      : `https://${envUrl}`;
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return 'https://lennydev.vercel.app';
}

export function getMetadataBase(): URL {
  try {
    return new URL(getSiteUrl());
  } catch {
    return new URL('https://lennydev.vercel.app');
  }
}
