# Contexto maestro validado del MVP de iPhone Direct Colombia

**Fecha de corte:** 22 de octubre de 2026  
**Versión integrada:** fusiona el contexto maestro del 20 de octubre con el documento
`readme_contexto_general_proyecto.md` suministrado el 22 de octubre de 2026.  
**Uso previsto:** referencia interna de negocio, producto y desarrollo del repositorio local.  
**Proyecto:** iPhone Direct Colombia.  
**Equipo:** Juan Esteban León Parra y Sergio Molina.

> Este documento consolida contexto y criterios del proyecto. No reemplaza las solicitudes
> explícitas del usuario, el inventario vigente, el código ni sus pruebas. Sus cifras
> financieras, estrategia y metas de adquisición son información interna y no deben
> publicarse automáticamente en la interfaz.

## 1. Fuentes de verdad y principios de implementación

Antes de modificar el repositorio se debe identificar si el dato pertenece a operación,
catálogo, código, investigación o documentación. La precedencia es:

1. Evidencia operativa confirmada por los responsables: inventario físico conciliado,
   facturas, órdenes, contratos y cotizaciones aceptadas.
2. `data/catalogo-inventario.csv`: modelos, precios visibles, stock agregado, retoma
   orientativa, imágenes y fecha de verificación que consume la aplicación.
3. Código y pruebas: fuente del estado técnico realmente implementado.
4. Hoja maestra: mercado, encuesta, competencia, costos, finanzas y marketing.
5. Documento académico **Formato Primera Entrega - Pregrado 2026 - 02** y su bibliografía.
6. Este contexto: interpretación consolidada de requisitos y decisiones.

Principios permanentes:

1. Inspecciona el código, el `README.md`, `data/catalogo-inventario.csv`, las rutas actuales, las pruebas y los cambios sin confirmar.
2. Compara el estado real del repositorio con este documento.
3. Conserva todo lo que ya funciona y realiza cambios incrementales.
4. No reemplaces datos confirmados por ejemplos ni presentes hipótesis como resultados reales.
5. No cambies los nombres, el orden ni el significado de las 15 columnas del CSV del catálogo.
6. No inventes batería, IMEI, reparaciones, garantía, disponibilidad o evidencia de una unidad.
7. No presentes una funcionalidad objetivo como implementada sin comprobar el repositorio.
8. No expongas en páginas públicas costos internos, márgenes, datos de participantes ni
   estrategia comercial.

La hoja maestra del proyecto es:

<https://docs.google.com/spreadsheets/d/1DqIgBNNDQF1BCrcUcFT1DiRCt2znI-5NRmftX4pABPo/edit>

## 2. Estado actual del proyecto

iPhone Direct Colombia es un MVP local de una plataforma físico-digital que guía a una persona para elegir entre cuatro alternativas:

1. Comprar un iPhone nuevo sellado.
2. Comprar un iPhone usado certificado.
3. Reparar el iPhone actual.
4. Entregar el equipo actual como parte de pago mediante *trade-in*.

El MVP no debe convertirse todavía en una tienda virtual completa. Su objetivo principal es validar si un recorrido guiado, transparente y personalizado reduce la incertidumbre y aumenta la probabilidad de que el usuario realice una acción: solicitar compra, diagnóstico, cotización de retoma o contacto por WhatsApp.

Decisiones vigentes:

- El negocio proyecta un **local propio**, pero todavía no debe publicar una dirección ni
  una agenda activa hasta que exista contrato y fecha de apertura.
- El negocio proyecta un **técnico propio** contratado directamente, aunque la operación de
  reparación todavía no está validada.
- No se debe seguir hablando de “técnico aliado”, “punto aliado” o “aliado estratégico” para ejecutar reparación o diagnóstico.
- El CSV vigente contiene el inventario agregado que el responsable del proyecto confirmó
  como real el 22 de octubre de 2026: 10 unidades nuevas y 20 usadas. Esto confirma las
  cantidades declaradas, pero no crea evidencia técnica individual de cada unidad.
- Los costos de adquisición de usados se modelaron con información de Digital Tech; no se
  deben atribuir certificaciones individuales al proveedor sin documentos de cada equipo.
- Los nuevos se costearon con precios Apple EE. UU./Miami, impuesto de Miami-Dade e importación.
- La reparación y el *trade-in* siguen siendo hipótesis operativas. Solo podrán validarse con órdenes, diagnósticos, tiempos, costos y reventas reales cuando el negocio opere.
- El catálogo funciona por stock. Una condición sin stock positivo no puede recomendarse como comprable.

### Estado técnico verificado al 22 de octubre de 2026

| Área | Estado real |
|---|---|
| Rutas existentes | `/`, `/guia`, `/resultado` y `/catalogo`. |
| Inventario | 23 modelos, 10 unidades nuevas y 20 usadas; contrato de 15 columnas válido. |
| Motor | Filtra stock y usados no aceptados, recalcula resultados y limita a tres opciones totales. |
| Persistencia | Borrador, recomendación y eventos locales en `localStorage`. |
| Verificaciones | `catalog:check`, 36 pruebas, ESLint y compilación aprobados. |
| Pendiente P0 | Ficha de equipo, diagnóstico, retoma, filtros, formularios, UTM y rutas de campaña. |
| Riesgos críticos | Evidencia técnica fija no respaldada, reglas incompletas para iPhone 11/12 y reparación propuesta sin falla declarada. |

Las secciones de alcance y rutas siguientes describen el **objetivo del MVP**, no una lista
de funcionalidades ya terminadas.

## 3. Evidencia disponible y límites

### Mercado objetivo

La base SNIES 2025, con los filtros metodológicos completos, arroja una población objetivo de **19.117 estudiantes**:

