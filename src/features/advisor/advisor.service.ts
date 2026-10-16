import { BUSINESS_RULES } from "@/config/business-rules";
import type { CustomerProfile } from "@/domain/customer-profile";
import type { CurrentDevice } from "@/domain/device";
import type { Product } from "@/domain/product";
import type {
  Recommendation,
  RecommendationAlternative,
} from "@/domain/recommendation";
import type { AdvisorCatalogs, AdvisorInput } from "./advisor.types";

const TEST_DATA_ASSUMPTION =
  "Los valores son simulados y deben confirmarse con inventario, diagnóstico e inspección.";

function scoreBudget(costCop: number, profile: CustomerProfile) {
  return costCop <= profile.budgetCop
    ? BUSINESS_RULES.scoring.withinBudget
    : BUSINESS_RULES.scoring.overBudget;
}

function budgetReason(costCop: number, profile: CustomerProfile) {
  return costCop <= profile.budgetCop
    ? "El costo estimado se mantiene dentro del presupuesto indicado."
    : "El costo estimado supera el presupuesto y requiere revisar el alcance o las alternativas.";
}

function matchesProductPriority(product: Product, profile: CustomerProfile) {
  if (profile.priority === "WARRANTY") return product.warrantyDays >= 365;
  if (profile.priority === "PRICE") return product.condition === "CERTIFIED_USED";
  if (profile.priority === "LONGEVITY") return product.condition === "NEW";
  if (profile.priority === "CAMERA" || profile.priority === "PERFORMANCE") {
    return /15|16/.test(product.model);
  }
  return false;
}

function buildProductCandidate(
  product: Product,
  profile: CustomerProfile,
): RecommendationAlternative {
  const option = product.condition === "NEW" ? "NEW" : "CERTIFIED_USED";
  const reasons = [budgetReason(product.priceCop, profile)];
  let score = scoreBudget(product.priceCop, profile);

  if (profile.objective === "BUY" || profile.objective === "UNSURE") {
    score += BUSINESS_RULES.scoring.matchesObjective;
    reasons.push("Responde a tu intención de encontrar un equipo de reemplazo.");
  }

  if (matchesProductPriority(product, profile)) {
    score += BUSINESS_RULES.scoring.matchesPriority;
    reasons.push("Coincide con la prioridad principal que seleccionaste.");
  }

  if (product.warrantyDays > 0) {
    score += BUSINESS_RULES.scoring.verifiedWarranty;
    reasons.push(`Incluye ${product.warrantyDays} días de garantía en los datos de prueba.`);
  }

  if (product.condition === "CERTIFIED_USED" && profile.acceptsCertifiedUsed) {
    score += BUSINESS_RULES.scoring.acceptsCertifiedUsed;
  }

  return {
    option,
    productId: product.id,
    label: `${product.model} ${product.storageGb} GB${
      product.condition === "CERTIFIED_USED" ? " usado certificado" : " nuevo"
    }`,
    score,
    reasons: reasons.slice(0, 4),
    assumptions: [TEST_DATA_ASSUMPTION],
    estimatedGrossCostCop: product.priceCop,
    estimatedTradeInCop: 0,
    estimatedNetCostCop: product.priceCop,
    requiresHumanReview: false,
  };
}

function estimateRepairCost(device: CurrentDevice, catalogs: AdvisorCatalogs) {
  const matchedOptions = catalogs.repairOptions.filter((option) =>
    device.knownFailures.includes(option.failureCategory),
  );

  if (matchedOptions.length === 0) return 180_000;

  return matchedOptions.reduce((total, option) => total + option.estimatedCostCop, 0);
}

function buildRepairCandidate(
  input: AdvisorInput,
  catalogs: AdvisorCatalogs,
): RecommendationAlternative | null {
  if (!input.currentDevice) return null;

  const { profile, currentDevice } = input;
  const cost = estimateRepairCost(currentDevice, catalogs);
  const replacement = catalogs.products
    .filter((product) => product.available)
    .sort((a, b) => a.priceCop - b.priceCop)[0];
  const isEconomical = replacement
    ? cost / replacement.priceCop <= BUSINESS_RULES.maxRepairToReplacementRatio
    : false;
  let score = scoreBudget(cost, profile) + BUSINESS_RULES.scoring.pendingDiagnosis;
  const reasons = [
    budgetReason(cost, profile),
    "Conservar el equipo evita reemplazarlo antes de contar con un diagnóstico.",
    "La conveniencia final depende de una inspección técnica presencial.",
  ];

  if (profile.objective === "REPAIR" || profile.objective === "UNSURE") {
    score += BUSINESS_RULES.scoring.matchesObjective;
  }

  if (isEconomical) {
    score += BUSINESS_RULES.scoring.economicalRepair;
    reasons.unshift("El estimado preliminar es bajo frente al reemplazo disponible de menor costo.");
  }

  return {
    option: "REPAIR",
    label: "Reparar el equipo actual",
    score,
    reasons: reasons.slice(0, 4),
    assumptions: [TEST_DATA_ASSUMPTION, "La falla declarada no sustituye el diagnóstico técnico."],
    estimatedGrossCostCop: cost,
    estimatedTradeInCop: 0,
    estimatedNetCostCop: cost,
    requiresHumanReview: BUSINESS_RULES.requireHumanReviewForRepair,
  };
}

