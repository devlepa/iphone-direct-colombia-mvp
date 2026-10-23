import {
  existsSync,
  readFileSync,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
export const projectRoot = resolve(scriptDirectory, "..");
export const inventoryCsvPath = resolve(projectRoot, "data/catalogo-inventario.csv");
export const generatedInventoryPath = resolve(
  projectRoot,
  "src/data/device-inventory.generated.ts",
);
export const publicDirectory = resolve(projectRoot, "public");

export const inventoryHeaders = [
  "modelo",
  "generacion",
  "nivel",
  "categoria",
  "capacidad_gb",
  "precio_nuevo_cop",
  "stock_nuevo",
  "precio_usado_certificado_cop",
  "stock_usado_certificado",
  "valor_retoma_cop",
  "caracteristica_destacada",
  "ruta_imagen",
  "texto_alternativo_imagen",
  "fuente_imagen",
  "fecha_verificacion",
];

const validTiers = new Set([
  "VALUE",
  "MINI",
  "STANDARD",
  "PLUS",
  "AIR",
  "PRO",
  "PRO_MAX",
]);

const validImageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

function csvError(lineNumber, field, message) {
  const location = field ? " [" + field + "]" : "";
  return new Error(
    "data/catalogo-inventario.csv:" + lineNumber + location + ": " + message,
  );
}

export function parseCsv(input) {
  const text = input.replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  let lineNumber = 1;
  let rowStartLine = 1;

  function finishRow() {
    row.push(cell);
    const isBlank = row.every((value) => value.trim() === "");
    if (!isBlank) {
      rows.push({ cells: row, lineNumber: rowStartLine });
    }
    row = [];
    cell = "";
  }

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (quoted) {
      if (character === '"') {
        if (text[index + 1] === '"') {
          cell += '"';
          index += 1;
        } else {
          quoted = false;
        }
      } else {
        cell += character;
        if (character === "\n") lineNumber += 1;
      }
      continue;
    }

    if (character === '"' && cell === "") {
      quoted = true;
    } else if (character === ",") {
      row.push(cell);
      cell = "";
    } else if (character === "\n") {
      finishRow();
      lineNumber += 1;
      rowStartLine = lineNumber;
    } else if (character !== "\r") {
      cell += character;
    }
  }

  if (quoted) {
    throw csvError(rowStartLine, "", "hay un campo entre comillas sin cerrar.");
  }

  if (cell !== "" || row.length > 0) {
    finishRow();
  }

  return rows;
}

function requiredText(record, field, lineNumber) {
  const value = record[field]?.trim() ?? "";
  if (!value) {
    throw csvError(lineNumber, field, "el valor es obligatorio.");
  }
  return value;
}

function integerValue(record, field, lineNumber, options = {}) {
  const value = record[field]?.trim() ?? "";
  const nullable = options.nullable ?? false;
  const minimum = options.minimum ?? 0;

  if (value === "" && nullable) return null;
  if (!/^\d+$/.test(value)) {
    throw csvError(
      lineNumber,
      field,
      "se esperaba un entero sin puntos, comas ni símbolo de moneda.",
    );
  }

  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < minimum) {
    throw csvError(
      lineNumber,
      field,
      "el valor debe ser un entero mayor o igual a " + minimum + ".",
    );
  }

  return parsed;
}

function isoDateValue(record, field, lineNumber) {
  const value = requiredText(record, field, lineNumber);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw csvError(lineNumber, field, "usa el formato YYYY-MM-DD.");
  }

  const parsed = new Date(value + "T00:00:00Z");
  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== value
  ) {
    throw csvError(lineNumber, field, "la fecha no es válida.");
  }

  return value;
}

function httpsUrlValue(record, field, lineNumber) {
  const value = requiredText(record, field, lineNumber);
  let parsed;

  try {
    parsed = new URL(value);
  } catch {
    throw csvError(lineNumber, field, "la URL no es válida.");
  }

  if (parsed.protocol !== "https:") {
    throw csvError(lineNumber, field, "la URL debe comenzar por https://.");
  }

  return value;
}

