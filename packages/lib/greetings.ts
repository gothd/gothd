import { sendTemplate, sendMainMenu } from "./whatsappService";

/**
 * Fluxo de saudação inicial
 */
export async function greetings(from: string, customerName: string) {
  // 1. Confirmação de contato (template Utilidade)
  await sendTemplate(from, "confirmacao_contato", [customerName, "Gothd"]);

  // 2. Menu inicial (mensagem normal)
  await sendMainMenu(from, customerName);
}
