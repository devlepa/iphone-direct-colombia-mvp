# iPhone Direct Colombia — MVP local

> Para instalar y ejecutar el proyecto consulta la [guía técnica y de ejecución](docs/guia-tecnica-y-ejecucion.md).

Repositorio para diseñar, construir y validar localmente el MVP de **iPhone Direct Colombia**, una plataforma de renovación guiada que ayuda al cliente a comparar cuatro alternativas:

1. Comprar un iPhone nuevo sellado.
2. Comprar un iPhone usado certificado.
3. Reparar su equipo actual.
4. Entregar su equipo como parte de pago mediante *trade-in*.

El MVP no busca ser inicialmente una tienda virtual completa. Su objetivo principal es comprobar si una guía estructurada reduce la incertidumbre del cliente y lo ayuda a tomar una decisión con mayor claridad, confianza y rapidez.

---

## 1. Información general

- **Proyecto:** iPhone Direct Colombia.
- **Estado:** definición y desarrollo inicial del MVP.
- **Modalidad inicial:** ejecución local.
- **Segmento inicial:** estudiantes de educación superior en Bogotá, especialmente de la Universidad Sergio Arboleda, Universidad EAN y Universidad Santo Tomás.
- **Equipo:** Juan Esteban León Parra y Sergio Molina.
- **Propósito del repositorio:** mantener en un solo lugar el código, las reglas de recomendación, los datos de prueba, la documentación y los resultados de validación del MVP.

---

## 2. Problema que se quiere resolver

El cliente que necesita comprar, reparar o renovar un iPhone suele encontrar información fragmentada. Debe consultar por separado precios de equipos nuevos, condiciones de usados, costos de reparación, valor de retoma, estado de batería, IMEI, garantía y posventa.

El problema no consiste únicamente en conseguir un iPhone. El problema consiste en determinar **qué alternativa es más conveniente para una situación específica**.

Ejemplos:

- Una persona puede creer que necesita comprar otro equipo cuando una reparación sería suficiente.
- Otra puede pagar por una reparación que no resulta conveniente frente al valor residual del equipo.
- Un cliente puede querer un equipo nuevo, pero descubrir que un usado certificado satisface su necesidad dentro del presupuesto.
- Una persona puede tener un iPhone con valor de retoma, pero no saber cómo utilizarlo para reducir el desembolso de la renovación.

---

## 3. Propuesta de valor que debe representar el MVP

> iPhone Direct Colombia guía al cliente mediante un proceso digital y asistido que analiza su presupuesto, necesidades y equipo actual; compara comprar nuevo, adquirir un usado certificado, reparar o realizar *trade-in*; y recomienda la alternativa más conveniente con costos, evidencia técnica, garantía y condiciones claras.

El diferencial no es reunir cuatro botones o cuatro servicios en una página. El diferencial consiste en desarrollar una **arquitectura de decisión** que:

- formule las preguntas necesarias;
- organice la información suministrada;
- descarte alternativas incompatibles;
- compare las opciones viables;
- recomiende una ruta principal;
- explique por qué se recomienda;
- muestre alternativas secundarias;
- conecte la recomendación con una acción real.

---

## 4. Hipótesis principal del MVP

> Si el cliente recibe una comparación guiada, transparente y personalizada entre comprar nuevo, comprar usado certificado, reparar o realizar *trade-in*, entonces podrá tomar una decisión con mayor confianza y tendrá una mayor probabilidad de solicitar una cotización, diagnóstico o compra.

### Hipótesis complementarias

1. Los usuarios completarán un cuestionario corto si perciben que obtendrán una recomendación útil.
2. Una recomendación explicada generará más confianza que un catálogo tradicional.
3. La evidencia de batería, IMEI, componentes, garantía y estado técnico aumentará la intención de compra de usados certificados.
4. Mostrar el costo neto después de la retoma facilitará la comprensión del precio real de renovación.
5. El contacto por WhatsApp será suficiente como mecanismo de cierre durante la validación inicial.

Estas afirmaciones deben tratarse como hipótesis hasta que se validen con comportamiento real de usuarios.

---

## 5. Objetivo del MVP

Construir una aplicación web local que permita a una persona:

