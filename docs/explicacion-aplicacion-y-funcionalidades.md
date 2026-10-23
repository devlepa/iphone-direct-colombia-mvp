# Explicación completa de la aplicación y sus funcionalidades

**Proyecto:** iPhone Direct Colombia  
**Fecha de corte:** 23 de octubre de 2026  
**Estado descrito:** implementación local actual del repositorio  
**Audiencia:** negocio, producto, desarrollo, pruebas y operación del catálogo

Este documento explica cómo funciona actualmente la aplicación, qué ve el usuario, cómo se
genera una recomendación, cómo se administra el inventario y cuáles son los límites del MVP.
Se basa en el código y las pruebas vigentes; cuando una capacidad es futura o está incompleta,
se indica expresamente.

Documentos relacionados:

- [Contexto maestro validado](../CONTEXTO_MAESTRO_MVP_IPHONE_DIRECT_COLOMBIA.md).
- [Guía técnica y de ejecución](guia-tecnica-y-ejecucion.md).
- [Guía de uso del catálogo e inventario CSV](guia-uso-catalogo-inventario.md).
- [Decisiones de producto](decisiones-de-producto.md).

## 1. Qué es la aplicación

iPhone Direct Colombia es un MVP de orientación comercial para ayudar a una persona a
comparar cuatro rutas:

1. comprar un iPhone nuevo sellado;
2. comprar un iPhone usado;
3. reparar el equipo actual;
4. entregar el equipo actual como parte de pago mediante retoma.

No es todavía una tienda virtual completa. La aplicación no cobra, no reserva inventario,
no confirma una reparación, no asigna una cita y no completa una compraventa. Su función
actual es recoger el contexto del usuario, aplicar reglas explícitas, presentar una
recomendación explicada y ofrecer continuidad por WhatsApp.

## 2. Estado general actual

| Área | Estado implementado |
|---|---|
| Páginas públicas | Inicio, catálogo, guía y resultado. |
| Catálogo | 23 modelos de las generaciones 13 a 18. |
| Inventario declarado | 10 unidades nuevas y 20 usadas. |
| Referencias con stock | 8 modelos con stock nuevo y 15 con stock usado. |
| Fecha más reciente del CSV | 19 de octubre de 2026. |
| Motor | Reglas determinísticas para compra, reparación y retoma. |
| Persistencia | Navegador del usuario mediante `localStorage`. |
| Contacto | Enlace de WhatsApp con mensaje prellenado. |
| Analítica | Eventos locales; no existe conexión con GA4 o un backend. |
| Operación | El stock se actualiza manualmente en el CSV. |
| Evidencia por unidad | No implementada. |
| Pagos, usuarios y administración | No implementados. |

El inventario agregado fue suministrado como inventario real. Esto no significa que el CSV
certifique individualmente batería, IMEI, piezas, condición cosmética o garantía de cada
unidad usada.

## 3. Recorrido completo del usuario

```text
Página de inicio
    ├──> Catálogo ────────────────┐
    │                             │
    └──> Guía de cuatro pasos <───┘
              │
              ├── Necesidad
              ├── Presupuesto y preferencias
              ├── Equipo actual
              └── Revisión
                     │
                     v
             Motor de recomendación
                     │
                     v
             Página de resultado
              ├── Recomendación principal
              ├── Hasta dos alternativas
              ├── Costos, razones y límites
              └── Continuar por WhatsApp
```

La navegación y el resultado dependen del mismo navegador. No existe una cuenta de usuario
ni una URL compartible para recuperar una recomendación desde otro dispositivo.

## 4. Páginas y rutas disponibles

| Ruta | Función |
|---|---|
| `/` | Presenta la propuesta, el proceso, el catálogo resumido y los criterios de transparencia. |
| `/catalogo` | Muestra los 23 modelos, precios, fotografías y stock por condición. |
| `/guia` | Ejecuta el cuestionario y genera la recomendación. |
| `/resultado` | Muestra el resultado guardado o explica por qué debe recalcularse. |

Las URL desconocidas utilizan la página 404 predeterminada de Next.js.

No existen todavía rutas independientes para:

- fichas de producto o de unidad;
- cotización;
- diagnóstico;
- retoma;
- agenda;
- privacidad, términos o garantía;
- pagos;
- administración;
- inicio de sesión.

## 5. Interfaz compartida y diseño

El archivo `src/app/layout.tsx` aplica a todas las páginas:

- idioma HTML en español;
- encabezado adherente (`sticky`);
- contenido principal;
- pie de página;
- metadatos generales del sitio.

### Encabezado