function estimateTradeIn(device: CurrentDevice, catalogs: AdvisorCatalogs) {
  const base = catalogs.tradeInValues.find(
    (value) => value.model === device.model && value.storageGb === device.storageGb,
  );
  if (!base) return 0;

  let factor = 1;
  if (device.screenCondition === "DAMAGED") factor -= 0.2;
  if (device.cameraCondition === "DAMAGED") factor -= 0.15;
  if (device.bodyCondition === "WORN") factor -= 0.1;
  if (device.bodyCondition === "DAMAGED") factor -= 0.2;
  if (device.batteryHealth && device.batteryHealth < 80) factor -= 0.1;
  if (device.previousRepairs) factor -= 0.05;

  return Math.max(0, Math.round((base.estimatedValueCop * factor) / 50_000) * 50_000);
}

function buildTradeInCandidate(
  input: AdvisorInput,
  products: RecommendationAlternative[],
  catalogs: AdvisorCatalogs,
): RecommendationAlternative | null {
  if (!input.currentDevice || products.length === 0) return null;

  const tradeIn = estimateTradeIn(input.currentDevice, catalogs);
  if (tradeIn === 0) return null;

  const replacement = [...products].sort(
    (a, b) => a.estimatedGrossCostCop - b.estimatedGrossCostCop,
  )[0];
  const netCost = Math.max(0, replacement.estimatedGrossCostCop - tradeIn);
  let score = scoreBudget(netCost, input.profile) + BUSINESS_RULES.scoring.reducesNetCostWithTradeIn;

  if (input.profile.objective === "TRADE_IN" || input.profile.objective === "UNSURE") {
    score += BUSINESS_RULES.scoring.matchesObjective;
  }

  return {
    option: "TRADE_IN",
    productId: replacement.productId,
    label: `Entregar tu equipo y renovar por ${replacement.label}`,
    score,
    reasons: [
      budgetReason(netCost, input.profile),
      "El valor preliminar de retoma reduce el desembolso de la renovación.",
      "La retoma y el estado del equipo deben confirmarse mediante inspección.",
    ],
    assumptions: [TEST_DATA_ASSUMPTION, "El valor de retoma no es una oferta definitiva."],
    estimatedGrossCostCop: replacement.estimatedGrossCostCop,
    estimatedTradeInCop: tradeIn,
    estimatedNetCostCop: netCost,
    requiresHumanReview: BUSINESS_RULES.requireInspectionForTradeIn,
  };
}

export function generateRecommendation(
  input: AdvisorInput,
  catalogs: AdvisorCatalogs,
): Recommendation {
  const availableProducts = catalogs.products.filter(
    (product) =>
      product.available &&
      (product.condition === "NEW" ||
        (input.profile.acceptsCertifiedUsed &&
          (product.batteryHealth ?? 0) >= BUSINESS_RULES.minimumCertifiedBatteryHealth)),
  );
  const productCandidates = availableProducts.map((product) =>
    buildProductCandidate(product, input.profile),
  );
  const repairCandidate = buildRepairCandidate(input, catalogs);
  const tradeInCandidate = buildTradeInCandidate(input, productCandidates, catalogs);
  const candidates = [
    ...productCandidates,
    ...(repairCandidate ? [repairCandidate] : []),
    ...(tradeInCandidate ? [tradeInCandidate] : []),
  ].sort(
    (a, b) => b.score - a.score || a.estimatedNetCostCop - b.estimatedNetCostCop,
  );

  const [primary, ...remaining] = candidates;

  if (!primary) {
    throw new Error("No hay alternativas disponibles para generar una recomendación.");
  }

  return {
    ...primary,
    primaryOption: primary.option,
    alternatives: remaining.slice(0, BUSINESS_RULES.maximumAlternativesShown - 1),
  };
}
