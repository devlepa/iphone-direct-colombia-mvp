import assert from "node:assert/strict";
import test from "node:test";
import type { CustomerProfile } from "@/domain/customer-profile";
import type { Product } from "@/domain/product";
import type { AdvisorCatalogs, AdvisorInput } from "./advisor.types";
import { advisorInputSchema } from "./advisor.schema";
import { generateRecommendation } from "./advisor.service";

const products: Product[] = [
  {
    id: "new-test",
    model: "iPhone nuevo de prueba",
    storageGb: 128,
    condition: "NEW",
    priceCop: 3_000_000,
    warrantyDays: 365,
    imeiVerified: true,
    componentsChecked: [],
    available: true,
    isTestData: true,
  },
  {
    id: "used-test",
    model: "iPhone usado de prueba",
    storageGb: 128,
    condition: "CERTIFIED_USED",
    priceCop: 1_500_000,
    batteryHealth: 90,
    warrantyDays: 90,
    imeiVerified: true,
    componentsChecked: ["pantalla", "cámaras"],
    available: true,
    isTestData: true,
  },
  {
    id: "unavailable-test",
    model: "iPhone no disponible",
    storageGb: 128,
    condition: "CERTIFIED_USED",
    priceCop: 500_000,
    batteryHealth: 95,
    warrantyDays: 90,
    imeiVerified: true,
    componentsChecked: ["pantalla"],
    available: false,
    isTestData: true,
  },
];

const catalogs: AdvisorCatalogs = {
  products,
  repairOptions: [
    {
      id: "battery-test",
      label: "Batería de prueba",
      failureCategory: "BATTERY",
      estimatedCostCop: 200_000,
      requiresDiagnosis: true,
      isTestData: true,
    },
  ],
  tradeInValues: [
    {
      model: "iPhone 12",
      storageGb: 128,
      estimatedValueCop: 900_000,
      requiresInspection: true,
      isTestData: true,
    },
  ],
};

function profile(overrides: Partial<CustomerProfile> = {}): CustomerProfile {
  return {
    sessionId: "session-test-001",
    objective: "BUY",
    budgetCop: 3_500_000,
    primaryUse: "STUDY",
    acceptsCertifiedUsed: true,
    priority: "PRICE",
    urgency: "THIS_MONTH",
    ...overrides,
  };
}

const currentDevice: NonNullable<AdvisorInput["currentDevice"]> = {
  model: "iPhone 12",
  storageGb: 128,
  batteryHealth: 82,
  screenCondition: "GOOD",
  cameraCondition: "GOOD",
  bodyCondition: "WORN",
  knownFailures: ["BATTERY"],
  previousRepairs: false,
  requiresTechnicalInspection: true,
};

test("recomienda nuevo cuando el cliente no acepta usados", () => {
  const result = generateRecommendation(
    { profile: profile({ acceptsCertifiedUsed: false, priority: "WARRANTY" }) },
    catalogs,
  );

  assert.equal(result.primaryOption, "NEW");
});

test("recomienda usado certificado con presupuesto limitado", () => {
  const result = generateRecommendation(
    { profile: profile({ budgetCop: 1_800_000 }) },
    catalogs,
  );

  assert.equal(result.primaryOption, "CERTIFIED_USED");
  assert.equal(result.productId, "used-test");
});

test("prioriza una reparación menor cuando ese es el objetivo", () => {
  const result = generateRecommendation(
    {
      profile: profile({
        objective: "REPAIR",
        budgetCop: 700_000,
        priority: "LONGEVITY",
      }),
      currentDevice,
    },
    catalogs,
  );

  assert.equal(result.primaryOption, "REPAIR");
  assert.equal(result.estimatedNetCostCop, 200_000);
  assert.equal(result.requiresHumanReview, true);
});

test("prioriza la retoma cuando reduce el desembolso dentro del presupuesto", () => {
  const result = generateRecommendation(
    {
      profile: profile({
        objective: "TRADE_IN",
        budgetCop: 1_000_000,
        priority: "PRICE",
      }),
      currentDevice,
    },
    catalogs,
  );

  assert.equal(result.primaryOption, "TRADE_IN");
  assert.ok(result.estimatedTradeInCop > 0);
  assert.equal(result.requiresHumanReview, true);
});

test("no considera productos que no están disponibles", () => {
  const result = generateRecommendation(
    { profile: profile({ budgetCop: 600_000 }) },
    catalogs,
  );
  const options = [result, ...result.alternatives];

  assert.equal(options.some((option) => option.productId === "unavailable-test"), false);
});

test("explica cuando ninguna compra cabe en el presupuesto", () => {
  const result = generateRecommendation(
    {
      profile: profile({
        budgetCop: 600_000,
        acceptsCertifiedUsed: false,
      }),
    },
    catalogs,
  );

  assert.ok(result.reasons.some((reason) => reason.includes("supera el presupuesto")));
});

test("descarta usados si el cliente no los acepta", () => {
  const result = generateRecommendation(
    { profile: profile({ acceptsCertifiedUsed: false }) },
    catalogs,
  );
  const options = [result, ...result.alternatives];

  assert.equal(
    options.some((option) => option.option === "CERTIFIED_USED"),
    false,
  );
});

test("rechaza respuestas incompletas antes de generar la recomendación", () => {
  const parsed = advisorInputSchema.safeParse({
    profile: {
      sessionId: "session-test-001",
      objective: "REPAIR",
      budgetCop: 500_000,
    },
  });

  assert.equal(parsed.success, false);
});
