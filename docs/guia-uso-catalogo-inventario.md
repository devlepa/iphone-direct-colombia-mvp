# Guía de uso del catálogo e inventario CSV

Esta guía explica cómo administrar los modelos, las condiciones, los precios, las
fotografías y el stock de iPhone Direct Colombia desde:

```text
data/catalogo-inventario.csv
```

Ese CSV es la **fuente de verdad** del catálogo. No se deben copiar los cambios a los
componentes de React ni editar manualmente `src/data/device-inventory.generated.ts`.

Las columnas `precio_usado_certificado_cop` y `stock_usado_certificado` conservan su nombre
por compatibilidad técnica. El archivo registra inventario agregado de segunda, pero no
certifica una unidad: batería, IMEI, componentes, condición y garantía requieren una ficha
de inspección independiente.

Antes de una modificación amplia conviene guardar una copia del CSV o crear un cambio en
Git. Todos los comandos de esta guía se ejecutan desde la raíz del proyecto
`iphone-direct-colombia-mvp`.

## 1. Regla principal de disponibilidad

El inventario de cada modelo se controla de forma independiente para dos condiciones:

- `stock_nuevo`: unidades nuevas selladas.
- `stock_usado_certificado`: unidades de segunda disponibles bajo el nombre técnico actual.

El motor aplica esta regla estricta:

| Valor de stock | Estado en el catálogo | ¿Puede recomendarse? |
|---:|---|---|
| Celda vacía | Stock sin registrar | No |
| `0` | Agotado | No |
| Entero positivo, por ejemplo `3` | Tres unidades disponibles | Sí |

Una celda vacía y un `0` producen la misma exclusión en el motor, pero expresan situaciones
operativas diferentes: vacío significa que la cantidad todavía no se registró; `0` confirma
que no existe mercancía.

> El CSV vigente ya contiene las cantidades reales suministradas. Solo las condiciones con
> un valor positivo pueden recomendarse; después de cada venta se debe descontar la unidad
> correspondiente para evitar ofrecer inventario agotado.

## 2. Casos habituales de inventario

Las columnas relevantes aparecen en este orden:

```text
precio_nuevo_cop,stock_nuevo,precio_usado_certificado_cop,stock_usado_certificado
```

### Vender únicamente de segunda

```csv
4700000,0,2800000,2
```

- Nuevo sellado: agotado, no se recomienda.
- Usado: dos unidades, sí puede recomendarse como opción sujeta a inspección.

El precio nuevo se conserva como referencia porque `precio_nuevo_cop` es obligatorio en la
versión actual del CSV. En el catálogo seguirá apareciendo esa referencia marcada como
agotada; el motor no la tratará como una opción comprable.

### Vender únicamente nuevo sellado

```csv
4700000,3,2800000,0
```

- Nuevo sellado: tres unidades, sí puede recomendarse.
- Usado: agotado, no se recomienda.

### Ofrecer ambas condiciones

```csv
4700000,3,2800000,2
```

El motor podrá comparar las dos alternativas según presupuesto, preferencias y equipo
actual del cliente.

### Mantener el modelo como referencia sin mercancía

```csv
4700000,0,2800000,0
```

El modelo y sus precios pueden continuar visibles en el catálogo, pero ninguna condición
participa en las recomendaciones.

### No ofrecer usado

```csv
4700000,3,,
```

Las celdas de precio y stock usado quedan vacías. Si existe un stock usado positivo, también
debe existir un precio usado.

## 3. Descripción de las columnas

El archivo tiene exactamente 15 columnas. No se deben renombrar, eliminar ni reordenar.