El encabezado incluye:

- logotipo oficial enlazado al inicio;
- enlace a “Cómo funciona”;
- enlace al catálogo;
- enlace a “Transparencia”;
- botón para iniciar la guía.

En pantallas pequeñas se ocultan algunos enlaces secundarios, pero catálogo y guía continúan
disponibles.

### Pie de página

El pie de página:

- recuerda que la aplicación está en validación;
- enlaza el catálogo y la sección de transparencia;
- aclara que los precios no son ofertas definitivas.

### Lenguaje visual

La interfaz utiliza:

- negro, blanco y grises;
- fotografías presentadas en escala de grises;
- titulares con tipografía serif y contenido con tipografía sans-serif;
- tarjetas redondeadas;
- fondos cuadriculados discretos;
- foco visible para navegación por teclado;
- animaciones reducidas cuando el sistema solicita menos movimiento.

Existen textos alternativos, estados `aria-pressed`, alertas con `role="alert"` y etiquetas
accesibles. Esto mejora la accesibilidad, pero no sustituye una auditoría completa de WCAG.

## 6. Página de inicio

La portada se construye con datos del catálogo generado. Se actualiza automáticamente al
sincronizar el CSV durante desarrollo; en producción requiere una nueva compilación y
despliegue.

### Hero principal

Muestra:

- la propuesta “Tu próximo iPhone debe ser un salto real”;
- el número de modelos y generaciones;
- un CTA hacia la guía;
- un CTA hacia el catálogo;
- un producto destacado con imagen y precio.

El producto destacado se elige entre los modelos con stock. Se prioriza la generación más
reciente y, dentro de ella, el precio nuevo más alto.

### Explicación del proceso

Resume el recorrido en tres momentos:

1. entender contexto, presupuesto, uso y prioridad;
2. comparar rutas compatibles;
3. entregar una recomendación explicada.

### Resumen del catálogo

Agrupa el catálogo por generación y muestra:

- cantidad de variantes;
- fotografía representativa;
- precio inicial disponible;
- condición de ese precio;
- enlace al ancla de la generación en `/catalogo`.

Si una generación tiene usados con stock, el resumen toma primero el menor precio usado. Si
no los tiene, utiliza el menor precio nuevo disponible. Cuando no hay stock, muestra un
precio de referencia.

### Transparencia y resultado esperado

La página explica que el resultado contendrá:

- una recomendación principal;
- máximo dos alternativas;
- costo bruto, retoma y desembolso neto;
- razones y supuestos;
- confirmación humana cuando sea necesaria.

También comunica que no se solicitan IMEI completos, documentos ni datos de pago.

### Límites de la portada

- No tiene búsqueda ni filtros.
- No permite seleccionar un equipo y llevar esa selección a la guía.
- Presupone que el catálogo contiene al menos una referencia.
- Utiliza la expresión “usado certificado”, aunque no existe evidencia técnica por unidad.

## 7. Catálogo

La ruta `/catalogo` agrupa los modelos por generación en orden descendente.

### Contenido de cada tarjeta

Cada modelo muestra:

- fotografía local;
- enlace a la fuente original de la imagen;
- categoría;
- capacidad base;
- característica destacada;
- precio nuevo;
- stock nuevo;
- precio usado, cuando existe;
- stock usado;
- botón “Comparar con mi iPhone”.

### Estados de stock visibles

| Valor del CSV | Texto y comportamiento |
|---:|---|
| Vacío | Stock sin registrar; el motor no lo recomienda. |
| `0` | Agotado; el motor no lo recomienda. |
| Positivo | Muestra la cantidad disponible y permite que la condición compita. |

Nuevo y usado se controlan de forma independiente. Una tarjeta puede mostrar el precio de
referencia de una condición agotada, pero el motor solo usa las condiciones con stock
positivo.

### Otros elementos del catálogo

- Navegación mediante anclas por generación.
- Fecha de verificación más reciente.
- Aviso de precios aproximados.
- Explicación de metodología.
- Enlaces generales a fuentes de mercado.
- Aviso sobre fotografías en escala de grises.
- CTA final hacia la guía.

### Límites del catálogo

- No existen filtros por precio, condición, capacidad o disponibilidad.
- No existe buscador.
- No hay ficha individual de modelo o unidad.
- El CTA no conserva el modelo desde el cual se inició la guía.
- Las fuentes generales de precio están escritas en la página; el CSV conserva la fuente de
  la fotografía, no una fuente individual del precio.
- No existe un estado diseñado para un catálogo completamente vacío.

## 8. Guía de decisión

