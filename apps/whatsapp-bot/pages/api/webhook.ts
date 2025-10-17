import type { NextApiRequest, NextApiResponse } from 'next'
import { PLATFORM_NAME, PROJECT_NAME } from '@ruasvivas/lib'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN
    const mode = req.query['hub.mode']
    const token = req.query['hub.verify_token']
    const challenge = req.query['hub.challenge']

    if (mode === 'subscribe' && token === verifyToken) {
      return res.status(200).send(challenge)
    } else {
      return res.status(403).end()
    }
  }

  if (req.method === 'POST') {
    const body = req.body
    const entry = body.entry?.[0]
    const changes = entry?.changes?.[0]
    const message = changes?.value?.messages?.[0]

    if (message) {
      const from = message.from
      const text = message.text?.body?.toLowerCase()
      const buttonReply = message.button?.payload

      console.log(`Mensagem recebida de ${from}: ${text || buttonReply}`)

      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

      // --- MENU INICIAL ---
      if (
        text &&
        (text.includes('oi') || text.includes('olá') || text.includes('ola'))
      ) {
        await sendInteractive(from, {
          text: `Olá 👋, eu sou o Göst, assistente da ${PLATFORM_NAME} 💜\nPosso te ajudar em duas frentes:`,
          buttons: [
            { id: 'criar_site', title: '🌐 Criar site' },
            { id: 'ruas_vivas', title: `🌱 ${PROJECT_NAME}` }
          ]
        })
      }

      // --- SUBMENU CRIAR SITE ---
      if (buttonReply === 'criar_site') {
        await sendInteractive(from, {
          text: `Perfeito 🚀! Eu, Göst 💜, posso te ajudar com seu site. Escolha uma opção:`,
          buttons: [
            { id: 'precos', title: '💰 Preços e prazos' },
            { id: 'humano', title: '🙋 Falar com humano' }
          ]
        })
      }

      // --- SUBMENU RUAS VIVAS ---
      if (buttonReply === 'ruas_vivas') {
        await sendInteractive(from, {
          text: `O ${PROJECT_NAME} 🌱 é um projeto da ${PLATFORM_NAME} 💜. O que você gostaria de explorar?`,
          buttons: [
            { id: 'expedicoes', title: '🗺️ Expedições' },
            { id: 'forum', title: '💬 Fórum' },
            { id: 'novidades', title: '🔔 Receber novidades' }
          ]
        })
      }

      // --- RESPOSTAS FINAIS ---

      // Criar site → Preços e prazos
      if (buttonReply === 'precos') {
        await sendText(
          from,
          `Tabela de preços 💰:\n- Site básico: R$ 1.500\n- Site profissional: R$ 3.000\n- Prazo: 15 a 30 dias 💜`
        )
      }

      // Criar site → Falar com humano
      if (buttonReply === 'humano') {
        await sendText(
          from,
          `Beleza 🙋! Vou te conectar com alguém da equipe da ${PLATFORM_NAME} 💜. Pode me passar seu e-mail?`
        )
      }

      // Ruas Vivas → Expedições
      if (buttonReply === 'expedicoes') {
        await sendText(
          from,
          `Confira as expedições 🗺️: ${siteUrl}/expedicoes 💜`
        )
      }

      // Ruas Vivas → Fórum
      if (buttonReply === 'forum') {
        await sendText(from, `Participe do fórum 💬: ${siteUrl}/forum 💜`)
      }

      // Ruas Vivas → Novidades
      if (buttonReply === 'novidades') {
        await sendText(
          from,
          `Você se inscreveu para receber novidades 🔔. O Göst 💜 vai te avisar sempre que houver algo novo!`
        )
      }
    }

    return res.status(200).end()
  }

  return res.status(405).end()
}

// --- Funções auxiliares ---
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
