import Link from 'next/link'

export default function SobrePage () {
  return (
    <section className='space-y-8 max-w-2xl'>
      <h1>Sobre mim</h1>
      <p>
        Sou Ruan, desenvolvedor e designer nômade. Com os pés nas ruas, crio
        ferramentas para enxergar o Brasil de perto. Este projeto é meu
        laboratório vivo — onde tecnologia, cidade e gente se encontram.
      </p>

      <div className='mt-6 space-x-4'>
        <Link
          href='https://github.com/gothd'
          target='_blank'
          className='text-ruas-verde hover:underline'
        >
          GitHub
        </Link>
        <Link
          href='mailto:contato@ruasvivas.com.br'
          target='_blank'
          className='text-ruas-verde hover:underline'
        >
          Email
        </Link>
      </div>
    </section>
  )
}