1. indicar qué necesita;
2. describir su presupuesto y preferencias;
3. registrar información básica de su iPhone actual;
4. comparar alternativas;
5. recibir una recomendación comprensible;
6. solicitar compra, diagnóstico, reparación o retoma;
7. continuar la conversación por WhatsApp.

### Resultado esperado

Al finalizar el recorrido, el usuario debe ver:

- una recomendación principal;
- máximo dos alternativas secundarias;
- el costo estimado de cada alternativa;
- el posible valor de retoma;
- el desembolso neto estimado;
- los beneficios y condiciones de cada opción;
- la explicación de la recomendación;
- el siguiente paso disponible.

---

## 6. Alcance de la primera versión

### Incluido

- Página de inicio con explicación sencilla de la propuesta.
- Cuestionario guiado paso a paso.
- Selección entre compra, reparación, retoma o “no sé qué me conviene”.
- Registro de presupuesto, uso y preferencias.
- Registro básico del equipo actual.
- Catálogo de prueba con equipos nuevos y usados.
- Ficha técnica de cada equipo usado.
- Motor de recomendación basado en reglas explícitas.
- Comparación de hasta tres alternativas.
- Explicación de la recomendación.
- Botones para comprar, solicitar diagnóstico, cotizar retoma o abrir WhatsApp.
- Registro local de sesiones y eventos de validación.
- Pruebas unitarias del motor de recomendación.

### No incluido inicialmente

- Pagos reales.
- Financiación integrada.
- Consulta automática de IMEI con terceros.
- Inventario sincronizado con proveedores.
- Cálculo automático definitivo del valor de retoma.
- Diagnóstico técnico remoto concluyente.
- Inicio de sesión de clientes.
- Panel administrativo completo.
- Inteligencia artificial generativa tomando decisiones comerciales.
- Publicación en producción.

Excluir estas funciones protege el propósito del MVP: aprender si el flujo guiado genera valor antes de invertir en una plataforma completa.

---

## 7. Recorrido del usuario

### Paso 1. Definir la necesidad

La plataforma pregunta:

> ¿Qué necesitas hacer con tu iPhone?

Opciones:

- Comprar un equipo.
- Reparar mi equipo.
- Entregar mi equipo como parte de pago.
- No sé qué alternativa me conviene.

### Paso 2. Conocer el contexto

Preguntas mínimas:

- ¿Cuál es tu presupuesto máximo?
- ¿Qué uso principal le darás al equipo?
- ¿Qué característica valoras más?
- ¿Aceptarías un usado certificado?
- ¿Cuándo necesitas resolverlo?
- ¿Tienes un iPhone para reparar o entregar?

### Paso 3. Evaluar el equipo actual

Si el usuario tiene un equipo, se solicitan:

- modelo;
- capacidad;
- porcentaje de batería;
- estado de pantalla;
- estado de cámaras;
- estado de carcasa;
- fallas conocidas;
- reparaciones anteriores;
- estado general;
- disponibilidad para diagnóstico presencial.

La respuesta del usuario es preliminar. No reemplaza la evaluación del técnico aliado.

### Paso 4. Procesar alternativas

El motor de recomendación evalúa:

- compatibilidad con el presupuesto;
- prioridad de garantía y vida útil;
- aceptación de usados;
- estado del equipo actual;
- costo preliminar de reparación;
- valor preliminar de retoma;
- urgencia;
- disponibilidad del inventario de prueba.

### Paso 5. Presentar el resultado

La página de resultado debe mostrar:

1. **Recomendación principal.**
2. **Razones de la recomendación.**
3. **Costos utilizados en el cálculo.**
4. **Condiciones y limitaciones.**
5. **Alternativas secundarias.**
6. **Acción siguiente.**

### Paso 6. Continuar con una acción

Acciones posibles:

- “Quiero este equipo”.
- “Solicitar diagnóstico”.
- “Cotizar mi retoma”.
- “Hablar con un asesor por WhatsApp”.

---

## 8. Ejemplo de resultado esperado

> **Recomendación principal: reparar el equipo actual.**
>
> Esta opción se recomienda porque la falla reportada parece puntual, el costo preliminar de reparación se encuentra dentro del presupuesto y el equipo todavía puede conservar una vida útil adecuada. La recomendación debe confirmarse mediante diagnóstico técnico.

