import assert from "node:assert/strict";
import test from "node:test";
import type { Product } from "@/domain/product";
import { createCatalogRevision } from "./advisor.catalogs";
import { generateRecommendation } from "./advisor.service";
import type { AdvisorCatalogs, AdvisorInput } from "./advisor.types";
import { resolveRecommendationRecord } from "./recommendation-record";

const input: AdvisorInput = {
  profile: {
    sessionId: "session-revision-test",
    objective: "BUY",
    budgetCop: 5_000_000,
    primaryUse: "WORK",
    acceptsCertifiedUsed: false,
    priority: "WARRANTY",
    urgency: "THIS_MONTH",
  },
};

function product(priceCop: number): Product {
  return {
    id: "new-revision-test",
    model: "iPhone de revisión",
    storageGb: 128,
    condition: "NEW",
    priceCop,
    warrantyDays: 365,
    imeiVerified: true,
    componentsChecked: [],
    stock: 3,
    available: true,
    isTestData: true,
  };
}

function catalogs(priceCop: number): AdvisorCatalogs {
  return {
    products: [product(priceCop)],
    repairOptions: [],
    tradeInValues: [],
  };
}

function storedRecord(priceCop: number, catalogRevision?: string) {
  return {
    input,
    recommendation: generateRecommendation(input, catalogs(priceCop)),
    generatedAt: "2026-01-01T00:00:00.000Z",
    ...(catalogRevision ? { catalogRevision } : {}),
  };
}

test("mantiene un resultado que pertenece a la revisión vigente", () => {
  const stored = storedRecord(3_000_000, "catalog-current");
  const resolved = resolveRecommendationRecord(
    stored,
    catalogs(4_000_000),
    "catalog-current",
  );

  assert.equal(resolved.status, "current");
  if (resolved.status !== "current") return;

  assert.equal(resolved.refreshed, false);
  assert.equal(resolved.record.recommendation.estimatedGrossCostCop, 3_000_000);
});

test("recalcula precios obsoletos cuando cambia la revisión del catálogo", () => {
  const resolved = resolveRecommendationRecord(
    storedRecord(3_000_000, "catalog-old"),
    catalogs(4_000_000),
    "catalog-new",
    () => new Date("2026-10-17T12:00:00.000Z"),
  );

  assert.equal(resolved.status, "current");
  if (resolved.status !== "current") return;

  assert.equal(resolved.refreshed, true);
  assert.equal(resolved.record.catalogRevision, "catalog-new");
  assert.equal(resolved.record.generatedAt, "2026-10-17T12:00:00.000Z");
  assert.equal(resolved.record.recommendation.estimatedGrossCostCop, 4_000_000);
});

test("migra un registro antiguo sin revisión usando sus respuestas guardadas", () => {
  const resolved = resolveRecommendationRecord(
    storedRecord(3_000_000),
    catalogs(4_500_000),
    "catalog-new",
  );

  assert.equal(resolved.status, "current");
  if (resolved.status !== "current") return;

  assert.equal(resolved.refreshed, true);
  assert.equal(resolved.record.catalogRevision, "catalog-new");
  assert.equal(resolved.record.recommendation.estimatedGrossCostCop, 4_500_000);
});

test("no devuelve como vigente un registro que no puede recalcular", () => {
  const resolved = resolveRecommendationRecord(
    {
      input: { profile: { sessionId: "incompleta" } },
      recommendation: storedRecord(3_000_000).recommendation,
      generatedAt: "2026-01-01T00:00:00.000Z",
      catalogRevision: "catalog-old",
    },
    catalogs(4_000_000),
    "catalog-new",
  );

  assert.equal(resolved.status, "invalid");
});

test("invalida un resultado guardado cuando su único equipo se queda sin stock", () => {
  const unavailableCatalogs: AdvisorCatalogs = {
    ...catalogs(4_000_000),
    products: [{ ...product(4_000_000), stock: 0, available: false }],
  };
  const resolved = resolveRecommendationRecord(
    storedRecord(3_000_000, "catalog-with-stock"),
    unavailableCatalogs,
    "catalog-without-stock",
  );

  assert.equal(resolved.status, "invalid");
});

test("la revisión cambia al modificar precio, stock o foto", () => {
  const base = { model: "iPhone", price: 3_000_000, stock: 2, image: "/a.webp" };
  const initialRevision = createCatalogRevision(base);

  assert.notEqual(
    initialRevision,
    createCatalogRevision({ ...base, price: 3_100_000 }),
  );
  assert.notEqual(initialRevision, createCatalogRevision({ ...base, stock: 1 }));
  assert.notEqual(
    initialRevision,
    createCatalogRevision({ ...base, image: "/b.webp" }),
  );
  assert.equal(initialRevision, createCatalogRevision({ ...base }));
});
