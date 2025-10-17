import { CONTACT_EMAIL, PLATFORM_NAME, PROJECT_NAME } from '@ruasvivas/lib'

export default function PrivacidadePage () {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>Política de Privacidade – {PLATFORM_NAME}</h1>
      <p>
        A {PLATFORM_NAME} valoriza sua privacidade. Esta Política descreve como
        coletamos, usamos e protegemos seus dados ao utilizar nossos serviços,
        incluindo o projeto {PROJECT_NAME}.
      </p>

      <h2>1. Dados Coletados</h2>
      <p>
        Podemos coletar informações como nome, e-mail, telefone e mensagens
        enviadas via WhatsApp.
      </p>

      <h2>2. Uso dos Dados</h2>
      <p>
        Os dados são utilizados para oferecer suporte, melhorar a experiência e
        enviar comunicações relacionadas à plataforma.
      </p>

      <h2>3. Compartilhamento</h2>
      <p>
        Não vendemos seus dados. Podemos compartilhar apenas com prestadores de
        serviço essenciais (ex.: hospedagem, APIs de comunicação).
      </p>

      <h2>4. Segurança</h2>
      <p>
        Adotamos medidas técnicas e organizacionais para proteger suas
        informações.
      </p>

      <h2>5. Direitos do Usuário</h2>
      <p>
        Você pode solicitar a exclusão ou atualização de seus dados a qualquer
        momento, entrando em contato conosco.
      </p>

      <h2>6. Contato</h2>
      <p>
        Para exercer seus direitos, escreva para:{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
    </main>
  )
}