function imagePathValue(record, field, lineNumber, options) {
  const value = requiredText(record, field, lineNumber);
  if (!value.startsWith("/products/") || value.includes("..") || value.includes("\\")) {
    throw csvError(
      lineNumber,
      field,
      "usa una ruta local segura dentro de /products/.",
    );
  }

  if (!validImageExtensions.has(extname(value).toLowerCase())) {
    throw csvError(
      lineNumber,
      field,
      "usa una imagen con extensión .jpg, .jpeg, .png, .webp o .avif.",
    );
  }

  const absolutePath = resolve(options.publicDir, value.slice(1));
  const publicRoot = resolve(options.publicDir) + sep;
  if (!absolutePath.startsWith(publicRoot)) {
    throw csvError(lineNumber, field, "la ruta sale de la carpeta public.");
  }

  if (options.verifyImageFiles) {
    if (!existsSync(absolutePath)) {
      throw csvError(
        lineNumber,
        field,
        "no existe el archivo " + value + " dentro de public.",
      );
    }

    if (!statSync(absolutePath).isFile()) {
      throw csvError(
        lineNumber,
        field,
        value + " debe ser un archivo de imagen, no una carpeta.",
      );
    }
  }

  return value;
}

export function validateInventoryRows(parsedRows, options = {}) {
  const publicDir = options.publicDir ?? publicDirectory;
  const verifyImageFiles = options.verifyImageFiles ?? true;

  if (parsedRows.length < 2) {
    throw new Error(
      "data/catalogo-inventario.csv debe incluir encabezados y al menos un dispositivo.",
    );
  }

  const headerRow = parsedRows[0];
  if (
    headerRow.cells.length !== inventoryHeaders.length ||
    inventoryHeaders.some((header, index) => headerRow.cells[index] !== header)
  ) {
    throw csvError(
      headerRow.lineNumber,
      "",
      "los encabezados no coinciden. Usa exactamente: " +
        inventoryHeaders.join(","),
    );
  }

  const seenModels = new Map();
  const entries = parsedRows.slice(1).map((row) => {
    if (row.cells.length !== inventoryHeaders.length) {
      throw csvError(
        row.lineNumber,
        "",
        "se esperaban " +
          inventoryHeaders.length +
          " columnas y se encontraron " +
          row.cells.length +
          ".",
      );
    }

    const record = Object.fromEntries(
      inventoryHeaders.map((header, index) => [header, row.cells[index]]),
    );
    const model = requiredText(record, "modelo", row.lineNumber);
    const previousLine = seenModels.get(model);
    if (previousLine) {
      throw csvError(
        row.lineNumber,
        "modelo",
        "modelo duplicado; ya aparece en la línea " + previousLine + ".",
      );
    }
    seenModels.set(model, row.lineNumber);

    const tier = requiredText(record, "nivel", row.lineNumber);
    if (!validTiers.has(tier)) {
      throw csvError(
        row.lineNumber,
        "nivel",
        "usa VALUE, MINI, STANDARD, PLUS, AIR, PRO o PRO_MAX.",
      );
    }

    const certifiedUsedPriceCop = integerValue(
      record,
      "precio_usado_certificado_cop",
      row.lineNumber,
      { nullable: true, minimum: 1 },
    );
    const certifiedUsedStock = integerValue(
      record,
      "stock_usado_certificado",
      row.lineNumber,
      { nullable: true, minimum: 0 },
    );

    if (certifiedUsedPriceCop === null && (certifiedUsedStock ?? 0) > 0) {
      throw csvError(
        row.lineNumber,
        "stock_usado_certificado",
        "no puede haber stock usado sin un precio usado certificado.",
      );
    }

    return {
      model,
      generation: integerValue(record, "generacion", row.lineNumber, {
        minimum: 1,
      }),
      tier,
      category: requiredText(record, "categoria", row.lineNumber),
      storageGb: integerValue(record, "capacidad_gb", row.lineNumber, {
        minimum: 1,
      }),
      newPriceCop: integerValue(record, "precio_nuevo_cop", row.lineNumber, {
        minimum: 1,
      }),
      newStock: integerValue(record, "stock_nuevo", row.lineNumber, {
        nullable: true,
        minimum: 0,
      }),
      certifiedUsedPriceCop,
      certifiedUsedStock,
      tradeInValueCop: integerValue(record, "valor_retoma_cop", row.lineNumber, {
        minimum: 0,
      }),
      highlight: requiredText(
        record,
        "caracteristica_destacada",
        row.lineNumber,
      ),
      image: {
        src: imagePathValue(record, "ruta_imagen", row.lineNumber, {
          publicDir,
          verifyImageFiles,
        }),
        alt: requiredText(record, "texto_alternativo_imagen", row.lineNumber),
        sourceUrl: httpsUrlValue(record, "fuente_imagen", row.lineNumber),
      },
      priceCheckedAt: isoDateValue(
        record,
        "fecha_verificacion",
        row.lineNumber,
      ),
    };
  });

  return entries;
}

