import { z } from "zod";
import type { AdvisorCatalogs, RecommendationRecord } from "./advisor.types";
import { advisorInputSchema } from "./advisor.schema";
import { generateRecommendation } from "./advisor.service";

const recommendationOptionSchema = z.enum([
  "NEW",
  "CERTIFIED_USED",
  "REPAIR",
  "TRADE_IN",
]);

const recommendationAlternativeSchema = z.object({
  option: recommendationOptionSchema,
  productId: z.string().optional(),
  label: z.string(),
  score: z.number(),
  reasons: z.array(z.string()),
  assumptions: z.array(z.string()),
  estimatedGrossCostCop: z.number().nonnegative(),
  estimatedTradeInCop: z.number().nonnegative(),
  estimatedNetCostCop: z.number().nonnegative(),
  requiresHumanReview: z.boolean(),
});

const recommendationSchema = recommendationAlternativeSchema.extend({
  primaryOption: recommendationOptionSchema,
  alternatives: z.array(recommendationAlternativeSchema),
});

const recommendationRecordSchema = z.object({
  input: advisorInputSchema,
  recommendation: recommendationSchema,
  generatedAt: z.string(),
  catalogRevision: z.string().optional(),
});

const storedInputSchema = z.object({ input: z.unknown() }).passthrough();

export type RecommendationRecordResolution =
  | {
      status: "current";
      record: RecommendationRecord;
      refreshed: boolean;
    }
  | {
      status: "missing";
    }
  | {
      status: "invalid";
    };

/**
 * Never returns an obsolete recommendation as current. Legacy records without
 * a revision are regenerated from their saved, validated advisor input.
 */
export function resolveRecommendationRecord(
  storedValue: unknown,
  catalogs: AdvisorCatalogs,
  currentCatalogRevision: string,
  now: () => Date = () => new Date(),
): RecommendationRecordResolution {
  if (storedValue === null) return { status: "missing" };

  const storedRecord = recommendationRecordSchema.safeParse(storedValue);
  if (
    storedRecord.success &&
    storedRecord.data.catalogRevision === currentCatalogRevision
  ) {
    return {
      status: "current",
      record: storedRecord.data,
      refreshed: false,
    };
  }

  const container = storedInputSchema.safeParse(storedValue);
  if (!container.success) return { status: "invalid" };

  const input = advisorInputSchema.safeParse(container.data.input);
  if (!input.success) return { status: "invalid" };

  try {
    return {
      status: "current",
      record: {
        input: input.data,
        recommendation: generateRecommendation(input.data, catalogs),
        generatedAt: now().toISOString(),
        catalogRevision: currentCatalogRevision,
      },
      refreshed: true,
    };
  } catch {
    return { status: "invalid" };
  }
}
