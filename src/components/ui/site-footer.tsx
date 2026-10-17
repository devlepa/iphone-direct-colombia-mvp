import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-[color:var(--canvas)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 py-8 text-sm text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-bold text-[color:var(--ink)]">iPhone Direct Colombia</p>
          <p className="mt-1">Una guía de decisión en etapa de validación.</p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/catalogo" className="transition hover:text-[color:var(--ink)]">
            Catálogo
          </Link>
          <Link href="/#transparencia" className="transition hover:text-[color:var(--ink)]">
            Cómo usamos tus datos
          </Link>
          <span>Precios aproximados · No son ofertas definitivas</span>
        </div>
      </div>
    </footer>
  );
}
