import type { NextApiRequest, NextApiResponse } from "next";
import { botConfig, isGreeting, extractKeywords } from "@ruasvivas/lib";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token && mode === "subscribe" && token === verifyToken) {
      return res.status(200).send(challenge);
    } else {
      return res.status(403).end();
    }
  }

  if (req.method === "POST") {
    try {
      const entry = req.body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const messages = value?.messages;
      const contacts = value?.contacts;

      if (messages && messages[0]) {
        const msg = messages[0];
        const from = msg.from;
        const customerName = contacts?.[0]?.profile?.name || "Cliente";

        // Texto normal
        if (msg.type === "text") {
          const text = msg.text.body;

          if (isGreeting(text)) {
            await botConfig.greetings(from, customerName);
          } else {
            const keywords = extractKeywords(text);

            if (keywords.includes("site")) {
              await botConfig.criar_site(from);
            } else if (keywords.includes("ruas")) {
              await botConfig.ruas_vivas(from);
            } else {
              // 🚨 Fallback com log
              await botConfig.fallback(from, "Texto não reconhecido", msg);
            }
          }
        }

        // Caso seja clique em botão ou lista
        let buttonReplyId: string | undefined;

        if (msg.type === "interactive") {
          const interactive = msg.interactive;

          switch (interactive?.type) {
            case "button_reply":
              buttonReplyId = interactive.button_reply.id;
              break;
            case "list_reply":
              buttonReplyId = interactive.list_reply.id;
              break;
          }
        }

        if (buttonReplyId) {
          if (buttonReplyId === "criar_site") {
            await botConfig.criar_site(from);
          } else if (buttonReplyId === "ruas_vivas") {
            await botConfig.ruas_vivas(from);
          } else if (buttonReplyId === "criar_site_info") {
            await botConfig.sendMessage(from, {
              type: "text",
              text: { body: "Aqui estão mais informações sobre Criar site..." },
            });
          } else if (buttonReplyId === "ruas_vivas_info") {
            await botConfig.sendMessage(from, {
              type: "text",
              text: { body: "Aqui estão mais informações sobre Ruas Vivas..." },
            });
          } else {
            // 🚨 Fallback com log para interações inválidas
            await botConfig.fallback(from, "Interação inválida", msg);
          }
        }
      }

      return res.status(200).end();
    } catch (err) {
      console.error("Erro no webhook:", err);
      return res.status(500).end();
    }
  }

  return res.status(405).end();
}
