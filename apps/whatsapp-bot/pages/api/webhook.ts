import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 1. Validação inicial do webhook (Meta → Vercel)
  if (req.method === 'GET') {
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN
    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (mode === 'subscribe' && token === verifyToken) {
      return res.status(200).send(challenge) // devolve o "challenge" para validar
    } else {
      return res.status(403).end() // se o token não bate, bloqueia
    }
  }

  // 2. Quando o usuário manda mensagem (POST)
  if (req.method === 'POST') {
    const body = req.body
    const entry = body.entry?.[0]
    const changes = entry?.changes?.[0]
    const message = changes?.value?.messages?.[0]

    if (message) {
      const from = message.from // número do usuário
      const text = message.text?.body?.toLowerCase() // se digitou texto
      const buttonReply = message.button?.payload // se clicou em botão

      console.log(`Mensagem recebida de ${from}: ${text || buttonReply}`)

      // --- MENU INICIAL ---
      if (
        text &&
        (text.includes('oi') || text.includes('olá') || text.includes('ola'))
      ) {
        await sendInteractive(from, {
          text: 'Olá 👋, eu sou o Göst, assistente da GothD 💜\nPosso te ajudar em duas frentes:',
          buttons: [
            { id: 'criar_site', title: '🌐 Criar site' },
            { id: 'ruas_vivas', title: '🌱 Ruas Vivas' }
          ]
        })
      }

      // --- SUBMENU CRIAR SITE ---
      if (buttonReply === 'criar_site') {
        await sendInteractive(from, {
          text: 'Perfeito 🚀! Eu, Göst 💜, posso te ajudar com seu site. Escolha uma opção:',
          buttons: [
            { id: 'portfolio', title: '📂 Ver portfólio' },
            { id: 'precos', title: '💰 Preços e prazos' },
            { id: 'humano', title: '🙋 Falar com humano' }
          ]
        })
      }

      // --- SUBMENU RUAS VIVAS ---
      if (buttonReply === 'ruas_vivas') {
        await sendInteractive(from, {
          text: 'O Ruas Vivas 🌱 é um projeto da GothD 💜. O que você gostaria de explorar?',
          buttons: [
            { id: 'expedicoes', title: '🗺️ Expedições' },
            { id: 'forum', title: '💬 Fórum' },
            { id: 'novidades', title: '🔔 Receber novidades' }
          ]
        })
      }

      // --- RESPOSTAS FINAIS ---
      // --- RESPOSTAS FINAIS ---

      // Criar site → Portfólio
      if (buttonReply === 'portfolio') {
        await sendText(
          from,
          'Aqui está nosso portfólio 📂: https://gothd.com/portfolio 💜'
        )
      }

      // Criar site → Preços e prazos
      if (buttonReply === 'precos') {
        await sendText(
          from,
          'Tabela de preços 💰:\n- Site básico: R$ 1.500\n- Site profissional: R$ 3.000\n- Prazo: 15 a 30 dias 💜'
        )
      }

      // Criar site → Falar com humano
      if (buttonReply === 'humano') {
        await sendText(
          from,
          'Beleza 🙋! Vou te conectar com alguém da equipe da GothD 💜. Pode me passar seu e-mail?'
        )
      }

      // Ruas Vivas → Expedições
      if (buttonReply === 'expedicoes') {
        await sendText(
          from,
          'Confira as expedições 🗺️: https://ruasvivas.com/expedicoes 💜'
        )
      }

      // Ruas Vivas → Fórum
      if (buttonReply === 'forum') {
        await sendText(
          from,
          'Participe do fórum 💬: https://ruasvivas.com/forum 💜'
        )
      }

      // Ruas Vivas → Novidades
      if (buttonReply === 'novidades') {
        await sendText(
          from,
          'Você se inscreveu para receber novidades 🔔. O Göst 💜 vai te avisar sempre que houver algo novo!'
        )
      }
    }

    return res.status(200).end() // confirma recebimento ao Meta
  }

  return res.status(405).end() // método não permitido
}

// --- Funções auxiliares para simplificar ---
async function sendInteractive (
  to: string,
  opts: { text: string; buttons: { id: string; title: string }[] }
) {
  return fetch(
    `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'interactive',
        interactive: {
          type: 'button',
          body: { text: opts.text },
          action: {
            buttons: opts.buttons.map(b => ({ type: 'reply', reply: b }))
          }
        }
      })
    }
  )
}

async function sendText (to: string, message: string) {
  return fetch(
    `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: message }
      })
    }
  )
}
