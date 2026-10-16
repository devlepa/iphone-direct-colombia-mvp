export const STORAGE_KEYS = {
  advisorDraft: "iphone-direct:advisor-draft:v1",
  recommendation: "iphone-direct:recommendation:v1",
  analytics: "iphone-direct:analytics:v1",
} as const;

export function loadLocalValue<T>(key: string): T | null {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

export function saveLocalValue<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeLocalValue(key: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}
