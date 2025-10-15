'use client'

import { Cinzel, Inter } from 'next/font/google'
import '@ruasvivas/assets/globals.css'
import { PropsWithChildren, useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@ruasvivas/lib/utils'

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

export default function RootLayout ({ children }: PropsWithChildren) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Carregar estado salvo no localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed')
    if (saved) {
      setIsCollapsed(saved === 'true')
    }
  }, [])

  // Salvar sempre que mudar
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(isCollapsed))
  }, [isCollapsed])

  return (
    <html lang='pt-BR'>
      <body className='flex h-screen bg-gray-50'>
        {/* Sidebar */}
        <aside
          className={`${
            isCollapsed ? 'w-16' : 'w-52'
          } bg-white shadow-md transition-all duration-300 flex flex-col`}
        >
          {/* Header da sidebar */}
          <div className='flex gap-2 p-4 h-14 items-center justify-between border-b'>
            <span
              className={`font-bold text-xl ${
                isCollapsed ? 'hidden' : 'block'
              }`}
            >
              Sistema
            </span>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className='w-full flex justify-center items-center rounded hover:bg-gray-100'
            >
              {isCollapsed ? '➡️' : '⬅️'}
            </button>
          </div>

          {/* Navegação */}
          <nav className='flex-1 flex items-center flex-col p-4 space-y-2'>
            <Link
              href='/'
              className={cn(
                'w-full flex items-center justify-center gap-2 rounded hover:bg-gray-100',
                { ['p-2 justify-start']: !isCollapsed }
              )}
            >
              <span>🏠</span>
              {!isCollapsed && <span>Dashboard</span>}
            </Link>
            <Link
              href='/usuarios'
              className={cn(
                'w-full flex items-center justify-center gap-2 rounded hover:bg-gray-100',
                { ['p-2 justify-start']: !isCollapsed }
              )}
            >
              <span>👥</span>
              {!isCollapsed && <span>Usuários</span>}
            </Link>
            <Link
              href='/config'
              className={cn(
                'w-full flex items-center justify-center gap-2 rounded hover:bg-gray-100',
                { ['p-2 justify-start']: !isCollapsed }
              )}
            >
              <span>⚙️</span>
              {!isCollapsed && <span>Configurações</span>}
            </Link>
          </nav>
        </aside>

        {/* Conteúdo principal */}
        <div className='flex-1 flex flex-col'>
          {/* Header */}
          <header className='h-14 bg-white shadow flex items-center justify-between px-4'>
            <span className='font-medium'>Bem-vindo, Ruan</span>
            <button className='px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700'>
              Sair
            </button>
          </header>

          {/* Main */}
          <main className='flex-1 p-6 overflow-y-auto'>{children}</main>
        </div>
      </body>
    </html>
  )
}
