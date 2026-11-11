# Guía técnica y de ejecución

Este documento explica las tecnologías utilizadas en **DirectPhone Co**, la
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
catálogo y el inventario se administran en un CSV versionado dentro del repositorio, las
reglas se encuentran en el código y el progreso del visitante se almacena temporalmente
en su navegador.

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

### Catálogo e inventario

| Tecnología | Uso |
|---|---|
| CSV UTF-8 | Fuente de verdad editable de modelos, características, precios, fotografías y stock. |
| Scripts ECMAScript Modules de Node.js | Interpretan y validan el CSV y generan datos TypeScript determinísticos. |
| `fs.watchFile` de Node.js | Observa el CSV durante `npm run dev` y lo vuelve a sincronizar al guardarlo. |
| Datos TypeScript generados | Permiten que la interfaz y el motor de recomendación consuman un catálogo tipado. |

### Validación, pruebas y calidad

| Tecnología | Versión del proyecto | Uso |
|---|---:|---|
| Zod | `4.6.7` o compatible | Validación de formularios, productos, reparaciones y retomas. |
| Node Test Runner | Incluido en Node.js | Ejecución de pruebas unitarias del motor de recomendación y del sincronizador de inventario. |
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
data/
└── catalogo-inventario.csv       Fuente de verdad del catálogo e inventario
public/
├── brand/                       Logo de la marca
└── products/                    Fotografías locales de los equipos
scripts/
├── dev-with-catalog.mjs         Observador del CSV y servidor de desarrollo
└── sync-catalog-inventory.mjs   Analizador, validador y generador
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
├── data/                      Adaptador del catálogo y archivo generado
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

El flujo del catálogo es independiente y determinístico:

```text
data/catalogo-inventario.csv
  → validación y normalización
  → src/data/device-inventory.generated.ts
  → src/data/device-catalog.ts
  → catálogo visible y opciones del motor de recomendación
```

### Archivos importantes

| Archivo | Responsabilidad |
|---|---|
| `data/catalogo-inventario.csv` | Fuente de verdad de modelos, categorías, capacidades, precios, fotos y existencias. |
| `scripts/sync-catalog-inventory.mjs` | Analiza y valida el CSV y genera el inventario tipado. |
| `scripts/dev-with-catalog.mjs` | Sincroniza el inventario, observa cambios e inicia Next.js en desarrollo. |
| `src/data/device-inventory.generated.ts` | Resultado automático de la sincronización. No se edita manualmente. |
| `src/data/device-catalog.ts` | Adapta el inventario generado a productos, retomas y recomendaciones. |
| `src/features/advisor/advisor.service.ts` | Puntuación, filtros y selección de la recomendación. |
| `src/features/advisor/advisor.schema.ts` | Validación de los datos de entrada con Zod. |
| `src/config/business-rules.ts` | Umbrales comerciales configurables. |
| `src/components/advisor/advisor-form.tsx` | Cuestionario de cuatro pasos. |
| `src/components/comparison/result-view.tsx` | Explicación del resultado y costos. |
| `src/lib/storage.ts` | Lectura y escritura segura en `localStorage`. |
| `src/lib/whatsapp.ts` | Construcción del enlace de WhatsApp. |
| `.env.example` | Plantilla de configuración local. |
| `public/products/` | Fotografías de producto descargadas para servirlas localmente. |
| `public/brand/` | Logo suministrado por DirectPhone Co. |

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
cd /ruta/al/proyecto/directphone-co-mvp
```

Si el proyecto se obtuvo desde GitHub, primero se debe clonar y luego entrar a la carpeta:

```bash
git clone URL_DEL_REPOSITORIO
cd directphone-co-mvp
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
| `NEXT_PUBLIC_ENABLE_TEST_DATA` | Bandera reservada que el código todavía no lee. No cambia ni invalida el inventario real del CSV; cualquier evidencia demostrativa futura debe vivir separada y quedar rotulada. |

Las variables que comienzan por `NEXT_PUBLIC_` quedan disponibles en el navegador. No se
deben guardar contraseñas, tokens privados ni otros secretos en ellas.

El archivo `.env.local` está excluido de Git y no debe subirse al repositorio.

### Paso 4. Sincronizar y comprobar el inventario

```bash
npm run catalog:sync
npm run catalog:check
```

El primer comando valida `data/catalogo-inventario.csv` y genera
`src/data/device-inventory.generated.ts`. El segundo comprueba que los datos sean válidos
y que ambos archivos estén sincronizados, sin escribir cambios.

