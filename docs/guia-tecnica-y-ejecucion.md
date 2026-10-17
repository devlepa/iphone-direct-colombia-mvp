# Guía técnica y de ejecución

Este documento explica las tecnologías utilizadas en **iPhone Direct Colombia**, la
organización del código y el procedimiento para instalar, configurar, ejecutar y validar
el proyecto.

## 1. Descripción general

La aplicación es un MVP web que permite:

- consultar un catálogo estimado de iPhone 13 a iPhone 18 Pro Max;
- comparar equipos nuevos y usados certificados;
- registrar el presupuesto y las preferencias del cliente;
- evaluar el iPhone que el cliente tiene actualmente;
- recomendar una compra, reparación o retoma mediante reglas verificables;
- explicar por qué el dispositivo recomendado representa una mejora;
- continuar la conversación mediante WhatsApp.

La versión actual funciona sin base de datos ni un backend de negocio independiente. El
catálogo y las reglas se encuentran en el repositorio, mientras que el progreso del
visitante se almacena temporalmente en su navegador.

## 2. Tecnologías utilizadas

### Aplicación y lenguaje

| Tecnología | Versión del proyecto | Uso |
|---|---:|---|
| Node.js | `>= 20.9.0` | Entorno necesario para instalar, desarrollar y compilar la aplicación. |
| npm | Incluido con Node.js | Instalación de dependencias y ejecución de scripts. |
| Next.js | `16.4.1` | Framework principal, enrutamiento, renderizado y compilación. |
| React | `19.3.0` | Construcción de componentes e interfaces interactivas. |
| React DOM | `19.3.0` | Renderizado de React en el navegador. |
| TypeScript | `5.x` | Tipado estático de componentes, datos y reglas de negocio. |

### Interfaz y estilos

| Tecnología | Versión del proyecto | Uso |
|---|---:|---|
| Tailwind CSS | `4.x` | Diseño responsive y clases de estilo. |
| `@tailwindcss/postcss` | `4.x` | Procesamiento de Tailwind tanto con Turbopack como con Webpack. |
| PostCSS | Integrado mediante Next.js | Ejecuta el complemento de Tailwind definido en `postcss.config.mjs`. |
| CSS global | Nativo | Variables de color, tipografías, selección, foco y animaciones. |
| `next/image` | Incluido en Next.js | Optimización y presentación del logo y las fotografías de producto. |
| Turbopack | Incluido en Next.js | Compilador predeterminado durante el desarrollo y alternativa de compilación. |
| Webpack | Incluido en Next.js | Compilador utilizado por `npm run build` para mayor compatibilidad. |

### Validación, pruebas y calidad

| Tecnología | Versión del proyecto | Uso |
|---|---:|---|
| Zod | `4.6.7` o compatible | Validación de formularios, productos, reparaciones y retomas. |
| Node Test Runner | Incluido en Node.js | Ejecución de pruebas unitarias del motor de recomendación. |
| tsx | `4.23.15` o compatible | Ejecución directa de pruebas escritas en TypeScript. |
| ESLint | `9.x` | Detección de errores y problemas de estilo en el código. |
| eslint-config-next | `16.4.1` | Reglas recomendadas para Next.js y React. |

### Capacidades del navegador e integraciones

| Tecnología | Uso |
|---|---|
| `localStorage` | Guarda temporalmente el borrador de la guía, la recomendación y los eventos del MVP. |
| `Intl.NumberFormat` | Presenta precios en pesos colombianos (`COP`). |
| API Web Crypto | Genera identificadores anónimos de sesión mediante `randomUUID`. |
| Enlaces `wa.me` | Abre WhatsApp con un mensaje de contacto previamente preparado. |

## 3. Arquitectura del proyecto

El proyecto utiliza el **App Router** de Next.js y separa la interfaz, el dominio, los
datos y las reglas de recomendación.

```text
src/
├── app/                       Páginas, metadatos y estilos globales
│   ├── page.tsx               Página de inicio
│   ├── catalogo/page.tsx      Catálogo completo
│   ├── guia/page.tsx          Cuestionario guiado
│   └── resultado/page.tsx     Resultado y explicación
├── components/                Componentes visuales reutilizables
│   ├── advisor/               Formulario de recomendación
│   ├── comparison/            Presentación del resultado
│   └── ui/                    Cabecera y pie de página
├── config/                    Umbrales y reglas configurables
├── data/                      Catálogo, precios y valores estimados
├── domain/                    Tipos del negocio
├── features/advisor/          Validación y motor de recomendación
└── lib/                       Utilidades de moneda, almacenamiento y WhatsApp
```

El flujo principal es el siguiente:

```text
Inicio
  → formulario de la guía
  → validación con Zod
  → motor de recomendación
  → almacenamiento local del resultado
  → explicación y comparación
  → contacto por WhatsApp
```

### Archivos importantes