| Alternativa | Costo estimado | Retoma estimada | Desembolso neto | Condición principal |
|---|---:|---:|---:|---|
| Reparar | $X | No aplica | $X | Sujeto a diagnóstico |
| Usado certificado | $Y | $Z | $Y - $Z | Sujeto a inspección de la retoma |
| Nuevo sellado | $A | $Z | $A - $Z | Sujeto a disponibilidad |

Los valores mostrados durante el desarrollo serán datos de prueba. No deben presentarse como ofertas comerciales definitivas.

---

## 9. Enfoque técnico recomendado

### Tecnologías iniciales

- **Next.js:** aplicación web y rutas.
- **TypeScript:** tipado de formularios, productos, reglas y resultados.
- **Tailwind CSS:** construcción rápida de una interfaz adaptable.
- **Zod:** validación de los datos ingresados.
- **Archivos JSON:** catálogo y datos simulados durante la primera iteración.
- **Local Storage:** conservación temporal del recorrido en el navegador.
- **SQLite:** persistencia local en la segunda iteración.
- **Playwright:** pruebas del recorrido completo cuando el flujo principal esté estable.

### Por qué se propone este enfoque

- Permite desarrollar interfaz y lógica en un solo repositorio.
- Facilita ejecutar todo localmente.
- TypeScript reduce errores en las reglas de decisión.
- Los datos simulados permiten validar el flujo sin construir primero una administración de inventario.
- SQLite permite agregar persistencia local sin depender de servicios externos.
- La arquitectura puede migrar posteriormente a PostgreSQL y servicios en la nube.

---

## 10. Requisitos para ejecutar el proyecto

Antes de crear el proyecto se debe instalar:

- Node.js en una versión soportada por las herramientas utilizadas.
- npm, incluido con Node.js.
- Git.
- Visual Studio Code u otro editor.
- Una cuenta de GitHub para almacenar el repositorio remoto.

Comandos de verificación:

```bash
node --version
npm --version
git --version
```

Si alguno de estos comandos no funciona, se debe instalar la herramienta correspondiente antes de continuar.

---

## 11. Creación local del proyecto

Desde la carpeta donde se quiera guardar el proyecto:

```bash
npx create-next-app@latest iphone-direct-colombia-mvp \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-npm
```

Ingresar al proyecto:

```bash
cd iphone-direct-colombia-mvp
```

Instalar el validador de datos:

```bash
npm install zod
```

Ejecutar el servidor local:

```bash
npm run dev
```

Abrir en el navegador:

```text
http://localhost:3000
```

Para detener el servidor, utilizar `Ctrl + C` en la terminal.

---

## 12. Creación del repositorio Git

`create-next-app` normalmente puede inicializar Git. Primero se debe comprobar:

```bash
git status
```

Si la carpeta todavía no es un repositorio:

```bash
git init
```

Crear el primer commit:

```bash
git add .
git commit -m "chore: initialize local MVP"
git branch -M main
```

Después de crear un repositorio vacío en GitHub:

```bash
git remote add origin https://github.com/USUARIO/iphone-direct-colombia-mvp.git
git push -u origin main
```

No se deben subir contraseñas, tokens, datos personales, archivos `.env` ni bases de datos locales con información real.

---

## 13. Estructura propuesta del repositorio

```text
iphone-direct-colombia-mvp/
├── docs/
│   ├── decisiones-de-producto.md
│   ├── hipotesis.md
│   └── resultados-validacion.md
├── public/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── guia/
│   │   │   └── page.tsx
│   │   ├── resultado/
│   │   │   └── page.tsx
│   │   ├── catalogo/
│   │   │   └── page.tsx
│   │   ├── equipo/
│   │   │   └── [id]/page.tsx
│   │   ├── diagnostico/
│   │   │   └── page.tsx
│   │   └── retoma/
│   │       └── page.tsx
│   ├── components/
│   │   ├── advisor/
│   │   ├── catalog/
│   │   ├── comparison/
│   │   ├── forms/
│   │   └── ui/
│   ├── config/
│   │   └── business-rules.ts
│   ├── data/
│   │   ├── products.json
│   │   ├── repair-options.json
│   │   └── trade-in-values.json
│   ├── domain/
│   │   ├── customer-profile.ts
│   │   ├── device.ts
│   │   ├── product.ts
│   │   ├── recommendation.ts
│   │   └── quote.ts
│   ├── features/
│   │   └── advisor/
│   │       ├── advisor.schema.ts
│   │       ├── advisor.service.ts
│   │       ├── advisor.types.ts
│   │       └── advisor.test.ts
│   └── lib/
│       ├── analytics.ts
│       ├── currency.ts
│       ├── storage.ts
│       └── whatsapp.ts
├── tests/
│   └── advisor-flow.spec.ts
├── .env.example
├── .gitignore
├── README.md
└── package.json
```

