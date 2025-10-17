import Link from "next/link";

export default function HomePage () {
  return (
    <section className='space-y-8'>
      <h2 className='text-4xl font-extrabold text-ruas-cinza'>
        Laboratório nômade de cidades
      </h2>
      <p className='text-lg text-gray-600 leading-relaxed max-w-2xl'>
        Com os pés nas ruas, documento cada lugar por onde passo, transformo
        observações em design, dados e tecnologia. Aqui você encontra minhas
        expedições, projetos e ferramentas para enxergar o Brasil de perto.
      </p>

      <div className='bg-ruas-verde text-white p-6 rounded-lg shadow-md'>
        <h3 className='text-2xl font-semibold mb-2'>Última cidade visitada</h3>
        <p className='text-lg'>Várzea da Roça, Bahia</p>
        <Link
          href='/cidades/varzea-da-roca'
          className='mt-4 inline-block bg-white text-ruas-verde px-4 py-2 rounded hover:bg-gray-100'
        >
          Ver detalhes
        </Link>
      </div>
    </section>
  )
}