### Paso 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Este comando realiza otra sincronización inicial, inicia Next.js y observa el CSV. Si se
guarda un cambio válido en `data/catalogo-inventario.csv`, el generador actualiza los datos
tipados y Next.js refresca la aplicación. Si el cambio es inválido, la terminal muestra el
problema y se conserva la última versión válida.

Las recomendaciones almacenadas incluyen una revisión del catálogo. Al abrir `/resultado`
después de cambiar precio, foto o stock, la aplicación recalcula el resultado con las
respuestas guardadas; nunca presenta una recomendación anterior como si siguiera vigente.

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

### Paso 6. Probar el recorrido principal

1. Abrir la página de inicio.
2. Entrar en **Iniciar guía**.
3. Seleccionar el objetivo, presupuesto, uso y prioridad.
4. Indicar el modelo del iPhone actual, si existe.
5. Revisar y generar la recomendación.
6. Confirmar que el resultado explica el salto respecto al equipo actual.
7. Probar el botón de WhatsApp y verificar el número configurado.

### Paso 7. Detener el servidor

Volver a la terminal y presionar:

```text
Ctrl + C
```

## 6. Comandos de calidad

### Comprobar el catálogo generado

```bash
npm run catalog:check
```

La comprobación falla si el CSV tiene encabezados o valores incorrectos, modelos
duplicados, rutas de imagen inseguras o inexistentes, o si el archivo TypeScript generado
no corresponde con el contenido actual del CSV.

### Ejecutar las pruebas unitarias

```bash
npm test
```

Estas pruebas verifican, entre otros casos:

- análisis, validación y generación segura del inventario CSV;
- selección entre equipo nuevo y usado certificado;
- reparación y retoma;
- manejo del presupuesto y de escenarios sin coincidencias; actualmente el motor penaliza
  las opciones que lo exceden, pero todavía no siempre las descarta;
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

Antes de entregar cambios se recomienda ejecutar `npm run catalog:check` y los tres
comandos de calidad anteriores.

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

Ambas variantes ejecutan primero `npm run catalog:sync`, por lo que una compilación nunca
usa deliberadamente un catálogo generado que esté desactualizado. Si el CSV es inválido,
la compilación se detiene antes de generar la aplicación.

### Paso 2. Iniciar la versión compilada

```bash
npm start
```

Abrir nuevamente `http://localhost:3000`.

El comando `npm start` requiere que la compilación del paso anterior haya finalizado
correctamente.

En un entorno publicado, cambiar el CSV no modifica una compilación que ya está desplegada.
Después de actualizar el inventario se debe ejecutar una nueva compilación y volver a
desplegarla. La actualización automática al guardar existe únicamente mientras
`npm run dev` está activo.

## 8. Scripts disponibles

| Comando | Acción |
|---|---|
| `npm run catalog:sync` | Valida el CSV y actualiza el inventario TypeScript generado. |
| `npm run catalog:check` | Valida el CSV y comprueba la sincronización sin escribir archivos. |
| `npm run dev` | Sincroniza el catálogo, inicia Next.js y observa cambios del CSV. |
| `npm run build` | Sincroniza el catálogo y genera la compilación de producción con Webpack. |
| `npm run build:turbopack` | Sincroniza el catálogo y genera la compilación alternativa con Turbopack. |
| `npm start` | Ejecuta la compilación de producción. |
| `npm run lint` | Revisa el código con ESLint. |
| `npm test` | Sincroniza el catálogo y ejecuta sus pruebas junto con las del motor de recomendación. |

## 9. Datos y persistencia

La versión actual no utiliza una base de datos.

Los datos se distribuyen así:

- catálogo, precios, imágenes referenciadas y stock: `data/catalogo-inventario.csv`;
- inventario normalizado para la aplicación: `src/data/device-inventory.generated.ts`, generado automáticamente;
- adaptación a productos y retomas: `src/data/device-catalog.ts`;
- reglas de negocio: `src/config/business-rules.ts`;
- respuestas y resultado: `localStorage` del navegador;
- eventos de validación: máximo de 100 eventos recientes en `localStorage`;
- logo y otros recursos públicos: carpeta `public/`.

Para reiniciar completamente una prueba se puede pulsar **Empezar de nuevo** dentro de la
guía. También se pueden borrar los datos del sitio desde las herramientas del navegador.

No se guardan IMEI completos, documentos, contraseñas ni información financiera.

## 10. Cómo actualizar el catálogo

Los modelos, características, precios, fotografías y existencias se administran únicamente
en:

```text
data/catalogo-inventario.csv
```

