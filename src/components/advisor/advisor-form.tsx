"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  CustomerObjective,
  CustomerPriority,
  CustomerUrgency,
  PrimaryUse,
} from "@/domain/customer-profile";
import type {
  BodyCondition,
  DeviceCondition,
  DeviceFailure,
} from "@/domain/device";
import repairOptionsData from "@/data/repair-options.json";
import tradeInValuesData from "@/data/trade-in-values.json";
import {
  buildProductCatalog,
  buildTradeInCatalog,
  currentIPhoneModels,
} from "@/data/device-catalog";
import {
  advisorInputSchema,
  productSchema,
  repairOptionSchema,
  tradeInValueSchema,
} from "@/features/advisor/advisor.schema";
import { generateRecommendation } from "@/features/advisor/advisor.service";
import type {
  AdvisorCatalogs,
  RecommendationRecord,
} from "@/features/advisor/advisor.types";
import { trackEvent } from "@/lib/analytics";
import {
  loadLocalValue,
  removeLocalValue,
  saveLocalValue,
  STORAGE_KEYS,
} from "@/lib/storage";
import { useHydrated } from "@/lib/use-hydrated";

type AdvisorFormState = {
  sessionId: string;
  objective: CustomerObjective | "";
  budgetCop: string;
  primaryUse: PrimaryUse | "";
  acceptsCertifiedUsed: boolean | null;
  priority: CustomerPriority | "";
  urgency: CustomerUrgency | "";
  hasCurrentDevice: boolean | null;
  model: string;
  storageGb: string;
  batteryHealth: string;
  screenCondition: DeviceCondition;
  cameraCondition: DeviceCondition;
  bodyCondition: BodyCondition;
  knownFailures: DeviceFailure[];
  previousRepairs: boolean | null;
};

const emptyForm: AdvisorFormState = {
  sessionId: "",
  objective: "",
  budgetCop: "",
  primaryUse: "",
  acceptsCertifiedUsed: null,
  priority: "",
  urgency: "",
  hasCurrentDevice: null,
  model: "",
  storageGb: "",
  batteryHealth: "",
  screenCondition: "UNKNOWN",
  cameraCondition: "UNKNOWN",
  bodyCondition: "UNKNOWN",
  knownFailures: [],
  previousRepairs: null,
};

const catalogs: AdvisorCatalogs = {
  products: productSchema.array().parse(buildProductCatalog()),
  repairOptions: repairOptionSchema.array().parse(repairOptionsData),
  tradeInValues: tradeInValueSchema
    .array()
    .parse([...buildTradeInCatalog(), ...tradeInValuesData]),
};

const objectiveOptions: {
  value: CustomerObjective;
  title: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "BUY",
    title: "Comprar un equipo",
    description: "Quiero encontrar una opción nueva o usada que encaje conmigo.",
    icon: "◎",
  },
  {
    value: "REPAIR",
    title: "Reparar mi equipo",
    description: "Quiero saber si vale la pena conservar el iPhone que tengo.",
    icon: "◇",
  },
  {
    value: "TRADE_IN",
    title: "Entregarlo como parte de pago",
    description: "Quiero estimar cuánto podría reducir el costo de renovación.",
    icon: "↗",
  },
  {
    value: "UNSURE",
    title: "No sé qué me conviene",
    description: "Prefiero comparar todas las rutas antes de decidir.",
    icon: "?",
  },
];

const primaryUseOptions: { value: PrimaryUse; label: string }[] = [
  { value: "BASIC", label: "Uso básico" },
  { value: "STUDY", label: "Estudio" },
  { value: "WORK", label: "Trabajo" },
  { value: "CAMERA", label: "Foto y video" },
  { value: "GAMING", label: "Juegos" },
];

const failureOptions: { value: DeviceFailure; label: string }[] = [
  { value: "BATTERY", label: "Batería" },
  { value: "SCREEN", label: "Pantalla" },
  { value: "CAMERA", label: "Cámaras" },
  { value: "CHARGING", label: "Carga" },
  { value: "OTHER", label: "Otra falla" },
];

const inputClassName =
  "mt-2 min-h-12 w-full rounded-2xl border border-[color:var(--line-strong)] bg-white px-4 text-[color:var(--ink)] outline-none transition placeholder:text-[color:var(--muted)]/55 focus:border-[color:var(--accent)] focus:ring-4 focus:ring-[color:var(--accent)]/10";

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return "session-" + Date.now().toString(36);
}

function loadInitialForm() {
  if (typeof window === "undefined") return emptyForm;

  const stored = loadLocalValue<AdvisorFormState>(STORAGE_KEYS.advisorDraft);
  return stored?.sessionId
    ? stored
    : { ...emptyForm, sessionId: createSessionId() };
}