La ruta `/guia` ejecuta un componente interactivo de cuatro pasos.

### Sesión y borrador

Al iniciar se crea un identificador de sesión con `crypto.randomUUID()` cuando está
disponible. Las respuestas se guardan en `localStorage` después de cada cambio.

Si el usuario vuelve posteriormente desde el mismo navegador, recupera las respuestas. El
paso actual no se guarda: al recargar, la guía vuelve al paso 1 aunque conserve los campos.

“Empezar de nuevo” elimina el borrador y la recomendación, crea otra sesión y vuelve al
primer paso.

### Paso 1: necesidad

El usuario elige una de estas opciones:

- comprar un equipo;
- reparar su equipo;
- entregar el equipo como parte de pago;
- comparar porque todavía no sabe qué le conviene.

Seleccionar reparación o retoma marca automáticamente que existe un equipo actual.

### Paso 2: contexto

Se recopilan:

- presupuesto máximo en COP;
- uso principal: básico, estudio, trabajo, cámara o juegos;
- prioridad: precio, garantía, rendimiento, cámara o vida útil;
- urgencia;
- aceptación de equipo usado.

Validaciones actuales:

- el presupuesto mínimo es $100.000 COP;
- el esquema final limita el presupuesto a $30.000.000 COP;
- uso, prioridad, urgencia y aceptación de usado son obligatorios.

### Paso 3: equipo actual

Si la persona tiene un equipo, la guía solicita:

- modelo;
- capacidad;
- salud de batería opcional;
- estado de pantalla;
- estado de cámaras;
- estado de carcasa;
- fallas conocidas;
- existencia de reparaciones anteriores.

El selector incluye iPhone 11, 12, todos los modelos del catálogo y “Otro iPhone”. La salud
de batería, cuando se informa, debe estar entre 1 y 100.

“No lo sé” en reparaciones anteriores aparece seleccionado inicialmente porque el valor
interno comienza en `null`. Si el objetivo es reparar o entregar en retoma, la validación
final exige un equipo actual aunque el paso permita pulsar “No tengo un equipo actual”.

### Paso 4: revisión

Antes de generar el resultado se resumen:

- objetivo;
- presupuesto;
- aceptación de usados;
- equipo actual.

El formulario valida nuevamente todos los datos con Zod, ejecuta el motor, guarda la
recomendación y navega a `/resultado`.

### Estados del formulario

- Mientras el navegador se hidrata se muestra un esqueleto de carga.
- Los errores de paso aparecen dentro del formulario.
- Si el motor no puede producir ninguna opción, el mensaje se muestra sin abandonar la guía.
- El botón final se desactiva mientras se genera la recomendación.

### Datos que todavía no influyen en la decisión

`primaryUse` y `urgency` se recopilan y validan, pero actualmente no participan en la
puntuación. Son datos preparados para reglas futuras.

## 9. Motor de recomendación

El motor se encuentra en `src/features/advisor/advisor.service.ts`. Es determinístico: con
las mismas respuestas y el mismo catálogo produce el mismo orden de opciones.

Evalúa cuatro tipos de candidato:

- compra nueva;
- compra usada;
- reparación;
- retoma con renovación.

### 9.1 Filtros obligatorios para productos

Antes de puntuar una compra, el producto debe cumplir:

1. `available` en verdadero;
2. stock registrado y mayor que cero;
3. representar una mejora cuando existe un equipo actual reconocido;
4. si es usado, haber sido aceptado por el usuario;
5. si es usado, cumplir el umbral interno de batería.

El quinto filtro no es confiable todavía: el adaptador asigna 90 % a todos los usados y el
CSV no contiene la batería real de una unidad.

### 9.2 Jerarquía de modelos

El motor utiliza esta escala interna:

| Nivel | Rango |
|---|---:|
| `VALUE` | 0 |
| `MINI` | 1 |
| `STANDARD` | 2 |
| `PLUS` y `AIR` | 3 |
| `PRO` | 4 |
| `PRO_MAX` | 5 |

Para un equipo reconocido:

- nunca acepta una generación anterior;
- en la misma generación exige una categoría superior;
- en una generación posterior exige mantener o subir de categoría.

Por ejemplo, para un iPhone 15 Pro Max solo se consideran modelos Pro Max de una generación
posterior. El salto suma 6 puntos por generación y 3 por cada nivel de categoría ascendido.

### 9.3 Puntuación general

