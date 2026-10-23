import { generatedDeviceInventory } from "@/data/device-inventory.generated";
import {
  buildProductCatalog,
  buildTradeInCatalog,
} from "@/data/device-catalog";
import repairOptionsData from "@/data/repair-options.json";
import tradeInValuesData from "@/data/trade-in-values.json";
import {
  productSchema,
  repairOptionSchema,
  tradeInValueSchema,
} from "./advisor.schema";
import type { AdvisorCatalogs } from "./advisor.types";

export const advisorCatalogs: AdvisorCatalogs = {
  products: productSchema.array().parse(buildProductCatalog()),
  repairOptions: repairOptionSchema.array().parse(repairOptionsData),
  tradeInValues: tradeInValueSchema
    .array()
    .parse([...buildTradeInCatalog(), ...tradeInValuesData]),
};

/**
 * Creates a compact, deterministic identifier for JSON-compatible catalog data.
 * Two independent 32-bit hashes make accidental collisions unlikely without
 * requiring an asynchronous browser crypto API.
 */
export function createCatalogRevision(value: unknown) {
  const serialized = JSON.stringify(value);
  let fnv = 0x811c9dc5;
  let djb = 5381;

  for (let index = 0; index < serialized.length; index += 1) {
    const code = serialized.charCodeAt(index);
    fnv = Math.imul(fnv ^ code, 0x01000193);
    djb = Math.imul(djb, 33) ^ code;
  }

  return [
    "catalog-v1",
    (fnv >>> 0).toString(36),
    (djb >>> 0).toString(36),
    serialized.length.toString(36),
  ].join("-");
}

export const advisorCatalogRevision = createCatalogRevision({
  // The complete inventory is included so image path and metadata changes also
  // invalidate a stored result, even though images are not part of Product.
  inventory: generatedDeviceInventory,
  repairOptions: advisorCatalogs.repairOptions,
  tradeInValues: advisorCatalogs.tradeInValues,
});
