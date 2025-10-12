import { expeditions } from '../../../dados/expedicoes'
import { notFound } from 'next/navigation'

export default async function ExpedicaoPage ({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params // ✅ agora usamos await porque params é uma Promise

  const expedicao = expeditions.find(e => e.slug === slug)

  if (!expedicao) return notFound()

  return (
    <section className='space-y-6'>
      <h1>{expedicao.titulo}</h1>
      <p className='text-sm text-gray-500'>{expedicao.data}</p>
      <div className='prose'>
        <p>{expedicao.resumo}</p>
        {/* Aqui você pode expandir com fotos, mapas, vídeos, etc. */}
      </div>
    </section>
  )
}