function ChoiceButton({
  active,
  title,
  description,
  icon,
  onClick,
}: {
  active: boolean;
  title: string;
  description?: string;
  icon?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "flex min-h-20 w-full items-start gap-4 rounded-2xl border-2 border-black bg-black p-4 text-left text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition"
          : "flex min-h-20 w-full items-start gap-4 rounded-2xl border border-[color:var(--line-strong)] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[color:var(--accent)]"
      }
    >
      {icon && (
        <span
          className={
            active
              ? "grid size-10 shrink-0 place-items-center rounded-xl bg-white text-lg font-black text-black"
              : "grid size-10 shrink-0 place-items-center rounded-xl bg-[color:var(--surface)] text-lg font-black text-[color:var(--ink)]"
          }
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span>
        <span
          className={
            active
              ? "block font-extrabold text-white"
              : "block font-extrabold text-[color:var(--ink)]"
          }
        >
          {title}
        </span>
        {description && (
          <span
            className={
              active
                ? "mt-1 block text-sm leading-6 text-white/65"
                : "mt-1 block text-sm leading-6 text-[color:var(--muted)]"
            }
          >
            {description}
          </span>
        )}
      </span>
    </button>
  );
}

export function AdvisorForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<AdvisorFormState>(loadInitialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isReady = useHydrated();

  useEffect(() => {
    if (isReady && form.sessionId) {
      const events =
        loadLocalValue<{ name: string; sessionId: string }[]>(STORAGE_KEYS.analytics) ?? [];
      const alreadyStarted = events.some(
        (event) =>
          event.name === "advisor_started" && event.sessionId === form.sessionId,
      );

      if (!alreadyStarted) {
        trackEvent("advisor_started", form.sessionId);
      }
    }
  }, [form.sessionId, isReady]);

  useEffect(() => {
    if (isReady) {
      saveLocalValue(STORAGE_KEYS.advisorDraft, form);
    }
  }, [form, isReady]);

  function selectObjective(objective: CustomerObjective) {
    setForm((current) => ({
      ...current,
      objective,
      hasCurrentDevice:
        objective === "REPAIR" || objective === "TRADE_IN"
          ? true
          : current.hasCurrentDevice,
    }));
    setError("");
  }

  function validateCurrentStep() {
    if (step === 1 && !form.objective) {
      return "Selecciona la alternativa que mejor describe lo que necesitas.";
    }

    if (step === 2) {
      const budget = Number(form.budgetCop);
      if (!Number.isFinite(budget) || budget < 100_000) {
        return "Ingresa un presupuesto válido de al menos $100.000.";
      }
      if (!form.primaryUse || !form.priority || !form.urgency) {
        return "Completa el uso principal, la prioridad y la urgencia.";
      }
      if (form.acceptsCertifiedUsed === null) {
        return "Indica si aceptarías un equipo usado certificado.";
      }
    }

    if (step === 3) {
      if (form.hasCurrentDevice === null) {
        return "Indica si actualmente tienes un iPhone.";
      }
      if (form.hasCurrentDevice && (!form.model.trim() || Number(form.storageGb) <= 0)) {
        return "Indica el modelo y la capacidad de tu equipo actual.";
      }
      if (
        form.batteryHealth &&
        (Number(form.batteryHealth) < 1 || Number(form.batteryHealth) > 100)
      ) {
        return "La salud de batería debe estar entre 1 y 100.";
      }
    }

    return "";
  }

  function goNext() {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    trackEvent("advisor_step_completed", form.sessionId, { step });
    setError("");
    setStep((current) => Math.min(4, current + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setError("");
    setStep((current) => Math.max(1, current - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetGuide() {
    const sessionId = createSessionId();
    removeLocalValue(STORAGE_KEYS.advisorDraft);
    removeLocalValue(STORAGE_KEYS.recommendation);
    setForm({ ...emptyForm, sessionId });
    setStep(1);
    setError("");
    trackEvent("advisor_started", sessionId, { restarted: true });
  }

  function toggleFailure(failure: DeviceFailure) {
    setForm((current) => ({
      ...current,
      knownFailures: current.knownFailures.includes(failure)
        ? current.knownFailures.filter((item) => item !== failure)
        : [...current.knownFailures, failure],
    }));
  }

  function submitGuide() {
    setIsSubmitting(true);
    setError("");

    const rawInput = {
      profile: {
        sessionId: form.sessionId,
        objective: form.objective,
        budgetCop: Number(form.budgetCop),
        primaryUse: form.primaryUse,
        acceptsCertifiedUsed: form.acceptsCertifiedUsed,
        priority: form.priority,
        urgency: form.urgency,
      },
      currentDevice: form.hasCurrentDevice
        ? {
            model: form.model.trim(),
            storageGb: Number(form.storageGb),
            batteryHealth: form.batteryHealth
              ? Number(form.batteryHealth)
              : undefined,
            screenCondition: form.screenCondition,
            cameraCondition: form.cameraCondition,
            bodyCondition: form.bodyCondition,
            knownFailures: form.knownFailures,
            previousRepairs: form.previousRepairs,
            requiresTechnicalInspection: true,
          }
        : undefined,
    };
    const parsed = advisorInputSchema.safeParse(rawInput);

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Revisa las respuestas ingresadas.");
      setIsSubmitting(false);
      return;
    }

    try {
      const recommendation = generateRecommendation(parsed.data, catalogs);
      const record: RecommendationRecord = {
        input: parsed.data,
        recommendation,
        generatedAt: new Date().toISOString(),
      };

      saveLocalValue(STORAGE_KEYS.recommendation, record);
      trackEvent("advisor_step_completed", form.sessionId, { step: 4 });
      trackEvent("recommendation_generated", form.sessionId, {
        option: recommendation.primaryOption,
      });
      router.push("/resultado");
    } catch {
      setError("No pudimos generar la recomendación. Revisa las respuestas e inténtalo de nuevo.");
      setIsSubmitting(false);
    }
  }

  if (!isReady) {
    return (
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8">
        <div className="h-[36rem] animate-pulse rounded-[2rem] bg-white/70" />
      </div>
    );
  }

  const progress = (step / 4) * 100;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-8 lg:py-16">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Guía de decisión</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.04em] text-[color:var(--ink)] sm:text-5xl">
            Construyamos tu mejor ruta.
          </h1>
        </div>
        <button
          type="button"
          onClick={resetGuide}
          className="self-start text-sm font-bold text-[color:var(--muted)] underline decoration-[color:var(--line-strong)] underline-offset-4 hover:text-[color:var(--ink)] sm:self-auto"
        >
          Empezar de nuevo
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.14em] text-[color:var(--muted)]">
          <span>Paso {step} de 4</span>
          <span>{Math.round(progress)} %</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[color:var(--line)]">
          <div
            className="h-full rounded-full bg-[color:var(--accent)] transition-[width] duration-300"
            style={{ width: progress + "%" }}
          />
        </div>
      </div>

      <section className="rounded-[2rem] border border-[color:var(--line)] bg-white p-5 shadow-[0_22px_65px_rgba(0,0,0,0.07)] sm:p-9">
        {step === 1 && (
          <div>
            <p className="text-sm font-bold text-[color:var(--accent)]">Tu necesidad</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-[color:var(--ink)]">
              ¿Qué necesitas hacer con tu iPhone?
            </h2>
            <p className="mt-3 text-[color:var(--muted)]">
              No necesitas tener la respuesta perfecta. Puedes elegir “no sé” y comparar.
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {objectiveOptions.map((option) => (
                <ChoiceButton
                  key={option.value}
                  active={form.objective === option.value}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  onClick={() => selectObjective(option.value)}
                />
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-sm font-bold text-[color:var(--accent)]">Tu contexto</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-[color:var(--ink)]">
              ¿Qué debe respetar la recomendación?
            </h2>
            <div className="mt-8 grid gap-7 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className="font-bold text-[color:var(--ink)]">Presupuesto máximo</span>
                <span className="ml-2 text-sm text-[color:var(--muted)]">en pesos colombianos</span>
                <input
                  className={inputClassName}
                  type="number"
                  min="100000"
                  step="50000"
                  inputMode="numeric"
                  placeholder="Ejemplo: 2500000"
                  value={form.budgetCop}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, budgetCop: event.target.value }))
                  }
                />
              </label>

              <fieldset className="md:col-span-2">
                <legend className="font-bold text-[color:var(--ink)]">Uso principal</legend>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {primaryUseOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      aria-pressed={form.primaryUse === option.value}
                      onClick={() =>
                        setForm((current) => ({ ...current, primaryUse: option.value }))
                      }
                      className={
                        form.primaryUse === option.value
                          ? "min-h-12 rounded-xl border-2 border-[color:var(--accent)] bg-[color:var(--accent)] px-3 text-sm font-bold text-white"
                          : "min-h-12 rounded-xl border border-[color:var(--line-strong)] bg-white px-3 text-sm font-bold text-[color:var(--ink)] hover:border-[color:var(--accent)]"
                      }
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="block">
                <span className="font-bold text-[color:var(--ink)]">Lo que más valoras</span>
                <select
                  className={inputClassName}
                  value={form.priority}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      priority: event.target.value as CustomerPriority | "",
                    }))
                  }
                >
                  <option value="">Selecciona una prioridad</option>
                  <option value="PRICE">Precio</option>
                  <option value="WARRANTY">Garantía</option>
                  <option value="PERFORMANCE">Rendimiento</option>
                  <option value="CAMERA">Cámara</option>
                  <option value="LONGEVITY">Vida útil</option>
                </select>
              </label>

              <label className="block">
                <span className="font-bold text-[color:var(--ink)]">Cuándo lo necesitas</span>
                <select
                  className={inputClassName}
                  value={form.urgency}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      urgency: event.target.value as CustomerUrgency | "",
                    }))
                  }
                >
                  <option value="">Selecciona una opción</option>
                  <option value="TODAY">Hoy</option>
                  <option value="THIS_WEEK">Esta semana</option>
                  <option value="THIS_MONTH">Este mes</option>
                  <option value="EXPLORING">Solo estoy explorando</option>
                </select>
              </label>

              <fieldset className="md:col-span-2">
                <legend className="font-bold text-[color:var(--ink)]">
                  ¿Aceptarías un usado certificado?
                </legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <ChoiceButton
                    active={form.acceptsCertifiedUsed === true}
                    title="Sí, si tiene evidencia y garantía"
                    onClick={() =>
                      setForm((current) => ({ ...current, acceptsCertifiedUsed: true }))
                    }
                  />
                  <ChoiceButton
                    active={form.acceptsCertifiedUsed === false}
                    title="No, prefiero un equipo nuevo"
                    onClick={() =>
                      setForm((current) => ({ ...current, acceptsCertifiedUsed: false }))
                    }
                  />
                </div>
              </fieldset>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-sm font-bold text-[color:var(--accent)]">Tu equipo actual</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-[color:var(--ink)]">
              ¿Tienes un iPhone para revisar o entregar?
            </h2>
            <p className="mt-3 text-[color:var(--muted)]">
              Esta información es preliminar y nunca reemplaza una inspección técnica.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <ChoiceButton
                active={form.hasCurrentDevice === true}
                title="Sí, tengo un equipo"
                onClick={() =>
                  setForm((current) => ({ ...current, hasCurrentDevice: true }))
                }
              />
              <ChoiceButton
                active={form.hasCurrentDevice === false}
                title="No tengo un equipo actual"
                onClick={() =>
                  setForm((current) => ({ ...current, hasCurrentDevice: false }))
                }
              />
            </div>

            {form.hasCurrentDevice && (
              <div className="mt-8 grid gap-6 border-t border-[color:var(--line)] pt-8 md:grid-cols-2">
                <label className="block">
                  <span className="font-bold text-[color:var(--ink)]">Modelo</span>
                  <select
                    className={inputClassName}
                    value={form.model}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, model: event.target.value }))
                    }
                  >
                    <option value="">Selecciona el modelo</option>
                    {currentIPhoneModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="font-bold text-[color:var(--ink)]">Capacidad</span>
                  <select
                    className={inputClassName}
                    value={form.storageGb}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, storageGb: event.target.value }))
                    }
                  >
                    <option value="">Selecciona la capacidad</option>
                    <option value="64">64 GB</option>
                    <option value="128">128 GB</option>
                    <option value="256">256 GB</option>
                    <option value="512">512 GB</option>
                    <option value="1024">1 TB</option>
                    <option value="2048">2 TB</option>
                  </select>
                </label>

                <label className="block">
                  <span className="font-bold text-[color:var(--ink)]">
                    Salud de batería
                  </span>
                  <span className="ml-2 text-sm text-[color:var(--muted)]">opcional</span>
                  <input
                    className={inputClassName}
                    type="number"
                    min="1"
                    max="100"
                    inputMode="numeric"
                    placeholder="Ejemplo: 84"
                    value={form.batteryHealth}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        batteryHealth: event.target.value,
                      }))
                    }
                  />
                </label>

                <label className="block">
                  <span className="font-bold text-[color:var(--ink)]">Pantalla</span>
                  <select
                    className={inputClassName}
                    value={form.screenCondition}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        screenCondition: event.target.value as DeviceCondition,
                      }))
                    }
                  >
                    <option value="UNKNOWN">No estoy seguro</option>
                    <option value="GOOD">Buen estado</option>
                    <option value="DAMAGED">Dañada</option>
                  </select>
                </label>

                <label className="block">
                  <span className="font-bold text-[color:var(--ink)]">Cámaras</span>
                  <select
                    className={inputClassName}
                    value={form.cameraCondition}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        cameraCondition: event.target.value as DeviceCondition,
                      }))
                    }
                  >
                    <option value="UNKNOWN">No estoy seguro</option>
                    <option value="GOOD">Buen estado</option>
                    <option value="DAMAGED">Presentan fallas</option>
                  </select>
                </label>

                <label className="block">
                  <span className="font-bold text-[color:var(--ink)]">Carcasa</span>
                  <select
                    className={inputClassName}
                    value={form.bodyCondition}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        bodyCondition: event.target.value as BodyCondition,
                      }))
                    }
                  >
                    <option value="UNKNOWN">No estoy seguro</option>
                    <option value="GOOD">Buen estado</option>
                    <option value="WORN">Con desgaste</option>
                    <option value="DAMAGED">Dañada</option>
                  </select>
                </label>

                <fieldset className="md:col-span-2">
                  <legend className="font-bold text-[color:var(--ink)]">
                    Fallas conocidas
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {failureOptions.map((failure) => (
                      <button
                        type="button"
                        key={failure.value}
                        aria-pressed={form.knownFailures.includes(failure.value)}
                        onClick={() => toggleFailure(failure.value)}
                        className={
                          form.knownFailures.includes(failure.value)
                            ? "rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-bold text-white"
                            : "rounded-full border border-[color:var(--line-strong)] bg-white px-4 py-2 text-sm font-bold text-[color:var(--ink)] hover:border-[color:var(--accent)]"
                        }
                      >
                        {failure.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="md:col-span-2">
                  <legend className="font-bold text-[color:var(--ink)]">
                    ¿Ha tenido reparaciones anteriores?
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {[
                      { label: "Sí", value: true },
                      { label: "No", value: false },
                      { label: "No lo sé", value: null },
                    ].map((option) => (
                      <button
                        type="button"
                        key={option.label}
                        aria-pressed={form.previousRepairs === option.value}
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            previousRepairs: option.value,
                          }))
                        }
                        className={
                          form.previousRepairs === option.value
                            ? "rounded-full bg-[color:var(--accent)] px-4 py-2 text-sm font-bold text-white"
                            : "rounded-full border border-[color:var(--line-strong)] bg-white px-4 py-2 text-sm font-bold text-[color:var(--ink)] hover:border-[color:var(--accent)]"
                        }
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="text-sm font-bold text-[color:var(--accent)]">Revisión</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-[color:var(--ink)]">
              Todo listo para comparar.
            </h2>
            <p className="mt-3 text-[color:var(--muted)]">
              Procesaremos las respuestas con reglas explícitas y precios referenciales.
            </p>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-2">
              {[
                ["Objetivo", objectiveOptions.find((item) => item.value === form.objective)?.title],
                ["Presupuesto", "$" + Number(form.budgetCop).toLocaleString("es-CO")],
                [
                  "Acepta usado certificado",
                  form.acceptsCertifiedUsed ? "Sí" : "No",
                ],
                ["Equipo actual", form.hasCurrentDevice ? form.model : "No registrado"],
              ].map(([label, value]) => (
                <div key={label} className="bg-white p-5">
                  <dt className="text-xs font-black uppercase tracking-[0.12em] text-[color:var(--muted)]">
                    {label}
                  </dt>
                  <dd className="mt-2 font-extrabold text-[color:var(--ink)]">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 rounded-2xl bg-[color:var(--surface)] p-5 text-sm leading-6 text-[color:var(--muted)]">
              No guardamos IMEI, documentos, datos financieros ni contraseñas. La información
              permanece temporalmente en este navegador durante la validación local.
            </div>
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-2xl border border-black bg-neutral-100 px-4 py-3 text-sm font-semibold text-black"
          >
            {error}
          </p>
        )}

        <div className="mt-9 flex flex-col-reverse gap-3 border-t border-[color:var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="min-h-12 rounded-full border border-[color:var(--line-strong)] bg-white px-6 font-bold text-[color:var(--ink)] hover:border-[color:var(--accent)]"
            >
              ← Volver
            </button>
          ) : (
            <span className="text-sm text-[color:var(--muted)]">
              Tus respuestas se guardan en este navegador.
            </span>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={goNext}
              className="min-h-12 rounded-full bg-[color:var(--ink)] px-7 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-hover)]"
            >
              Continuar →
            </button>
          ) : (
            <button
              type="button"
              onClick={submitGuide}
              disabled={isSubmitting}
              className="min-h-12 rounded-full bg-[color:var(--accent)] px-7 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--accent-hover)] disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? "Comparando alternativas…" : "Ver mi recomendación →"}
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
