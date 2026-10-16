export const BUSINESS_RULES = {
  maxRepairToReplacementRatio: 0.3,
  minimumCertifiedBatteryHealth: 85,
  maximumAlternativesShown: 3,
  requireInspectionForTradeIn: true,
  requireHumanReviewForRepair: true,
  scoring: {
    matchesObjective: 40,
    withinBudget: 30,
    matchesPriority: 20,
    verifiedWarranty: 15,
    reducesNetCostWithTradeIn: 10,
    economicalRepair: 20,
    acceptsCertifiedUsed: 8,
    pendingDiagnosis: -10,
    overBudget: -30,
  },
} as const;