| Regla | Puntos |
|---|---:|
| Dentro del presupuesto | `+30` |
| Sobre el presupuesto | `-30` |
| Coincide con el objetivo | `+40` |
| Coincide con la prioridad | `+20` |
| Producto con `warrantyDays > 0`, hoy prefijado por código | `+15` |
| Candidato usado cuando el usuario acepta esa condición | `+8` |
| Reparación económica | `+20` |
| Retoma reduce el desembolso | `+10` |
| Diagnóstico pendiente | `-10` |

El presupuesto no es un filtro absoluto. Una opción puede superar el presupuesto y aun así
ser recomendada si acumula más puntos; el resultado debe explicar esa brecha.

### 9.4 Interpretación de prioridades

| Prioridad elegida | Regla actual |
|---|---|
| Precio | Favorece producto usado. |
| Garantía | Favorece una garantía interna de 365 días. |
| Vida útil | Favorece producto nuevo de generación 17 o posterior. |
| Cámara | Favorece Pro o Pro Max. |
| Rendimiento | Favorece Pro o Pro Max. |

La garantía utilizada en la puntuación está fijada por código y no proviene de una política
comercial registrada en el CSV.

### 9.5 Candidato de compra

Cada condición disponible se convierte en un candidato independiente. El candidato contiene:

- condición nueva o usada;
- modelo y capacidad;
- precio;
- costo neto;
- una razón textual con la cantidad de stock;
- hasta cinco razones, que pueden incluir presupuesto, disponibilidad, objetivo, prioridad,
  garantía y mejora;
- advertencia de que la información debe confirmarse.

La puntuación aplica todas las reglas aunque una razón situada después del límite de cinco no
alcance a mostrarse.

### 9.6 Candidato de reparación

Si existe equipo actual, el motor puede crear una opción de reparación.

Costos preliminares actuales:

| Falla | Estimado |
|---|---:|
| Batería | $280.000 COP |
| Pantalla | $520.000 COP |
| Cámara | $430.000 COP |
| Carga | $250.000 COP |

Si hay varias fallas reconocidas, suma los estimados. Si no hay ninguna coincidencia —incluido
el caso sin fallas o con “otra falla”— utiliza $180.000 COP por defecto.

Compara el costo con el producto disponible más barato. Una reparación se considera
económica cuando no supera el 30 % de ese reemplazo. Siempre se marca para revisión humana.
La referencia más barata se elige sin aplicar aceptación de usados, mejora significativa ni
el umbral de batería; por eso puede ser un producto que no entraría en los candidatos de
compra del mismo usuario.

### 9.7 Candidato de retoma

La retoma necesita una coincidencia exacta de modelo y capacidad. Parte del valor del CSV o
del catálogo auxiliar y aplica estas reducciones:

| Condición declarada | Reducción |
|---|---:|
| Pantalla dañada | 20 % |
| Cámara dañada | 15 % |
| Carcasa desgastada | 10 % |
| Carcasa dañada | 20 % |
| Batería inferior a 80 % | 10 % |
| Reparaciones anteriores | 5 % |

El valor se redondea al múltiplo de $50.000 COP más cercano y se descuenta del candidato de
compra con menor costo bruto. Toda retoma exige inspección.

El CSV aporta retomas para los modelos actuales. El archivo auxiliar contiene iPhone 11, 12,
13 y 14; en 13 y 14 prevalece el valor generado desde el CSV porque se busca primero. Las
variantes antiguas que no coincidan exactamente por modelo y capacidad no generan retoma.

### 9.8 Orden y salida

Los candidatos se ordenan por:

1. mayor puntuación;
2. menor costo neto cuando existe empate.

El resultado contiene:

- una recomendación principal;
- máximo dos alternativas;
- razones;
- supuestos;
- costo bruto;
- retoma estimada;
- desembolso neto;
- indicador de revisión humana.

Ese es el modelo completo de datos. En pantalla, las alternativas secundarias muestran solo
el costo neto, las primeras dos razones y el CTA de WhatsApp; no presentan costo bruto,
retoma, supuestos ni el indicador de revisión humana.

Si no existe ningún candidato, se produce un error indicando que no hay inventario compatible.

## 10. Página de resultado

La ruta `/resultado` interpreta la recomendación almacenada y contempla varios estados.

### Carga

Mientras React termina la hidratación del navegador se muestra un esqueleto. La lectura de
`localStorage` es síncrona y ocurre al inicializar el estado del componente.

### Sin recomendación

Si no existe un registro guardado, explica que primero debe completarse la guía y ofrece un
enlace hacia `/guia`.

### Registro inválido

Si el registro no puede validarse o recalcularse, no muestra información posiblemente
obsoleta. Informa que cambió el catálogo y ofrece repetir el cálculo.

