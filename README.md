# iPhone Direct Colombia — MVP local

> Para conocer todas las páginas, funcionalidades y reglas consulta la [explicación completa de la aplicación](docs/explicacion-aplicacion-y-funcionalidades.md). Para instalar y ejecutar el proyecto consulta la [guía técnica y de ejecución](docs/guia-tecnica-y-ejecucion.md). Para administrar modelos, precios, fotos y stock consulta la [guía de uso del catálogo e inventario CSV](docs/guia-uso-catalogo-inventario.md). Para decisiones de producto, alcance y prioridades usa el [contexto maestro validado](CONTEXTO_MAESTRO_MVP_IPHONE_DIRECT_COLOMBIA.md).

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
- **Propósito del repositorio:** mantener en un solo lugar el código, las reglas de recomendación, el catálogo e inventario, la documentación y los resultados de validación del MVP.

> En el código y en el CSV todavía aparece el nombre técnico “usado certificado”. El
> inventario actual es agregado: hasta contar con una ficha y evidencia por unidad, la
> interfaz no debe afirmar que un equipo específico ya tiene batería, IMEI, componentes o
> garantía verificados.

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

## 6. Alcance y estado de la primera versión

### Implementado y verificado

- Página de inicio con explicación sencilla de la propuesta.
- Cuestionario guiado paso a paso.
- Selección entre compra, reparación, retoma o “no sé qué me conviene”.
- Registro de presupuesto, uso y preferencias.
- Registro básico del equipo actual.
- Catálogo agregado administrado desde CSV con stock nuevo y usado.
- Motor de recomendación basado en reglas explícitas.
- Comparación de hasta tres alternativas.
- Explicación de la recomendación.
- Registro local de sesiones y eventos de validación.
- Pruebas unitarias del motor de recomendación.

### Objetivo pendiente

- Ficha por unidad con evidencia técnica real.
- Formularios para solicitar compra, diagnóstico y cotización de retoma.
- Cierre por WhatsApp con atribución y contexto completos.
- Persistencia autorizada de leads, consentimiento y UTM.

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

La respuesta del usuario es preliminar. No reemplaza la evaluación presencial del técnico propio.

### Paso 4. Procesar alternativas

El motor de recomendación evalúa:

- compatibilidad con el presupuesto;
- prioridad de garantía y vida útil;
- aceptación de usados;
- estado del equipo actual;
- costo preliminar de reparación;
- valor preliminar de retoma;
- urgencia;
- disponibilidad del inventario vigente en el CSV.

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

Los precios y valores de retoma del CSV son referencias aproximadas y el stock corresponde a
las cantidades agregadas suministradas por el responsable. Deben confirmarse antes de una
oferta comercial; esa información no demuestra por sí sola el estado técnico de una unidad.

---

## 9. Tecnologías utilizadas

### Aplicación

- **Next.js 16 (App Router):** aplicación web, páginas y navegación.
- **React 19:** componentes y experiencia interactiva.
- **TypeScript 5:** tipado del catálogo, formularios, reglas y resultados.
- **Tailwind CSS 4:** estilos adaptables y diseño visual.
- **Zod 4:** validación de las respuestas de la guía.

### Datos, automatización y calidad

- **CSV:** fuente de verdad editable del catálogo, los precios y el inventario.
- **Scripts de Node.js:** validan el CSV y generan los datos tipados que consume la aplicación.
- **ESLint:** revisión estática del código.
- **Node Test Runner y `tsx`:** pruebas unitarias del motor de recomendación y del proceso de inventario.
- **Local Storage:** conservación temporal del recorrido en el navegador.

### Por qué se utiliza este enfoque

- Permite desarrollar interfaz y lógica en un solo repositorio.
- Facilita ejecutar todo localmente.
- TypeScript reduce errores en las reglas de decisión.
- El CSV permite administrar precio, foto y existencias sin modificar componentes de React.
- El generador valida el inventario antes de entregárselo a la aplicación y evita publicar datos mal formados.
- La arquitectura puede migrar posteriormente a una base de datos y a un panel administrativo sin cambiar el propósito del MVP.

---

## 10. Requisitos para ejecutar el proyecto

Antes de ejecutar el proyecto se debe instalar:

- Node.js 20.9 o una versión posterior compatible con Next.js 16.
- npm, incluido con Node.js.
- Git.
- Visual Studio Code u otro editor.

Comandos de verificación:

```bash
node --version
npm --version
git --version
```

Si alguno de estos comandos no funciona, se debe instalar la herramienta correspondiente antes de continuar.

---

