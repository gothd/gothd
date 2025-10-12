import { cities } from '../../../dados/cidades'
import { notFound } from 'next/navigation'

export default async function CidadePage ({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params // ✅ Next.js 15: params é Promise

  const cidade = cities.find(c => c.slug === slug)

  if (!cidade) return notFound()

  return (
    <section className='space-y-6'>
      <h1>{cidade.nome}</h1>
      <p className='text-sm text-gray-500'>
        {cidade.estado} — {cidade.data}
      </p>
      <div className='prose'>
        <p>
          Aqui você pode inserir uma descrição mais detalhada da cidade, fotos
          adicionais, mapas interativos ou até mesmo relatos de expedições
          realizadas no local.
        </p>
      </div>
    </section>
  )
}
