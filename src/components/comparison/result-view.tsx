"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type {
  RecommendationAlternative,
  RecommendationOption,
} from "@/domain/recommendation";
import type { RecommendationRecord } from "@/features/advisor/advisor.types";
import { trackEvent } from "@/lib/analytics";
import { formatCop } from "@/lib/currency";
import { loadLocalValue, STORAGE_KEYS } from "@/lib/storage";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useHydrated } from "@/lib/use-hydrated";

const optionLabels: Record<RecommendationOption, string> = {
  NEW: "Comprar nuevo",
  CERTIFIED_USED: "Elegir usado certificado",
  REPAIR: "Reparar el equipo actual",
  TRADE_IN: "Renovar mediante retoma",
};

function CostSummary({ option }: { option: RecommendationAlternative }) {
  return (
    <dl className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-3">
      <div className="bg-white/[0.055] p-5">
        <dt className="text-xs font-black uppercase tracking-[0.14em] text-white/50">
          Costo estimado
        </dt>
        <dd className="mt-2 text-xl font-extrabold text-white">
          {formatCop(option.estimatedGrossCostCop)}
        </dd>
      </div>
      <div className="bg-white/[0.055] p-5">
        <dt className="text-xs font-black uppercase tracking-[0.14em] text-white/50">
          Retoma estimada
        </dt>
        <dd className="mt-2 text-xl font-extrabold text-white">
          {option.estimatedTradeInCop > 0
            ? "− " + formatCop(option.estimatedTradeInCop)
            : "No aplica"}
        </dd>
      </div>
      <div className="bg-[color:var(--lime)] p-5">
        <dt className="text-xs font-black uppercase tracking-[0.14em] text-[color:var(--ink)]/55">
          Desembolso neto
        </dt>
        <dd className="mt-2 text-xl font-black text-[color:var(--ink)]">
          {formatCop(option.estimatedNetCostCop)}
        </dd>
      </div>
    </dl>
  );
}

function AlternativeCard({
  alternative,
  sessionId,
}: {
  alternative: RecommendationAlternative;
  sessionId: string;
}) {
  const url = buildWhatsAppUrl({
    option: alternative.option,
    sessionId,
  });

  return (
    <article className="flex h-full flex-col rounded-3xl border border-[color:var(--line)] bg-white p-6">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[color:var(--brand)]">
        {optionLabels[alternative.option]}
      </p>
      <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] text-[color:var(--ink)]">
        {alternative.label}
      </h3>
      <p className="mt-5 text-sm font-bold uppercase tracking-[0.1em] text-[color:var(--muted)]">
        Costo neto estimado
      </p>
      <p className="mt-1 text-2xl font-black text-[color:var(--ink)]">
        {formatCop(alternative.estimatedNetCostCop)}
      </p>
      <ul className="mt-5 flex-1 space-y-3 text-sm leading-6 text-[color:var(--muted)]">
        {alternative.reasons.slice(0, 2).map((reason) => (
          <li key={reason} className="flex gap-2">
            <span className="text-[color:var(--brand)]" aria-hidden="true">
              ✓
            </span>
            {reason}
          </li>
        ))}
      </ul>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          trackEvent("alternative_selected", sessionId, {
            option: alternative.option,
          });
          trackEvent("whatsapp_clicked", sessionId, {
            option: alternative.option,
            source: "alternative",
          });
        }}
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full border border-[color:var(--line-strong)] px-5 font-bold text-[color:var(--ink)] transition hover:border-[color:var(--brand)] hover:bg-[color:var(--lime)]/35"
      >
        Consultar esta alternativa
      </a>
    </article>
  );
}