| Archivo | Responsabilidad |
|---|---|
| `src/data/device-catalog.ts` | Modelos, categorías, capacidades y precios aproximados. |
| `src/features/advisor/advisor.service.ts` | Puntuación, filtros y selección de la recomendación. |
| `src/features/advisor/advisor.schema.ts` | Validación de los datos de entrada con Zod. |
| `src/config/business-rules.ts` | Umbrales comerciales configurables. |
| `src/components/advisor/advisor-form.tsx` | Cuestionario de cuatro pasos. |
| `src/components/comparison/result-view.tsx` | Explicación del resultado y costos. |
| `src/lib/storage.ts` | Lectura y escritura segura en `localStorage`. |
| `src/lib/whatsapp.ts` | Construcción del enlace de WhatsApp. |
| `.env.example` | Plantilla de configuración local. |
| `public/products/` | Fotografías oficiales de producto descargadas para servirlas localmente. |
| `public/brand/` | Logo suministrado por iPhone Direct Colombia. |

## 4. Requisitos previos

Antes de ejecutar el proyecto se necesita:

1. **Node.js 20.9.0 o superior.**
2. **npm**, normalmente instalado junto con Node.js.
3. **Git**, recomendado para descargar y versionar el proyecto.
4. Un navegador moderno como Chrome, Edge, Firefox o Safari.

Verificar las herramientas:

```bash
node --version
npm --version
git --version
```

Si `node --version` muestra una versión inferior a `20.9.0`, se debe actualizar Node.js
antes de continuar.

## 5. Instalación y ejecución paso a paso

### Paso 1. Abrir una terminal en el proyecto

Si el repositorio ya se encuentra en el equipo, ingresar a la carpeta de la aplicación:

```bash
cd /home/devlepa/Escritorio/iphone_direct_colombia/iphone-direct-colombia-mvp
```

Si el proyecto se obtuvo desde GitHub, primero se debe clonar y luego entrar a la carpeta:

```bash
git clone URL_DEL_REPOSITORIO
cd iphone-direct-colombia-mvp
```

### Paso 2. Instalar las dependencias

Como el repositorio incluye `package-lock.json`, se recomienda una instalación reproducible:

```bash
npm ci
```

Para desarrollo cotidiano también se puede utilizar:

```bash
npm install
```

Solo se necesita ejecutar uno de los dos comandos. `npm ci` reinstala exactamente las
versiones registradas en el archivo de bloqueo.

### Paso 3. Crear la configuración local

En Linux o macOS:

```bash
cp .env.example .env.local
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

El archivo debe contener una configuración similar a esta:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=573142171322
NEXT_PUBLIC_ENABLE_TEST_DATA=true
```

Descripción de las variables:

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Dirección prevista para la aplicación. Está reservada para integraciones futuras y actualmente no se lee desde el código. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de destino con código de país, sin `+`, espacios ni guiones. |
| `NEXT_PUBLIC_ENABLE_TEST_DATA` | Bandera reservada para controlar datos de prueba. Actualmente el catálogo del MVP siempre está marcado como estimado. |

Las variables que comienzan por `NEXT_PUBLIC_` quedan disponibles en el navegador. No se
deben guardar contraseñas, tokens privados ni otros secretos en ellas.

El archivo `.env.local` está excluido de Git y no debe subirse al repositorio.

### Paso 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Cuando la terminal indique que el servidor está listo, abrir:

```text
http://localhost:3000
```

Rutas principales:

| Dirección | Contenido |
|---|---|
| `http://localhost:3000/` | Página de inicio. |
| `http://localhost:3000/catalogo` | Catálogo y precios aproximados. |
| `http://localhost:3000/guia` | Cuestionario de recomendación. |
| `http://localhost:3000/resultado` | Última recomendación guardada en el navegador. |

### Paso 5. Probar el recorrido principal

1. Abrir la página de inicio.
2. Entrar en **Iniciar guía**.
3. Seleccionar el objetivo, presupuesto, uso y prioridad.
4. Indicar el modelo del iPhone actual, si existe.
5. Revisar y generar la recomendación.
6. Confirmar que el resultado explica el salto respecto al equipo actual.
7. Probar el botón de WhatsApp y verificar el número configurado.

### Paso 6. Detener el servidor

Volver a la terminal y presionar:

```text
Ctrl + C
```

## 6. Comandos de calidad

### Ejecutar las pruebas unitarias

```bash
npm test
```

Estas pruebas verifican, entre otros casos:

- selección entre equipo nuevo y usado certificado;
- reparación y retoma;
- respeto del presupuesto;
- exclusión de inventario no disponible;
- rechazo de respuestas incompletas;
- recomendación de un modelo superior para quien ya tiene un iPhone 15 Pro Max.

### Ejecutar ESLint

```bash
npm run lint
```

### Verificar TypeScript sin generar archivos

```bash
npx tsc --noEmit
```

Antes de entregar cambios se recomienda ejecutar los tres comandos.