### Regla de organización

- `app/` define las páginas.
- `components/` contiene elementos visuales reutilizables.
- `domain/` define los conceptos del negocio.
- `features/advisor/` contiene el corazón del diferencial.
- `config/` contiene hipótesis y umbrales modificables.
- `data/` contiene datos simulados.
- `lib/` contiene utilidades técnicas.
- `tests/` contiene pruebas completas del recorrido.
- `docs/` conserva decisiones, aprendizajes y evidencia.

La lógica de recomendación no debe quedar escrita directamente dentro de un componente visual.

---

## 14. Rutas mínimas de la aplicación

| Ruta | Propósito |
|---|---|
| `/` | Explicar el beneficio y comenzar el recorrido |
| `/guia` | Ejecutar el cuestionario paso a paso |
| `/resultado` | Mostrar recomendación, comparación y acciones |
| `/catalogo` | Mostrar equipos nuevos y usados disponibles para prueba |
| `/equipo/[id]` | Mostrar evidencia y condiciones de una unidad |
| `/diagnostico` | Recopilar información para revisión técnica |
| `/retoma` | Solicitar información del equipo ofrecido |

No se debe construir una ruta nueva si no responde a una necesidad comprobable del MVP.

---

## 15. Modelo conceptual de datos

### Perfil del cliente

```ts
type CustomerProfile = {
  sessionId: string;
  objective: "BUY" | "REPAIR" | "TRADE_IN" | "UNSURE";
  budgetCop: number;
  primaryUse: "BASIC" | "STUDY" | "WORK" | "CAMERA" | "GAMING";
  acceptsCertifiedUsed: boolean;
  priority: "PRICE" | "WARRANTY" | "PERFORMANCE" | "CAMERA" | "LONGEVITY";
  urgency: "TODAY" | "THIS_WEEK" | "THIS_MONTH" | "EXPLORING";
};
```

### Equipo actual

```ts
type CurrentDevice = {
  model: string;
  storageGb: number;
  batteryHealth?: number;
  screenCondition: "GOOD" | "DAMAGED" | "UNKNOWN";
  cameraCondition: "GOOD" | "DAMAGED" | "UNKNOWN";
  bodyCondition: "GOOD" | "WORN" | "DAMAGED" | "UNKNOWN";
  knownFailures: string[];
  previousRepairs: boolean | null;
  requiresTechnicalInspection: boolean;
};
```

### Producto

```ts
type Product = {
  id: string;
  model: string;
  storageGb: number;
  condition: "NEW" | "CERTIFIED_USED";
  priceCop: number;
  batteryHealth?: number;
  warrantyDays: number;
  imeiVerified: boolean;
  componentsChecked: string[];
  available: boolean;
};
```

### Recomendación

```ts
type Recommendation = {
  primaryOption: "NEW" | "CERTIFIED_USED" | "REPAIR" | "TRADE_IN";
  score: number;
  reasons: string[];
  assumptions: string[];
  estimatedGrossCostCop: number;
  estimatedTradeInCop: number;
  estimatedNetCostCop: number;
  requiresHumanReview: boolean;
  alternatives: RecommendationAlternative[];
};
```

---

## 16. Motor de recomendación

El motor inicial debe basarse en reglas comprensibles. No debe utilizar una caja negra ni presentar como certeza una evaluación que requiere inspección humana.

### Entradas principales

- objetivo del usuario;
- presupuesto;
- prioridad;
- aceptación de usados;
- existencia de equipo actual;
- estado declarado del equipo;
- costo preliminar de reparación;
- valor preliminar de retoma;
- productos disponibles.