### Catálogo actualizado

La recomendación guarda una revisión del catálogo. Cuando esa revisión cambia, la página:

1. valida las respuestas guardadas;
2. vuelve a ejecutar el motor;
3. guarda el resultado actualizado;
4. avisa que precios, fotos o disponibilidad fueron recalculados.

Si el equipo recomendado quedó agotado y no existe una alternativa válida, el resultado se
invalida.

### Resultado vigente

La vista presenta:

- identificador abreviado de sesión;
- tipo y título de la recomendación;
- fotografía cuando existe un producto asociado;
- indicador de revisión humana;
- costo bruto, retoma y costo neto;
- comparación entre equipo actual y recomendado cuando existe un producto asociado;
- razones;
- supuestos y límites;
- hasta dos alternativas;
- CTA de WhatsApp;
- descargo de responsabilidad.

La comparación detallada solo aparece si tanto el equipo actual como el recomendado existen
en `deviceCatalog`. Para iPhone 11, 12, “Otro iPhone” o una reparación puede no aparecer
completa. Además, muestra la capacidad base registrada en el catálogo, no necesariamente la
capacidad que el usuario declaró para su equipo.

## 11. Catálogo e inventario CSV

La fuente editable es:

```text
data/catalogo-inventario.csv
```

Su contrato tiene 15 columnas:

| Campo | Función |
|---|---|
| `modelo` | Nombre comercial único. |
| `generacion` | Generación numérica. |
| `nivel` | Rango interno del modelo. |
| `categoria` | Categoría visible. |
| `capacidad_gb` | Capacidad base. |
| `precio_nuevo_cop` | Precio nuevo aproximado. |
| `stock_nuevo` | Cantidad nueva disponible. |
| `precio_usado_certificado_cop` | Precio usado bajo el nombre técnico heredado. |
| `stock_usado_certificado` | Cantidad usada agregada. |
| `valor_retoma_cop` | Valor base orientativo de retoma. |
| `caracteristica_destacada` | Texto corto del modelo. |
| `ruta_imagen` | Archivo local dentro de `/products/`. |
| `texto_alternativo_imagen` | Descripción accesible. |
| `fuente_imagen` | URL HTTPS de la fotografía. |
| `fecha_verificacion` | Fecha de revisión de la fila. |

Las palabras `usado_certificado` forman parte del contrato actual. No deben interpretarse
como prueba de certificación individual.

### Flujo de datos

```text
catalogo-inventario.csv
        │
        v
scripts/sync-catalog-inventory.mjs
        │ validación y generación
        v
src/data/device-inventory.generated.ts
        │
        ├──> Inicio
        ├──> Catálogo
        ├──> Productos del recomendador
        └──> Valores base de retoma
```

El archivo generado no se edita manualmente.

### Validaciones del sincronizador

El proceso comprueba:

- encabezados y orden exactos;
- 15 columnas por fila;
- modelos únicos;
- niveles permitidos;
- enteros sin símbolos monetarios;
- stock no negativo;
- precio usado cuando existe stock usado positivo;
- fechas ISO reales;
- URL HTTPS para la fuente;
- ruta segura dentro de `public/products/`;
- extensión de imagen admitida;
- existencia física del archivo de imagen.

La escritura del TypeScript generado es determinística y atómica: primero utiliza un archivo
temporal y luego reemplaza el destino.

### Actualización durante desarrollo

`npm run dev`:

1. sincroniza el CSV antes de iniciar Next.js;
2. observa cambios cada 500 ms;
3. espera brevemente para agrupar guardados consecutivos;
4. regenera el catálogo cuando el archivo es válido;
5. conserva la última versión válida si un cambio posterior contiene errores.

### Actualización en producción

El navegador no lee el CSV directamente. Después de modificarlo hay que ejecutar una nueva
compilación y desplegarla. El CSV tampoco descuenta existencias automáticamente después de
una venta: el responsable debe editar el stock.

## 12. Productos y datos auxiliares

El adaptador de `src/data/device-catalog.ts` transforma cada fila:

- siempre crea una variante nueva;
- crea una variante usada si existe precio usado;
- deriva `available` exclusivamente de un stock positivo;
- crea un identificador a partir del modelo;
- construye el catálogo de retoma.

Los datos auxiliares son:

- `src/data/repair-options.json`: costos preliminares de reparación;
- `src/data/trade-in-values.json`: valores de retoma para modelos antiguos.

Cuando el mismo modelo y capacidad existen en el CSV y en el archivo auxiliar, la búsqueda
encuentra primero el valor generado desde el CSV.

