import { loadLocalValue, saveLocalValue, STORAGE_KEYS } from "./storage";

export type AnalyticsEventName =
  | "advisor_started"
  | "advisor_step_completed"
  | "advisor_abandoned"
  | "recommendation_generated"
  | "recommendation_viewed"
  | "alternative_selected"
  | "whatsapp_clicked"
  | "diagnosis_requested"
  | "trade_in_requested"
  | "purchase_intent_submitted";

export type AnalyticsEvent = {
  name: AnalyticsEventName;
  sessionId: string;
  occurredAt: string;
  metadata?: Record<string, string | number | boolean>;
};

export function trackEvent(
  name: AnalyticsEventName,
  sessionId: string,
  metadata?: AnalyticsEvent["metadata"],
) {
  const events = loadLocalValue<AnalyticsEvent[]>(STORAGE_KEYS.analytics) ?? [];
  const previousEvent = events.at(-1);
  const isImmediateDuplicate =
    previousEvent?.name === name &&
    previousEvent.sessionId === sessionId &&
    Date.now() - new Date(previousEvent.occurredAt).getTime() < 1_000;

  if (isImmediateDuplicate) return;

  const nextEvent: AnalyticsEvent = {
    name,
    sessionId,
    occurredAt: new Date().toISOString(),
    ...(metadata ? { metadata } : {}),
  };

  saveLocalValue(STORAGE_KEYS.analytics, [...events.slice(-99), nextEvent]);
}