| Nº | Columna | Requerida | Formato y función |
|---:|---|:---:|---|
| 1 | `modelo` | Sí | Nombre comercial único. Ejemplo: `iPhone 15 Pro Max`. |
| 2 | `generacion` | Sí | Número entero de generación. Ejemplo: `15`. |
| 3 | `nivel` | Sí | `VALUE`, `MINI`, `STANDARD`, `PLUS`, `AIR`, `PRO` o `PRO_MAX`. |
| 4 | `categoria` | Sí | Texto visible como `Estándar`, `Plus`, `Pro` o `Pro Max`. |
| 5 | `capacidad_gb` | Sí | Capacidad base como entero, sin `GB`. Ejemplo: `256`. |
| 6 | `precio_nuevo_cop` | Sí | Precio nuevo en COP como entero, sin símbolos ni separadores. |
| 7 | `stock_nuevo` | No | Cantidad real de unidades nuevas selladas. |
| 8 | `precio_usado_certificado_cop` | No | Precio usado en COP bajo el nombre técnico heredado; vacío si no se ofrece. |
| 9 | `stock_usado_certificado` | No | Cantidad real agregada de unidades usadas; no demuestra certificación individual. |
| 10 | `valor_retoma_cop` | Sí | Valor orientativo de retoma como entero. |
| 11 | `caracteristica_destacada` | Sí | Frase corta que aparece en la tarjeta y apoya la recomendación. |
| 12 | `ruta_imagen` | Sí | Ruta local dentro de `/products/`. |
| 13 | `texto_alternativo_imagen` | Sí | Descripción accesible de la fotografía. |
| 14 | `fuente_imagen` | Sí | URL completa que debe comenzar por `https://`. |
| 15 | `fecha_verificacion` | Sí | Fecha `AAAA-MM-DD`, por ejemplo `2026-10-19`. |

## 4. Cómo escribir precios, stock y fechas

### Precios y retoma

Se escriben como enteros en pesos colombianos:

```text
Correcto:   5299000
Incorrecto: $5.299.000
Incorrecto: 5,299,000
Incorrecto: 5299000 COP
```

Cuando se cambie cualquier precio también se debe actualizar `fecha_verificacion`.

### Stock

Solo admite enteros iguales o mayores que cero:

```text
Correcto:   0
Correcto:   1
Correcto:   12
Incorrecto: -1
Incorrecto: 2.5
Incorrecto: tres
```

### Fecha

```text
Correcto:   2026-10-19
Incorrecto: 19/10/2026
Incorrecto: 19-10-2026
```

## 5. Cómo actualizar una fila existente

1. Ejecutar el proyecto con `npm run dev`.
2. Abrir `data/catalogo-inventario.csv`.
3. Buscar el valor exacto de `modelo`.
4. Modificar únicamente las celdas necesarias.
5. Actualizar `fecha_verificacion` si cambió un precio o información de mercado.
6. Guardar el CSV.
7. Revisar la terminal: debe aparecer un mensaje de sincronización del inventario.
8. Confirmar el cambio en `/catalogo` y, si aplica, repetir una recomendación.

Durante el desarrollo no es necesario reiniciar Next.js. El observador regenera el catálogo
tipado cuando detecta que se guardó el CSV.

## 6. Cómo agregar un modelo

1. Duplicar una fila similar dentro del CSV.
2. Cambiar `modelo`; debe ser único.
3. Completar generación, nivel, categoría y capacidad.
4. Registrar el precio nuevo de referencia.
5. Registrar stock real para cada condición. No utilizar valores inventados.
6. Si se ofrecerá usado, completar su precio y stock.
7. Completar valor de retoma y característica destacada.
8. Agregar una fotografía válida a `public/products/`.
9. Completar ruta, texto alternativo y fuente HTTPS.
10. Registrar la fecha de verificación y guardar.

Si se elimina una fila, ese modelo deja de formar parte del catálogo de productos y del
motor. Los iPhone 11 y 12 que aparecen en el formulario solo representan posibles equipos
actuales del cliente; no se recomiendan para compra si no existen en el CSV.

## 7. Gestión de fotografías

Las imágenes se guardan dentro de:

```text
public/products/
```

Formatos permitidos:

- `.jpg`
- `.jpeg`
- `.png`
- `.webp`
- `.avif`

Ejemplo:

```text
Archivo físico: public/products/iphone-15-pro-negro-v2.webp
Valor CSV:      /products/iphone-15-pro-negro-v2.webp
```

Reglas:

- La ruta debe comenzar por `/products/`.
- El archivo debe existir y ser una imagen, no una carpeta.
- No se permiten rutas con `..` ni rutas absolutas del computador.
- `fuente_imagen` debe ser una URL HTTPS.
- `texto_alternativo_imagen` debe describir lo que se observa.
- Al reemplazar una fotografía, conviene usar un nombre nuevo para evitar la caché del
  navegador.

## 8. Textos, comas y comillas

Si un texto contiene una coma, debe estar entre comillas dobles:

```csv
"Pantalla grande, USB-C y autonomía extendida."
```

