export type CustomerObjective = "BUY" | "REPAIR" | "TRADE_IN" | "UNSURE";

export type PrimaryUse = "BASIC" | "STUDY" | "WORK" | "CAMERA" | "GAMING";

export type CustomerPriority =
  | "PRICE"
  | "WARRANTY"
  | "PERFORMANCE"
  | "CAMERA"
  | "LONGEVITY";

export type CustomerUrgency =
  | "TODAY"
  | "THIS_WEEK"
  | "THIS_MONTH"
  | "EXPLORING";

export type CustomerProfile = {
  sessionId: string;
  objective: CustomerObjective;
  budgetCop: number;
  primaryUse: PrimaryUse;
  acceptsCertifiedUsed: boolean;
  priority: CustomerPriority;
  urgency: CustomerUrgency;
};
