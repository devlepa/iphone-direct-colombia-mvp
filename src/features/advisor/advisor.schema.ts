import { z } from "zod";

export const customerProfileSchema = z.object({
  sessionId: z.string().min(8, "No fue posible crear la sesión."),
  objective: z.enum(["BUY", "REPAIR", "TRADE_IN", "UNSURE"]),
  budgetCop: z
    .number()
    .int()
    .min(100_000, "El presupuesto debe ser de al menos $100.000.")
    .max(30_000_000, "Revisa el presupuesto ingresado."),
  primaryUse: z.enum(["BASIC", "STUDY", "WORK", "CAMERA", "GAMING"]),
  acceptsCertifiedUsed: z.boolean(),
  priority: z.enum(["PRICE", "WARRANTY", "PERFORMANCE", "CAMERA", "LONGEVITY"]),
  urgency: z.enum(["TODAY", "THIS_WEEK", "THIS_MONTH", "EXPLORING"]),
});

export const currentDeviceSchema = z.object({
  model: z.string().trim().min(2, "Indica el modelo del equipo."),
  storageGb: z.number().int().positive("Indica la capacidad del equipo."),
  batteryHealth: z.number().int().min(1).max(100).optional(),
  screenCondition: z.enum(["GOOD", "DAMAGED", "UNKNOWN"]),
  cameraCondition: z.enum(["GOOD", "DAMAGED", "UNKNOWN"]),
  bodyCondition: z.enum(["GOOD", "WORN", "DAMAGED", "UNKNOWN"]),
  knownFailures: z.array(z.enum(["BATTERY", "SCREEN", "CAMERA", "CHARGING", "OTHER"])),
  previousRepairs: z.boolean().nullable(),
  requiresTechnicalInspection: z.literal(true),
});

export const advisorInputSchema = z
  .object({
    profile: customerProfileSchema,
    currentDevice: currentDeviceSchema.optional(),
  })
  .superRefine((input, context) => {
    const needsDevice =
      input.profile.objective === "REPAIR" || input.profile.objective === "TRADE_IN";

    if (needsDevice && !input.currentDevice) {
      context.addIssue({
        code: "custom",
        message: "Necesitamos los datos básicos de tu equipo para evaluar esta alternativa.",
        path: ["currentDevice"],
      });
    }
  });

export const productSchema = z.object({
  id: z.string(),
  model: z.string(),
  storageGb: z.number().int().positive(),
  condition: z.enum(["NEW", "CERTIFIED_USED"]),
  priceCop: z.number().int().nonnegative(),
  batteryHealth: z.number().int().min(1).max(100).optional(),
  warrantyDays: z.number().int().nonnegative(),
  imeiVerified: z.boolean(),
  componentsChecked: z.array(z.string()),
  available: z.boolean(),
  isTestData: z.literal(true),
});

export const repairOptionSchema = z.object({
  id: z.string(),
  label: z.string(),
  failureCategory: z.enum(["BATTERY", "SCREEN", "CAMERA", "CHARGING", "OTHER"]),
  estimatedCostCop: z.number().int().nonnegative(),
  requiresDiagnosis: z.boolean(),
  isTestData: z.literal(true),
});

export const tradeInValueSchema = z.object({
  model: z.string(),
  storageGb: z.number().int().positive(),
  estimatedValueCop: z.number().int().nonnegative(),
  requiresInspection: z.boolean(),
  isTestData: z.literal(true),
});
