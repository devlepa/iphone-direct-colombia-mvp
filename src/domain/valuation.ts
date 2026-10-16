import type { DeviceFailure } from "./device";

export type RepairOption = {
  id: string;
  label: string;
  failureCategory: DeviceFailure;
  estimatedCostCop: number;
  requiresDiagnosis: boolean;
  isTestData: true;
};

export type TradeInValue = {
  model: string;
  storageGb: number;
  estimatedValueCop: number;
  requiresInspection: boolean;
  isTestData: true;
};
