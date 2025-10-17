import { MetadataRoute } from 'next'
import { getAllContent } from '../lib/mdx'
import { EXPEDITIONS_PATH, CITIES_PATH, PROJECTS_PATH } from '../lib/paths'
import { TERMS_URL, PRIVACY_URL } from '@ruasvivas/lib'

export default function sitemap (): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"; // ajuste para o domínio real

  const expeditions: MetadataRoute.Sitemap = getAllContent(
    EXPEDITIONS_PATH
  ).map(({ slug, data }) => {
    const expeditionISODate = new Date(data.data).toISOString()
    const date = new Date()
    return {
      url: `${baseUrl}/expedicoes/${slug}`,
      lastModified: data.data ? expeditionISODate : date.toISOString(),
      changeFrequency: 'weekly',
      priority:
        date.getTime() > date.getTime() - 365 * 24 * 60 * 60 * 1000 // 1 ano,
          ? 0.8
          : 0.5
    }
  })

  const cities: MetadataRoute.Sitemap = getAllContent(CITIES_PATH).map(
    ({ slug, data }) => ({
      url: `${baseUrl}/cidades/${slug}`,
      changeFrequency: 'monthly',
      lastModified: data.data
        ? new Date(data.data).toISOString()
        : new Date().toISOString(),
      priority: 0.7
    })
  )

  const projects: MetadataRoute.Sitemap = getAllContent(PROJECTS_PATH).map(
    ({ slug, data }) => ({
      url: `${baseUrl}/projetos/${slug}`,
      lastModified: data.data
        ? new Date(data.data).toISOString()
        : new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6
    })
  )

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1
    },
    ...expeditions,
    ...cities,
    ...projects,
    {
      url: `${baseUrl}${TERMS_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: `${baseUrl}${PRIVACY_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ]
}