Para el procedimiento operativo, ejemplos de stock y solución de errores consulta la
[guía de uso del catálogo e inventario CSV](guia-uso-catalogo-inventario.md).

`src/data/device-inventory.generated.ts` no se debe editar manualmente, porque el
sincronizador lo reemplaza con el resultado del CSV. Cada fila del inventario define:

- modelo y generación;
- nivel y categoría;
- capacidad base;
- precio nuevo aproximado;
- precio usado certificado aproximado;
- stock nuevo y usado certificado;
- valor preliminar de retoma;
- característica principal;
- ruta, texto alternativo y fuente de la foto;
- fecha de verificación.

Los nombres `precio_usado_certificado_cop` y `stock_usado_certificado` pertenecen al
contrato técnico actual. El CSV solo confirma inventario agregado; no contiene evidencia de
batería, IMEI, componentes o garantía de una unidad, que debe permanecer pendiente hasta su
inspección documentada.

Los valores monetarios se escriben como enteros en pesos colombianos, sin signo `$`, puntos
ni separadores. Una celda vacía en `precio_usado_certificado_cop` significa que todavía no
existe una referencia para esa condición.

Las columnas de stock diferencian tres estados:

| Valor | Interpretación |
|---:|---|
| Celda vacía | Stock sin registrar; la condición se excluye de todas las recomendaciones. |
| `0` | Agotado; la condición se excluye de todas las recomendaciones. |
| Entero positivo | Número de unidades disponibles; la condición puede participar en las recomendaciones. |

`stock_nuevo` y `stock_usado_certificado` son independientes. Para ofrecer un modelo solo
de segunda se configura `stock_nuevo` en `0` y un valor positivo en
`stock_usado_certificado`. Para ofrecerlo únicamente nuevo se hace lo contrario. Cuando
ambos valores son `0` o están vacíos, el modelo puede mantenerse como referencia visual,
pero no entra en ninguna recomendación de compra o retoma.

El archivo vigente ya contiene las cantidades reales suministradas para cada condición. Se
deben descontar manualmente en el CSV después de cada venta. Al guardar `0`, la condición
agotada deja de recomendarse; una celda vacía indica stock sin registrar y también se
excluye del motor.

Para cambiar una foto se debe copiar primero el archivo a `public/products/` y después
escribir su ruta pública en `ruta_imagen`, por ejemplo `/products/iphone-15-pro.jpg`. La
ruta debe apuntar a un archivo existente con extensión `.jpg`, `.jpeg`, `.png`, `.webp` o
`.avif`. `fuente_imagen` conserva la URL HTTPS de origen y `texto_alternativo_imagen`
describe la fotografía para accesibilidad. Al sustituir una foto se recomienda usar un
nombre nuevo y actualizar `ruta_imagen`, para que la caché no conserve la versión anterior.

Después de cambiar un precio se debe actualizar también `fecha_verificacion` con formato
`AAAA-MM-DD`. Si un texto incluye comas, la celda se debe encerrar entre comillas dobles.
Los encabezados no se deben renombrar ni reordenar y cada modelo debe ser único.

Con el servidor de desarrollo activo basta con guardar el CSV: el observador ejecuta la
sincronización y Next.js refleja el cambio. Fuera de ese flujo se debe ejecutar:

```bash
npm run catalog:sync
npm run catalog:check
```

Después conviene ejecutar las validaciones generales:

```bash
npm test
npm run lint
npx tsc --noEmit
```

Para publicar cualquier cambio del CSV se requiere volver a ejecutar `npm run build` y
desplegar la compilación resultante. El navegador no consulta ni modifica el CSV en tiempo
real en producción.

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

### Un cambio del CSV no aparece o muestra un error

Revisar el mensaje `[inventario]` de la terminal y ejecutar:

```bash
npm run catalog:sync
npm run catalog:check
```

El mensaje identifica la fila y la columna inválidas. También se debe comprobar que toda
`ruta_imagen` comience por `/products/` y corresponda a un archivo existente dentro de
`public/products/`. El generador conserva la última versión válida si un cambio guardado
durante el desarrollo no supera la validación.

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
- El inventario se gestiona manualmente mediante CSV; no está sincronizado con proveedores ni es multiusuario.
- No existen pagos, cuentas de usuario ni panel administrativo.
- La inspección técnica de usados, reparaciones y retomas debe realizarla una persona.
- Los eventos de analítica permanecen únicamente en el navegador.
- Cambiar de navegador o borrar los datos del sitio elimina el progreso guardado.

Estas limitaciones son intencionales durante la validación del MVP.
