import type { RecommendationOption } from "@/domain/recommendation";

const optionLabels: Record<RecommendationOption, string> = {
  NEW: "comprar un equipo nuevo",
  CERTIFIED_USED: "comprar un usado certificado",
  REPAIR: "reparar mi equipo",
  TRADE_IN: "entregar mi equipo como parte de pago",
};

type WhatsAppMessageInput = {
  option: RecommendationOption;
  sessionId: string;
};

export function buildWhatsAppUrl({ option, sessionId }: WhatsAppMessageInput) {
  const configuredNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const phoneNumber = configuredNumber.replace(/\D/g, "");
  const message = [
    "Hola, completé la guía de iPhone Direct Colombia.",
    `Mi recomendación fue: ${optionLabels[option]}.`,
    `Mi identificador de sesión es: ${sessionId}.`,
    "Quiero continuar con un asesor.",
  ].join("\n");
  const recipient = phoneNumber.length >= 10 ? `/${phoneNumber}` : "/";

  return `https://wa.me${recipient}?text=${encodeURIComponent(message)}`;
}
