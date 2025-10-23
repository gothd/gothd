import { sendTemplate, sendMainMenu, sendSubmenuCriarSite, sendSubmenuRuasVivas, sendMessage } from "./whatsappService";

export const botConfig = {
  greetings: async (from: string, customerName: string) => {
    await sendTemplate(from, "confirmacao_contato", [customerName, "Gothd"]);
    await sendMainMenu(from, customerName);
  },

  criar_site: async (from: string) => {
    await sendSubmenuCriarSite(from);
  },

  ruas_vivas: async (from: string) => {
    await sendSubmenuRuasVivas(from);
  },

  fallback: async (from: string, reason?: string, rawMessage?: any) => {
    // 🚨 Log de auditoria
    console.warn("[FALLBACK]", {
      from,
      reason: reason || "Texto/Interação não reconhecida",
      rawMessage
    });

    // Reapresenta o menu
    await sendMessage(from, {
      type: "interactive",
      interactive: {
        type: "button",
        body: {
          text: "Não entendi 🤔. Por favor, escolha uma das opções abaixo:"
        },
        action: {
          buttons: [
            { type: "reply", reply: { id: "criar_site", title: "Criar site" } },
            { type: "reply", reply: { id: "ruas_vivas", title: "Ruas Vivas" } }
          ]
        }
      }
    });
  },


  sendMessage,
};
