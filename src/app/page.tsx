import Link from "next/link";

const decisionRoutes = [
  {
    number: "01",
    title: "Nuevo sellado",
    detail: "Garantía y mayor horizonte de uso.",
    highlighted: false,
  },
  {
    number: "02",
    title: "Usado certificado",
    detail: "Menor inversión con evidencia técnica.",
    highlighted: true,
  },
  {
    number: "03",
    title: "Reparar",
    detail: "Conservar tu equipo si todavía conviene.",
    highlighted: false,
  },
  {
    number: "04",
    title: "Trade-in",
    detail: "Usar tu equipo para reducir el desembolso.",
    highlighted: false,
  },
];

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

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className="hero-grid relative isolate border-b border-[color:var(--line)]">
        <div className="absolute left-[8%] top-24 -z-10 size-56 rounded-full bg-[color:var(--lime)]/35 blur-3xl" />
        <div className="absolute bottom-10 right-[10%] -z-10 size-72 rounded-full bg-[color:var(--peach)]/25 blur-3xl" />

        <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] w-full max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.03fr_0.97fr] lg:py-20">
          <div className="max-w-3xl">
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-[color:var(--line-strong)] bg-white/70 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--brand-dark)]">
              <span className="size-2 rounded-full bg-[color:var(--brand)]" />
              Decide con contexto, no por impulso
            </p>
            <h1 className="max-w-4xl text-balance font-display text-[clamp(3.25rem,8vw,7.25rem)] leading-[0.88] font-semibold tracking-[-0.065em] text-[color:var(--ink)]">
              Tu próximo iPhone empieza por una{" "}
              <span className="relative whitespace-nowrap text-[color:var(--brand)]">
                mejor decisión.
                <svg
                  className="absolute -bottom-2 left-0 w-full text-[color:var(--lime-strong)]"
                  viewBox="0 0 420 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 17C110 5 284 4 415 12"
                    stroke="currentColor"
                    strokeWidth="9"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="mt-9 max-w-2xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
              Compara comprar nuevo, elegir un usado certificado, reparar o
              entregar tu equipo como parte de pago. La guía organiza tus
              opciones y te explica por qué una puede convenirte más.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/guia"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[color:var(--brand)] px-7 text-base font-extrabold text-white shadow-[0_16px_40px_rgba(13,107,85,0.2)] transition hover:-translate-y-1 hover:bg-[color:var(--brand-dark)]"
              >
                Encontrar mi mejor ruta
                <span
                  className="grid size-7 place-items-center rounded-full bg-white/15 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
              <a
                href="#como-funciona"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-white/60 px-6 font-bold text-[color:var(--ink)] transition hover:bg-white"
              >
                Ver cómo funciona
              </a>
            </div>
            <p className="mt-5 text-sm text-[color:var(--muted)]">
              Sin registro · Sin pagos · Valores de prueba claramente identificados
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-8 top-16 hidden rotate-[-9deg] rounded-2xl border border-[color:var(--line)] bg-[color:var(--lime)] px-5 py-3 text-sm font-black text-[color:var(--ink)] shadow-lg sm:block">
              4 rutas. Una decisión clara.
            </div>
            <div className="decision-panel relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-[color:var(--ink)] p-3 shadow-[0_40px_100px_rgba(12,31,26,0.25)]">
              <div className="rounded-[1.75rem] border border-white/10 bg-[#102a24] p-5 sm:p-7">
                <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--lime)]">
                      Vista de ejemplo
                    </p>
                    <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-white">
                      Mapa de decisión
                    </h2>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/70">
                    Datos ilustrativos
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {decisionRoutes.map((route) => (
                    <div
                      key={route.number}
                      className={
                        route.highlighted
                          ? "group flex items-center gap-4 rounded-2xl border border-[color:var(--lime)]/50 bg-[color:var(--lime)] p-4 text-[color:var(--ink)] transition"
                          : "group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-white transition hover:bg-white/[0.08]"
                      }
                    >
                      <span
                        className={
                          route.highlighted
                            ? "font-mono text-xs font-bold text-[color:var(--brand-dark)]"
                            : "font-mono text-xs font-bold text-white/40"
                        }
                      >
                        {route.number}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-extrabold">{route.title}</p>
                        <p
                          className={
                            route.highlighted
                              ? "mt-1 text-sm text-[color:var(--ink)]/65"
                              : "mt-1 text-sm text-white/55"
                          }
                        >
                          {route.detail}
                        </p>
                      </div>
                      {route.highlighted && (
                        <span className="rounded-full bg-[color:var(--ink)] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                          Ejemplo
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between rounded-2xl bg-black/15 px-4 py-3 text-xs text-white/55">
                  <span>Reglas visibles</span>
                  <span>Costos comparables</span>
                  <span>Revisión humana</span>
                </div>
              </div>
            </div>
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
                  <span className="font-mono text-sm font-bold text-[color:var(--brand)]">
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

      <section className="border-y border-[color:var(--line)] bg-[color:var(--sand)]">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-32">
          <div className="relative min-h-[31rem] overflow-hidden rounded-[2.5rem] bg-[color:var(--peach)] p-7 sm:p-10">
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
              <div className="grid size-16 place-items-center rounded-full bg-[color:var(--ink)] text-2xl text-[color:var(--lime)]">
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
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[color:var(--brand)] text-xs font-black text-white">
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
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[color:var(--lime)]">
              Transparencia desde el principio
            </p>
            <h2 className="mt-5 max-w-xl font-display text-5xl leading-[0.98] font-semibold tracking-[-0.05em] sm:text-6xl">
              Orientación, no promesas automáticas.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {[
              ["Datos mínimos", "No pedimos IMEI completo, documentos ni información de pago."],
              ["Cifras de prueba", "Los valores del MVP están identificados como simulados."],
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

      <section className="bg-[color:var(--lime)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-20">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.16em] text-[color:var(--brand-dark)]">
              Tu contexto cambia la respuesta
            </p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-none font-semibold tracking-[-0.045em] text-[color:var(--ink)] sm:text-5xl">
              Empieza por contar lo que realmente necesitas.
            </h2>
          </div>
          <Link
            href="/guia"
            className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-[color:var(--ink)] px-7 font-extrabold text-white transition hover:-translate-y-1 hover:bg-[color:var(--brand-dark)]"
          >
            Comenzar mi guía
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
