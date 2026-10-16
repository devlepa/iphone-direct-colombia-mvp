import type { Metadata } from "next";
import { SiteFooter } from "@/components/ui/site-footer";
import { SiteHeader } from "@/components/ui/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "iPhone Direct Colombia",
    template: "%s | iPhone Direct Colombia",
  },
  description:
    "Compara comprar nuevo, elegir un usado certificado, reparar o entregar tu iPhone como parte de pago.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full scroll-smooth">
      <body className="flex min-h-full flex-col antialiased">
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
