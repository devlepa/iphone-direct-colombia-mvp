export type RecommendationOption =
  | "NEW"
  | "CERTIFIED_USED"
  | "REPAIR"
  | "TRADE_IN";

export type RecommendationAlternative = {
  option: RecommendationOption;
  productId?: string;
  label: string;
  score: number;
  reasons: string[];
  assumptions: string[];
  estimatedGrossCostCop: number;
  estimatedTradeInCop: number;
  estimatedNetCostCop: number;
  requiresHumanReview: boolean;
};

export type Recommendation = RecommendationAlternative & {
  primaryOption: RecommendationOption;
  alternatives: RecommendationAlternative[];
};
