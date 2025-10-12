import { MetadataRoute } from 'next'
import { getAllContent } from '../lib/mdx'
import { EXPEDITIONS_PATH, CITIES_PATH, PROJECTS_PATH } from '../lib/paths'

export default function sitemap (): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.seusite.com' // ajuste para o domínio real

  const expeditions = getAllContent(EXPEDITIONS_PATH).map(({ slug, data }) => ({
    url: `${baseUrl}/expedicoes/${slug}`,
    lastModified: data.data
      ? new Date(data.data).toISOString()
      : new Date().toISOString()
  }))

  const cities = getAllContent(CITIES_PATH).map(({ slug, data }) => ({
    url: `${baseUrl}/cidades/${slug}`,
    lastModified: data.data
      ? new Date(data.data).toISOString()
      : new Date().toISOString()
  }))

  const projects = getAllContent(PROJECTS_PATH).map(({ slug, data }) => ({
    url: `${baseUrl}/projetos/${slug}`,
    lastModified: data.data
      ? new Date(data.data).toISOString()
      : new Date().toISOString()
  }))

  return [
    { url: baseUrl, lastModified: new Date().toISOString() },
    ...expeditions,
    ...cities,
    ...projects
  ]
}
