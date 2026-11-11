import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { deviceCatalog, getDeviceImage } from "@/data/device-catalog";
import { formatCop } from "@/lib/currency";

export const metadata: Metadata = {
  title: "Catálogo iPhone 13 a 18 Pro Max",
  description:
    "Explora fotografías reales y precios aproximados de iPhone nuevos y usados certificados en Colombia, desde iPhone 13 hasta iPhone 18 Pro Max.",
};

const generations = Array.from(
  new Set(deviceCatalog.map((device) => device.generation)),
).sort((first, second) => second - first);

const oldestGeneration = Math.min(...generations);
const latestGeneration = Math.max(...generations);
const featuredDevice = [...deviceCatalog].sort(
  (first, second) =>
    second.generation - first.generation ||
    second.newPriceCop - first.newPriceCop,
)[0];

function getStockLabel(stock: number | null) {
  if (stock === null) return "Stock sin registrar · no se recomienda";
  if (stock === 0) return "Agotado · no se recomienda";
  return `${stock} ${stock === 1 ? "unidad disponible" : "unidades disponibles"}`;
}

export default function CatalogPage() {
  const heroImage = featuredDevice && getDeviceImage(featuredDevice.model);

  return (
    <main className="flex-1 bg-white">
      <section className="overflow-hidden border-b border-white/10 bg-black text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-20">
          <div className="relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-white/55">
              Catálogo Colombia · precios en COP
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.9] font-semibold tracking-[-0.06em] sm:text-7xl xl:text-8xl">
              El iPhone correcto se ve y se compara.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">
              {deviceCatalog.length} modelos, desde la generación {oldestGeneration} hasta
              la {latestGeneration}, con fotografías de producto, precios e inventario para
              equipos nuevos y usados certificados.
            </p>
            <div className="mt-8 flex flex-wrap gap-2" aria-label="Ir a una generación">
              {generations.map((generation) => (
                <a
                  key={generation}
                  href={`#iphone-${generation}`}
                  className="rounded-full border border-white/20 px-4 py-2 text-sm font-bold text-white transition hover:border-white hover:bg-white hover:text-black"
                >
                  iPhone {generation}
                </a>
              ))}
            </div>
          </div>

          {heroImage && (
            <div className="relative min-h-[24rem] overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#090909] sm:min-h-[34rem]">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-contain p-6 grayscale sm:p-10"
              />
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 border-t border-white/15 pt-4 text-xs sm:inset-x-7 sm:bottom-7">
                <div>
                  <p className="font-black uppercase tracking-[0.16em] text-white">
                    {featuredDevice.model}
                  </p>
                  <p className="mt-1 text-white/50">Fotografía de catálogo · vista monocromática</p>
                </div>
                <a
                  href={heroImage.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-white/60 underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  Fuente de imagen ↗
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="border-b border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto w-full max-w-7xl px-5 py-5 text-sm sm:px-8">
          <p className="font-bold text-black">Precios aproximados, no cotizaciones.</p>
          {/*
            Contexto retirado de la interfaz:
            - {catalogPriceReference.note}
            - El motor solo recomienda condiciones con stock mayor que cero en el CSV.
            - Última actualización: {catalogPriceReference.checkedAt}

            Si se vuelve a mostrar este contenido, restaurar el import de
            catalogPriceReference desde @/data/device-catalog.
          */}
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:py-20">
        {generations.map((generation) => {
          const devices = deviceCatalog.filter(
            (device) => device.generation === generation,
          );

          return (
            <section
              id={`iphone-${generation}`}
              key={generation}
              className="scroll-mt-28 border-b border-[color:var(--line)] py-14 first:pt-0 last:border-0"
            >
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[color:var(--muted)]">
                    Generación {generation}
                  </p>
                  <h2 className="mt-2 font-display text-5xl font-semibold tracking-[-0.055em] text-black sm:text-6xl">
                    iPhone {generation}
                  </h2>
                </div>
                <p className="max-w-md text-sm leading-6 text-[color:var(--muted)] sm:text-right">
                  {devices.length} {devices.length === 1 ? "modelo" : "modelos"} · precios
                  base para la capacidad indicada
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {devices.map((device) => {
                  const productImage = getDeviceImage(device.model);

                  return (
                    <article
                      key={device.model}
                      className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-[color:var(--line)] bg-white transition duration-300 hover:-translate-y-1 hover:border-black hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--surface)]">
                        {productImage && (
                          <Image
                            src={productImage.src}
                            alt={productImage.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                            className="object-contain p-5 grayscale transition duration-500 group-hover:scale-[1.025]"
                          />
                        )}
                        <span className="absolute left-4 top-4 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-black backdrop-blur">
                          {device.category}
                        </span>
                        {productImage && (
                          <a
                            href={productImage.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute bottom-3 right-3 rounded-full bg-black/75 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur transition hover:bg-black"
                            aria-label={`Ver fuente original de la fotografía de ${device.model}`}
                          >
                            Fuente foto ↗
                          </a>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-2xl font-black tracking-[-0.04em] text-black">
                            {device.model}
                          </h3>
                          <span className="shrink-0 pt-1 font-mono text-[11px] text-[color:var(--muted)]">
                            {device.storageGb} GB
                          </span>
                        </div>
                        <p className="mt-3 min-h-12 text-sm leading-6 text-[color:var(--muted)]">
                          {device.highlight}
                        </p>

                        <dl className="mt-5 grid gap-2 border-t border-[color:var(--line)] pt-4">
                          <div className="rounded-xl bg-[color:var(--surface)] p-3">
                            <dt className="text-[10px] font-black uppercase tracking-[0.14em] text-[color:var(--muted)]">
                              Nuevo sellado
                            </dt>
                            <dd className="mt-1 text-lg font-black tracking-[-0.02em] text-black">
                              {formatCop(device.newPriceCop)}
                            </dd>
                            <dd className="mt-1 text-xs font-semibold text-[color:var(--muted)]">
                              {getStockLabel(device.newStock)}
                            </dd>
                          </div>
                          <div className="rounded-xl border border-[color:var(--line)] p-3">
                            <dt className="text-[10px] font-black uppercase tracking-[0.14em] text-[color:var(--muted)]">
                              Segunda · certificado
                            </dt>
                            <dd className="mt-1 text-lg font-black tracking-[-0.02em] text-black">
                              {device.certifiedUsedPriceCop === null
                                ? "Sin referencia aún"
                                : formatCop(device.certifiedUsedPriceCop)}
                            </dd>
                            <dd className="mt-1 text-xs font-semibold text-[color:var(--muted)]">
                              {device.certifiedUsedPriceCop === null
                                ? "Sin inventario publicado"
                                : getStockLabel(device.certifiedUsedStock)}
                            </dd>
                          </div>
                        </dl>

                        <Link
                          href="/guia"
                          className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-black px-5 text-sm font-black text-white transition hover:bg-neutral-800"
                        >
                          Comparar con mi iPhone
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className="mt-14 flex flex-col gap-6 rounded-[1.75rem] bg-black p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">
              No elijas solo por el precio
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl font-semibold tracking-[-0.045em]">
              Recibe una recomendación según tu iPhone actual.
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-white/60">
              La guía descarta equipos iguales o inferiores y explica qué mejora obtienes
              con cada salto.
            </p>
          </div>
          <Link
            href="/guia"
            className="inline-flex min-h-14 shrink-0 items-center justify-center rounded-full bg-white px-7 font-black text-black transition hover:-translate-y-0.5 hover:bg-neutral-200"
          >
            Encontrar mi mejor opción →
          </Link>
        </section>

        <p className="mx-auto mt-8 max-w-4xl text-center text-xs leading-5 text-[color:var(--muted)]">
          Las imágenes se muestran en escala de grises para conservar el lenguaje visual del
          sitio; los colores reales dependen del acabado disponible. La fuente de cada
          fotografía está enlazada en su ficha. Apple e iPhone son marcas de Apple Inc.
        </p>
      </div>
    </main>
  );
}
