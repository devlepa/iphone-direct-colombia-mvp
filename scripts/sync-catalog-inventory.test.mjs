import assert from "node:assert/strict";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import test from "node:test";

import {
  inventoryCsvPath,
  inventoryHeaders,
  parseCsv,
  publicDirectory,
  renderGeneratedInventory,
  syncCatalogInventory,
  validateInventoryRows,
  writeIfChanged,
} from "./sync-catalog-inventory.mjs";

const baseRecord = {
  modelo: "iPhone de prueba",
  generacion: "18",
  nivel: "PRO",
  categoria: "Pro",
  capacidad_gb: "256",
  precio_nuevo_cop: "5700000",
  stock_nuevo: "",
  precio_usado_certificado_cop: "3900000",
  stock_usado_certificado: "",
  valor_retoma_cop: "4350000",
  caracteristica_destacada: "Cámara Pro y gran autonomía.",
  ruta_imagen: "/products/iphone-18-pro.jpg",
  texto_alternativo_imagen: "iPhone de prueba de frente",
  fuente_imagen: "https://www.apple.com/co/iphone/",
  fecha_verificacion: "2026-10-17",
};

function escapeCsvCell(value) {
  const text = String(value ?? "");
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function buildCsv(records, headers = inventoryHeaders) {
  return [
    headers.join(","),
    ...records.map((record) =>
      headers.map((header) => escapeCsvCell(record[header])).join(","),
    ),
  ].join("\n");
}

function validate(csv, options = {}) {
  return validateInventoryRows(parseCsv(csv), {
    verifyImageFiles: false,
    ...options,
  });
}

test("interpreta comas, comillas escapadas y saltos de línea dentro de campos citados", () => {
  const csv = buildCsv([
    {
      ...baseRecord,
      caracteristica_destacada:
        'Cámara "Pro", pantalla amplia\ny autonomía para todo el día.',
      texto_alternativo_imagen: "iPhone, visto de frente",
      stock_nuevo: "",
      stock_usado_certificado: "",
    },
  ]);

  const [entry] = validate(csv);

  assert.equal(
    entry.highlight,
    'Cámara "Pro", pantalla amplia\ny autonomía para todo el día.',
  );
  assert.equal(entry.image.alt, "iPhone, visto de frente");
  assert.equal(entry.newStock, null);
  assert.equal(entry.certifiedUsedStock, null);
});

test("conserva por separado el stock nuevo y usado definido en el CSV", () => {
  const [entry] = validate(
    buildCsv([
      {
        ...baseRecord,
        stock_nuevo: "0",
        stock_usado_certificado: "7",
      },
    ]),
  );

  assert.equal(entry.newStock, 0);
  assert.equal(entry.certifiedUsedStock, 7);
});

test("rechaza encabezados distintos al contrato del inventario", () => {
  const invalidHeaders = [...inventoryHeaders];
  invalidHeaders[0] = "model";

  assert.throws(
    () => validate(buildCsv([baseRecord], invalidHeaders)),
    /los encabezados no coinciden/,
  );
});

test("rechaza modelos duplicados e informa la primera aparición", () => {
  const csv = buildCsv([
    baseRecord,
    { ...baseRecord, precio_nuevo_cop: "5800000" },
  ]);

  assert.throws(
    () => validate(csv),
    /modelo duplicado; ya aparece en la línea 2/,
  );
});

test("rechaza stock usado positivo cuando no existe precio usado", () => {
  const csv = buildCsv([
    {
      ...baseRecord,
      precio_usado_certificado_cop: "",
      stock_usado_certificado: "2",
    },
  ]);

  assert.throws(
    () => validate(csv),
    /no puede haber stock usado sin un precio usado certificado/,
  );
});

test("rechaza rutas de imagen que intentan salir de public\/products", () => {
  const csv = buildCsv([
    { ...baseRecord, ruta_imagen: "/products/../secreto.jpg" },
  ]);

  assert.throws(
    () => validate(csv),
    /usa una ruta local segura dentro de \/products\//,
  );
});

test("rechaza extensiones que no sean imágenes web permitidas", () => {
  const csv = buildCsv([
    { ...baseRecord, ruta_imagen: "/products/ficha-iphone.pdf" },
  ]);

  assert.throws(
    () => validate(csv),
    /usa una imagen con extensión \.jpg, \.jpeg, \.png, \.webp o \.avif/,
  );
});

test("rechaza una ruta existente que apunta a una carpeta", (t) => {
  const temporaryPublicDirectory = mkdtempSync(
    join(tmpdir(), "iphone-direct-public-test-"),
  );
  t.after(() =>
    rmSync(temporaryPublicDirectory, { recursive: true, force: true }),
  );
  mkdirSync(join(temporaryPublicDirectory, "products", "directorio.jpg"), {
    recursive: true,
  });

  const csv = buildCsv([
    { ...baseRecord, ruta_imagen: "/products/directorio.jpg" },
  ]);

  assert.throws(
    () =>
      validateInventoryRows(parseCsv(csv), {
        publicDir: temporaryPublicDirectory,
        verifyImageFiles: true,
      }),
    /debe ser un archivo de imagen, no una carpeta/,
  );
});

test("genera TypeScript determinista sin alterar las entradas", () => {
  const entries = validate(
    buildCsv([
      {
        ...baseRecord,
        caracteristica_destacada: 'Cámara "Pro"',
        fecha_verificacion: "2026-10-16",
      },
      {
        ...baseRecord,
        modelo: "iPhone de prueba Max",
        nivel: "PRO_MAX",
        categoria: "Pro Max",
        fecha_verificacion: "2026-10-17",
      },
    ]),
  );
  const originalEntries = structuredClone(entries);

  const firstRender = renderGeneratedInventory(entries);
  const secondRender = renderGeneratedInventory(entries);

  assert.equal(firstRender, secondRender);
  assert.deepEqual(entries, originalEntries);
  assert.match(firstRender, /Cámara \\"Pro\\"/);
  assert.match(
    firstRender,
    /export const latestCatalogPriceCheck = "2026-10-17";/,
  );
});

test("writeIfChanged solo reemplaza el archivo cuando cambia el contenido", (t) => {
  const temporaryDirectory = mkdtempSync(
    join(tmpdir(), "iphone-direct-inventory-test-"),
  );
  const outputPath = join(temporaryDirectory, "inventory.generated.ts");
  t.after(() => rmSync(temporaryDirectory, { recursive: true, force: true }));

  assert.equal(writeIfChanged(outputPath, "primera versión\n"), true);
  assert.equal(readFileSync(outputPath, "utf8"), "primera versión\n");

  assert.equal(writeIfChanged(outputPath, "primera versión\n"), false);
  assert.equal(readFileSync(outputPath, "utf8"), "primera versión\n");

  assert.equal(writeIfChanged(outputPath, "segunda versión\n"), true);
  assert.equal(readFileSync(outputPath, "utf8"), "segunda versión\n");
  assert.equal(
    existsSync(outputPath + ".tmp-" + process.pid),
    false,
    "no debe quedar un archivo temporal después del reemplazo",
  );
});

test("el inventario real contiene modelos únicos y todas sus imágenes existen", () => {
  const entries = validateInventoryRows(
    parseCsv(readFileSync(inventoryCsvPath, "utf8")),
    { publicDir: publicDirectory, verifyImageFiles: true },
  );

  assert.ok(entries.length > 0);
  assert.equal(new Set(entries.map((entry) => entry.model)).size, entries.length);
  for (const entry of entries) {
    const imagePath = resolve(publicDirectory, entry.image.src.slice(1));
    assert.equal(
      existsSync(imagePath),
      true,
      `falta la imagen de ${entry.model}: ${entry.image.src}`,
    );
  }
});

test("checkOnly confirma que el CSV real y el módulo generado están sincronizados", () => {
  const expectedCount = validateInventoryRows(
    parseCsv(readFileSync(inventoryCsvPath, "utf8")),
    { publicDir: publicDirectory, verifyImageFiles: true },
  ).length;
  const result = syncCatalogInventory({ checkOnly: true });

  assert.deepEqual(
    { count: result.count, updated: result.updated },
    { count: expectedCount, updated: false },
  );
});

test("checkOnly detecta una salida generada obsoleta sin sobrescribirla", (t) => {
  const temporaryDirectory = mkdtempSync(
    join(tmpdir(), "iphone-direct-inventory-check-test-"),
  );
  const outputPath = join(temporaryDirectory, "inventory.generated.ts");
  t.after(() => rmSync(temporaryDirectory, { recursive: true, force: true }));
  writeFileSync(outputPath, "contenido obsoleto\n", "utf8");

  assert.throws(
    () =>
      syncCatalogInventory({
        inputPath: inventoryCsvPath,
        outputPath,
        publicDir: publicDirectory,
        checkOnly: true,
      }),
    /El catálogo generado está desactualizado/,
  );
  assert.equal(readFileSync(outputPath, "utf8"), "contenido obsoleto\n");
});
