import { projects } from '../../../dados/projetos'
import { notFound } from 'next/navigation'

export default async function ProjetoPage ({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params // ✅ Next.js 15: params é Promise

  const projeto = projects.find(p => p.slug === slug)

  if (!projeto) return notFound()

  return (
    <section className='space-y-6'>
      <h1>{projeto.titulo}</h1>
      <p className='text-sm text-gray-500'>Projeto experimental</p>
      <div className='prose'>
        <p>{projeto.descricao}</p>
        {/* Aqui você pode expandir com capturas de tela, diagramas, links para repositórios, etc. */}
      </div>
    </section>
  )
}