export function ResultView() {
  const isReady = useHydrated();
  const [record] = useState<RecommendationRecord | null | undefined>(() => {
    if (typeof window === "undefined") return undefined;
    return loadLocalValue<RecommendationRecord>(STORAGE_KEYS.recommendation);
  });

  useEffect(() => {
    if (isReady && record) {
      trackEvent("recommendation_viewed", record.input.profile.sessionId, {
        option: record.recommendation.primaryOption,
      });
    }
  }, [isReady, record]);

  if (!isReady || record === undefined) {
    return (
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
        <div className="h-[38rem] animate-pulse rounded-[2rem] bg-white/70" />
      </div>
    );
  }

  if (!record) {
    return (
      <div className="mx-auto flex w-full max-w-3xl flex-1 items-center px-5 py-20 sm:px-8">
        <div className="w-full rounded-[2rem] border border-[color:var(--line)] bg-white p-8 text-center shadow-[0_25px_80px_rgba(12,31,26,0.08)] sm:p-12">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-[color:var(--lime)] text-2xl font-black">
            ?
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em]">
            Aún no tenemos una recomendación.
          </h1>
          <p className="mx-auto mt-4 max-w-lg leading-7 text-[color:var(--muted)]">
            Completa la guía para que podamos comparar las alternativas con tu contexto.
          </p>
          <Link
            href="/guia"
            className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-[color:var(--brand)] px-7 font-extrabold text-white"
          >
            Completar la guía
          </Link>
        </div>
      </div>
    );
  }

  const { recommendation } = record;
  const sessionId = record.input.profile.sessionId;
  const whatsappUrl = buildWhatsAppUrl({
    option: recommendation.primaryOption,
    sessionId,
  });

  function trackPrimaryAction() {
    trackEvent("whatsapp_clicked", sessionId, {
      option: recommendation.primaryOption,
      source: "primary",
    });

    if (recommendation.primaryOption === "REPAIR") {
      trackEvent("diagnosis_requested", sessionId);
    } else if (recommendation.primaryOption === "TRADE_IN") {
      trackEvent("trade_in_requested", sessionId);
    } else {
      trackEvent("purchase_intent_submitted", sessionId);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow">Resultado de la guía</p>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            Sesión {sessionId.slice(0, 8)} · generado con datos de prueba
          </p>
        </div>
        <Link
          href="/guia"
          className="rounded-full border border-[color:var(--line-strong)] bg-white px-5 py-2.5 text-sm font-bold text-[color:var(--ink)] hover:border-[color:var(--brand)]"
        >
          Revisar respuestas
        </Link>
      </div>

      <section className="overflow-hidden rounded-[2.25rem] bg-[color:var(--ink)] p-5 text-white shadow-[0_35px_100px_rgba(12,31,26,0.22)] sm:p-8 lg:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.17em] text-[color:var(--lime)]">
              Recomendación principal · {optionLabels[recommendation.primaryOption]}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[0.98] font-semibold tracking-[-0.045em] sm:text-6xl">
              {recommendation.label}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/62">
              Esta orientación organiza la información que suministraste. Los valores y la
              disponibilidad deben confirmarse con un asesor.
            </p>
          </div>
          {recommendation.requiresHumanReview && (
            <span className="shrink-0 self-start rounded-full border border-[color:var(--lime)]/35 bg-[color:var(--lime)]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.13em] text-[color:var(--lime)]">
              Requiere revisión humana
            </span>
          )}
        </div>

        <div className="mt-9">
          <CostSummary option={recommendation} />
        </div>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h2 className="text-xl font-extrabold">Por qué recomendamos esta ruta</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {recommendation.reasons.map((reason) => (
                <li
                  key={reason}
                  className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-sm leading-6 text-white/75"
                >
                  <span className="text-[color:var(--lime)]" aria-hidden="true">
                    ✓
                  </span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/15 p-5">
            <h2 className="text-sm font-black uppercase tracking-[0.14em] text-white/55">
              Supuestos y límites
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-white/65">
              {recommendation.assumptions.map((assumption) => (
                <li key={assumption}>— {assumption}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={trackPrimaryAction}
            className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-[color:var(--lime)] px-7 font-black text-[color:var(--ink)] transition hover:-translate-y-0.5 hover:bg-white"
          >
            Continuar por WhatsApp
            <span aria-hidden="true">↗</span>
          </a>
          <p className="text-sm text-white/45">
            El mensaje incluye únicamente la opción y el identificador de sesión.
          </p>
        </div>
      </section>

      {recommendation.alternatives.length > 0 && (
        <section className="py-14 lg:py-20">
          <div className="mb-7">
            <p className="eyebrow">También puedes considerar</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-[color:var(--ink)]">
              Alternativas secundarias
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {recommendation.alternatives.map((alternative) => (
              <AlternativeCard
                key={alternative.option + alternative.label}
                alternative={alternative}
                sessionId={sessionId}
              />
            ))}
          </div>
        </section>
      )}

      <section className="rounded-3xl border border-[color:var(--line)] bg-[color:var(--peach)]/35 p-6 sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[color:var(--brand-dark)]">
          Importante
        </p>
        <p className="mt-3 max-w-4xl text-base leading-7 text-[color:var(--ink)]/75">
          Esta recomendación es una simulación del MVP. No constituye diagnóstico técnico,
          cotización, oferta de compra ni valor definitivo de retoma.
        </p>
      </section>
    </div>
  );
}