## 7. Compilación y ejecución de producción

### Paso 1. Generar la compilación optimizada

```bash
npm run build
```

El script principal utiliza Webpack para que la compilación sea compatible con entornos
restringidos. Para probar explícitamente la compilación con Turbopack se puede ejecutar:

```bash
npm run build:turbopack
```

### Paso 2. Iniciar la versión compilada

```bash
npm start
```

Abrir nuevamente `http://localhost:3000`.

El comando `npm start` requiere que la compilación del paso anterior haya finalizado
correctamente.

## 8. Scripts disponibles

| Comando | Acción |
|---|---|
| `npm run dev` | Inicia Next.js en modo desarrollo. |
| `npm run build` | Genera la compilación de producción. |
| `npm run build:turbopack` | Genera la compilación alternativa con Turbopack. |
| `npm start` | Ejecuta la compilación de producción. |
| `npm run lint` | Revisa el código con ESLint. |
| `npm test` | Ejecuta las pruebas del motor de recomendación. |

## 9. Datos y persistencia

La versión actual no utiliza una base de datos.

Los datos se distribuyen así:

- catálogo y precios estimados: archivos dentro de `src/data/`;
- reglas de negocio: `src/config/business-rules.ts`;
- respuestas y resultado: `localStorage` del navegador;
- eventos de validación: máximo de 100 eventos recientes en `localStorage`;
- logo y otros recursos públicos: carpeta `public/`.

Para reiniciar completamente una prueba se puede pulsar **Empezar de nuevo** dentro de la
guía. También se pueden borrar los datos del sitio desde las herramientas del navegador.

No se guardan IMEI completos, documentos, contraseñas ni información financiera.

## 10. Cómo actualizar el catálogo

Los modelos y precios aproximados se administran en:

```text
src/data/device-catalog.ts
```

Cada equipo define:

- modelo y generación;
- categoría;
- capacidad base;
- precio nuevo aproximado;
- precio usado certificado aproximado;
- valor preliminar de retoma;
- beneficio principal.

El mismo archivo también relaciona cada modelo con una fotografía local y con la página
original de Apple Newsroom. Las fotografías se almacenan dentro de `public/products/` para
evitar depender del CDN externo durante la navegación. La interfaz aplica escala de grises
mediante CSS; el archivo original conserva los colores publicados por Apple.

Los precios visibles se normalizaron a partir de referencias observadas en comercios y
especialistas colombianos. La fecha de revisión vive en `catalogPriceReference`. Cuando se
actualicen los precios también se debe actualizar esa fecha, comprobar la capacidad base y
conservar `null` cuando no exista una referencia verificable de usado certificado. En la
versión actual esto aplica a iPhone 18 Pro y iPhone 18 Pro Max.

Después de cambiar el catálogo se deben ejecutar:

```bash
npm test
npm run lint
npx tsc --noEmit
```

Los precios son referencias aproximadas, no ofertas. Antes de usarlos comercialmente se
deben confirmar contra inventario real y actualizar las advertencias visibles de la
aplicación. Las fuentes de precio se enlazan en `/catalogo`; las fotografías provienen de
Apple Newsroom. Antes de un lanzamiento comercial también se deben revisar los términos de
uso de las imágenes y marcas de Apple o sustituirlas por fotografías propias/licenciadas.

## 11. Solución de problemas comunes

### El comando `npm` no existe

Instalar o actualizar Node.js. npm se distribuye junto con Node.js.

### La aplicación no abre en el puerto 3000

Puede existir otro proceso utilizando el puerto. Iniciar el proyecto en otro puerto:

```bash
npm run dev -- -p 3001
```

Luego abrir `http://localhost:3001`.

### Los cambios de `.env.local` no aparecen

Detener el servidor con `Ctrl + C` e iniciarlo nuevamente con `npm run dev`.

### WhatsApp abre sin destinatario

Revisar `NEXT_PUBLIC_WHATSAPP_NUMBER`. Debe incluir el código del país y solo números. Por
ejemplo, para Colombia debe comenzar por `57`.

### No aparece una recomendación en `/resultado`

La recomendación se guarda en el navegador después de completar la guía. Entrar en `/guia`
y finalizar el cuestionario antes de visitar directamente `/resultado`.

### La compilación muestra un error de Turbopack relacionado con puertos

En entornos o contenedores que bloquean puertos internos, utilizar:

```bash
npm run build
```

## 12. Limitaciones actuales

- Los precios y valores de retoma son aproximados.
- El inventario no está sincronizado con proveedores.
- No existen pagos, cuentas de usuario ni panel administrativo.
- La inspección técnica de usados, reparaciones y retomas debe realizarla una persona.
- Los eventos de analítica permanecen únicamente en el navegador.
- Cambiar de navegador o borrar los datos del sitio elimina el progreso guardado.

Estas limitaciones son intencionales durante la validación del MVP.
