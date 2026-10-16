import type { Metadata } from "next";
import { AdvisorForm } from "@/components/advisor/advisor-form";

export const metadata: Metadata = {
  title: "Guía de decisión",
  description:
    "Responde unas preguntas para comparar compra, usado certificado, reparación y retoma.",
};

export default function GuidePage() {
  return (
    <main className="hero-grid flex-1">
      <AdvisorForm />
    </main>
  );
}
