import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart', '/checkout', '/order'],
    },
    sitemap: 'https://shopcraft.example.com/sitemap.xml',
  };
}