## 13. Persistencia local y vigencia del resultado

La aplicación usa tres claves en `localStorage`:

| Clave | Contenido |
|---|---|
| `iphone-direct:advisor-draft:v1` | Respuestas de la guía. |
| `iphone-direct:recommendation:v1` | Entrada, resultado, fecha y revisión del catálogo. |
| `iphone-direct:analytics:v1` | Eventos de comportamiento. |

No existe vencimiento automático. “Empezar de nuevo” elimina el borrador y la recomendación,
pero conserva los eventos analíticos. Estos permanecen hasta que el usuario borre el
almacenamiento del sitio o el navegador los elimine.

Las lecturas toleran datos JSON inválidos y devuelven `null`. Las escrituras no capturan
errores de cuota, bloqueo o indisponibilidad de `localStorage`, y la interfaz no muestra un
estado específico si una escritura falla.

La revisión del catálogo es un identificador determinístico construido con:

- inventario completo, incluidas fotos y metadatos;
- opciones de reparación;
- valores de retoma.

Un cambio en esos datos obliga a recalcular el resultado. La revisión no incluye el código
del algoritmo ni `BUSINESS_RULES`; modificar únicamente una regla podría dejar un resultado
anterior marcado como vigente.

## 14. WhatsApp

La aplicación utiliza `NEXT_PUBLIC_WHATSAPP_NUMBER` para construir una URL `wa.me`.

El mensaje incluye:

- saludo;
- tipo de recomendación;
- identificador completo de sesión;
- solicitud de continuar con un asesor.

No incluye modelo, precio, respuestas ni datos directamente identificativos; sí incluye el
identificador de sesión. Si el número configurado tiene menos de diez dígitos válidos, abre
WhatsApp sin destinatario específico.

Al pulsar el CTA principal se registra:

- clic de WhatsApp;
- solicitud de diagnóstico si la ruta es reparación;
- solicitud de retoma si corresponde;
- intención de compra para nuevo o usado.

Las alternativas solo registran selección y clic de WhatsApp.

Limitación operativa: el asesor puede ver el identificador recibido, pero no usarlo para
recuperar respuestas o resultados porque la sesión existe únicamente en el navegador del
usuario y no hay backend o CRM compartido.

## 15. Analítica local

La aplicación conserva como máximo 100 eventos. Elimina duplicados inmediatos del mismo
evento y sesión cuando ocurren con menos de un segundo de diferencia.

Eventos emitidos actualmente:

| Evento | Momento |
|---|---|
| `advisor_started` | Se inicia o reinicia una sesión. |
| `advisor_step_completed` | Se supera un paso y al enviar el paso final. |
| `recommendation_generated` | El motor produce un resultado. |
| `recommendation_viewed` | Se presenta un resultado vigente. |
| `alternative_selected` | Se consulta una alternativa por WhatsApp. |
| `whatsapp_clicked` | Se abre un CTA de WhatsApp. |
| `diagnosis_requested` | El CTA principal corresponde a reparación. |
| `trade_in_requested` | El CTA principal corresponde a retoma. |
| `purchase_intent_submitted` | El CTA principal corresponde a compra. |

`advisor_abandoned` está definido, pero no se emite. La intención de compra representa un
clic hacia WhatsApp, no una compra ni un formulario confirmado.

No existen todavía:

- GA4;
- envío de eventos a servidor;
- UTM persistentes;
- exportación de eventos;
- consentimiento analítico;
- conciliación con ventas pagadas.

## 16. Tecnologías utilizadas

| Tecnología | Uso real |
|---|---|
| Next.js 16.4.1 | App Router, páginas, metadatos, compilación y optimización de imágenes. |
| React 19.3 | Componentes e interacción del formulario y resultado. |
| React DOM 19.3 | Renderizado de React en el navegador. |
| TypeScript 5 | Tipos estrictos para dominio, catálogo y motor. |
| Tailwind CSS 4 | Diseño adaptable y sistema visual. |
| PostCSS y `@tailwindcss/postcss` | Procesamiento de estilos de Tailwind. |
| Zod 4 | Validación de formularios, catálogo auxiliar y registros guardados. |
| Node.js 20.9 o posterior | Ejecución del proyecto, scripts del inventario y pruebas. |
| npm | Instalación de dependencias y ejecución de comandos. |
| Node Test Runner | Pruebas automatizadas. |
| `tsx` | Ejecución de pruebas TypeScript. |
| ESLint 9 | Revisión estática con reglas de Next.js y TypeScript. |
| CSV y JSON | Inventario operativo y datos auxiliares de reparación/retoma. |
| Módulos ESM de Node | Sincronización y observación del inventario. |
| `localStorage` | Persistencia local del MVP. |
| Web Crypto | Creación de identificadores de sesión. |
| `Intl.NumberFormat` | Formato de pesos colombianos. |
| WhatsApp `wa.me` | Continuidad comercial. |

