import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://theartpressasia.com'

  // Fetch all published articles from Supabase
  const { data: articles } = await supabase
    .from('articles')
    .select('slug, created_at')
    .eq('status', 'published')

  const articleEntries: MetadataRoute.Sitemap = (articles || []).map((article) => ({
    url: `${baseUrl}/magazine/${article.slug}`,
    lastModified: article.created_at ? new Date(article.created_at) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/magazine`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/people`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  return [...staticPages, ...articleEntries]
}