### Proceso general

```text
1. Validar respuestas.
2. Construir el perfil del usuario.
3. Identificar alternativas posibles.
4. Descartar alternativas incompatibles.
5. Calcular costo bruto, retoma y costo neto.
6. Puntuar cada alternativa.
7. Ordenar alternativas por conveniencia.
8. Generar razones y advertencias.
9. Marcar si se requiere revisión humana.
10. Mostrar una recomendación principal y máximo dos alternativas.
```

### Ejemplo de puntuación inicial

| Condición | Efecto orientativo |
|---|---:|
| La alternativa cabe en el presupuesto | +30 |
| Coincide con la prioridad principal | +20 |
| Tiene garantía verificable | +15 |
| Reduce el desembolso mediante retoma | +10 |
| Requiere diagnóstico pendiente | -10 |
| Supera el presupuesto | -30 |
| El producto no está disponible | Se descarta |

Los valores anteriores son configurables y deben validarse. No constituyen todavía reglas comerciales definitivas.

### Reglas que deben permanecer como hipótesis

Ejemplos:

```ts
export const BUSINESS_RULES = {
  maxRepairToReplacementRatio: 0.30,
  minimumCertifiedBatteryHealth: 85,
  maximumAlternativesShown: 3,
  requireInspectionForTradeIn: true,
  requireHumanReviewForRepair: true,
};
```

Interpretación:

- `maxRepairToReplacementRatio` representa el porcentaje máximo preliminar del costo de reemplazo que se aceptaría antes de revisar si reparar sigue siendo conveniente.
- `minimumCertifiedBatteryHealth` representa el mínimo inicialmente exigido para clasificar un usado dentro del catálogo certificado.
- Toda retoma requiere inspección.
- Toda reparación requiere revisión técnica antes de considerarse definitiva.

Estos umbrales se deben ajustar con evidencia operativa y validación con clientes.

---

## 17. Datos simulados

Durante la primera iteración, el proyecto utilizará archivos JSON. Cada registro debe indicar claramente que es un dato de prueba.

Ejemplo:

```json
{
  "id": "used-iphone-example-001",
  "model": "iPhone de prueba",
  "storageGb": 128,
  "condition": "CERTIFIED_USED",
  "priceCop": 2000000,
  "batteryHealth": 90,
  "warrantyDays": 90,
  "imeiVerified": true,
  "componentsChecked": ["pantalla", "cámaras", "micrófono", "carga"],
  "available": true,
  "isTestData": true
}
```

No se deben copiar precios simulados a publicaciones comerciales.

---

## 18. Persistencia local

### Iteración 1: navegador

Utilizar `localStorage` solamente para:

- conservar temporalmente las respuestas;
- evitar perder el progreso si se recarga la página;
- guardar un identificador anónimo de sesión;
- simular eventos de validación.

No guardar:

- IMEI completo;
- documentos de identidad;
- información financiera;
- contraseñas;
- datos sensibles.

### Iteración 2: SQLite

Cuando el flujo principal funcione, se podrá agregar SQLite para registrar:

- sesiones anónimas;
- respuestas del cuestionario;
- recomendaciones generadas;
- acciones seleccionadas;
- solicitudes de contacto;
- eventos de conversión.

La base de datos local debe permanecer excluida de Git mediante `.gitignore`.

---

## 19. Variables de entorno

