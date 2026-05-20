import type { MetadataRoute } from 'next'

const SITE = 'https://www.manufacturinggreenproducts.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes = ['', '#products', '#industries', '#sustainability', '#about', '#locations', '#faq', '#quote']
  return routes.map((r) => ({
    url: `${SITE}/${r ? r : ''}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: r === '' ? 1 : 0.7,
  }))
}
