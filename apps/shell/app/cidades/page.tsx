import Link from 'next/link'
import Image from 'next/image'
import { CityCard } from '@ruasvivas/ui'
import { cities } from '../../dados/cidades'

export default function CidadesPage () {
  return (
    <section className='space-y-8'>
      <h1>Cidades</h1>
      <p>
        Locais visitados, estudados ou documentados em expedições urbanas. Cada
        cidade carrega histórias, desafios e inspirações.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {cities.map(cidade => (
          <CityCard
            key={cidade.slug}
            name={cidade.nome}
            state={cidade.estado}
            date={cidade.data}
            image={
              <div className='relative w-full h-48'>
                <Image
                  src={cidade.imagem}
                  alt={cidade.nome}
                  fill
                  className='object-cover'
                />
              </div>
            }
            link={
              <Link href={`/cidades/${cidade.slug}`}>
                <h2 className='hover:underline'>{cidade.nome}</h2>
              </Link>
            }
          />
        ))}
      </div>
    </section>
  )
}
