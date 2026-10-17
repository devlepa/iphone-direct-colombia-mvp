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

export type DeviceCatalogEntry = {
  model: string;
  generation: number;
  tier: DeviceTier;
  category: string;
  storageGb: number;
  newPriceCop: number;
  certifiedUsedPriceCop: number | null;
  tradeInValueCop: number;
  highlight: string;
};

export type DeviceImage = {
  src: string;
  alt: string;
  sourceUrl: string;
};

export const deviceCatalog: DeviceCatalogEntry[] = [
  {
    model: "iPhone 13 mini",
    generation: 13,
    tier: "MINI",
    category: "Mini",
    storageGb: 128,
    newPriceCop: 2_100_000,
    certifiedUsedPriceCop: 1_350_000,
    tradeInValueCop: 1_050_000,
    highlight: "Formato compacto y rendimiento equilibrado.",
  },
  {
    model: "iPhone 13",
    generation: 13,
    tier: "STANDARD",
    category: "Estándar",
    storageGb: 128,
    newPriceCop: 2_600_000,
    certifiedUsedPriceCop: 1_350_000,
    tradeInValueCop: 1_250_000,
    highlight: "La entrada equilibrada a la gama moderna.",
  },
  {
    model: "iPhone 13 Pro",
    generation: 13,
    tier: "PRO",
    category: "Pro",
    storageGb: 128,
    newPriceCop: 3_000_000,
    certifiedUsedPriceCop: 2_100_000,
    tradeInValueCop: 1_650_000,
    highlight: "Pantalla ProMotion y cámaras de nivel Pro.",
  },
  {
    model: "iPhone 13 Pro Max",
    generation: 13,
    tier: "PRO_MAX",
    category: "Pro Max",
    storageGb: 128,
    newPriceCop: 3_400_000,
    certifiedUsedPriceCop: 2_400_000,
    tradeInValueCop: 1_950_000,
    highlight: "Pantalla amplia y mayor autonomía en la serie 13.",
  },
  {
    model: "iPhone 14",
    generation: 14,
    tier: "STANDARD",
    category: "Estándar",
    storageGb: 128,
    newPriceCop: 2_700_000,
    certifiedUsedPriceCop: 1_650_000,
    tradeInValueCop: 1_550_000,
    highlight: "Uso diario sólido y cámaras confiables.",
  },
  {
    model: "iPhone 14 Plus",
    generation: 14,
    tier: "PLUS",
    category: "Plus",
    storageGb: 128,
    newPriceCop: 3_000_000,
    certifiedUsedPriceCop: 1_900_000,
    tradeInValueCop: 1_800_000,
    highlight: "Pantalla grande y batería para jornadas largas.",
  },
  {
    model: "iPhone 14 Pro",
    generation: 14,
    tier: "PRO",
    category: "Pro",
    storageGb: 128,
    newPriceCop: 3_500_000,
    certifiedUsedPriceCop: 2_400_000,
    tradeInValueCop: 2_100_000,
    highlight: "Dynamic Island, teleobjetivo y pantalla ProMotion.",
  },
  {
    model: "iPhone 14 Pro Max",
    generation: 14,
    tier: "PRO_MAX",
    category: "Pro Max",
    storageGb: 128,
    newPriceCop: 4_100_000,
    certifiedUsedPriceCop: 2_600_000,
    tradeInValueCop: 2_400_000,
    highlight: "Experiencia Pro con pantalla y batería máximas.",
  },
  {
    model: "iPhone 15",
    generation: 15,
    tier: "STANDARD",
    category: "Estándar",
    storageGb: 128,
    newPriceCop: 3_300_000,
    certifiedUsedPriceCop: 1_950_000,
    tradeInValueCop: 1_950_000,
    highlight: "USB-C, Dynamic Island y cámara principal de 48 MP.",
  },
  {
    model: "iPhone 15 Plus",
    generation: 15,
    tier: "PLUS",
    category: "Plus",
    storageGb: 128,
    newPriceCop: 3_200_000,
    certifiedUsedPriceCop: 2_100_000,
    tradeInValueCop: 2_200_000,
    highlight: "Pantalla grande, USB-C y autonomía extendida.",
  },
  {
    model: "iPhone 15 Pro",
    generation: 15,
    tier: "PRO",
    category: "Pro",
    storageGb: 128,
    newPriceCop: 3_950_000,
    certifiedUsedPriceCop: 2_500_000,
    tradeInValueCop: 2_650_000,
    highlight: "Titanio, chip Pro y sistema de cámaras avanzado.",
  },
  {
    model: "iPhone 15 Pro Max",
    generation: 15,
    tier: "PRO_MAX",
    category: "Pro Max",
    storageGb: 256,
    newPriceCop: 4_700_000,
    certifiedUsedPriceCop: 2_800_000,
    tradeInValueCop: 3_200_000,
    highlight: "Zoom de largo alcance y máxima autonomía de la serie 15.",
  },
  {
    model: "iPhone 16e",
    generation: 16,
    tier: "VALUE",
    category: "e",
    storageGb: 128,
    newPriceCop: 2_800_000,
    certifiedUsedPriceCop: 1_900_000,
    tradeInValueCop: 2_150_000,
    highlight: "Rendimiento moderno en la opción más accesible.",
  },
  {
    model: "iPhone 16",
    generation: 16,
    tier: "STANDARD",
    category: "Estándar",
    storageGb: 128,
    newPriceCop: 3_800_000,
    certifiedUsedPriceCop: 2_500_000,
    tradeInValueCop: 2_450_000,
    highlight: "Nueva generación de rendimiento y control de cámara.",
  },
  {
    model: "iPhone 16 Plus",
    generation: 16,
    tier: "PLUS",
    category: "Plus",
    storageGb: 128,
    newPriceCop: 3_800_000,
    certifiedUsedPriceCop: 3_000_000,
    tradeInValueCop: 2_750_000,
    highlight: "Pantalla grande, batería amplia y chip de nueva generación.",
  },
  {
    model: "iPhone 16 Pro",
    generation: 16,
    tier: "PRO",
    category: "Pro",
    storageGb: 128,
    newPriceCop: 3_950_000,
    certifiedUsedPriceCop: 3_200_000,
    tradeInValueCop: 3_150_000,
    highlight: "Rendimiento Pro, cámaras avanzadas y formato contenido.",
  },
  {
    model: "iPhone 16 Pro Max",
    generation: 16,
    tier: "PRO_MAX",
    category: "Pro Max",
    storageGb: 256,
    newPriceCop: 5_800_000,
    certifiedUsedPriceCop: 3_600_000,
    tradeInValueCop: 3_650_000,
    highlight: "La experiencia Pro más completa de la generación 16.",
  },
  {
    model: "iPhone 17",
    generation: 17,
    tier: "STANDARD",
    category: "Estándar",
    storageGb: 256,
    newPriceCop: 4_300_000,
    certifiedUsedPriceCop: 3_300_000,
    tradeInValueCop: 3_050_000,
    highlight: "Mayor capacidad inicial y rendimiento de generación 17.",
  },
  {
    model: "iPhone Air",
    generation: 17,
    tier: "AIR",
    category: "Air",
    storageGb: 256,
    newPriceCop: 4_900_000,
    certifiedUsedPriceCop: 3_800_000,
    tradeInValueCop: 3_400_000,
    highlight: "Diseño ligero con pantalla amplia.",
  },
  {
    model: "iPhone 17 Pro",
    generation: 17,
    tier: "PRO",
    category: "Pro",
    storageGb: 256,
    newPriceCop: 4_900_000,
    certifiedUsedPriceCop: 3_900_000,
    tradeInValueCop: 3_900_000,
    highlight: "Potencia A19 Pro y cámaras profesionales de 48 MP.",
  },
  {
    model: "iPhone 17 Pro Max",
    generation: 17,
    tier: "PRO_MAX",
    category: "Pro Max",
    storageGb: 256,
    newPriceCop: 5_500_000,
    certifiedUsedPriceCop: 4_400_000,
    tradeInValueCop: 4_300_000,
    highlight: "Máximo rendimiento y autonomía de la generación 17.",
  },
  {
    model: "iPhone 18 Pro",
    generation: 18,
    tier: "PRO",
    category: "Pro",
    storageGb: 256,
    newPriceCop: 5_700_000,
    certifiedUsedPriceCop: null,
    tradeInValueCop: 4_350_000,
    highlight: "Chip A20 Pro y sistema de cámaras Pro de última generación.",
  },
  {
    model: "iPhone 18 Pro Max",
    generation: 18,
    tier: "PRO_MAX",
    category: "Pro Max",
    storageGb: 256,
    newPriceCop: 6_200_000,
    certifiedUsedPriceCop: null,
    tradeInValueCop: 4_750_000,
    highlight: "La opción más completa en rendimiento, cámara y autonomía.",
  },
];

