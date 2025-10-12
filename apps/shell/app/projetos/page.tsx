import Link from 'next/link'
import Image from 'next/image'
import { ProjectCard } from '@ruasvivas/ui'
import { projects } from '../../dados/projetos'

export default function ProjetosPage () {
  return (
    <section className='space-y-8'>
      <h1>Projetos</h1>
      <p>
        Ferramentas, microfrontends e experimentos que desenvolvi para entender
        e transformar as cidades.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {projects.map(projeto => (
          <ProjectCard
            key={projeto.slug}
            title={projeto.titulo}
            description={projeto.descricao}
            image={
              <div className='relative w-full h-48'>
                <Image
                  src={projeto.imagem}
                  alt={projeto.titulo}
                  fill
                  className='object-cover'
                />
              </div>
            }
            link={
              <Link href={`/projetos/${projeto.slug}`}>
                <h2 className='hover:underline'>{projeto.titulo}</h2>
              </Link>
            }
          />
        ))}
      </div>
    </section>
  )
}
