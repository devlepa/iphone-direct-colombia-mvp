import type { Metadata } from "next";
import { ResultView } from "@/components/comparison/result-view";

export const metadata: Metadata = {
  title: "Tu recomendación",
  description:
    "Consulta la recomendación, sus razones, costos estimados y alternativas.",
};

export default function ResultPage() {
  return (
    <main className="hero-grid flex-1">
      <ResultView />
    </main>
  );
}