const familyImages = {
  "13": {
    src: "/products/iphone-13.jpg",
    alt: "iPhone 13 fotografiado de frente y de espaldas",
    sourceUrl:
      "https://www.apple.com/newsroom/2021/09/apple-introduces-iphone-13-and-iphone-13-mini/",
  },
  "13-pro": {
    src: "/products/iphone-13-pro.jpg",
    alt: "iPhone 13 Pro y iPhone 13 Pro Max",
    sourceUrl:
      "https://www.apple.com/newsroom/2021/09/apple-unveils-iphone-13-pro-and-iphone-13-pro-max-more-pro-than-ever-before/",
  },
  "14": {
    src: "/products/iphone-14.jpg",
    alt: "iPhone 14 y iPhone 14 Plus",
    sourceUrl:
      "https://www.apple.com/newsroom/2022/09/apple-introduces-iphone-14-and-iphone-14-plus/",
  },
  "14-pro": {
    src: "/products/iphone-14-pro.jpg",
    alt: "iPhone 14 Pro y iPhone 14 Pro Max",
    sourceUrl:
      "https://www.apple.com/newsroom/2022/09/apple-debuts-iphone-14-pro-and-iphone-14-pro-max/",
  },
  "15": {
    src: "/products/iphone-15.jpg",
    alt: "iPhone 15 y iPhone 15 Plus",
    sourceUrl:
      "https://www.apple.com/newsroom/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/",
  },
  "15-pro": {
    src: "/products/iphone-15-pro.jpg",
    alt: "Gama iPhone 15 Pro en sus acabados oficiales",
    sourceUrl:
      "https://www.apple.com/newsroom/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/",
  },
  "16e": {
    src: "/products/iphone-16e.jpg",
    alt: "iPhone 16e en acabados blanco y negro",
    sourceUrl:
      "https://www.apple.com/newsroom/2025/02/apple-debuts-iphone-16e-a-powerful-new-member-of-the-iphone-16-family/",
  },
  "16": {
    src: "/products/iphone-16.jpg",
    alt: "iPhone 16 y iPhone 16 Plus",
    sourceUrl:
      "https://www.apple.com/newsroom/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/",
  },
  "16-pro": {
    src: "/products/iphone-16-pro.jpg",
    alt: "Gama iPhone 16 Pro en sus acabados oficiales",
    sourceUrl:
      "https://www.apple.com/newsroom/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/",
  },
  "17": {
    src: "/products/iphone-17.jpg",
    alt: "iPhone 17 fotografiado de frente y de espaldas",
    sourceUrl:
      "https://www.apple.com/newsroom/2025/09/apple-introduces-iphone-17/",
  },
  air: {
    src: "/products/iphone-air.jpg",
    alt: "Gama iPhone Air en sus acabados oficiales",
    sourceUrl:
      "https://www.apple.com/newsroom/2025/09/introducing-iphone-air-a-powerful-new-iphone-with-a-breakthrough-design/",
  },
  "17-pro": {
    src: "/products/iphone-17-pro.jpg",
    alt: "iPhone 17 Pro fotografiado de frente y de espaldas",
    sourceUrl:
      "https://www.apple.com/newsroom/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/",
  },
  "18-pro": {
    src: "/products/iphone-18-pro.jpg",
    alt: "iPhone 18 Pro y iPhone 18 Pro Max",
    sourceUrl:
      "https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/",
  },
} satisfies Record<string, DeviceImage>;

