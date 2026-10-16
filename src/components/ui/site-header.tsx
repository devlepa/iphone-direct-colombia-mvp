import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--paper)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--brand)]"
          aria-label="iPhone Direct Colombia, inicio"
        >
          <span className="grid size-10 place-items-center rounded-[14px] bg-[color:var(--ink)] text-sm font-black tracking-[-0.08em] text-[color:var(--lime)] transition-transform group-hover:-rotate-3">
            iD
          </span>
          <span className="leading-none">
            <span className="block text-sm font-extrabold tracking-[-0.02em] text-[color:var(--ink)]">
              iPhone Direct
            </span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--muted)]">
              Colombia
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-2" aria-label="Navegación principal">
          <Link
            href="/#como-funciona"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--muted)] transition hover:bg-white hover:text-[color:var(--ink)] sm:block"
          >
            Cómo funciona
          </Link>
          <Link
            href="/#transparencia"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--muted)] transition hover:bg-white hover:text-[color:var(--ink)] md:block"
          >
            Transparencia
          </Link>
          <Link
            href="/guia"
            className="rounded-full bg-[color:var(--ink)] px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--brand-dark)]"
          >
            Iniciar guía
          </Link>
        </nav>
      </div>
    </header>
  );
}