La aplicación no utiliza base de datos, API propia, autenticación, pasarela de pagos, CRM o
servicio externo de analítica.

La configuración habilita `cacheComponents` y `partialPrefetching`. Next.js usa Turbopack
por defecto durante desarrollo; existe una compilación alternativa con Turbopack y el
comando principal de producción compila con Webpack.

## 17. Variables de entorno

| Variable | Estado |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Utilizada para el enlace de WhatsApp. |
| `NEXT_PUBLIC_APP_URL` | Reservada; el código no la utiliza. |
| `NEXT_PUBLIC_ENABLE_TEST_DATA` | Reservada; el código no la utiliza. |

Las variables `NEXT_PUBLIC_` son visibles en el navegador y no deben contener secretos.

## 18. Comandos de operación y desarrollo

| Comando | Función |
|---|---|
| `npm ci` | Instala exactamente las dependencias bloqueadas. |
| `npm run dev` | Sincroniza el inventario, inicia Next.js y observa el CSV. |
| `npm run catalog:sync` | Valida el CSV y regenera TypeScript. |
| `npm run catalog:check` | Comprueba sincronía sin modificar archivos. |
| `npm test` | Sincroniza y ejecuta las pruebas. |
| `npm run lint` | Ejecuta ESLint. |
| `npx tsc --noEmit` | Comprueba TypeScript explícitamente. |
| `npm run build` | Sincroniza y compila producción con Webpack. |
| `npm run build:turbopack` | Compila producción con Turbopack. |
| `npm start` | Sirve una compilación existente. |

No existe un script llamado `typecheck`, configuración de CI ni prueba E2E con Playwright.

## 19. Pruebas y controles de calidad

La suite actual tiene 36 pruebas que cubren principalmente:

- parser CSV con comas, comillas y saltos de línea;
- contrato de encabezados;
- duplicados;
- coherencia de precio y stock usado;
- seguridad y existencia de imágenes;
- generación determinística;
- sincronía del CSV real;
- stock nuevo y usado independiente;
- exclusión de stock vacío o agotado;
- rechazo de usado cuando el usuario no lo acepta;
- recomendación para iPhone 15 Pro Max;
- reparación y retoma;
- entradas incompletas;
- actualización de resultados cuando cambia precio, stock o foto;
- invalidación cuando el producto se agota.

Los controles habituales son:

```bash
npm run catalog:check
npm test
npm run lint
npx tsc --noEmit
npm run build
```

No existen pruebas de navegador, componentes, accesibilidad automatizada ni E2E.

## 20. Privacidad y seguridad actuales

Medidas existentes:

- no se solicita IMEI completo;
- no se solicitan documentos de identidad;
- no se solicitan datos de pago;
- el mensaje de WhatsApp contiene información mínima;
- las fuentes externas se abren con protección `noreferrer`;
- las rutas de imagen del CSV se limitan a `public/products/`;
- el generador rechaza intentos de salir de esa carpeta;
- no hay secretos almacenados en el repositorio mediante variables privadas.

Antes de una publicación comercial se deben revisar los derechos de uso de las fotografías
y marcas de Apple, o sustituir el material por imágenes propias o licenciadas.

Límites:

- no existe aviso o página de privacidad independiente;
- no hay consentimiento formal;
- los datos locales no tienen caducidad;
- no existe exportación ni un control para eliminar todos los datos locales; “Empezar de
  nuevo” borra borrador y recomendación, pero conserva la analítica local;
- una variable `NEXT_PUBLIC_` nunca debe usarse para secretos.

## 21. Limitaciones y riesgos conocidos

### Evidencia técnica no respaldada

El adaptador asigna actualmente:

- `imeiVerified: true` a todos los productos;
- 365 días de garantía a nuevos;
- 120 días de garantía a usados;
- 90 % de batería a usados;
- una lista fija de componentes revisados;
- `isTestData: true` a productos, retomas y opciones de reparación.

Estos valores no provienen del CSV ni de una ficha individual. No deben presentarse como
evidencia real de una unidad.

### Modelos iPhone 11 y 12

El selector permite declarar iPhone 11, 12 y variantes, pero esos equipos no existen en el
catálogo de características usado para comparar niveles. Cuando el motor no reconoce el
modelo actual, considera cualquier candidato como posible mejora. Esto puede permitir, por
ejemplo, recomendar un iPhone 13 de menor categoría frente a un iPhone 12 Pro Max.