const imageFamilyByModel: Record<string, keyof typeof familyImages> = {
  "iPhone 13 mini": "13",
  "iPhone 13": "13",
  "iPhone 13 Pro": "13-pro",
  "iPhone 13 Pro Max": "13-pro",
  "iPhone 14": "14",
  "iPhone 14 Plus": "14",
  "iPhone 14 Pro": "14-pro",
  "iPhone 14 Pro Max": "14-pro",
  "iPhone 15": "15",
  "iPhone 15 Plus": "15",
  "iPhone 15 Pro": "15-pro",
  "iPhone 15 Pro Max": "15-pro",
  "iPhone 16e": "16e",
  "iPhone 16": "16",
  "iPhone 16 Plus": "16",
  "iPhone 16 Pro": "16-pro",
  "iPhone 16 Pro Max": "16-pro",
  "iPhone 17": "17",
  "iPhone Air": "air",
  "iPhone 17 Pro": "17-pro",
  "iPhone 17 Pro Max": "17-pro",
  "iPhone 18 Pro": "18-pro",
  "iPhone 18 Pro Max": "18-pro",
};

export const catalogPriceReference = {
  market: "Colombia",
  currency: "COP",
  checkedAt: "17 de octubre de 2026",
  note: "Valores orientativos; cambian según capacidad, estado, color, vendedor y disponibilidad.",
};

export function getDeviceImage(model: string): DeviceImage | undefined {
  const family = imageFamilyByModel[model];
  return family ? familyImages[family] : undefined;
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

export function getDeviceDetails(model: string) {
  return deviceCatalog.find((device) => device.model === model);
}

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
      available: true,
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
