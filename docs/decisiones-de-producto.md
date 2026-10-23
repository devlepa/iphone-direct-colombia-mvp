# Decisiones de producto

## D-001 — Validar primero la guía

- **Estado:** aceptada.
- **Decisión:** construir primero el recorrido de orientación y no una tienda completa.
- **Motivo:** el aprendizaje principal consiste en saber si una comparación guiada ayuda a decidir.

## D-002 — Usar reglas explícitas

- **Estado:** aceptada.
- **Decisión:** mantener la puntuación y los umbrales fuera de los componentes visuales.
- **Motivo:** cada recomendación debe ser explicable, auditable y ajustable con evidencia.

## D-003 — Separar inventario, estimaciones y evidencia

- **Estado:** aceptada; reemplaza la formulación inicial sobre datos completamente simulados.
- **Decisión:** tratar el stock agregado suministrado como inventario operativo, conservar
  precios, reparaciones y retomas como estimaciones hasta su confirmación, y no atribuir a
  una unidad batería, IMEI, componentes o garantía sin evidencia individual.
- **Motivo:** evitar tanto que una estimación se interprete como oferta definitiva como que
  la etiqueta global `isTestData` oculte la diferencia entre inventario, precio orientativo
  y certificación técnica pendiente.

## D-004 — El CSV no certifica unidades

- **Estado:** aceptada.
- **Decisión:** conservar `precio_usado_certificado_cop` y
  `stock_usado_certificado` por compatibilidad del contrato, pero presentar una unidad como
  certificada solo cuando exista su ficha de inspección.
- **Motivo:** el CSV administra cantidades agregadas y no contiene IMEI, batería, condición
  cosmética, componentes revisados ni documentos de garantía por unidad.
