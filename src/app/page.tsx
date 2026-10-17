import Image from "next/image";
import Link from "next/link";
import { deviceCatalog, getDeviceImage } from "@/data/device-catalog";
import { formatCop } from "@/lib/currency";

const journey = [
  {
    step: "01",
    title: "Cuéntanos tu contexto",
    text: "Presupuesto, uso principal, prioridad y qué tan pronto necesitas resolverlo.",
  },
  {
    step: "02",
    title: "Revisamos las rutas posibles",
    text: "Las reglas comparan alternativas compatibles y hacen visibles sus condiciones.",
  },
  {
    step: "03",
    title: "Recibe una recomendación explicada",
    text: "Verás costos estimados, razones, límites y un siguiente paso concreto.",
  },
];

const catalogSummary = [13, 14, 15, 16, 17, 18].map((generation) => {
  const devices = deviceCatalog.filter((device) => device.generation === generation);
  const certifiedPrices = devices.flatMap((device) =>
    device.certifiedUsedPriceCop === null ? [] : [device.certifiedUsedPriceCop],
  );
  const representative = devices.at(-1)!;

  return {
    generation,
    variants: devices.length,
    startingPrice:
      certifiedPrices.length > 0
        ? Math.min(...certifiedPrices)
        : Math.min(...devices.map((device) => device.newPriceCop)),
    priceCondition: certifiedPrices.length > 0 ? "Usado certificado" : "Nuevo",
    image: getDeviceImage(representative.model),
  };
});