| Institución | Población objetivo filtrada |
|---|---:|
| Universidad Santo Tomás | 6.557 |
| Universidad EAN | 6.397 |
| Universidad Sergio Arboleda | 6.163 |
| **Total** | **19.117** |

El valor de **30.964** corresponde al universo amplio previo a excluir programas tecnológicos y modalidades virtuales o a distancia. Puede usarse como referencia amplia, pero no como población objetivo final.

### Encuesta

La encuesta tiene **49 respuestas** y es una muestra no probabilística. Sus porcentajes describen la muestra; no deben generalizarse automáticamente a toda la población SNIES.

Hallazgos que sí pueden orientar el diseño del MVP:

- 69,4 % usa iPhone actualmente.
- 81,6 % manifestó intención positiva hacia un iPhone nuevo importado.
- 65,3 % manifestó intención positiva hacia un iPhone usado certificado.
- 59,2 % recomendaría una plataforma de validación y 32,7 % respondió “Tal vez”.
- La importancia media de reparación, diagnóstico o reposición fue 4,24 sobre 5.
- La asesoría previa por WhatsApp obtuvo 3,31 sobre 5: es útil, pero no sustituye la evidencia ni la atención física.
- 46,9 % prefiere un proceso presencial, 18,4 % una experiencia mixta y 20,4 % digital con entrega presencial.
- Los principales factores de desconfianza frente a un usado fueron falta de garantía (53,1 %), prueba de batería (51,0 %), validación de IMEI (44,9 %), punto físico (40,8 %) y diagnóstico claro (38,8 %).
- Antes de visitar el punto físico, las personas quieren conocer el valor estimado de su equipo (53,1 %), garantía y condiciones (44,9 %), opciones nuevas/usadas (42,9 %) y costo aproximado de reparación (42,9 %).

Implicación: el sitio debe preparar la decisión antes de la visita y llevar al usuario a una acción física o asistida con mejor información. No debe intentar sustituir un diagnóstico técnico real.

### Piloto de validación de cuatro semanas

Estos valores son umbrales de aprendizaje, no un pronóstico comercial:

| Etapa | Umbral |
|---|---:|
| Alcance | 5.000 personas |
| Visitas al MVP | 250 |
| Formularios completos | 30 |
| Cotizaciones | 10 |
| Citas de diagnóstico o retoma | 5 |
| Operaciones pagadas con margen positivo | 3 |

La validación decisiva debe provenir de comportamiento observable: recorridos terminados,
leads con consentimiento, cotizaciones, citas y operaciones conciliadas. La encuesta por sí
sola no valida ventas.

## 4. Propuesta de valor y diferencial

Propuesta de valor de trabajo:

> iPhone Direct Colombia guía al cliente mediante un proceso digital y asistido que analiza su presupuesto, necesidades y equipo actual; compara comprar nuevo, adquirir un usado certificado, reparar o hacer *trade-in*; y recomienda la alternativa más conveniente con costos, evidencia técnica, garantía y condiciones claras.

El diferencial no consiste en poner cuatro botones. Consiste en integrar decisiones que normalmente aparecen separadas mediante una arquitectura de decisión que:

- formula preguntas relevantes;
- organiza la información del usuario;
- descarta alternativas incompatibles;
- compara las opciones viables;
- recomienda una ruta principal;
- explica las razones y cálculos;
- muestra máximo dos alternativas secundarias;
- indica supuestos y limitaciones;
- conecta el resultado con compra, diagnóstico, retoma o WhatsApp;
- registra el recorrido para aprender del comportamiento real.

La innovación se clasifica como **innovación de proceso y de modelo de negocio**. La plataforma integra compra nueva, compra usada, reparación, retoma, diagnóstico, evidencia y posventa en una sola experiencia guiada.

## 5. Qué está validado y qué sigue siendo hipótesis

| Tema | Estado | Tratamiento en la interfaz |
|---|---|---|
| Existencia de interés en nuevos y usados dentro de la muestra | Evidencia de encuesta | Puede mencionarse internamente; no usar como promesa comercial. |
| Preferencia por acompañamiento y punto físico | Evidencia de encuesta | Priorizar cita, diagnóstico y atención en local propio. |
| Catálogo, precios y stock agregado | Inventario real suministrado por el responsable | Mostrar según el CSV y mantenerlo actualizado; confirmar unidad, condición y precio antes del cierre. |
| Proveedor de usados Digital Tech | Evidencia documental del escenario | Uso interno; no atribuir certificaciones no contenidas en la evidencia. |
| Garantía final ofrecida por iPhone Direct | Pendiente de política comercial | No prometer duración hasta que sea aprobada. |
| Reparación con técnico propio | Decisión de modelo; operación aún no validada | Toda recomendación queda sujeta a diagnóstico presencial. |
| *Trade-in* propio | Hipótesis operativa | Todo valor es estimado y sujeto a inspección funcional y cosmética. |
| Umbral mínimo de batería de 85 % | Hipótesis de producto | Configurable; no mostrarlo como dato real de una unidad si no fue medido. |
| Relación máxima reparación/reemplazo de 30 % | Hipótesis de reglas | Configurable y siempre revisada por una persona. |
| Contacto por WhatsApp como mecanismo de cierre | Hipótesis del MVP | Medir clic y continuación; no asumir que un clic equivale a venta. |
| Pagos en línea | Fuera del MVP inicial | No implementar PayU todavía salvo instrucción expresa posterior. |

### Estados de evidencia

| Estado | Significado |
|---|---|
| `CONFIRMED` | Existe una fuente o confirmación operativa identificable. |
| `BUDGETED` | Valor incluido en presupuesto, todavía sin contrato o factura. |
| `MODELED` | Cálculo construido con supuestos documentados. |
| `HYPOTHESIS` | Afirmación pendiente de un experimento definido. |
| `VALIDATED` | Hipótesis que superó el criterio del experimento. |
| `REJECTED` | La evidencia no alcanzó el criterio previsto. |

