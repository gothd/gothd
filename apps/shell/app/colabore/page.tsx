export default function ColaborePage () {
  return (
    <section className='space-y-8 max-w-xl'>
      <h1>Colabore com o projeto</h1>
      <p>
        Envie seu relato urbano, observação ou sugestão. Você pode contribuir
        anonimamente.
      </p>

      <form className='space-y-4'>
        <input
          type='text'
          placeholder='Cidade / Rua'
          className='w-full border border-gray-300 rounded px-4 py-2'
        />
        <textarea
          placeholder='Seu relato'
          rows={4}
          className='w-full border border-gray-300 rounded px-4 py-2'
        />
        <input type='file' className='w-full text-sm text-gray-600' />
        <button
          type='submit'
          className='bg-ruas-verde text-white px-4 py-2 rounded hover:bg-green-700 font-semibold'
        >
          Enviar
        </button>
      </form>
    </section>
  )
}