### Reparación sin falla declarada

Todo usuario con equipo actual puede recibir una alternativa de reparación. Sin una falla
reconocida, el motor utiliza $180.000 COP. Esa cifra puede alterar la recomendación aunque no
exista un problema declarado.

### El presupuesto no es un filtro estricto

Superar el presupuesto resta puntos, pero no elimina la opción. Una recomendación puede
quedar por encima del monto indicado.

### Campos todavía sin efecto

- Uso principal no cambia la puntuación.
- Urgencia no cambia la puntuación.
- Capacidad del equipo actual se usa principalmente para una retoma exacta.
- Estados y batería afectan retoma, pero no la compatibilidad de compra.

### Stock manual

- No hay reserva.
- No hay descuento automático después de una venta.
- Dos usuarios podrían ver simultáneamente la última unidad.
- Editar el CSV en producción requiere recompilar y desplegar.

### Comunicación y medición

- El resultado no es compartible.
- El asesor ve el ID de sesión, pero no puede recuperar con él las respuestas o el resultado.
- Los eventos no salen del navegador.
- No existe atribución UTM.
- Un clic en WhatsApp no demuestra compra.

## 22. Funcionalidades planificadas pero no implementadas

- Evidencia e inventario por unidad.
- Ficha individual de producto.
- Buscador y filtros del catálogo.
- Formularios de compra, diagnóstico y retoma.
- Persistencia de UTM.
- Aviso de privacidad y consentimiento.
- Agenda para el local.
- Backend o CRM para leads.
- Analítica externa y conciliación de operaciones.
- Panel administrativo.
- Descuento y reserva transaccional de stock.
- Pagos y financiación.
- Autenticación.
- Consulta automática de IMEI.
- Pruebas E2E.

Estas capacidades pertenecen al alcance futuro y no deben comunicarse como disponibles.

## 23. Mapa de archivos principales

```text
data/catalogo-inventario.csv
    Fuente editable de modelos, precios, fotos y stock

scripts/sync-catalog-inventory.mjs
    Validador y generador del catálogo

scripts/dev-with-catalog.mjs
    Observador del CSV durante desarrollo

src/data/device-inventory.generated.ts
    Salida automática; no editar

src/data/device-catalog.ts
    Adaptación del inventario a productos, imágenes, retomas y mejoras

src/app/page.tsx
    Inicio

src/app/catalogo/page.tsx
    Catálogo

src/components/advisor/advisor-form.tsx
    Guía de cuatro pasos

src/features/advisor/advisor.schema.ts
    Validación Zod

src/features/advisor/advisor.service.ts
    Motor de recomendación

src/config/business-rules.ts
    Umbrales y puntuaciones

src/features/advisor/recommendation-record.ts
    Validación y recálculo de resultados guardados

src/components/comparison/result-view.tsx
    Vista del resultado

src/lib/storage.ts
    Persistencia local

src/lib/analytics.ts
    Eventos locales

src/lib/whatsapp.ts
    Enlace y mensaje de WhatsApp
```

## 24. Resumen operativo

Para administrar el catálogo:

1. editar `data/catalogo-inventario.csv`;
2. actualizar precio, stock, imagen o fecha;
3. ejecutar `npm run catalog:sync`, salvo que `npm run dev` ya lo haya hecho;
4. ejecutar `npm run catalog:check`;
5. ejecutar pruebas y compilación;
6. desplegar nuevamente si se trata de producción;
7. descontar manualmente el stock después de una venta confirmada.

Para interpretar una recomendación:

1. confirmar que el producto conserva stock;
2. revisar si el costo supera el presupuesto;
3. tratar reparación y retoma como estimaciones;
4. no asumir garantía, IMEI o batería sin ficha de unidad;
5. confirmar la decisión con inspección y asesoría humana.

## 25. Conclusión

La aplicación ya ofrece un recorrido funcional completo desde el descubrimiento hasta una
recomendación y un contacto por WhatsApp. Su fortaleza es la combinación de inventario
administrable, reglas auditables, explicaciones visibles y recálculo cuando cambia el
catálogo.

El siguiente nivel de madurez requiere retirar la evidencia técnica prefijada, corregir las
reglas de modelos antiguos y reparación, añadir persistencia operativa y conectar la acción
del usuario con un proceso comercial verificable. Hasta entonces, el producto debe
presentarse como una guía orientativa en validación, no como una tienda o certificadora
automática.
