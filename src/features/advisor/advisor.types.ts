import type { CustomerProfile } from "@/domain/customer-profile";
import type { CurrentDevice } from "@/domain/device";
import type { Product } from "@/domain/product";
import type { Recommendation } from "@/domain/recommendation";
import type { RepairOption, TradeInValue } from "@/domain/valuation";

export type AdvisorInput = {
  profile: CustomerProfile;
  currentDevice?: CurrentDevice;
};

export type AdvisorCatalogs = {
  products: Product[];
  repairOptions: RepairOption[];
  tradeInValues: TradeInValue[];
};

export type RecommendationRecord = {
  input: AdvisorInput;
  recommendation: Recommendation;
  generatedAt: string;
};