Si el texto contiene comillas dobles, se escriben dos veces dentro de la celda:

```csv
"Equipo en estado ""como nuevo"", revisado y certificado."
```

No se deben insertar saltos de línea manuales dentro de una fila salvo que la herramienta
de hoja de cálculo los gestione correctamente dentro de una celda citada.

## 9. Uso con Excel o Google Sheets

### Importar

1. Importar el archivo como CSV UTF-8.
2. Seleccionar la coma como separador.
3. Mantener precios, stock, generación y capacidad como números sin formato monetario.
4. Mantener `fecha_verificacion` en formato `AAAA-MM-DD`.

### Exportar

1. Descargar o guardar como **CSV separado por comas**.
2. Conservar codificación UTF-8 para no dañar tildes ni la `ñ`.
3. No guardar únicamente como `.xlsx` u otro formato de hoja de cálculo.
4. Confirmar que el encabezado conserva las 15 columnas originales y su orden.
5. Ejecutar `npm run catalog:check` después de exportar.

Algunas configuraciones regionales de Excel usan punto y coma. Ese formato no es válido
para este archivo: la exportación debe utilizar comas.

## 10. Sincronización y comandos

### Desarrollo con actualización automática

```bash
npm run dev
```

Al guardar un cambio válido:

```text
CSV → validación → TypeScript generado → catálogo → motor de recomendación
```

El navegador no lee el CSV directamente. El sincronizador primero lo valida y genera
`src/data/device-inventory.generated.ts`; por eso no se debe omitir este paso ni editar el
archivo generado.

### Sin el servidor activo

```bash
npm run catalog:sync
```

### Comprobar sin modificar archivos

```bash
npm run catalog:check
```

### Ejecutar todas las pruebas

```bash
npm test
```

### Producción

```bash
npm run build
```

Después se debe volver a desplegar la compilación. Una aplicación ya compilada no lee los
cambios posteriores del CSV directamente.

## 11. Efecto sobre las recomendaciones

El motor únicamente considera productos construidos desde el CSV y vuelve a verificar:

- condición nueva o usada;
- stock mayor que cero;
- presupuesto, que actualmente reduce la puntuación cuando se excede pero no funciona como
  descarte estricto en todos los casos;
- aceptación de usados certificados;
- salud mínima de batería configurada para usados; este criterio es provisional y no es
  confiable hasta incorporar evidencia real por unidad;
- que sea una mejora real frente al iPhone actual.

Un stock positivo habilita una condición como candidata, pero no garantiza que termine
siendo la recomendación: también intervienen los demás descartes y puntuaciones anteriores.
En particular, el adaptador actual asigna temporalmente 90 % de batería a todos los usados;
ese valor no proviene del CSV y no debe interpretarse como medición ni certificación.

Un cambio de precio, stock o fotografía genera una nueva revisión del catálogo. Cuando el
usuario vuelve a `/resultado`, la recomendación guardada se recalcula. Si el único equipo
recomendado pasa de stock positivo a `0`, no continúa mostrándose como disponible.

Las alternativas de reparación y retoma siguen sujetas a sus propias reglas. Cuando una
retoma implica renovar por otro equipo, ese reemplazo también debe tener stock positivo en
el CSV.

## 12. Errores frecuentes y solución

| Mensaje o problema | Causa probable | Solución |
|---|---|---|
| Los encabezados no coinciden | Se renombró o reordenó una columna | Restaurar exactamente la primera línea del CSV. |
| Se esperaban 15 columnas | Falta una coma o hay una coma textual sin comillas | Revisar la fila indicada y encerrar los textos con comas entre comillas. |
| Se esperaba un entero | Se usaron `$`, puntos, decimales o texto | Escribir únicamente dígitos. |
| Modelo duplicado | Dos filas tienen el mismo `modelo` | Corregir o eliminar la fila duplicada. |
| Stock usado sin precio | Hay stock usado positivo y el precio usado está vacío | Completar el precio o poner el stock en `0`. |
| La ruta sale de `public` | La ruta contiene `..` o es absoluta | Usar `/products/nombre-del-archivo.ext`. |
| No existe el archivo de imagen | El nombre o la extensión no coinciden | Copiar la imagen a `public/products/` y revisar mayúsculas. |
| URL inválida | La fuente no es una URL HTTPS | Usar una dirección completa que empiece por `https://`. |
| Fecha inválida | La fecha no usa el formato requerido | Escribir `AAAA-MM-DD`. |
| El equipo no se recomienda | Stock vacío/0, preferencia incompatible, regla de mejora o una alternativa con mayor puntuación | Confirmar stock positivo y revisar las respuestas; el presupuesto hoy influye en la puntuación, no siempre descarta. |
| El cambio no aparece | No está activo el observador o el CSV es inválido | Revisar la terminal y ejecutar `npm run catalog:sync`. |