El inventario agregado del CSV se trata como `CONFIRMED` por declaración del responsable
del proyecto. La certificación, batería, IMEI, garantía y condición de cada unidad siguen
pendientes hasta que exista evidencia individual. Los costos financieros continúan como
`BUDGETED` o `MODELED`, y la conversión de la guía sigue siendo `HYPOTHESIS`.

## 6. Alcance funcional por prioridad

### P0 — MVP local que debe funcionar de principio a fin

- Inicio con propuesta de valor clara y CTA “Encontrar mi mejor opción”.
- Cuestionario guiado y ramificado.
- Captura de presupuesto, uso, prioridad, urgencia y aceptación de usado.
- Captura básica del equipo actual cuando aplique.
- Catálogo generado desde el CSV con filtros útiles y stock correcto.
- Resultado con recomendación principal y máximo dos alternativas.
- Explicación de razones, costos estimados, supuestos y revisión humana requerida.
- Ficha de producto con precio, condición, disponibilidad y evidencia solo cuando exista.
- Solicitud de diagnóstico y retoma.
- CTA de WhatsApp con mensaje prellenado y contexto del recorrido.
- Aviso de privacidad y tratamiento disponible antes de recoger datos identificables.
- Formularios mínimos de compra, diagnóstico y retoma con consentimiento, enlace al aviso
  y minimización de datos.
- Captura y persistencia de UTM durante el recorrido y hasta el CTA o formulario.
- Persistencia temporal en `localStorage`.
- Registro local de eventos de validación.
- Pruebas del motor y del contrato del CSV.
- Experiencia usable en móvil y escritorio.

### P1 — Conversión y operación del piloto controlado

- GA4 y eventos de conversión conectados al vocabulario interno, con consentimiento.
- Ampliación de privacidad y páginas de términos, garantía y posventa.
- Agenda o solicitud de cita en el local propio.
- Almacenamiento autorizado de leads y seguimiento de solicitudes y posventa. Antes de
  implementarlo se debe decidir entre CRM, proveedor de formularios o backend mínimo; los
  datos personales no se almacenan en Git ni en eventos locales.
- Contenido educativo que responda dudas de batería, IMEI, reparaciones y garantía.
- Pruebas E2E del recorrido completo.

### P2 — Solo después de validar el MVP

- Pagos reales y PayU.
- Financiación integrada.
- Autenticación de clientes.
- Inventario transaccional y reserva automática.
- Sincronización con proveedores.
- Consulta automática de IMEI.
- Panel administrativo completo.
- Automatización definitiva de retoma o reparación.
- Recomendaciones generadas por un modelo opaco.

## 7. Arquitectura de rutas

### Rutas canónicas del MVP

| Ruta | Objetivo | CTA principal |
|---|---|---|
| `/` | Explicar el beneficio y ofrecer entradas por necesidad | Encontrar mi mejor opción |
| `/guia` | Ejecutar el cuestionario guiado | Ver mi recomendación |
| `/resultado` | Mostrar recomendación, comparación, costos y supuestos | Continuar por WhatsApp o solicitar servicio |
| `/catalogo` | Mostrar modelos y condiciones disponibles | Ver equipo / comparar |
| `/equipo/[id]` | Mostrar detalle, disponibilidad y evidencia | Quiero este equipo |
| `/diagnostico` | Solicitar evaluación presencial del equipo | Agendar diagnóstico |
| `/retoma` | Solicitar estimación preliminar del equipo | Cotizar mi retoma |

Antes del piloto público deben existir también `/privacidad`, `/terminos` y `/garantia-y-posventa`.

Al corte de este documento solo existen `/`, `/guia`, `/resultado` y `/catalogo`. Las demás
rutas de esta tabla son requisitos pendientes; no se deben documentar como disponibles ni
usar como destinos de campaña hasta implementarlas.

### Rutas previstas en marketing y compatibilidad

La hoja de marketing contiene destinos como `/comparador`, `/cotizar`, `/agendar`, `/campus`, `/referidos`, `/guias` y `/mi-cotizacion`. No se deben lanzar campañas hacia rutas inexistentes.

La prioridad inmediata del documento integrado es resolver `/cotizar` y `/campus`. Los
demás alias permanecen en el backlog compatible y pueden redirigir a una ruta canónica
cuando conserven toda la atribución.

Estos son los destinos de compatibilidad previstos. En P0 inmediato solo se priorizan
`/cotizar` y `/campus`; los demás permanecen en backlog hasta que exista la ruta canónica
de destino y puedan preservar todos los parámetros UTM:

| Ruta de campaña | Destino canónico recomendado en P0 | Regla |
|---|---|---|
| `/comparador` | `/guia` | Iniciar el recorrido con objetivo “No sé qué me conviene”. |
| `/cotizar` | `/guia` | Iniciar la guía y terminar en solicitud de cotización. |
| `/agendar` | `/diagnostico` | Enfocar el formulario en cita presencial. |
| `/campus` | `/guia` | Conservar universidad y código del embajador en UTM. |
| `/referidos` | `/guia` | Conservar código de referido; una página dedicada puede ser P1. |
| `/guias` | `/` o contenido educativo disponible | No crear un blog vacío solo para satisfacer la URL. |
| `/mi-cotizacion` | `/resultado` si la sesión existe; en caso contrario `/guia` | No mostrar resultados de otra sesión. |

