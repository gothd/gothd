import Link from 'next/link'
import { TimelineItem } from '@ruasvivas/ui'
import { expeditions } from '../../dados/expedicoes'

export default function ExpedicoesPage () {
  return (
    <section className='space-y-8'>
      <h1>Expedições</h1>
      <p>
        Percursos urbanos realizados para observar, documentar e compreender as
        dinâmicas das cidades brasileiras.
      </p>

      <div className='space-y-6'>
        {expeditions.map(expedicao => (
          <TimelineItem
            key={expedicao.slug}
            title={expedicao.titulo}
            date={expedicao.data}
            summary={expedicao.resumo}
            link={
              <Link href={`/expedicoes/${expedicao.slug}`}>
                <span className='hover:underline'>Ver detalhes</span>
              </Link>
            }
          />
        ))}
      </div>
    </section>
  )
}