Si un guardado es inválido durante `npm run dev`, la aplicación conserva la última versión
válida y muestra en la terminal la línea y columna que se deben corregir.

## 13. Flujo operativo después de una venta

El MVP no descuenta stock automáticamente porque todavía no posee pagos ni una base de datos
transaccional. Después de confirmar una venta:

1. Abrir la fila del modelo vendido.
2. Identificar si fue nuevo o usado certificado.
3. Restar una unidad en la columna de stock correspondiente.
4. Si llegó a cero, escribir explícitamente `0`.
5. Guardar y verificar la actualización.
6. Publicar nuevamente si el sitio está en producción.

Ejemplo: si `stock_usado_certificado` era `2`, después de vender una unidad debe quedar en
`1`. Al vender la última, debe quedar en `0` y el motor dejará de recomendar esa condición.

## 14. Lista de verificación

### Antes de guardar

- [ ] El modelo es correcto y no está duplicado.
- [ ] Los precios están escritos como enteros en COP.
- [ ] Los stocks reflejan unidades físicas reales.
- [ ] Todo stock usado positivo tiene precio usado.
- [ ] La foto existe dentro de `public/products/`.
- [ ] La ruta, el texto alternativo y la fuente corresponden al modelo.
- [ ] La fecha de verificación está actualizada.
- [ ] No se cambiaron los encabezados ni el orden de las columnas.

### Antes de publicar

- [ ] `npm run catalog:check` termina correctamente.
- [ ] `npm test` termina correctamente.
- [ ] Se revisó `/catalogo`.
- [ ] Se probó una recomendación con un producto disponible.
- [ ] Se probó que un producto con stock `0` no aparezca recomendado.
- [ ] Se ejecutó `npm run build`.
- [ ] Se desplegó la nueva compilación.

## 15. Límites actuales del inventario

- El stock no se reserva durante una cotización ni se descuenta automáticamente. Mientras
  no se actualice el CSV, una última unidad podría mostrarse a más de una persona.
- Cada fila representa un modelo y una capacidad. Actualmente `modelo` debe ser único, así
  que no se pueden administrar 128, 256 y 512 GB del mismo modelo como filas separadas sin
  ampliar primero el esquema y el código.
- No se registran unidades individuales, IMEI, color, porcentaje real de batería ni estado
  cosmético. Los stocks son cantidades agregadas por modelo y condición.
- Un stock usado positivo confirma disponibilidad agregada, no una certificación técnica.
  Antes de ofrecer una unidad como certificada se debe registrar y revisar su evidencia.
- `fuente_imagen` documenta únicamente el origen de la fotografía. El esquema actual no
  incluye una columna para la fuente del precio.
- El nombre del modelo debe mantenerse estable. No se deben crear variantes que solo
  cambien mayúsculas, espacios o acentos, porque pueden generar identificadores repetidos.
- La fecha visible general del catálogo corresponde a la verificación más reciente, pero
  cada fila conserva su propia `fecha_verificacion`; no se debe actualizar una fila que no
  haya sido revisada realmente.

Si en el futuro se necesita stock por color, capacidad, batería o unidad física, será
necesario ampliar el formato del CSV y las validaciones antes de agregar esas filas.

## 16. Archivos relacionados

| Archivo | Uso |
|---|---|
| `data/catalogo-inventario.csv` | Único archivo que se edita para administrar el catálogo. |
| `public/products/` | Fotografías locales. |
| `scripts/sync-catalog-inventory.mjs` | Analiza, valida y genera los datos tipados. |
| `scripts/dev-with-catalog.mjs` | Observa el CSV durante el desarrollo. |
| `src/data/device-inventory.generated.ts` | Archivo automático; no editar. |
| `src/data/device-catalog.ts` | Convierte el inventario en productos para la aplicación. |

