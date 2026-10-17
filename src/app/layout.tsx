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
    "Encuentra tu mejor actualización entre iPhone 13 y iPhone 18 Pro Max con precios aproximados y una recomendación explicada.",
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