## 11. Instalación y ejecución local paso a paso

1. Abrir una terminal e ingresar a la carpeta de la aplicación:

```bash
cd iphone-direct-colombia-mvp
```

2. Instalar las dependencias declaradas en `package-lock.json`:

```bash
npm install
```

3. Crear el archivo de configuración local a partir del ejemplo:

```bash
cp .env.example .env.local
```

4. Sincronizar y validar el inventario:

```bash
npm run catalog:sync
npm run catalog:check
```

5. Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

6. Abrir en el navegador:

```text
http://localhost:3000
```

Para detener el servidor, utilizar `Ctrl + C` en la terminal.

### Comandos disponibles

| Comando | Propósito |
|---|---|
| `npm run dev` | Sincroniza el CSV, inicia Next.js y observa cambios del inventario durante el desarrollo. |
| `npm run catalog:sync` | Valida el CSV y vuelve a generar el catálogo tipado. |
| `npm run catalog:check` | Comprueba que el CSV sea válido y que el archivo generado esté actualizado, sin modificarlo. |
| `npm run lint` | Ejecuta las reglas de ESLint. |
| `npm test` | Ejecuta las pruebas automatizadas. |
| `npm run build` | Sincroniza el catálogo y genera la compilación optimizada de producción. |
| `npm start` | Sirve localmente una compilación ya creada con `npm run build`. |

Durante `npm run dev`, al guardar `data/catalogo-inventario.csv`, el observador vuelve a generar los datos y Next.js actualiza la página. Si una fila es inválida, se muestra el error en la terminal y la aplicación conserva la última versión válida.

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

## 13. Estructura principal del repositorio