Crear `.env.example`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=57XXXXXXXXXX
NEXT_PUBLIC_ENABLE_TEST_DATA=true
```

Cada integrante debe crear su propio archivo `.env.local`:

```bash
cp .env.example .env.local
```

El número de WhatsApp debe escribirse con código de país y sin espacios. Las variables que comienzan con `NEXT_PUBLIC_` quedan visibles en el navegador y no deben contener secretos.

---

## 20. Integración inicial con WhatsApp

El MVP puede cerrar el recorrido construyendo un enlace con un mensaje prellenado:

```text
Hola, completé la guía de iPhone Direct Colombia.
Mi recomendación fue: [OPCIÓN].
Mi identificador de sesión es: [ID].
Quiero continuar con: [ACCIÓN].
```

El mensaje no debe incluir IMEI completo, datos financieros ni información innecesaria.

---

## 21. Eventos para validar comportamiento

El MVP debe registrar eventos, aunque inicialmente se almacenen localmente:

| Evento | Momento |
|---|---|
| `advisor_started` | El usuario inicia la guía |
| `advisor_step_completed` | Completa un paso |
| `advisor_abandoned` | Sale antes de finalizar |
| `recommendation_generated` | Se genera un resultado |
| `recommendation_viewed` | Visualiza la explicación |
| `alternative_selected` | Escoge una alternativa diferente |
| `whatsapp_clicked` | Abre WhatsApp |
| `diagnosis_requested` | Solicita diagnóstico |
| `trade_in_requested` | Solicita retoma |
| `purchase_intent_submitted` | Manifiesta intención de compra |

---

## 22. Métricas de validación

### Métricas principales

- **Tasa de finalización:** usuarios que terminan la guía / usuarios que la inician.
- **Tasa de acción:** usuarios que hacen clic en una acción / usuarios que reciben recomendación.
- **Conversión a WhatsApp:** usuarios que abren WhatsApp / usuarios que reciben recomendación.
- **Aceptación de la recomendación:** usuarios que eligen la opción principal / usuarios que reciben recomendación.
- **Tiempo de decisión:** duración desde el inicio hasta la acción.
- **Cambio de confianza:** percepción antes y después del recorrido.

### Preguntas posteriores

1. ¿La recomendación fue fácil de entender?
2. ¿Entendiste por qué se recomendó esa alternativa?
3. ¿La comparación aumentó tu confianza?
4. ¿Qué información hizo falta?
5. ¿Continuarías con una compra, reparación o retoma?

---

## 23. Criterios de aceptación funcional

El MVP se considera funcional cuando:

- el usuario puede completar el recorrido sin ayuda externa;
- las preguntas cambian según la necesidad seleccionada;
- los datos inválidos producen mensajes comprensibles;
- el motor genera una recomendación consistente;
- el resultado explica al menos tres razones;
- el usuario puede revisar los cálculos utilizados;
- las alternativas muestran condiciones y limitaciones;
- existe una acción siguiente para cada recomendación;
- el recorrido funciona en pantalla móvil;
- ningún dato de prueba se presenta como oferta definitiva.

---

## 24. Pruebas mínimas

### Pruebas unitarias

El motor debe probar, como mínimo:

1. Cliente sin equipo actual que busca un nuevo.
2. Cliente que acepta usado y tiene presupuesto limitado.
3. Cliente con falla menor potencialmente reparable.
4. Cliente con equipo apto para retoma.
5. Cliente cuyo presupuesto no coincide con ninguna alternativa.
6. Cliente con respuestas incompletas.
7. Producto no disponible.
8. Recomendación que exige revisión humana.

### Prueba del recorrido completo

Cuando el flujo esté estable, instalar Playwright:

```bash
npm init playwright@latest
```

La primera prueba debe comprobar:

```text
inicio → guía → respuestas → resultado → explicación → WhatsApp
```

---

## 25. Seguridad, privacidad y transparencia

- No almacenar IMEI completo durante la validación inicial.
- No solicitar cédula ni datos de pago.
- No prometer una retoma definitiva sin inspección.
- No afirmar que una reparación es conveniente sin diagnóstico.
- Mostrar cuándo un valor es estimado.
- Separar datos de prueba de información comercial real.
- Evitar subir archivos `.env.local`, bases locales y datos de participantes.
- Solicitar consentimiento si se almacenan respuestas identificables.

El motor brinda orientación comercial; no sustituye la inspección técnica.

---

## 26. Flujo de trabajo del equipo

### Ramas

- `main`: versión estable.
- `develop`: integración del trabajo en curso.
- `feature/nombre-corto`: una funcionalidad.
- `fix/nombre-corto`: corrección.

Ejemplos:

```bash
git checkout -b feature/advisor-questionnaire
git checkout -b feature/recommendation-engine
git checkout -b fix/budget-validation
```

### Convención de commits

```text
feat: add advisor first step
fix: prevent negative budget values
test: add repair recommendation cases
docs: explain trade-in assumptions
refactor: separate scoring from UI
chore: update development configuration
```

Cada commit debe representar un cambio pequeño, comprensible y verificable.

---

## 27. Plan de desarrollo por iteraciones

### Iteración 0 — Preparación

- Crear repositorio.
- Configurar Next.js y TypeScript.
- Definir estructura de carpetas.
- Copiar este README.
- Crear datos simulados.
- Registrar hipótesis en `docs/hipotesis.md`.

### Iteración 1 — Flujo sin persistencia

- Página de inicio.
- Cuestionario guiado.
- Estado temporal en navegador.
- Motor básico de reglas.
- Resultado explicado.
- Botón de WhatsApp.

### Iteración 2 — Catálogo y evidencia

- Catálogo de nuevos y usados.
- Ficha de usados certificados.
- Comparación de alternativas.
- Evidencia de batería, IMEI y componentes.
- Condiciones de garantía.

### Iteración 3 — Validación técnica

- Solicitud de diagnóstico.
- Solicitud de retoma.
- Revisión humana obligatoria.
- Persistencia con SQLite.
- Registro de eventos.

### Iteración 4 — Pruebas con usuarios

- Publicar una versión privada o controlada.
- Observar al menos cinco recorridos completos.
- Registrar abandonos y dudas.
- Realizar entrevistas posteriores.
- Ajustar preguntas, reglas y lenguaje.

### Iteración 5 — Decisión de continuidad

- Revisar métricas.
- Confirmar o rechazar hipótesis.
- Priorizar integraciones reales.
- Definir si se justifica desarrollar pagos, inventario y automatizaciones.

---

## 28. Definición de terminado para una funcionalidad

Una funcionalidad está terminada cuando:

- cumple un criterio del MVP;
- funciona en computador y móvil;
- valida entradas;
- maneja errores esperados;
- incluye una prueba cuando afecta reglas críticas;
- no contiene secretos;
- no mezcla datos reales con datos de prueba;
- actualiza la documentación cuando cambia una hipótesis o regla;
- fue revisada por otro integrante del equipo.

---

## 29. Riesgos principales

| Riesgo | Medida de control |
|---|---|
| Construir una tienda antes de validar la guía | Priorizar cuestionario, comparación y recomendación |
| Recomendaciones incorrectas | Reglas transparentes y revisión humana |
| Datos simulados confundidos con precios reales | Etiquetar `isTestData` y mostrar advertencias |
| Cuestionario demasiado largo | Medir abandono por paso |
| Solicitar datos sensibles innecesarios | Aplicar minimización de datos |
| Reglas comerciales ocultas en la interfaz | Centralizarlas en `business-rules.ts` |
| Dependencia temprana de inteligencia artificial | Validar primero con reglas determinísticas |

---

## 30. Evolución posterior

Si el MVP demuestra tracción, se podrá evolucionar hacia:

- PostgreSQL como base de datos central;
- autenticación para administradores;
- inventario real;
- sincronización con proveedores;
- historial de diagnósticos;
- generación de cotizaciones;
- integración con pagos;
- seguimiento de pedidos;
- panel de métricas;
- automatización de mensajes;
- asistente conversacional para explicar recomendaciones.

La inteligencia artificial debería utilizarse primero para mejorar la explicación, resumir necesidades o asistir al asesor. La decisión comercial central debe permanecer auditable y acompañada por reglas y evidencia.

---

## 31. Referencias técnicas

- Next.js, `create-next-app`: <https://nextjs.org/docs/app/api-reference/cli/create-next-app>
- Next.js, App Router: <https://nextjs.org/docs/app>
- Prisma ORM con SQLite: <https://docs.prisma.io/docs/prisma-orm/quickstart/sqlite>
- Playwright: <https://playwright.dev/docs/intro>

---

## 32. Próximo paso inmediato

El primer objetivo del repositorio es implementar solamente este recorrido:

```text
Página inicial
    ↓
Cuestionario de necesidad y presupuesto
    ↓
Registro básico del equipo actual
    ↓
Motor de reglas
    ↓
Recomendación explicada
    ↓
Acción por WhatsApp
```

No se debe comenzar por pagos, autenticación o integraciones externas. El primer aprendizaje debe responder:

> ¿La guía realmente ayuda al cliente a decidir y lo impulsa a realizar una acción?
