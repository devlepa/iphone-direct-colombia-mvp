export type DeviceCondition = "GOOD" | "DAMAGED" | "UNKNOWN";

export type BodyCondition = "GOOD" | "WORN" | "DAMAGED" | "UNKNOWN";

export type DeviceFailure =
  | "BATTERY"
  | "SCREEN"
  | "CAMERA"
  | "CHARGING"
  | "OTHER";

export type CurrentDevice = {
  model: string;
  storageGb: number;
  batteryHealth?: number;
  screenCondition: DeviceCondition;
  cameraCondition: DeviceCondition;
  bodyCondition: BodyCondition;
  knownFailures: DeviceFailure[];
  previousRepairs: boolean | null;
  requiresTechnicalInspection: boolean;
};
