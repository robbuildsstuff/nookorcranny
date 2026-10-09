import type { MetadataRoute } from 'next';
import { siteUrl } from '@/components/desktop/siteUrl';

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1 }];
}