export function renderGeneratedInventory(entries) {
  const latestPriceCheck = [...entries]
    .map((entry) => entry.priceCheckedAt)
    .sort()
    .at(-1);
  const serializedEntries = JSON.stringify(entries, null, 2);

  return [
    "// Este archivo se genera desde data/catalogo-inventario.csv.",
    "// No lo edites manualmente: ejecuta npm run catalog:sync.",
    "",
    "export type GeneratedDeviceInventoryEntry = {",
    "  model: string;",
    "  generation: number;",
    '  tier: "VALUE" | "MINI" | "STANDARD" | "PLUS" | "AIR" | "PRO" | "PRO_MAX";',
    "  category: string;",
    "  storageGb: number;",
    "  newPriceCop: number;",
    "  newStock: number | null;",
    "  certifiedUsedPriceCop: number | null;",
    "  certifiedUsedStock: number | null;",
    "  tradeInValueCop: number;",
    "  highlight: string;",
    "  image: { src: string; alt: string; sourceUrl: string };",
    "  priceCheckedAt: string;",
    "};",
    "",
    "export const generatedDeviceInventory: GeneratedDeviceInventoryEntry[] = " +
      serializedEntries +
      ";",
    "",
    "export const latestCatalogPriceCheck = " +
      JSON.stringify(latestPriceCheck) +
      ";",
    "",
  ].join("\n");
}

export function writeIfChanged(outputPath, content) {
  if (existsSync(outputPath) && readFileSync(outputPath, "utf8") === content) {
    return false;
  }

  const temporaryPath = outputPath + ".tmp-" + process.pid;
  try {
    writeFileSync(temporaryPath, content, "utf8");
    renameSync(temporaryPath, outputPath);
  } finally {
    if (existsSync(temporaryPath)) unlinkSync(temporaryPath);
  }
  return true;
}

export function syncCatalogInventory(options = {}) {
  const inputPath = options.inputPath ?? inventoryCsvPath;
  const outputPath = options.outputPath ?? generatedInventoryPath;
  const publicDir = options.publicDir ?? publicDirectory;
  const checkOnly = options.checkOnly ?? false;
  const csv = readFileSync(inputPath, "utf8");
  const entries = validateInventoryRows(parseCsv(csv), {
    publicDir,
    verifyImageFiles: options.verifyImageFiles ?? true,
  });
  const generated = renderGeneratedInventory(entries);

  if (checkOnly) {
    const synchronized =
      existsSync(outputPath) && readFileSync(outputPath, "utf8") === generated;
    if (!synchronized) {
      throw new Error(
        "El catálogo generado está desactualizado. Ejecuta npm run catalog:sync.",
      );
    }
    return { count: entries.length, updated: false, outputPath };
  }

  const updated = writeIfChanged(outputPath, generated);
  return { count: entries.length, updated, outputPath };
}

const invokedAsScript =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (invokedAsScript) {
  try {
    const result = syncCatalogInventory({
      checkOnly: process.argv.includes("--check"),
    });
    const status = process.argv.includes("--check")
      ? "verificado"
      : result.updated
        ? "actualizado"
        : "sin cambios";
    console.log(
      "Catálogo " + status + ": " + result.count + " dispositivos procesados.",
    );
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "No se pudo sincronizar el catálogo.",
    );
    process.exitCode = 1;
  }
}
