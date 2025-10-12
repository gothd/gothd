import Logo from '../components/Logo'
import { Cinzel, Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500']
})
const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['600', '700']
})

export const metadata = {
  title: 'Ruas Vivas',
  description:
    'Laboratório nômade de cidades, documentando cada lugar por onde passo, transformo observações em design, dados e tecnologia.'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='pt-BR' className={`${inter.variable} ${cinzel.variable}`}>
      <body className='font-sans antialiased'>
        <header className='border-b border-gray-200 bg-white shadow-sm'>
          <div className='max-w-5xl mx-auto px-4 py-4 flex justify-between items-center'>
            <Link href='/'>
              <h1>
                <Logo type='monograma' width={64} />
              </h1>
            </Link>
            <nav className='space-x-6 text-gray-700'>
              <a href='/cidades' className='hover:text-ruas-verde'>
                Cidades
              </a>
              <a href='/projetos' className='hover:text-ruas-verde'>
                Projetos
              </a>
              <a href='/expedicoes' className='hover:text-ruas-verde'>
                Expedições
              </a>
              <a href='/colabore' className='hover:text-ruas-verde'>
                Colabore
              </a>
              <a href='/sobre' className='hover:text-ruas-verde'>
                Sobre
              </a>
            </nav>
          </div>
        </header>
        <main className='max-w-5xl mx-auto px-4 py-10'>{children}</main>
        <footer className='border-t border-gray-200 text-center py-6 text-sm text-gray-500'>
          © {new Date().getFullYear()} <Logo type='wordmark' /> — com os pés nas
          ruas
        </footer>
      </body>
    </html>
  )
}
