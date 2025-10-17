import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { CITIES_PATH } from '../../../lib/paths'
import { getContentFile, getAllSlugs } from '../../../lib/mdx'

// SEO dinâmico via frontmatter
export async function generateMetadata ({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const file = getContentFile(CITIES_PATH, slug)

  if (!file) return {}

  const { data } = file
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"; // ajuste para o domínio real
  const url = `${baseUrl}/cidades/${slug}`

  return {
    title: data.titulo ?? 'Cidade',
    description: data.resumo ?? `Informações sobre ${data.titulo ?? 'cidade'}.`,
    alternates: {
      canonical: url // 🔑 link rel="canonical"
    },
    openGraph: {
      title: data.titulo,
      description: data.resumo,
      url, // 🔑 URL absoluta
      images: data.imagem ? [{ url: `${baseUrl}${data.imagem}` }] : [],
      type: 'article'
    },
    twitter: {
      card: 'summary_large_image',
      title: data.titulo,
      description: data.resumo,
      images: data.imagem ? [`${baseUrl}${data.imagem}`] : []
    }
  }
}

// Gera rotas estáticas para cada cidade
export async function generateStaticParams () {
  const slugs = getAllSlugs(CITIES_PATH)
  return slugs.map(slug => ({ slug }))
}

export default async function CidadePage ({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const file = getContentFile(CITIES_PATH, slug)

  if (!file) return notFound()

  return (
    <article className='space-y-6'>
      <h1>{file.data.titulo}</h1>
      <p className='text-sm text-gray-500'>
        {file.data.estado} — {file.data.data}
      </p>
      <MDXRemote source={file.content} />
    </article>
  )
}
