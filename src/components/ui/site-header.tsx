import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--line)] bg-[color:var(--canvas)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
          aria-label="iPhone Direct Colombia, inicio"
        >
          <span className="relative size-11 overflow-hidden rounded-[14px] bg-black transition-transform group-hover:-rotate-3">
            <Image
              src="/brand/iphone-direct-colombia.png"
              alt=""
              width={100}
              height={100}
              className="absolute left-1/2 top-[72%] max-w-none -translate-x-1/2 -translate-y-1/2"
            />
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
            href="/catalogo"
            className="rounded-full px-2 py-2 text-xs font-bold text-[color:var(--muted)] transition hover:bg-white hover:text-[color:var(--ink)] sm:px-4 sm:text-sm"
          >
            Catálogo
          </Link>
          <Link
            href="/#transparencia"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[color:var(--muted)] transition hover:bg-white hover:text-[color:var(--ink)] md:block"
          >
            Transparencia
          </Link>
          <Link
            href="/guia"
            className="rounded-full bg-[color:var(--ink)] px-3 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-hover)] sm:px-4 sm:text-sm"
          >
            Iniciar guía
          </Link>
        </nav>
      </div>
    </header>
  );
}
