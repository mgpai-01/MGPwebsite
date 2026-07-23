import type { MetadataRoute } from 'next'

const SITE = 'https://www.manufacturinggreenproducts.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const anchors = ['', '#products', '#industries', '#sustainability', '#about', '#locations', '#faq', '#quote']
  const pages = ['kirk-gibson']
  return [
    ...anchors.map((r) => ({
      url: `${SITE}/${r ? r : ''}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: r === '' ? 1 : 0.7,
    })),
    ...pages.map((r) => ({
      url: `${SITE}/${r}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
