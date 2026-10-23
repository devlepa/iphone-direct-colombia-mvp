// Este archivo se genera desde data/catalogo-inventario.csv.
// No lo edites manualmente: ejecuta npm run catalog:sync.

export type GeneratedDeviceInventoryEntry = {
  model: string;
  generation: number;
  tier: "VALUE" | "MINI" | "STANDARD" | "PLUS" | "AIR" | "PRO" | "PRO_MAX";
  category: string;
  storageGb: number;
  newPriceCop: number;
  newStock: number | null;
  certifiedUsedPriceCop: number | null;
  certifiedUsedStock: number | null;
  tradeInValueCop: number;
  highlight: string;
  image: { src: string; alt: string; sourceUrl: string };
  priceCheckedAt: string;
};

export const generatedDeviceInventory: GeneratedDeviceInventoryEntry[] = [
  {
    "model": "iPhone 13 mini",
    "generation": 13,
    "tier": "MINI",
    "category": "Mini",
    "storageGb": 128,
    "newPriceCop": 2100000,
    "newStock": 0,
    "certifiedUsedPriceCop": 1699000,
    "certifiedUsedStock": 1,
    "tradeInValueCop": 1050000,
    "highlight": "Formato compacto y rendimiento equilibrado.",
    "image": {
      "src": "/products/iphone-13.jpg",
      "alt": "iPhone 13 fotografiado de frente y de espaldas",
      "sourceUrl": "https://www.apple.com/newsroom/2021/09/apple-introduces-iphone-13-and-iphone-13-mini/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 13",
    "generation": 13,
    "tier": "STANDARD",
    "category": "Estándar",
    "storageGb": 128,
    "newPriceCop": 2600000,
    "newStock": 0,
    "certifiedUsedPriceCop": 2049000,
    "certifiedUsedStock": 2,
    "tradeInValueCop": 1250000,
    "highlight": "La entrada equilibrada a la gama moderna.",
    "image": {
      "src": "/products/iphone-13.jpg",
      "alt": "iPhone 13 fotografiado de frente y de espaldas",
      "sourceUrl": "https://www.apple.com/newsroom/2021/09/apple-introduces-iphone-13-and-iphone-13-mini/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 13 Pro",
    "generation": 13,
    "tier": "PRO",
    "category": "Pro",
    "storageGb": 128,
    "newPriceCop": 3000000,
    "newStock": 0,
    "certifiedUsedPriceCop": 2649000,
    "certifiedUsedStock": 1,
    "tradeInValueCop": 1650000,
    "highlight": "Pantalla ProMotion y cámaras de nivel Pro.",
    "image": {
      "src": "/products/iphone-13-pro.jpg",
      "alt": "iPhone 13 Pro y iPhone 13 Pro Max",
      "sourceUrl": "https://www.apple.com/newsroom/2021/09/apple-unveils-iphone-13-pro-and-iphone-13-pro-max-more-pro-than-ever-before/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 13 Pro Max",
    "generation": 13,
    "tier": "PRO_MAX",
    "category": "Pro Max",
    "storageGb": 128,
    "newPriceCop": 3400000,
    "newStock": 0,
    "certifiedUsedPriceCop": 2799000,
    "certifiedUsedStock": 1,
    "tradeInValueCop": 1950000,
    "highlight": "Pantalla amplia y mayor autonomía en la serie 13.",
    "image": {
      "src": "/products/iphone-13-pro.jpg",
      "alt": "iPhone 13 Pro y iPhone 13 Pro Max",
      "sourceUrl": "https://www.apple.com/newsroom/2021/09/apple-unveils-iphone-13-pro-and-iphone-13-pro-max-more-pro-than-ever-before/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 14",
    "generation": 14,
    "tier": "STANDARD",
    "category": "Estándar",
    "storageGb": 128,
    "newPriceCop": 2700000,
    "newStock": 0,
    "certifiedUsedPriceCop": 2099000,
    "certifiedUsedStock": 2,
    "tradeInValueCop": 1550000,
    "highlight": "Uso diario sólido y cámaras confiables.",
    "image": {
      "src": "/products/iphone-14.jpg",
      "alt": "iPhone 14 y iPhone 14 Plus",
      "sourceUrl": "https://www.apple.com/newsroom/2022/09/apple-introduces-iphone-14-and-iphone-14-plus/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 14 Plus",
    "generation": 14,
    "tier": "PLUS",
    "category": "Plus",
    "storageGb": 128,
    "newPriceCop": 3000000,
    "newStock": 0,
    "certifiedUsedPriceCop": 2249000,
    "certifiedUsedStock": 1,
    "tradeInValueCop": 1800000,
    "highlight": "Pantalla grande y batería para jornadas largas.",
    "image": {
      "src": "/products/iphone-14.jpg",
      "alt": "iPhone 14 y iPhone 14 Plus",
      "sourceUrl": "https://www.apple.com/newsroom/2022/09/apple-introduces-iphone-14-and-iphone-14-plus/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 14 Pro",
    "generation": 14,
    "tier": "PRO",
    "category": "Pro",
    "storageGb": 128,
    "newPriceCop": 3500000,
    "newStock": 0,
    "certifiedUsedPriceCop": 2999000,
    "certifiedUsedStock": 1,
    "tradeInValueCop": 2100000,
    "highlight": "Dynamic Island, teleobjetivo y pantalla ProMotion.",
    "image": {
      "src": "/products/iphone-14-pro.jpg",
      "alt": "iPhone 14 Pro y iPhone 14 Pro Max",
      "sourceUrl": "https://www.apple.com/newsroom/2022/09/apple-debuts-iphone-14-pro-and-iphone-14-pro-max/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 14 Pro Max",
    "generation": 14,
    "tier": "PRO_MAX",
    "category": "Pro Max",
    "storageGb": 128,
    "newPriceCop": 4100000,
    "newStock": 0,
    "certifiedUsedPriceCop": 3149000,
    "certifiedUsedStock": 1,
    "tradeInValueCop": 2400000,
    "highlight": "Experiencia Pro con pantalla y batería máximas.",
    "image": {
      "src": "/products/iphone-14-pro.jpg",
      "alt": "iPhone 14 Pro y iPhone 14 Pro Max",
      "sourceUrl": "https://www.apple.com/newsroom/2022/09/apple-debuts-iphone-14-pro-and-iphone-14-pro-max/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 15",
    "generation": 15,
    "tier": "STANDARD",
    "category": "Estándar",
    "storageGb": 128,
    "newPriceCop": 3300000,
    "newStock": 0,
    "certifiedUsedPriceCop": 2649000,
    "certifiedUsedStock": 2,
    "tradeInValueCop": 1950000,
    "highlight": "USB-C, Dynamic Island y cámara principal de 48 MP.",
    "image": {
      "src": "/products/iphone-15.jpg",
      "alt": "iPhone 15 y iPhone 15 Plus",
      "sourceUrl": "https://www.apple.com/newsroom/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 15 Plus",
    "generation": 15,
    "tier": "PLUS",
    "category": "Plus",
    "storageGb": 128,
    "newPriceCop": 3200000,
    "newStock": 0,
    "certifiedUsedPriceCop": 2849000,
    "certifiedUsedStock": 1,
    "tradeInValueCop": 2200000,
    "highlight": "Pantalla grande, USB-C y autonomía extendida.",
    "image": {
      "src": "/products/iphone-15.jpg",
      "alt": "iPhone 15 y iPhone 15 Plus",
      "sourceUrl": "https://www.apple.com/newsroom/2023/09/apple-debuts-iphone-15-and-iphone-15-plus/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 15 Pro",
    "generation": 15,
    "tier": "PRO",
    "category": "Pro",
    "storageGb": 128,
    "newPriceCop": 3950000,
    "newStock": 0,
    "certifiedUsedPriceCop": 3049000,
    "certifiedUsedStock": 2,
    "tradeInValueCop": 2650000,
    "highlight": "Titanio, chip Pro y sistema de cámaras avanzado.",
    "image": {
      "src": "/products/iphone-15-pro.jpg",
      "alt": "Gama iPhone 15 Pro en sus acabados oficiales",
      "sourceUrl": "https://www.apple.com/newsroom/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 15 Pro Max",
    "generation": 15,
    "tier": "PRO_MAX",
    "category": "Pro Max",
    "storageGb": 256,
    "newPriceCop": 4700000,
    "newStock": 0,
    "certifiedUsedPriceCop": 3899000,
    "certifiedUsedStock": 2,
    "tradeInValueCop": 3200000,
    "highlight": "Zoom de largo alcance y máxima autonomía de la serie 15.",
    "image": {
      "src": "/products/iphone-15-pro.jpg",
      "alt": "Gama iPhone 15 Pro en sus acabados oficiales",
      "sourceUrl": "https://www.apple.com/newsroom/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 16e",
    "generation": 16,
    "tier": "VALUE",
    "category": "e",
    "storageGb": 128,
    "newPriceCop": 3149000,
    "newStock": 1,
    "certifiedUsedPriceCop": 1900000,
    "certifiedUsedStock": 0,
    "tradeInValueCop": 2150000,
    "highlight": "Rendimiento moderno en la opción más accesible.",
    "image": {
      "src": "/products/iphone-16e.jpg",
      "alt": "iPhone 16e en acabados blanco y negro",
      "sourceUrl": "https://www.apple.com/newsroom/2025/02/apple-debuts-iphone-16e-a-powerful-new-member-of-the-iphone-16-family/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 16",
    "generation": 16,
    "tier": "STANDARD",
    "category": "Estándar",
    "storageGb": 128,
    "newPriceCop": 4099000,
    "newStock": 2,
    "certifiedUsedPriceCop": 2500000,
    "certifiedUsedStock": 0,
    "tradeInValueCop": 2450000,
    "highlight": "Nueva generación de rendimiento y control de cámara.",
    "image": {
      "src": "/products/iphone-16.jpg",
      "alt": "iPhone 16 y iPhone 16 Plus",
      "sourceUrl": "https://www.apple.com/newsroom/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 16 Plus",
    "generation": 16,
    "tier": "PLUS",
    "category": "Plus",
    "storageGb": 128,
    "newPriceCop": 3800000,
    "newStock": 0,
    "certifiedUsedPriceCop": 3599000,
    "certifiedUsedStock": 1,
    "tradeInValueCop": 2750000,
    "highlight": "Pantalla grande, batería amplia y chip de nueva generación.",
    "image": {
      "src": "/products/iphone-16.jpg",
      "alt": "iPhone 16 y iPhone 16 Plus",
      "sourceUrl": "https://www.apple.com/newsroom/2024/09/apple-introduces-iphone-16-and-iphone-16-plus/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 16 Pro",
    "generation": 16,
    "tier": "PRO",
    "category": "Pro",
    "storageGb": 128,
    "newPriceCop": 3950000,
    "newStock": 0,
    "certifiedUsedPriceCop": 3899000,
    "certifiedUsedStock": 1,
    "tradeInValueCop": 3150000,
    "highlight": "Rendimiento Pro, cámaras avanzadas y formato contenido.",
    "image": {
      "src": "/products/iphone-16-pro.jpg",
      "alt": "Gama iPhone 16 Pro en sus acabados oficiales",
      "sourceUrl": "https://www.apple.com/newsroom/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 16 Pro Max",
    "generation": 16,
    "tier": "PRO_MAX",
    "category": "Pro Max",
    "storageGb": 256,
    "newPriceCop": 5800000,
    "newStock": 0,
    "certifiedUsedPriceCop": 4999000,
    "certifiedUsedStock": 1,
    "tradeInValueCop": 3650000,
    "highlight": "La experiencia Pro más completa de la generación 16.",
    "image": {
      "src": "/products/iphone-16-pro.jpg",
      "alt": "Gama iPhone 16 Pro en sus acabados oficiales",
      "sourceUrl": "https://www.apple.com/newsroom/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 17",
    "generation": 17,
    "tier": "STANDARD",
    "category": "Estándar",
    "storageGb": 256,
    "newPriceCop": 4549000,
    "newStock": 2,
    "certifiedUsedPriceCop": 3300000,
    "certifiedUsedStock": 0,
    "tradeInValueCop": 3050000,
    "highlight": "Mayor capacidad inicial y rendimiento de generación 17.",
    "image": {
      "src": "/products/iphone-17.jpg",
      "alt": "iPhone 17 fotografiado de frente y de espaldas",
      "sourceUrl": "https://www.apple.com/newsroom/2025/09/apple-debuts-iphone-17/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone Air",
    "generation": 17,
    "tier": "AIR",
    "category": "Air",
    "storageGb": 256,
    "newPriceCop": 5249000,
    "newStock": 1,
    "certifiedUsedPriceCop": 3800000,
    "certifiedUsedStock": 0,
    "tradeInValueCop": 3400000,
    "highlight": "Diseño ligero con pantalla amplia.",
    "image": {
      "src": "/products/iphone-air.jpg",
      "alt": "Gama iPhone Air en sus acabados oficiales",
      "sourceUrl": "https://www.apple.com/newsroom/2025/09/introducing-iphone-air-a-powerful-new-iphone-with-a-breakthrough-design/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 17 Pro",
    "generation": 17,
    "tier": "PRO",
    "category": "Pro",
    "storageGb": 256,
    "newPriceCop": 5249000,
    "newStock": 1,
    "certifiedUsedPriceCop": 3900000,
    "certifiedUsedStock": 0,
    "tradeInValueCop": 3900000,
    "highlight": "Potencia A19 Pro y cámaras profesionales de 48 MP.",
    "image": {
      "src": "/products/iphone-17-pro.jpg",
      "alt": "iPhone 17 Pro fotografiado de frente y de espaldas",
      "sourceUrl": "https://www.apple.com/newsroom/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 17 Pro Max",
    "generation": 17,
    "tier": "PRO_MAX",
    "category": "Pro Max",
    "storageGb": 256,
    "newPriceCop": 5649000,
    "newStock": 1,
    "certifiedUsedPriceCop": 4400000,
    "certifiedUsedStock": 0,
    "tradeInValueCop": 4300000,
    "highlight": "Máximo rendimiento y autonomía de la generación 17.",
    "image": {
      "src": "/products/iphone-17-pro.jpg",
      "alt": "iPhone 17 Pro fotografiado de frente y de espaldas",
      "sourceUrl": "https://www.apple.com/newsroom/2025/09/apple-unveils-iphone-17-pro-and-iphone-17-pro-max/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 18 Pro",
    "generation": 18,
    "tier": "PRO",
    "category": "Pro",
    "storageGb": 256,
    "newPriceCop": 5649000,
    "newStock": 1,
    "certifiedUsedPriceCop": null,
    "certifiedUsedStock": 0,
    "tradeInValueCop": 4350000,
    "highlight": "Chip A20 Pro y sistema de cámaras Pro de última generación.",
    "image": {
      "src": "/products/iphone-18-pro.jpg",
      "alt": "iPhone 18 Pro y iPhone 18 Pro Max",
      "sourceUrl": "https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/"
    },
    "priceCheckedAt": "2026-10-19"
  },
  {
    "model": "iPhone 18 Pro Max",
    "generation": 18,
    "tier": "PRO_MAX",
    "category": "Pro Max",
    "storageGb": 256,
    "newPriceCop": 6049000,
    "newStock": 1,
    "certifiedUsedPriceCop": null,
    "certifiedUsedStock": 0,
    "tradeInValueCop": 4750000,
    "highlight": "La opción más completa en rendimiento, cámara y autonomía.",
    "image": {
      "src": "/products/iphone-18-pro.jpg",
      "alt": "iPhone 18 Pro y iPhone 18 Pro Max",
      "sourceUrl": "https://www.apple.com/newsroom/2026/09/apple-debuts-iphone-18-pro-and-iphone-18-pro-max/"
    },
    "priceCheckedAt": "2026-10-19"
  }
];

export const latestCatalogPriceCheck = "2026-10-19";
