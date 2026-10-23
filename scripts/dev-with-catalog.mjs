import { watchFile, unwatchFile } from "node:fs";
import { spawn } from "node:child_process";
import { resolve } from "node:path";
import {
  inventoryCsvPath,
  projectRoot,
  syncCatalogInventory,
} from "./sync-catalog-inventory.mjs";

function synchronize(label) {
  try {
    const result = syncCatalogInventory();
    if (result.updated) {
      console.log(
        "[inventario] " +
          label +
          ": " +
          result.count +
          " dispositivos sincronizados.",
      );
    }
    return true;
  } catch (error) {
    console.error(
      "[inventario] " +
        (error instanceof Error ? error.message : "No se pudo sincronizar el CSV."),
    );
    return false;
  }
}

if (!synchronize("inicio")) {
  process.exit(1);
}

const nextCli = resolve(projectRoot, "node_modules/next/dist/bin/next");
const child = spawn(process.execPath, [nextCli, "dev", ...process.argv.slice(2)], {
  cwd: projectRoot,
  env: process.env,
  stdio: "inherit",
});

let debounceTimer;
watchFile(inventoryCsvPath, { interval: 500 }, (current, previous) => {
  if (current.mtimeMs === previous.mtimeMs) return;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => synchronize("archivo guardado"), 150);
});

function stopWatching() {
  clearTimeout(debounceTimer);
  unwatchFile(inventoryCsvPath);
}

child.on("error", (error) => {
  stopWatching();
  console.error("[inventario] No se pudo iniciar Next.js:", error.message);
  process.exitCode = 1;
});

child.on("exit", (code, signal) => {
  stopWatching();
  process.exitCode = signal === "SIGINT" ? 130 : signal === "SIGTERM" ? 143 : code ?? 1;
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    stopWatching();
    if (!child.killed) child.kill(signal);
  });
}