```text
iphone-direct-colombia-mvp/
├── CONTEXTO_MAESTRO_MVP_IPHONE_DIRECT_COLOMBIA.md  # Contexto canónico
├── data/
│   └── catalogo-inventario.csv       # Fuente de verdad del catálogo
├── docs/
│   ├── explicacion-aplicacion-y-funcionalidades.md
│   ├── guia-uso-catalogo-inventario.md
│   ├── guia-tecnica-y-ejecucion.md
│   ├── decisiones-de-producto.md
│   ├── hipotesis.md
│   └── resultados-validacion.md
├── public/
│   ├── brand/                       # Logotipo
│   └── products/                    # Fotografías locales del catálogo
├── scripts/
│   ├── dev-with-catalog.mjs         # Servidor y observador del CSV
│   └── sync-catalog-inventory.mjs   # Validador y generador
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── guia/
│   │   │   └── page.tsx
│   │   ├── resultado/
│   │   │   └── page.tsx
│   │   └── catalogo/page.tsx
│   ├── components/                  # Componentes visuales reutilizables
│   ├── config/
│   │   └── business-rules.ts
│   ├── data/
│   │   ├── device-catalog.ts
│   │   └── device-inventory.generated.ts  # No editar a mano
│   ├── domain/                      # Tipos y conceptos del negocio
│   ├── features/
│   │   └── advisor/
│   │       ├── advisor.schema.ts
│   │       ├── advisor.service.ts
│   │       ├── advisor.types.ts
│   │       └── advisor.test.ts
│   └── lib/                         # Utilidades técnicas
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
- `data/catalogo-inventario.csv` es el único archivo que se edita para controlar el catálogo.
- `src/data/device-inventory.generated.ts` se genera automáticamente; nunca se modifica a mano.
- `public/products/` contiene las fotos a las que apunta el CSV.
- `lib/` contiene utilidades técnicas.
- `scripts/` contiene la sincronización, validación y observación del inventario.
- `docs/` conserva decisiones, aprendizajes y evidencia.

La lógica de recomendación no debe quedar escrita directamente dentro de un componente visual.

---

## 14. Rutas de la aplicación

| Ruta | Propósito | Estado |
|---|---|---|
| `/` | Explicar el beneficio y comenzar el recorrido | Implementada |
| `/guia` | Ejecutar el cuestionario paso a paso | Implementada |
| `/resultado` | Mostrar recomendación, comparación y acciones | Implementada |
| `/catalogo` | Mostrar el catálogo agregado con disponibilidad | Implementada |
| `/equipo/[id]` | Mostrar evidencia y condiciones de una unidad | Pendiente |
| `/diagnostico` | Recopilar información para revisión técnica | Pendiente |
| `/retoma` | Solicitar información del equipo ofrecido | Pendiente |

No se debe enviar tráfico a una ruta pendiente ni construir una ruta nueva si no responde a
una necesidad comprobable del MVP.

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

### Producto con evidencia por unidad — modelo objetivo

Este modelo representa la evolución necesaria para respaldar un equipo usado específico; no
describe todavía el catálogo agregado implementado.

```ts
type Product = {
  id: string;
  model: string;
  storageGb: number;
  condition: "NEW" | "CERTIFIED_USED";
  priceCop: number;
  batteryHealth: number | null;
  warrantyDays: number | null;
  imeiStatus: "PENDING" | "VERIFIED" | "REJECTED";
  componentsChecked: string[];
  evidenceStatus: "PENDING" | "VERIFIED";
  stock: number | null;
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
- `minimumCertifiedBatteryHealth` es un umbral objetivo que solo puede aplicarse cuando
  exista una medición por unidad. El 90 % que asigna hoy el adaptador es un valor temporal
  sin respaldo del CSV y debe eliminarse o mostrarse como pendiente antes del piloto.
- Toda retoma requiere inspección.
- Toda reparación requiere revisión técnica antes de considerarse definitiva.

Estos umbrales se deben ajustar con evidencia operativa y validación con clientes.

---

## 17. Catálogo e inventario administrado desde CSV

El archivo [`data/catalogo-inventario.csv`](data/catalogo-inventario.csv) es la **fuente de verdad** para los modelos, características, precios, fotos y existencias que aparecen en la página. Para cambiar esos datos no se deben editar los componentes ni el archivo generado de TypeScript.

La palabra `certificado` forma parte del contrato técnico heredado de las columnas. El CSV no
contiene una ficha por unidad ni confirma batería, IMEI, componentes o garantía; esos datos
deben mostrarse como pendientes hasta que exista evidencia individual.

Para el procedimiento operativo completo, ejemplos y solución de errores consulta la [guía de uso del catálogo e inventario CSV](docs/guia-uso-catalogo-inventario.md).

El flujo de datos es:

```text
data/catalogo-inventario.csv
        ↓ validación y generación
src/data/device-inventory.generated.ts
        ↓ consumo de datos tipados
página de catálogo + motor de recomendación
```

### Columnas del inventario

| Columna | Obligatoria | Contenido |
|---|---|---|
| `modelo` | Sí | Nombre comercial único, por ejemplo `iPhone 15 Pro Max`. |
| `generacion` | Sí | Número de la generación, por ejemplo `15`. |
| `nivel` | Sí | Categoría interna: `VALUE`, `MINI`, `STANDARD`, `PLUS`, `AIR`, `PRO` o `PRO_MAX`. |
| `categoria` | Sí | Nombre visible de la categoría, por ejemplo `Pro Max`. |
| `capacidad_gb` | Sí | Capacidad base en GB, como número entero. |
| `precio_nuevo_cop` | Sí | Precio aproximado nuevo en pesos colombianos, sin puntos, comas ni símbolo `$`. |
| `stock_nuevo` | No | Unidades nuevas disponibles; su significado se detalla más abajo. |
| `precio_usado_certificado_cop` | No | Precio aproximado del usado certificado en COP; vacío si no se ofrece. |
| `stock_usado_certificado` | No | Unidades usadas certificadas disponibles. |
| `valor_retoma_cop` | Sí | Valor aproximado de retoma en COP, escrito como entero. |
| `caracteristica_destacada` | Sí | Resumen corto usado para explicar y comparar el modelo. |
| `ruta_imagen` | Sí | Ruta pública local que comienza por `/products/`. |
| `texto_alternativo_imagen` | Sí | Descripción accesible y concreta de la foto. |
| `fuente_imagen` | Sí | URL HTTPS de la fuente original de la imagen. |
| `fecha_verificacion` | Sí | Fecha de revisión del precio y la información en formato `AAAA-MM-DD`. |

Si un texto contiene una coma, debe ir entre comillas dobles. Cada modelo debe aparecer una sola vez y las columnas no se deben renombrar ni reordenar.

### Cómo modificar un precio

1. Abrir `data/catalogo-inventario.csv` en un editor de texto o una hoja de cálculo que conserve el formato CSV UTF-8.
2. Buscar la fila por `modelo`.
3. Cambiar `precio_nuevo_cop`, `precio_usado_certificado_cop` o `valor_retoma_cop` usando números enteros. Ejemplo: escribir `5299000`, no `$5.299.000`.
4. Actualizar `fecha_verificacion`.
5. Guardar el archivo. Con `npm run dev` activo, la página se actualiza automáticamente.

Los precios actuales son aproximados y deben confirmarse antes de presentarlos como una oferta comercial definitiva.

### Cómo modificar una foto

1. Guardar la imagen en `public/products/`, preferiblemente con un nombre descriptivo y optimizada para web. Ejemplo: `public/products/iphone-15-pro.jpg`.
2. Escribir en `ruta_imagen` la ruta pública correspondiente: `/products/iphone-15-pro.jpg`.
3. Actualizar `texto_alternativo_imagen` y `fuente_imagen`.
4. Guardar el CSV.

La imagen debe ser un archivo `.jpg`, `.jpeg`, `.png`, `.webp` o `.avif` existente dentro de `public/products/`; el sincronizador detiene la generación si la ruta es insegura o si el archivo no existe. `ruta_imagen` no debe contener una URL externa ni una ruta absoluta del computador. Al sustituir una foto, usa un nombre de archivo nuevo y actualiza `ruta_imagen` para evitar que el navegador conserve la versión anterior en caché.

### Cómo controlar el stock

Las columnas `stock_nuevo` y `stock_usado_certificado` utilizan estas reglas:

| Valor en el CSV | Significado en la aplicación |
|---:|---|
| Celda vacía | Stock sin registrar; la condición queda excluida de todas las recomendaciones. |
| `0` | Producto agotado; la condición queda excluida de todas las recomendaciones. |
| Entero positivo, por ejemplo `3` | Hay esa cantidad de unidades y la condición puede participar en las recomendaciones. |

No se permiten valores negativos ni decimales. Si `stock_usado_certificado` es mayor que cero, la fila también debe tener `precio_usado_certificado_cop`.

Las dos condiciones se controlan de forma independiente:

- **Solo segunda:** escribir `0` en `stock_nuevo` y un entero positivo en `stock_usado_certificado`.
- **Solo nuevo sellado:** escribir un entero positivo en `stock_nuevo` y `0` o vacío en `stock_usado_certificado`.
- **Ambas condiciones:** escribir un entero positivo en las dos columnas de stock.
- **Sin mercancía:** escribir `0` en ambas columnas; el modelo puede seguir visible como referencia, pero el motor no lo recomienda.

El inventario vigente ya contiene las cantidades reales suministradas para cada condición. Después de cada venta o cambio de inventario, se debe actualizar la cantidad en el CSV; al llegar a `0`, esa condición desaparece automáticamente de las opciones recomendables. Una celda vacía vuelve a significar que el stock no está registrado y también excluye esa condición.

### Sincronización y actualización automática

- **Durante el desarrollo:** `npm run dev` realiza una sincronización inicial y observa el CSV. Cada vez que se guarda un cambio válido, regenera `src/data/device-inventory.generated.ts` y Next.js refresca la página.
- **Resultados guardados:** cada recomendación conserva una revisión del catálogo. Si cambian precio, foto o stock, `/resultado` la recalcula con las respuestas guardadas antes de volver a mostrarla; un equipo agotado no permanece recomendado.
- **Sin el servidor activo:** ejecutar `npm run catalog:sync` después de editar el CSV.
- **Verificación:** `npm run catalog:check` falla si encuentra columnas incorrectas, datos inválidos, modelos duplicados, imágenes inexistentes o si el archivo generado quedó desactualizado.
- **Producción:** el navegador no lee el CSV directamente. Después de cambiarlo se debe ejecutar una nueva compilación con `npm run build` y volver a desplegarla. Editar solamente el CSV en un servidor ya desplegado no modifica una versión que ya fue compilada.

`src/data/device-inventory.generated.ts` es un artefacto automático y debe conservarse en Git junto con el CSV para que el equipo y la integración continua puedan comprobar que ambos están sincronizados.

---

## 18. Persistencia local

### Iteración 1: navegador

Utilizar `localStorage` solamente para:

- conservar temporalmente las respuestas;
- evitar perder el progreso si se recarga la página;
- guardar un identificador anónimo de sesión;
- registrar eventos de validación local.

No guardar:

- IMEI completo;
- documentos de identidad;
- información financiera;
- contraseñas;
- datos sensibles.

### Persistencia identificable: decisión pendiente

Antes de guardar solicitudes de contacto se debe decidir entre un CRM, un proveedor de
formularios o un backend mínimo. Esa decisión debe incluir consentimiento, acceso,
retención y eliminación de datos. SQLite puede evaluarse para desarrollo local, pero no es
la arquitectura aprobada del piloto y nunca debe convertirse en un repositorio de datos
personales dentro de Git.

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

`NEXT_PUBLIC_ENABLE_TEST_DATA` está reservada y actualmente el código no la consulta. No
convierte el inventario del CSV en datos de prueba; cualquier reparación, retoma o evidencia
demostrativa deberá mantenerse separada y rotulada explícitamente.

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

Este es el vocabulario canónico que debe usarse al consolidar la medición. Mientras no se
conecte una plataforma analítica, los eventos implementados se almacenan localmente:

| Evento | Momento |
|---|---|
| `landing_viewed` | Se visualiza la página inicial. |
| `catalog_viewed` | Se visualiza el catálogo. |
| `catalog_item_viewed` | Se abre el detalle de un producto. |
| `advisor_started` | El usuario inicia la guía |
| `advisor_step_completed` | Completa un paso |
| `advisor_abandoned` | Sale antes de finalizar |
| `recommendation_generated` | Se genera un resultado |
| `recommendation_viewed` | Visualiza la explicación |
| `alternative_selected` | Escoge una alternativa diferente |
| `whatsapp_clicked` | Abre WhatsApp |
| `lead_submitted` | Envía datos de contacto con consentimiento. |
| `diagnosis_requested` | Solicita diagnóstico |
| `trade_in_requested` | Solicita retoma |
| `quote_requested` | Solicita una cotización. |
| `paid_operation_recorded` | La operación pagada se concilia fuera del clic o formulario. |

El código todavía utiliza parcialmente `purchase_intent_submitted`; se considera un nombre
legado y debe migrarse una sola vez, sin duplicar eventos. Un clic, lead o cotización nunca
se registra como compra pagada.

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
- ningún precio aproximado ni dato técnico sin evidencia se presenta como oferta definitiva.

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
- Separar inventario agregado, estimaciones y evidencia técnica confirmada.
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

| Iteración | Estado al 22 de octubre de 2026 | Trabajo restante |
|---|---|---|
| 0 — Preparación | Completada | Mantener documentación y fuentes de verdad alineadas. |
| 1 — Flujo guiado | Implementación funcional | Corregir reglas de mejora, reparación y evidencia inventada; cerrar WhatsApp. |
| 2 — Catálogo y evidencia | Catálogo agregado implementado | Crear fichas y evidencia técnica por unidad antes de afirmar certificación. |
| 3 — Solicitudes y atribución | Pendiente | Diagnóstico, retoma, formularios, consentimiento, UTM y almacenamiento autorizado. |
| 4 — Piloto controlado | Pendiente | Desplegar, observar recorridos, medir abandonos y entrevistar participantes. |
| 5 — Decisión | Pendiente | Revisar métricas, validar hipótesis y priorizar integraciones. |

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
| Inventario agregado confundido con certificación por unidad | Mostrar evidencia pendiente y no inventar batería, IMEI, componentes ni garantía |
| Cuestionario demasiado largo | Medir abandono por paso |
| Solicitar datos sensibles innecesarios | Aplicar minimización de datos |
| Reglas comerciales ocultas en la interfaz | Centralizarlas en `business-rules.ts` |
| Dependencia temprana de inteligencia artificial | Validar primero con reglas determinísticas |

---

## 30. Evolución posterior

Si el MVP demuestra tracción, se podrá evolucionar hacia:

- PostgreSQL como base de datos central;
- autenticación para administradores;
- inventario serializado por unidad y conciliación operativa;
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

Usadas por la implementación actual:

- Next.js, `create-next-app`: <https://nextjs.org/docs/app/api-reference/cli/create-next-app>
- Next.js, App Router: <https://nextjs.org/docs/app>

Candidatas pendientes, no implementadas ni aprobadas como arquitectura definitiva:

- Prisma ORM con SQLite: <https://docs.prisma.io/docs/prisma-orm/quickstart/sqlite>
- Playwright: <https://playwright.dev/docs/intro>

---

## 32. Próximo paso inmediato

El recorrido base ya está implementado. El objetivo inmediato es corregir sus riesgos de
confianza y convertirlo en un experimento medible:

```text
Inventario vigente
    ↓
Guía y reglas corregidas
    ↓
Recomendación sin evidencia inventada
    ↓
Cotización o WhatsApp con atribución
    ↓
Resultado observado y conciliado por el equipo
```

Antes del piloto se deben corregir el tratamiento de presupuesto, iPhone 11/12, reparación
sin falla declarada y evidencia por unidad; después se completan formularios, privacidad,
UTM y rutas prioritarias. No se debe comenzar por pagos ni autenticación. El aprendizaje
que se busca sigue siendo:

> ¿La guía realmente ayuda al cliente a decidir y lo impulsa a realizar una acción?