export default function Home() {
  const featuredDevice = deviceCatalog.find(
    (device) => device.model === "iPhone 18 Pro Max",
  )!;
  const featuredImage = getDeviceImage(featuredDevice.model)!;

  return (
    <main className="overflow-hidden">
      <section className="hero-grid border-b border-[color:var(--line)]">
        <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] w-full max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.17em] text-black">
              <span className="size-2 rounded-full bg-black" />
              Compra mejor. No simplemente más nuevo.
            </p>
            <h1 className="max-w-4xl text-balance font-display text-[clamp(3.35rem,7.4vw,7rem)] leading-[0.87] font-semibold tracking-[-0.067em] text-black">
              Tu próximo iPhone debe ser un salto real.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
              Comparamos tu equipo actual con 23 modelos, sus precios y su categoría.
              Si tienes un iPhone 15 Pro Max, solo te mostraremos opciones que de verdad lo
              superen y te explicaremos por qué.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/guia"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-black px-7 text-base font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-neutral-800"
              >
                Encontrar mi mejor opción
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/catalogo"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-black bg-white px-6 font-bold text-black transition hover:bg-neutral-100"
              >
                Ver modelos y precios
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-3 border-y border-[color:var(--line-strong)] py-5">
              {[
                ["23", "modelos"],
                ["6", "generaciones"],
                ["1", "recomendación clara"],
              ].map(([value, label]) => (
                <div key={label} className="border-r border-[color:var(--line)] px-3 first:pl-0 last:border-0">
                  <dd className="text-2xl font-black text-black sm:text-3xl">{value}</dd>
                  <dt className="mt-1 text-xs font-bold uppercase tracking-[0.08em] text-[color:var(--muted)]">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="decision-panel relative min-h-[34rem] overflow-hidden rounded-[1.75rem] bg-black shadow-[0_28px_75px_rgba(0,0,0,0.2)] sm:min-h-[41rem]">
              <div className="absolute inset-x-5 top-5 z-10 flex items-center justify-between gap-4 sm:inset-x-7 sm:top-7">
                <span className="rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-white backdrop-blur">
                  Gama más reciente
                </span>
                <Image
                  src="/brand/iphone-direct-colombia.png"
                  alt="iPhone Direct Colombia"
                  width={1254}
                  height={1254}
                  priority
                  className="-my-16 h-auto w-24 sm:w-28"
                />
              </div>

              <Image
                src={featuredImage.src}
                alt={featuredImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-contain px-6 pb-28 pt-16 grayscale sm:px-10 sm:pb-32"
              />

              <div className="absolute inset-x-4 bottom-4 rounded-[1.25rem] border border-white/15 bg-black/75 p-5 text-white backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-6">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-white/50">
                      Destacado
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-[-0.035em]">
                      {featuredDevice.model}
                    </h2>
                    <p className="mt-2 text-sm text-white/55">{featuredDevice.highlight}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/45">
                      Desde
                    </p>
                    <p className="mt-1 text-lg font-black">
                      {formatCop(featuredDevice.newPriceCop)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-[color:var(--muted)]">
              Fotografía oficial de Apple, presentada en escala de grises.
            </p>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-24 bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow">Un recorrido breve y comprensible</p>
              <h2 className="mt-5 max-w-xl font-display text-5xl leading-[0.98] font-semibold tracking-[-0.05em] text-[color:var(--ink)] sm:text-6xl">
                Primero entendemos. Después comparamos.
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-[color:var(--muted)]">
                No asumimos que comprar otro equipo sea siempre la respuesta.
                La recomendación parte de tu necesidad y del estado declarado de tu iPhone.
              </p>
            </div>
            <ol className="border-t border-[color:var(--line-strong)]">
              {journey.map((item) => (
                <li
                  key={item.step}
                  className="grid gap-3 border-b border-[color:var(--line-strong)] py-8 sm:grid-cols-[4rem_0.8fr_1.2fr] sm:items-start"
                >
                  <span className="font-mono text-sm font-bold text-[color:var(--accent)]">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-extrabold tracking-[-0.02em] text-[color:var(--ink)]">
                    {item.title}
                  </h3>
                  <p className="leading-7 text-[color:var(--muted)]">{item.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y border-[color:var(--line)] bg-[color:var(--canvas)]">
        <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:py-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Catálogo ampliado</p>
              <h2 className="mt-5 max-w-3xl font-display text-5xl leading-[0.95] font-semibold tracking-[-0.055em] text-black sm:text-6xl">
                Seis generaciones. Cada categoría importante.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-[color:var(--muted)]">
              Consulta referencias nuevas y usadas certificadas. Los precios son
              aproximados y se confirman según capacidad, color y disponibilidad.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {catalogSummary.map((item) => (
              <Link
                key={item.generation}
                href={`/catalogo#iphone-${item.generation}`}
                className="group overflow-hidden rounded-[1.5rem] border border-[color:var(--line)] bg-white transition hover:-translate-y-1 hover:border-black hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--surface)]">
                  {item.image && (
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-5 grayscale transition duration-500 group-hover:scale-[1.035]"
                    />
                  )}
                  <span className="absolute right-4 top-4 rounded-full bg-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.13em] text-white">
                    {item.variants} variantes
                  </span>
                </div>
                <div className="flex items-end justify-between gap-4 p-6">
                  <div>
                    <p className="font-display text-5xl font-semibold tracking-[-0.06em] text-black">
                      {item.generation}
                    </p>
                    <p className="mt-3 text-[10px] font-black uppercase tracking-[0.14em] text-[color:var(--muted)]">
                      {item.priceCondition} desde
                    </p>
                    <p className="mt-1 text-xl font-black tracking-[-0.03em] text-black">
                      {formatCop(item.startingPrice)}
                    </p>
                  </div>
                  <span className="grid size-10 place-items-center rounded-full border border-black text-lg transition group-hover:bg-black group-hover:text-white">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-[color:var(--muted)]">
              La gama 18 disponible incluye iPhone 18 Pro y iPhone 18 Pro Max.
            </p>
            <Link
              href="/catalogo"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-black px-6 font-black text-white transition hover:-translate-y-0.5 hover:bg-neutral-800"
            >
              Explorar todos los modelos →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[color:var(--line)] bg-[color:var(--surface)]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-32">
          <div className="relative min-h-[31rem] overflow-hidden rounded-[2.5rem] bg-[color:var(--surface-muted)] p-7 sm:p-10">
            <div className="absolute -right-16 -top-16 size-64 rounded-full border-[40px] border-white/25" />
            <p className="relative text-xs font-black uppercase tracking-[0.18em] text-[color:var(--ink)]/55">
              La pregunta central
            </p>
            <blockquote className="relative mt-8 max-w-2xl font-display text-4xl leading-[1.02] font-semibold tracking-[-0.045em] text-[color:var(--ink)] sm:text-6xl">
              “¿Qué alternativa resuelve mi necesidad con el costo y las condiciones que puedo aceptar?”
            </blockquote>
            <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between sm:bottom-10 sm:left-10 sm:right-10">
              <p className="max-w-xs text-sm leading-6 text-[color:var(--ink)]/65">
                Esa es la decisión que organiza el MVP.
              </p>
              <div className="grid size-16 place-items-center rounded-full bg-[color:var(--ink)] text-2xl text-[color:var(--surface-bright)]">
                ↘
              </div>
            </div>
          </div>

          <div className="lg:pl-10">
            <p className="eyebrow">Qué obtienes al finalizar</p>
            <h2 className="mt-5 font-display text-5xl leading-[0.98] font-semibold tracking-[-0.05em] text-[color:var(--ink)] sm:text-6xl">
              Una recomendación que se puede revisar.
            </h2>
            <ul className="mt-9 space-y-6">
              {[
                "Una ruta principal y máximo dos alternativas.",
                "Costos bruto, retoma estimada y desembolso neto.",
                "Razones, supuestos y condiciones que influyeron.",
                "Una acción clara para continuar con revisión humana.",
              ].map((benefit, index) => (
                <li key={benefit} className="flex items-start gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[color:var(--accent)] text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-lg font-semibold leading-7 text-[color:var(--ink)]">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="transparencia" className="scroll-mt-24 bg-[color:var(--ink)] text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-32">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[color:var(--surface-bright)]">
              Transparencia desde el principio
            </p>
            <h2 className="mt-5 max-w-xl font-display text-5xl leading-[0.98] font-semibold tracking-[-0.05em] sm:text-6xl">
              Orientación, no promesas automáticas.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {[
              ["Datos mínimos", "No pedimos IMEI completo, documentos ni información de pago."],
              [
                "Precios referenciales",
                "Usamos precios aproximados de mercado y mostramos cuándo fueron verificados.",
              ],
              ["Reglas explícitas", "Los criterios viven fuera de la interfaz y pueden auditarse."],
              ["Confirmación humana", "Toda reparación y retoma depende de una inspección."],
            ].map(([title, text]) => (
              <div key={title} className="bg-[color:var(--ink)] p-7 sm:p-8">
                <h3 className="text-lg font-extrabold text-white">{title}</h3>
                <p className="mt-3 leading-7 text-white/58">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--surface-bright)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[color:var(--accent-hover)]">
              Tu contexto cambia la respuesta
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-none font-semibold tracking-[-0.045em] text-[color:var(--ink)] sm:text-5xl">
              Empieza por contar lo que realmente necesitas.
            </h2>
          </div>
          <Link
            href="/guia"
            className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-[color:var(--ink)] px-7 font-extrabold text-white transition hover:-translate-y-1 hover:bg-[color:var(--accent-hover)]"
          >
            Comenzar mi guía
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
