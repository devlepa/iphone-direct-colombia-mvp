import type { RecommendationOption } from "./recommendation";

export type QuoteAction = "PURCHASE" | "DIAGNOSIS" | "TRADE_IN" | "WHATSAPP";

export type QuoteRequest = {
  sessionId: string;
  selectedOption: RecommendationOption;
  action: QuoteAction;
  createdAt: string;
};
