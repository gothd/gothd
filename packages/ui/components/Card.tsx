import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card ({ children, className }: CardProps) {
  return (
    <div
      className={`relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden ${
        className ?? ''
      }`}
    >
      {children}
    </div>
  )
}
