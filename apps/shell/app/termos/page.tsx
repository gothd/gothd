// apps/shell/pages/termos.tsx
import { CONTACT_EMAIL, PLATFORM_NAME, PROJECT_NAME } from '@ruasvivas/lib'

export default function TermosPage () {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>Termos de Serviço – {PLATFORM_NAME}</h1>
      <p>
        Bem-vindo à {PLATFORM_NAME} 💜. Ao utilizar nossos serviços, incluindo o
        projeto {PROJECT_NAME}, você concorda com os presentes Termos de
        Serviço.
      </p>

      <h2>1. Uso da Plataforma</h2>
      <p>
        O uso é permitido apenas para maiores de 13 anos ou conforme a
        legislação local.
      </p>

      <h2>2. Responsabilidades do Usuário</h2>
      <p>
        Você se compromete a fornecer informações verdadeiras, não utilizar a
        plataforma para fins ilegais e respeitar outros usuários.
      </p>

      <h2>3. Limitações</h2>
      <p>
        A {PLATFORM_NAME} não se responsabiliza por indisponibilidades
        temporárias, falhas técnicas ou uso indevido da plataforma.
      </p>

      <h2>4. Alterações</h2>
      <p>
        Podemos atualizar estes Termos a qualquer momento. A versão mais recente
        estará sempre disponível em nosso site.
      </p>

      <h2>5. Contato</h2>
      <p>
        Em caso de dúvidas, entre em contato pelo e-mail:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </main>
  )
}
