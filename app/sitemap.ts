import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { getPublishedServiceSlugs } from '@/lib/content/services'
import { getPublishedCounsellorSlugs } from '@/lib/content/counsellors'

// Regenerated at most once an hour, so services/counsellors added from /admin
// appear in the sitemap without a redeploy.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/services`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/support`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/events`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/counsellors`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/faqs`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/testimonials`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
  ].map((p) => ({ ...p, lastModified: now })) as MetadataRoute.Sitemap

  const [serviceSlugs, counsellorSlugs] = await Promise.all([
    getPublishedServiceSlugs(),
    getPublishedCounsellorSlugs(),
  ])

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${base}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const counsellorPages: MetadataRoute.Sitemap = counsellorSlugs.map((slug) => ({
    url: `${base}/counsellors/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...counsellorPages]
}
