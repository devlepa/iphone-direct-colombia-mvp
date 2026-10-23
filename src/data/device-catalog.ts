import {
  generatedDeviceInventory,
  latestCatalogPriceCheck,
} from "@/data/device-inventory.generated";
import type { Product } from "@/domain/product";
import type { TradeInValue } from "@/domain/valuation";

export type DeviceTier =
  | "VALUE"
  | "MINI"
  | "STANDARD"
  | "PLUS"
  | "AIR"
  | "PRO"
  | "PRO_MAX";

export type DeviceImage = {
  src: string;
  alt: string;
  sourceUrl: string;
};

export type DeviceCatalogEntry = {
  model: string;
  generation: number;
  tier: DeviceTier;
  category: string;
  storageGb: number;
  newPriceCop: number;
  newStock: number | null;
  certifiedUsedPriceCop: number | null;
  certifiedUsedStock: number | null;
  tradeInValueCop: number;
  highlight: string;
  image: DeviceImage;
  priceCheckedAt: string;
};

export const deviceCatalog: DeviceCatalogEntry[] = generatedDeviceInventory;

function formatReferenceDate(value: string) {
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export const catalogPriceReference = {
  market: "Colombia",
  currency: "COP",
  checkedAt: formatReferenceDate(latestCatalogPriceCheck),
  note: "Valores orientativos; cambian según capacidad, estado, color, vendedor y disponibilidad.",
};

export function getDeviceDetails(model: string) {
  return deviceCatalog.find((device) => device.model === model);
}

export function getDeviceImage(model: string): DeviceImage | undefined {
  return getDeviceDetails(model)?.image;
}

const tierRank: Record<DeviceTier, number> = {
  VALUE: 0,
  MINI: 1,
  STANDARD: 2,
  PLUS: 3,
  AIR: 3,
  PRO: 4,
  PRO_MAX: 5,
};

export const currentIPhoneModels = [
  "iPhone 11",
  "iPhone 11 Pro",
  "iPhone 11 Pro Max",
  "iPhone 12 mini",
  "iPhone 12",
  "iPhone 12 Pro",
  "iPhone 12 Pro Max",
  ...deviceCatalog.map((device) => device.model),
  "Otro iPhone",
];

function getDeviceSlug(model: string) {
  return model.toLowerCase().replaceAll(" ", "-");
}

export function getDeviceByProductId(productId?: string) {
  if (!productId) return undefined;

  return deviceCatalog.find((device) => {
    const slug = getDeviceSlug(device.model);
    return productId === `new-${slug}` || productId === `used-${slug}`;
  });
}

export function isMeaningfulUpgrade(currentModel: string, candidateModel: string) {
  const current = getDeviceDetails(currentModel);
  const candidate = getDeviceDetails(candidateModel);

  if (!current || !candidate) return true;
  if (candidate.generation < current.generation) return false;

  if (candidate.generation === current.generation) {
    return tierRank[candidate.tier] > tierRank[current.tier];
  }

  return tierRank[candidate.tier] >= tierRank[current.tier];
}

export function getUpgradeReasons(currentModel: string, candidateModel: string) {
  const current = getDeviceDetails(currentModel);
  const candidate = getDeviceDetails(candidateModel);

  if (!current || !candidate || !isMeaningfulUpgrade(currentModel, candidateModel)) {
    return [];
  }

  const reasons = [
    `Es un salto real desde tu ${current.model}: avanzas a la generación ${candidate.generation} sin bajar de categoría.`,
    candidate.highlight,
  ];

  if (tierRank[candidate.tier] > tierRank[current.tier]) {
    reasons.push(`También subes de la categoría ${current.category} a ${candidate.category}.`);
  }

  return reasons;
}

export function getUpgradeScore(currentModel: string, candidateModel: string) {
  const current = getDeviceDetails(currentModel);
  const candidate = getDeviceDetails(candidateModel);
  if (!current || !candidate) return 0;

  return (
    Math.max(0, candidate.generation - current.generation) * 6 +
    Math.max(0, tierRank[candidate.tier] - tierRank[current.tier]) * 3
  );
}

export function buildProductCatalog(): Product[] {
  return deviceCatalog.flatMap((device) => {
    const slug = getDeviceSlug(device.model);
    const common = {
      model: device.model,
      storageGb: device.storageGb,
      imeiVerified: true,
      isTestData: true as const,
    };

    const products: Product[] = [
      {
        ...common,
        id: `new-${slug}`,
        condition: "NEW" as const,
        priceCop: device.newPriceCop,
        warrantyDays: 365,
        componentsChecked: [],
        stock: device.newStock,
        available: device.newStock !== null && device.newStock > 0,
      },
    ];

    if (device.certifiedUsedPriceCop !== null) {
      products.push({
        ...common,
        id: `used-${slug}`,
        condition: "CERTIFIED_USED" as const,
        priceCop: device.certifiedUsedPriceCop,
        batteryHealth: 90,
        warrantyDays: 120,
        componentsChecked: ["pantalla", "cámaras", "batería", "carga", "Face ID"],
        stock: device.certifiedUsedStock,
        available:
          device.certifiedUsedStock !== null && device.certifiedUsedStock > 0,
      });
    }

    return products;
  });
}

export function buildTradeInCatalog(): TradeInValue[] {
  return deviceCatalog.map((device) => ({
    model: device.model,
    storageGb: device.storageGb,
    estimatedValueCop: device.tradeInValueCop,
    requiresInspection: true,
    isTestData: true,
  }));
}
