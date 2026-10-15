export type ProductCondition = "NEW" | "CERTIFIED_USED";

export type Product = {
  id: string;
  model: string;
  storageGb: number;
  condition: ProductCondition;
  priceCop: number;
  batteryHealth?: number;
  warrantyDays: number;
  imeiVerified: boolean;
  componentsChecked: string[];
  available: boolean;
  isTestData: true;
};