Los alias o redireccionamientos deben preservar `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, código de embajador y código de referido.

## 8. Rutas de adquisición y destinos

La inversión piloto mensual prevista es de **$1.200.000 COP**: Meta Ads $500.000, Google Search $300.000, embajadores universitarios $200.000 y activación en local propio $200.000. Es un presupuesto de hipótesis, no un resultado.

La tabla siguiente define destinos objetivo. Mientras `/diagnostico` no exista, las campañas
que lo usan deben permanecer inactivas o dirigirse temporalmente a `/guia`; el QR y la
activación del local también permanecen inactivos hasta confirmar su apertura.

| Canal | Destino recomendado | UTM mínima | Intención que debe resolver |
|---|---|---|---|
| Meta Ads | `/catalogo` o `/guia` según anuncio | `utm_source=meta&utm_medium=paid&utm_campaign=prueba_mvp` | Descubrir equipos o comparar alternativas. |
| TikTok orgánico | `/guia` | `utm_source=tiktok&utm_medium=organic&utm_campaign=educacion_mvp` | Convertir contenido educativo en recorrido guiado. |
| Instagram orgánico | `/catalogo` | `utm_source=instagram&utm_medium=organic&utm_campaign=inventario_mvp` | Ver disponibilidad y continuar a comparación. |
| Google Search — compra | `/catalogo` | `utm_source=google&utm_medium=cpc&utm_campaign=compra_iphone` | Responder a intención de compra. |
| Google Search — reparación | `/diagnostico` | `utm_source=google&utm_medium=cpc&utm_campaign=reparacion_iphone` | Solicitar diagnóstico, no prometer precio definitivo. |
| Embajadores | `/guia` | `utm_source=embajador&utm_medium=referral&utm_campaign=campus_[universidad]` | Medir promotor, universidad y conversión. |
| Activaciones universitarias | `/diagnostico` o `/guia` | `utm_source=universidad&utm_medium=institutional&utm_campaign=activacion_[universidad]` | Llevar un QR a una acción concreta. |
| Referidos | `/guia` | `utm_source=cliente&utm_medium=referral&utm_campaign=referidos_mvp` | Atribuir el referido sin afirmar venta anticipada. |
| WhatsApp/comunidades | `/guia` | `utm_source=whatsapp&utm_medium=community&utm_campaign=comparador_mvp` | Recibir recomendación estructurada. |
| QR del local propio | `/diagnostico` | `utm_source=local_propio&utm_medium=offline&utm_campaign=qr_local` | Registrar origen físico y solicitud. |
| Email/CRM | `/resultado` o `/guia` | `utm_source=crm&utm_medium=email&utm_campaign=seguimiento` | Retomar una cotización válida o repetir la guía. |

No envíes todas las campañas a la página de inicio. Cada anuncio debe llegar a la necesidad que promete resolver.

## 9. Recorrido guiado que materializa el diferencial

### Paso 1. Necesidad

Pregunta: “¿Qué necesitas hacer con tu iPhone?”

- Comprar un equipo.
- Reparar mi equipo.
- Entregar mi equipo como parte de pago.
- No sé qué alternativa me conviene.

### Paso 2. Contexto de decisión

- Presupuesto máximo.
- Uso principal: básico, estudio, trabajo, cámara o juegos.
- Prioridad: precio, garantía, rendimiento, cámara o vida útil.
- Aceptación de usado certificado.
- Urgencia.
- Existencia de un equipo actual.

### Paso 3. Equipo actual, solo si aplica

- Modelo y capacidad.
- Salud de batería declarada, si la conoce.
- Pantalla, cámaras y carcasa.
- Fallas conocidas.
- Reparaciones previas.
- Disponibilidad para diagnóstico presencial.

La información declarada nunca sustituye la revisión del técnico propio.

### Paso 4. Evaluación de alternativas

El motor debe:

1. validar las respuestas;
2. descartar productos sin stock;
3. descartar usados si la persona no los acepta;
4. comparar costo bruto, retoma estimada y desembolso neto;
5. evaluar prioridad, urgencia y necesidad;
6. exigir revisión humana para reparación y retoma;
7. ordenar alternativas con reglas explícitas;
8. generar razones y advertencias trazables.

### Paso 5. Resultado

Mostrar:

- recomendación principal;
- al menos tres razones comprensibles;
- máximo dos alternativas secundarias;
- costo estimado de cada alternativa;
- valor preliminar de retoma, cuando aplique;
- desembolso neto estimado;
- datos utilizados;
- supuestos y limitaciones;
- disponibilidad;
- siguiente acción.

### Paso 6. Acción

- Quiero este equipo.
- Solicitar diagnóstico.
- Cotizar mi retoma.
- Hablar con un asesor por WhatsApp.

## 10. Hallazgos competitivos que deben convertirse en requisitos

El estudio verificó ocho referencias: Mac Center, iShop Colombia, Clevercel, Refurbi, Alkosto, Claro Colombia, Movistar Colombia y Falabella Marketplace.

| Patrón encontrado | Qué significa para iPhone Direct | Requisito de producto |
|---|---|---|
| Mac Center e iShop integran garantía, retoma y servicio autorizado. | Garantía y posventa ya son requisitos básicos del mercado. | Mostrar condiciones, responsable, canal de atención y estado de la solicitud. |
| Clevercel compite con precio, categorías de condición y batería mínima publicada. | Un usado necesita criterios visibles, no solo una foto. | Mostrar evidencia real disponible y distinguir “pendiente de inspección”. |
| Refurbi comunica batería mínima, pruebas, retoma, garantía y periodo de prueba. | Es el benchmark más fuerte en evidencia y confianza para reacondicionados. | No usar la palabra “certificado” sin explicar exactamente qué se revisó. |
| Alkosto compite con escala, logística, financiación y retoma. | El MVP no ganará por variedad o financiación. | Ganar por especialización, claridad, guía y acompañamiento. |
| Claro y Movistar combinan equipo, plan y financiación. | El precio puede volverse difícil de interpretar. | Mostrar precio total y separar cualquier condición o supuesto. |
| Falabella delega parte de la garantía y la certificación al vendedor del marketplace. | La fragmentación de responsabilidades genera incertidumbre. | Identificar claramente que el diagnóstico y seguimiento pertenecen al negocio propio. |

Brecha defendible: integrar orientación paso a paso, evidencia técnica por unidad cuando exista, comparación nuevo/usado/reparación/retoma, precio neto y posventa trazable.

No copies visualmente las páginas de los competidores. Usa sus fortalezas y brechas como requisitos de información, confianza y flujo.

### Significado de las puntuaciones 1 a 5

- **1:** no existe oferta o evidencia verificable.
- **2:** oferta limitada, dependiente de terceros o poco clara.
- **3:** oferta básica comparable al promedio del mercado.
- **4:** oferta desarrollada, clara y verificable.
- **5:** oferta sobresaliente e integrada.

Un valor de 3,0 no significa 3 % ni una nota sobre 10. Significa nivel básico o promedio del mercado. Las metas de iPhone Direct son hipótesis, no desempeño demostrado.

## 11. Contrato inmodificable del catálogo CSV

El archivo `data/catalogo-inventario.csv` tiene exactamente estas 15 columnas y este orden:

```text
modelo,generacion,nivel,categoria,capacidad_gb,precio_nuevo_cop,stock_nuevo,precio_usado_certificado_cop,stock_usado_certificado,valor_retoma_cop,caracteristica_destacada,ruta_imagen,texto_alternativo_imagen,fuente_imagen,fecha_verificacion
```

Reglas obligatorias:

- No renombrar, eliminar, reordenar ni agregar columnas sin una migración explícitamente aprobada.
- Los precios y el stock se escriben como enteros sin `$`, puntos ni comas.
- `fecha_verificacion` usa `AAAA-MM-DD`.
- Stock vacío significa no registrado y no recomendable.
- Stock `0` significa agotado y no recomendable.
- Stock positivo significa que la condición puede participar en las recomendaciones.
- Un stock usado positivo exige precio usado.
- El catálogo puede mostrar un precio de referencia agotado, pero debe desactivar compra y excluirlo del motor.
- `src/data/device-inventory.generated.ts` es generado; no se edita manualmente.
- El CSV es la fuente de verdad del catálogo que consume la aplicación.

## 12. Inventario agregado vigente al corte

El responsable del proyecto confirmó este CSV como inventario real. Contiene **23 modelos,
10 unidades nuevas y 20 usadas**; todos los modelos tienen al menos una unidad en alguna
condición. La confirmación se refiere a cantidades agregadas por modelo y no acredita por
sí sola la inspección, batería, IMEI, garantía o estado individual de una unidad usada.

| Modelo | GB | Precio nuevo | Stock nuevo | Precio usado | Stock usado | Retoma orientativa |
|---|---:|---:|---:|---:|---:|---:|
| iPhone 13 mini | 128 | $2.100.000 | 0 | $1.699.000 | 1 | $1.050.000 |
| iPhone 13 | 128 | $2.600.000 | 0 | $2.049.000 | 2 | $1.250.000 |
| iPhone 13 Pro | 128 | $3.000.000 | 0 | $2.649.000 | 1 | $1.650.000 |
| iPhone 13 Pro Max | 128 | $3.400.000 | 0 | $2.799.000 | 1 | $1.950.000 |
| iPhone 14 | 128 | $2.700.000 | 0 | $2.099.000 | 2 | $1.550.000 |
| iPhone 14 Plus | 128 | $3.000.000 | 0 | $2.249.000 | 1 | $1.800.000 |
| iPhone 14 Pro | 128 | $3.500.000 | 0 | $2.999.000 | 1 | $2.100.000 |
| iPhone 14 Pro Max | 128 | $4.100.000 | 0 | $3.149.000 | 1 | $2.400.000 |
| iPhone 15 | 128 | $3.300.000 | 0 | $2.649.000 | 2 | $1.950.000 |
| iPhone 15 Plus | 128 | $3.200.000 | 0 | $2.849.000 | 1 | $2.200.000 |
| iPhone 15 Pro | 128 | $3.950.000 | 0 | $3.049.000 | 2 | $2.650.000 |
| iPhone 15 Pro Max | 256 | $4.700.000 | 0 | $3.899.000 | 2 | $3.200.000 |
| iPhone 16e | 128 | $3.149.000 | 1 | $1.900.000 | 0 | $2.150.000 |
| iPhone 16 | 128 | $4.099.000 | 2 | $2.500.000 | 0 | $2.450.000 |
| iPhone 16 Plus | 128 | $3.800.000 | 0 | $3.599.000 | 1 | $2.750.000 |
| iPhone 16 Pro | 128 | $3.950.000 | 0 | $3.899.000 | 1 | $3.150.000 |
| iPhone 16 Pro Max | 256 | $5.800.000 | 0 | $4.999.000 | 1 | $3.650.000 |
| iPhone 17 | 256 | $4.549.000 | 2 | $3.300.000 | 0 | $3.050.000 |
| iPhone Air | 256 | $5.249.000 | 1 | $3.800.000 | 0 | $3.400.000 |
| iPhone 17 Pro | 256 | $5.249.000 | 1 | $3.900.000 | 0 | $3.900.000 |
| iPhone 17 Pro Max | 256 | $5.649.000 | 1 | $4.400.000 | 0 | $4.300.000 |
| iPhone 18 Pro | 256 | $5.649.000 | 1 | No ofrecido | 0 | $4.350.000 |
| iPhone 18 Pro Max | 256 | $6.049.000 | 1 | No ofrecido | 0 | $4.750.000 |

La tabla es una fotografía documental. Antes de usar cifras, compara siempre con el CSV
actual del repositorio, que conserva la precedencia. Toda venta debe descontarse en el CSV
y toda diferencia física debe conciliarse y documentarse.

## 13. Evidencia técnica por unidad: limitación actual

El CSV maneja stock agregado por modelo y condición. No contiene identificador de unidad, IMEI, color, batería real, reparaciones previas ni estado cosmético individual.

Por tanto:

- No inventes una ficha técnica individual a partir del stock agregado.
- No muestres “IMEI verificado”, “batería 90 %” o “sin reparaciones” si no existe un registro real.
- Si no hay evidencia, muestra “Inspección técnica pendiente” o “Información por confirmar en el local”.
- Diseña el componente para aceptar evidencia real más adelante sin cambiar el CSV actual.
- Si el repositorio necesita demostrar la experiencia, usa datos de prueba en un archivo separado, con `isTestData: true`, rótulo visible y exclusión de cualquier oferta comercial real.
- Una arquitectura futura puede usar `data/evidencia-unidades.json` o una base de datos por unidad, pero no debe mezclarse silenciosamente con el inventario real.

El término técnico `precio_usado_certificado_cop` se conserva porque forma parte del
contrato del CSV. En la interfaz, una unidad sin ficha individual debe presentarse como
“inspección o certificación pendiente”, no como evidencia ya confirmada.

## 14. Reglas iniciales del motor

Las reglas deben vivir fuera de los componentes, por ejemplo en `src/config/business-rules.ts` y `src/features/advisor/`.

Hipótesis configurables:

```ts
export const BUSINESS_RULES = {
  maxRepairToReplacementRatio: 0.30,
  minimumCertifiedBatteryHealth: 85,
  maximumAlternativesShown: 3,
  requireInspectionForTradeIn: true,
  requireHumanReviewForRepair: true,
};
```

Reglas no negociables para el MVP:

- Producto con stock vacío o `0`: se descarta.
- Usado no aceptado por el cliente: se descarta.
- Reparación y retoma: siempre requieren revisión humana.
- Presupuesto insuficiente: explicar la brecha; no forzar una opción.
- El resultado debe ser reproducible con las mismas entradas y el mismo inventario.
- Cada recomendación debe listar las reglas y valores relevantes que la explican.
- Un cambio de stock o precio debe invalidar o recalcular una recomendación guardada.

## 15. Diseño de confianza y contenido

La interfaz debe responder, antes de pedir contacto, a estas preguntas:

- ¿Qué alternativa me conviene y por qué?
- ¿Cuánto cuesta y qué parte es estimada?
- ¿Hay stock real?
- ¿Qué se verificó en el equipo usado?
- ¿Qué falta verificar?
- ¿Quién responde por diagnóstico, garantía y posventa?
- ¿Debo ir al local propio?
- ¿Qué ocurrirá cuando pulse el CTA?

Patrones recomendados:

- Mostrar precio completo, condición y disponibilidad cerca del CTA.
- Distinguir claramente nuevo, usado, reparación y retoma.
- Usar comparaciones de máximo tres alternativas.
- Mostrar razones y limitaciones, no solo una puntuación.
- Incluir un resumen persistente de las respuestas durante la guía.
- Permitir volver a un paso sin perder datos.
- Usar estados de carga, vacío, error y sin coincidencias.
- Desactivar acciones imposibles y explicar la causa.
- Mantener CTA principal único por pantalla.
- Dar prioridad a texto comprensible en español de Colombia.
- No usar urgencia falsa, descuentos inventados, reseñas simuladas ni sellos de certificación no respaldados.

## 16. Analítica, eventos y atribución

Se utiliza un nombre interno estable y, cuando se conecte GA4, una equivalencia explícita.
Esto evita mezclar eventos internos con nombres recomendados de comercio electrónico.

| Evento interno canónico | Cuándo se emite | Equivalente GA4 sugerido |
|---|---|---|
| `landing_viewed` | Se abre una página de campaña | Evento personalizado |
| `catalog_viewed` | Se abre el catálogo | `view_item_list` o personalizado |
| `catalog_item_viewed` | Se abre una ficha de producto | `view_item` |
| `advisor_started` | Se inicia la guía | Evento personalizado |
| `advisor_step_completed` | Se completa un paso válido | Evento personalizado |
| `advisor_abandoned` | La sesión vence o sale antes del resultado | Evento personalizado |
| `recommendation_generated` | El motor produce resultado | Evento personalizado |
| `recommendation_viewed` | El resultado queda visible | Evento personalizado |
| `alternative_selected` | El usuario elige otra alternativa | `select_item` o personalizado |
| `whatsapp_clicked` | Se abre WhatsApp | Evento personalizado |
| `lead_submitted` | Se envía un formulario verificable | `generate_lead` |
| `diagnosis_requested` | Se solicita diagnóstico | Evento personalizado |
| `trade_in_requested` | Se solicita retoma | Evento personalizado |
| `quote_requested` | Se solicita cotización | Evento personalizado |
| `paid_operation_recorded` | Se concilia una operación pagada | `purchase` |

El código actual implementa solo una parte de este vocabulario y todavía utiliza
`purchase_intent_submitted`. La migración se debe realizar una sola vez y con pruebas para
evitar doble conteo. Nunca se registra `paid_operation_recorded` o `purchase` por un clic,
una conversación, una cotización o una intención.

Persistencia de atribución:

1. Capturar UTMs en la primera visita.
2. Guardarlas durante la sesión.
3. Adjuntarlas a eventos y formularios.
4. Añadir un identificador anónimo de sesión al mensaje de WhatsApp.
5. No incluir IMEI completo, documento, datos financieros ni información sensible.

KPIs del piloto:

- visitas por canal;
- CTR cuando exista pauta;
- tasa de inicio de guía;
- tasa de finalización;
- abandono por paso;
- tasa de acción después del resultado;
- conversión web a lead;
- conversión lead a venta;
- aceptación de la recomendación;
- clic a WhatsApp;
- solicitudes de diagnóstico y retoma;
- CPL, CAC, ingresos atribuidos y ROAS cuando existan ventas verificadas;
- cambio de confianza antes y después del recorrido.

Las metas de ventas todavía no están validadas. No uses el ejemplo didáctico de 1.000 visitas, 100 leads y 10 ventas como resultado real.

## 17. Contexto financiero que no debe confundirse con UX

Supuestos actuales del modelo:

- TRM de referencia: aproximadamente $3.175 COP/USD al corte.
- Importación por equipo: USD 170, dato suministrado por el proyecto.
- Impuesto de Miami-Dade: 7 % para los equipos nuevos del escenario.
- PayU de referencia: 3,29 % + $300 por transacción, más IVA del 19 % sobre la comisión y el cargo fijo.
- Fórmula de referencia de PayU: `(venta × 0,0329 + 300) × 1,19`.
- En una venta de $100.000, el costo de referencia es $4.272 antes del efecto de retenciones.
- Margen bruto objetivo hipotético: nuevo 10 %, usado 20 %, reparación 40 % y *trade-in* 20 %.
- Reservas de garantía hipotéticas: nuevo 2 %, usado 5 %, reparación 3 % y *trade-in* 5 %.

Estos valores son internos. No muestres margen, costo del proveedor o reserva de garantía al cliente. Los pagos reales están fuera del P0. Si después se integra PayU, la comisión debe implementarse desde una configuración única y verificarse contra el contrato vigente.

Otros resultados de planeación incorporados desde el documento general:

| Concepto | Valor | Estado |
|---|---:|---|
| Gastos mensuales estimados | $7.205.128 COP | `MODELED` |
| Arriendo de referencia | $1.700.000 COP | `BUDGETED` |
| Costo laboral mensual del técnico | $2.951.945 COP | `BUDGETED` |
| Inversión inicial estimada | $119.636.736 COP | `MODELED` |
| Costo del lote de 30 equipos | $79.321.352 COP | `MODELED` |
| Capital de trabajo para tres meses | $21.615.384 COP | `MODELED` |

El caso de referencia del iPhone 18 Pro de 256 GB usa precio Apple de USD 1.199,
impuesto de 7 %, importación de USD 170 y TRM de $3.174,67 COP/USD. El costo puesto en
Colombia se modeló en $4.612.573 COP y el costo variable total en $5.095.487 COP; con
precio de $5.649.000 COP, la utilidad estimada es $553.513 COP y el margen 9,8 %. Estos
resultados requieren el desglose de la hoja maestra para reproducirse y no son resultados
históricos ni contenido de interfaz.

## 18. Calidad no funcional

- Diseño *mobile first*.
- Navegación completa con teclado.
- Etiquetas de formulario asociadas, mensajes de error claros y foco visible.
- Contraste y estructura compatibles con WCAG 2.2 AA.
- Imágenes optimizadas, dimensiones definidas y texto alternativo útil.
- No depender solo del color para comunicar condición o error.
- Metadatos únicos por ruta, títulos comprensibles y marcado de producto solo si los datos son reales.
- Mantener rápidos los recorridos principales y evitar JavaScript innecesario.
- Nunca exponer variables secretas en `NEXT_PUBLIC_*`.
- No guardar IMEI completo, cédula, datos de pago o archivos sensibles en `localStorage`.
- Validar todos los datos en el límite del sistema, no solo en la interfaz.
- Las reglas de negocio deben tener pruebas unitarias.

Objetivos técnicos orientativos antes de publicación:

- LCP igual o menor a 2,5 s en el percentil 75.
- INP igual o menor a 200 ms en el percentil 75.
- CLS igual o menor a 0,1 en el percentil 75.

## 19. Inconsistencias conocidas que Codex debe corregir con cuidado

1. `src/data/device-catalog.ts` todavía asigna a todas las referencias IMEI verificado,
   garantías de 365/120 días, batería usada de 90 % y componentes revisados. El CSV no
   respalda esos valores y deben convertirse en estados pendientes u obtenerse de evidencia
   individual antes del piloto.
2. Los iPhone 11 y 12 aparecen como equipos actuales, pero no tienen metadatos de generación
   y nivel en `deviceCatalog`; el motor puede considerar un iPhone 13 mini como mejora de un
   iPhone 12 Pro Max.
3. La reparación se genera con un valor por defecto de $180.000 COP aunque el usuario no
   declare fallas; puede desplazar indebidamente una intención de compra.
4. `primaryUse` y `urgency` se capturan, pero todavía no intervienen en las reglas.
5. Solo existen cuatro rutas; faltan fichas, diagnóstico, retoma, formularios y alias de
   campaña. No se debe dirigir tráfico a rutas inexistentes.
6. No hay persistencia UTM y el vocabulario de eventos está implementado parcialmente.
7. La propuesta exige evidencia por unidad, pero el CSV solo contiene stock agregado. El
   nombre técnico “usado certificado” no prueba la certificación de una unidad.
8. La población objetivo correcta es 19.117; 30.964 es únicamente el universo amplio.
9. El MVP no tiene pagos, local operativo ni política aprobada de garantía. PayU, arriendo,
   reparación y *trade-in* continúan como referencias o hipótesis hasta contar con evidencia.

## 20. Orden recomendado de trabajo en el repositorio

1. Eliminar evidencia y garantía inventadas; representar con claridad “pendiente de
   inspección” y separar catálogo real de datos demostrativos.
2. Corregir las reglas para iPhone 11/12, reparación sin falla, presupuesto, uso y urgencia,
   con pruebas de regresión.
3. Completar `/equipo/[id]`, `/diagnostico` y `/retoma` sin duplicar el CSV.
4. Implementar filtros, formularios mínimos y un WhatsApp con contexto suficiente.
5. Añadir `/cotizar` y `/campus`; después completar los demás alias sin perder UTM.
6. Consolidar eventos, atribución y consentimiento antes de conectar GA4.
7. Reforzar confianza, accesibilidad, privacidad y estados de error.
8. Añadir una prueba E2E del recorrido principal.
9. Ejecutar `npm run catalog:check`, `npm test`, `npm run lint` y `npm run build`.
10. Entregar un resumen de cambios, supuestos, riesgos abiertos y próximos pasos.

No hagas una reescritura completa si la implementación existente puede evolucionar con cambios pequeños.

## 21. Criterios de aceptación

El trabajo se considera correcto cuando:

- [ ] El CSV conserva exactamente 15 columnas y el generador no se edita a mano.
- [ ] El catálogo muestra los 23 modelos del archivo actual.
- [ ] La suma de stock vigente coincide con 10 nuevos y 20 usados, salvo que el CSV tenga una versión posterior documentada.
- [ ] Ninguna condición con stock vacío o `0` aparece como comprable o recomendable.
- [ ] Las rutas de campañas no producen 404 y preservan UTMs.
- [ ] La guía ramifica preguntas según compra, reparación, retoma o indecisión.
- [ ] El resultado explica al menos tres razones, cálculos y limitaciones.
- [ ] Reparación y retoma siempre quedan sujetas a revisión humana.
- [ ] La ficha de usado no inventa batería, IMEI, reparaciones ni garantía.
- [ ] WhatsApp recibe un mensaje útil sin datos sensibles.
- [ ] Los eventos diferencian visita, lead, intención y compra real.
- [ ] Los datos de prueba están identificados visual y técnicamente.
- [ ] La experiencia funciona en móvil, escritorio y teclado.
- [ ] Las pruebas, el catálogo, el *lint* y la compilación terminan correctamente.
- [ ] La documentación ya no habla de aliados para diagnóstico o reparación.

## 22. Definición de terminado

Una funcionalidad está terminada cuando:

- responde a una hipótesis o requisito del MVP;
- utiliza las fuentes de verdad correctas;
- distingue hechos, estimaciones e hipótesis;
- maneja estados normales, vacíos y de error;
- funciona en móvil, escritorio y con teclado;
- incluye pruebas cuando afecta catálogo, dinero, stock o recomendación;
- conserva atribución, consentimiento y privacidad;
- no crea promesas operativas ni evidencia técnica falsas;
- actualiza la documentación cuando cambia una regla o contrato;
- pasa las verificaciones técnicas disponibles.

El MVP estará listo para una prueba controlada cuando un participante pueda completar:

```text
landing → guía → recomendación → evidencia disponible → cotización o WhatsApp
```

y el equipo pueda atribuir el recorrido, revisar la decisión ofrecida y registrar si terminó
en formulario, cita, cotización u operación pagada.

## 23. Fuentes principales

### Fuente maestra del proyecto

- Hoja “iPhone Direct Colombia”: <https://docs.google.com/spreadsheets/d/1DqIgBNNDQF1BCrcUcFT1DiRCt2znI-5NRmftX4pABPo/edit>

### Competidores verificados en la hoja

- Mac Center: <https://mac-center.com/products/iphone-15-mtp03be-a?variant=46381566328982>
- iShop Colombia: <https://co.tiendasishop.com/products/iphone-15-mtp03be-a>
- Clevercel: <https://www.clevercel.co/products/iphone-15>
- Refurbi: <https://refurbi.com.co/products/iphone-15>
- Alkosto: <https://www.alkosto.com/iphone-15-128gb-5g-negro/p/195949035913>
- Claro Colombia: <https://tienda.claro.com.co/detalle-producto/iphone-15-128gb-5g>
- Movistar Colombia: <https://tienda.movistar.com.co/iphone-15-128gb.html>
- Falabella Marketplace: <https://www.falabella.com.co/falabella-co/product/152701589/celular-iphone-15-128-gb-5g-rosado-reacondicionado-garantia-extendida-panel-solar/152701590>

### Estándares y medición

- WCAG 2.2: <https://www.w3.org/TR/WCAG22/>
- Core Web Vitals: <https://web.dev/articles/vitals>
- Eventos recomendados de Google Analytics para comercio electrónico: <https://developers.google.com/analytics/devguides/collection/ga4/ecommerce>

### Fuentes que todavía requieren trazabilidad documental

Las cifras de TRM, arriendo, costo laboral, inversión, capital de trabajo y caso financiero
se conservaron como referencias internas coherentes con el documento académico, pero el
repositorio no contiene todavía el desglose completo que permita reproducirlas. La hoja
maestra o la bibliografía APA deben registrar para cada cifra URL o documento, fecha,
unidad y estado de evidencia.

## 24. Próximo objetivo

El siguiente hito no es terminar una tienda completa. Es corregir los riesgos de confianza
del motor y ejecutar un experimento medible que responda:

> ¿La guía ayuda a estudiantes de Bogotá a elegir entre nuevo, usado, reparación y retoma,
> y los impulsa a realizar una acción comercial con posibilidad de margen positivo?

El desarrollo debe priorizar esa respuesta por encima de funciones que todavía no generan
aprendizaje y conservar el diseño elegante en blanco y negro, el logotipo oficial y el
contrato del CSV.

