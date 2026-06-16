# Sabor Pampeano — Contexto Completo de Fábrica ("La Biblia")

> **Última actualización:** 2026-06-09 (Nuevo presupuesto compresor BTA Tools + Reestructuración Workspace a Proyectos)
> **Responsable:** Ing. Juan Manuel Grasso — Jefe de Operaciones
> **Regla de oro 1:** NO asumir que lo discutido se ejecutó. Siempre preguntar estado real antes de actuar.
> **Regla de oro 2:** NO asumir que una máquina ya existe en planta o que un dato es correcto. Si hay duda, PREGUNTAR a Juan Manuel antes de documentar. Cero suposiciones.

---

## ÍNDICE DE ARCHIVOS DEL WORKSPACE (Estructura V3 — Orientada a Proyectos)

Ruta base: `Sabor Pampeano Workspace\`

### 00_Dashboard_Proyectos
| Archivo | Contenido |
|------------|-----------|
| `Planificación y Proyectos.html` | Dashboard interactivo principal con estado de todos los proyectos |
| `logo.png` | Logo para favicon del dashboard |

### 01_Proyectos (Cada proyecto tiene sus subcarpetas: Pliegos, Presupuestos, Manuales, Planos)
| Subcarpeta | Contenido |
|------------|-----------|
| `01_Linea_Aire_Comprimido\Presupuestos\` | Cotizaciones Casa Bernabé, Provín/Kaeser, Mega Herrería, **BTA Tools (NUEVA)**, comparativas Word, folleto SmartPipe |
| `01_Linea_Aire_Comprimido\Pliegos\` | Pliego Línea Compresor (SP-OC-2026-002), **Pliego_Materiales_Aire_Comprimido.docx** (nuevo, solo cañerías) |
| `02_Modulo_Exterior_Harinas\Pliegos\` | Pliego Ampliación TACC, Pliego Mampara (histórico) |
| `02_Modulo_Exterior_Harinas\Planos\` | Bocetos y layouts |
| `03_Sala_Rompedora_Huevos\Pliegos\` | Pliego V1, V2 |
| `03_Sala_Rompedora_Huevos\Manuales\` | Manual chino rompedora (敲蛋机说明书) |
| `04_Sistema_Digital_Produccion\` | Formulario Web App V3.2 y versiones anteriores |
| `05_Plan_Maestro_Fabrica\` | Planes Maestros, Cronogramas, Propuesta Rol Operaciones |

### 02_Operaciones_de_Fabrica
| Subcarpeta | Contenido |
|------------|-----------|
| `Procedimientos_SOP\` | POES, Reporte_Gerencia.pdf, 01_Cascado_Huevos.md, 03_Camara_Frio... |
| `Recetas_y_Formulas\` | Templates de recetas |
| `Recursos_Humanos\` | Propuestas de rol (Jefe Operaciones) |
| `Mantenimiento_y_Manuales_Generales\` | Manuales Roboqbo, Autoclave, Amasadoras, etc. + Gestión preventiva |

### 03_Herramientas_Sistemas
| Subcarpeta | Contenido |
|------------|-----------|
| `Herramientas_IA_y_Scripts\` | **ESTE ARCHIVO** (`contexto_completo.md`), scripts generadores |

---

## EMPRESA
- **Nombre:** Sabor Pampeano: Fábrica de alimentos en Bahía Blanca. Actualmente operando la Línea A (Mermeladas, Hummus, Salsas) con cuello de botella en escalado.
- **Responsable Operativo:** Ing. Juan Manuel Grasso (Ingreso: 06-Abril-2026).
- **Hitos Históricos (Abril-Mayo 2026):**
  - **24-Abril-2026:** Llegada e ingreso de todas las máquinas chinas a la fábrica. JM coordinó la recepción.
  - **Mayo 2026:** JM viajó al campo en dos oportunidades (08 y 12 de Mayo) para coordinar el montaje de la seleccionadora de huevos, requiriendo investigación y contacto nocturno con proveedores chinos por diferencia horaria.
  - **Mayo 2026:** Despeje y acondicionamiento del cuarto para la rompedora de huevos (ex-depósito), reubicando elementos de limpieza y librería en otra habitación (3 días de trabajo manual de JM).
  - **Mayo/Junio 2026:** Resolución de múltiples incidencias operativas (peladora de papas, balanzas, y falla intermitente en térmica de bomba elevadora de agua).
  - **Mayo/Junio 2026:** Investigación, compra e instalación coordinada con plomeros de filtros de agua específicos para Roboqbo y horno Rational.
  - **Mayo/Junio 2026:** Extensa investigación comercial sobre sobadoras, amasadoras, cortadoras de tapas y líneas de empanadas (múltiples presupuestos recabados).
- **Web:** https://saborpampeano.com
- **Responsable técnico:** Ing. Juan Manuel Grasso — Jefe de Operaciones
- **Ingeniera en Alimentos:** Rol de QC, 5hs/día en planta
- **Nota política:** Empleado de etiquetado es sobrino del dueño — tratar con tacto, enfocar en herramientas/estándares

## PLANTA FÍSICA
- **Cocina:** ~140 m² (10×14 m)
- **Configuración:** Sándwich → Depósito MP (derecha) → Cocina → Depósito PT (izquierda)
- **Entrada/salida cocina:** 1,5 m de ancho
- **Sin pasillos definidos** (problema crítico)
- **Canaletas de desagüe:** verificar que equipos no las obstruyan
- **Cámara fría:** fuera de cocina, para tartas/tortillas

## EQUIPAMIENTO ACTUAL
| Equipo | Ubicación | Uso |
|--------|-----------|-----|
| Roboqbo QBO 25-4 | Inferior centro-derecha | Procesadora industrial 25L |
| Rational (horno combi) | Pared superior | Tartas, tortillas. **Capacidad: 10 bandejas (32,5×52,5 cm)**. |
| Horno pizzero | Pared superior | Tartas, tortillas |
| Freidora | Pared superior | Papas para tortillas |
| 4 Anafes | Pared superior | Cocción general |
| 2 Sous vide (grande + chico 60×60) | Pared superior | Viandas (inactivo) |
| **Amasadora Moretti Mixer 60:** Utilizada para la masa de las tartas. **ATENCIÓN: CUELLO DE BOTELLA.** Produce 60kg por bache. Capacidad máxima por turno de 8 horas: ~840kg. La demanda proyectada es de 800kg. No puede tener tiempos muertos. | Esquina inferior derecha | Masa de tartas |
| **Sobadora:** Para el estirado manual de la masa. Se requiere reemplazar por una **Sobadora Pesada Blindada** (cotizar a Argental). | Sobre mesada 225×65 | Aplana masa de tartas |
| **Línea de Armado:** Totalmente manual en mesas de acero inoxidable. Se incorporará **Cortadora de Discos MCD2 (Spiing)** y **Línea Continua Automática de Empanadas**. | Sobre mesada 225×65 | Corte manual tapas tarta |
| **Peladora de Papas (por abrasión):** Capacidad 10 kg por carga, 3 minutos de pelado (5 min con carga/descarga). Sirve también para otras verduras (zanahoria, etc.). **ESTADO: OPERATIVA (Se cambió la correa).** | Cocina | Pelado de papas y verduras |
| **Cortadora de Verdura:** Cortadora/fileteadora funcional. **En buen estado, no requiere reemplazo.** | Cocina | Corte de verduras |
| Abatidor (viejo) | Junto al Rational | Enfriamiento tartas (Línea B). **Capacidad: 10 bandejas (32,5×52,5 cm)**. |
| 2 Turbovar (sellado al vacío) | Zona superior | Sellado tartas/tortillas |
| Selladora | Zona PT | Sellado final |
| Etiquetadora | Depósito PT | Etiquetado (necesita reparación) |
| Bacha(s) | Zona central-superior | Lavado utensilios |
| Mesada 300×90 | Centro, enfrentada a Roboqbo | Uso general/frascos |
| Mesada 225×65 | Pared derecha | Corte manual tapas tarta |
| Mesada 180×90 | Centro | Elementos de línea A |
| Estantería | Pared derecha | Almacenamiento |
| 4 Freezers | Fuera de cocina (a reubicar a MP) | Viandas |

## EQUIPAMIENTO NUEVO (Ya adquirido)
| Equipo | Especificaciones | Estado |
|--------|-----------------|--------|
| LSL 100CNC Llenadora (Cadec) | ~120×95×120 cm, tolva 60L | Pendiente instalación |
| RSL 1800P Tapadora (Cadec) | Similar dimensiones | Pendiente instalación |
| Autoclave | A vapor, autónomo (sin caldera) | Pendiente instalación |
| Liofilizadora ORZF-5 | 50kg/batch, 24 bandejas 61×58cm, 380V, ciclos 24-48hs | Pendiente instalación |
| Abatidor chino (nuevo) | Centro-derecha | **LÓGICA TÉRMICA:** Recibirá la producción del horno Argental nuevo. **Capacidad real comprobada:** 14 bandejas (56-58 cm ancho × 60 cm largo). |
| Compresor | 7.5HP/300L trif. 380V, exterior con estructura | **EN COTIZACIÓN** (pliego SP-OC-2026-002). Opciones: Casa Bernabé (7.5HP pistón) y **BTA Tools (7.5HP 3 cilindros, 895 L/min, mando indirecto)** — opción preferida. |
| Bomba elevadora | Entre Roboqbo y LSL | Sin verificar viscosidad hummus |
| Rompedora de Huevos | 1.75×1.15m, 300W, requiere 6 bar/10 L/min aire | Pendiente instalación sala dedicada |

### Máquinas Chinas (Manuales disponibles, destino: ampliación trasera futura)
| Manual | Equipo | Notas |
|--------|--------|-------|
| 敲蛋机说明书 | Rompedora de Huevos | Ya tenemos. Sala 2.8×2.3m definida |
| Liofilizadora.docx | Liofilizadora | Ya tenemos ORZF-5. Posible 2da liofilizadora a futuro |
| Autoclave.pdf | Autoclave | Ya tenemos. Pendiente instalación |
| 均质机英文说明书 | Homogeneizador | Para línea de huevos futura |
| 单罐杀菌机 | Pasteurizador tanque único | Para línea de huevos futura |
| 英文无厂名卧式膏体灌装机 | Llenadora de pasta horizontal | Para línea de huevos futura |
| 速冻柜英文文说明书 | Blast Freezer/Speed Freezer | Para línea de huevos futura |
| 380V制冷罐说明书 | Tanque de refrigeración 380V | Para línea de huevos futura |
| 10L spray dryer | Spray Dryer 10L | Para línea futura |

## PERSONAL POR LÍNEA (Actualizado 2026-05-22)
| Nombre | Líneas | Turno |
|--------|--------|-------|
| Dani + Karen | Línea Roboqbo (A) | Ambos turnos (mañana + tarde), trabajan juntas |
| **Jefe de Cocina** | Líder de producción Línea B/G (Tartas, Tortillas, Empanadas, Escabeches) | Mañana y Tarde. Tiene operarios a cargo — NO asumir que hace las tareas directamente. |
| Operarios de cocina | Tareas de envasado, armado, traslado | Asignados por Jefe de Cocina según necesidad |

## LÍNEAS DE PRODUCCIÓN

### Línea A — Roboqbo: Mermeladas/Hummus/Salsas/Patés (Mañana + Tarde)
```
ROBOQBO → Bomba → LSL Llenadora → RSL Tapadora → AUTOCLAVE → Control de Calidad → Liberado/Reproceso/Decomiso → PT
```
- **Encargadas:** Dani + Karen (ambos turnos)
- Tolva LSL 60L = caben 2+ batches de Roboqbo
- Requiere aire comprimido (compresor)
- Línea más explayada gracias a la ampliación (más espacio de circulación)

### Línea A-bis — Escabeches/Encurtidos/Aceitunas EN OLLA (Horario flexible)
```
Preparación en OLLA → Cocción → Llenado manual → Tapado → AUTOCLAVE (compartido) → Control de Calidad → Liberado/Reproceso/Decomiso → PT
```
- **Encargada:** Any (turnos flexibles o días alternados según necesidad)
- **NO usa Roboqbo** — línea independiente, cocción artesanal en olla
- Reprocesos frecuentes (falta líquido/aceite)
- Aceitunas: envasado manual, no usan tapadora Cadec
- Comparte Autoclave con Línea A

### Línea B — Tartas y Tortillas (Turno Mañana)
```
Amasado (área nueva) → Sobadora → Mesada 3×0.9m (corte manual) → Armado → Horno (Rational/Pizzero) → Enfriadora Rápida → Turbovar (vacío) → Cámara fría (externa) → PT
```
- **Encargada:** Any (+ Ana según necesidad)
- Amasado a mudarse a nueva área TACC-free (módulo exterior)
- Freidora: papas para tortillas (en cocina)
- Rompedora de huevos en habitación separada adyacente

### Línea C — Liofilizados (Por definir)
```
Preparación → Blast Chiller (pre-enfriamiento) → Liofilizadora ORZF-5 (12-24-48hs) → Envasado → Control de Calidad → PT
```
- Blast Chiller compartido con Línea B (coordinar turnos)
- Control de calidad obligatorio antes de liberación

### Línea D — Aceitunas y Aceites
- **Aceitunas:** Envasado manual en cocina, tapadora Cadec NO aplica
- **Aceites:** Llegan ya envasados, solo se etiquetan. No pasan por cocina → directo a PT/etiquetado

### Línea E — Viandas (Inactiva)
```
Preparación → Cocción (Sous vide / Wok) → Envasado → Control de Calidad → PT
```
- Sous vide, wok, crepes — Equipamiento existente, producción pausada

### Línea F — Huevos
- Distribución desde Buratovich, no producción local

### Línea G — Empanadas Congeladas (NUEVA — en implementación)
```
Rellenos (preparados en cocina, turno mañana) → Transporte a área TACC → Sobadora → Línea Continua Automática (lamina, corta, dosifica, cierra) → Cámara de Congelados (congelamiento lento, NO abatidor) → Embolsado simple (termosellado, SIN vacío) → PT
```
- **Notas Operativas:**
- Encargada: Any
- Espacio físico: Módulo Exterior Harinas
- Equipo necesario: Línea Continua Automática de Empanadas (cotizaciones en curso: Sel-Maq, Empamec/ESTMAR u otros). Capacidad estimada: 1.000-2.000 u/hora.
- **Congelamiento:** Las empanadas se congelan en la cámara de congelados (NO en el abatidor). Se pueden embolsar al turno siguiente.
- **Empaque:** Termosellado en bolsas plásticas simples (IQF). NO requieren vacío.
- **Variedades iniciales (básicas):** Jamón y queso, carne a cuchillo, carne picada, cuatro quesos, roquefort y nuez, humita, verdura (espinaca).
- **Variedades futuras (premium):** Carne desmechada, bondiola, panceta y cebolla, etc.
- **Nueva Unidad de Negocios (Proyectada):** Venta de tapas de empanadas y pascualinas crudas al público (requerirá que el tren de laminado posea módulo interfoliador de nylon).

---

## OBRAS Y PROYECTOS DE INFRAESTRUCTURA

### Obra 1: Módulo Exterior Harinas / Área TACC-free (4×4m)
- **Ref Pliego:** SP-OC-2026-004
- **Estado real (28-May-2026):** ⚠️ EN COTIZACIÓN — Presupuestos de estructura ($20.18M ARS) y electricidad/plomería ($1.44M ARS M.O. + materiales) recibidos. Pendiente aprobación de dirección.
- **Evolución:** Inicialmente se planificó como mampara de amasado 4×2m dentro de la cocina (SP-OC-2026-003). Se CANCELÓ la mampara y se decidió construir un módulo completo 4×4×2.8m (~16 m²) fuera de la cocina.
- **Presupuesto recibido:** 
  - Estructura: $20.187.536,52 ARS (paneles Arneg + PIR 50mm + piso OSB con chapa aluminio). Ojo: no incluye puerta física, solo la abertura.
  - Electricidad y Plomería: $1.020.000 (M.O. electricidad) + $420.000 (M.O. agua).
- **Notas técnicas acordadas:** 
  1. **Logística:** Se evalúa construir por partes para evitar costos elevados de flete e hidrogrúa.
  2. **Rampa y Desagües:** Rampa contemplada verbalmente. Desagües se unificarán en un presupuesto general de planta.
  3. **Pendiente a futuro:** Faltará cotizar puerta, cortina de lamas de PVC y equipo de climatización (aire acondicionado).

### Objetivos de la Empresa
1. **Escalado de Tartas y Pastas:** Alcanzar la producción de 2.000 tartas diarias (4.000 discos) más la línea completa de pastas y salsas en envases Doypack.
2. **Nueva Línea de Empanadas:** Incorporar producción masiva de empanadas semicongeladas.
3. **Nueva Línea Retail (B2C):** Aprovechar la capacidad ociosa de la maquinaria de corte para envasar y vender "Tapas para Empanadas y Tartas" crudas directamente al público.
4. **Optimización del Layout:** Separar la producción de masas en un módulo externo (4x4m) para evitar contaminación cruzada y cuellos de botella.

- **Distribución interior planificada (13 m² útiles):**
  - Layout en "U".
  - Pared 1 (Ingreso): Estiba de Materia Prima (1.5×0.6m) y Amasadora (0.6×1.2m).
  - Pared 2 (Larga): Tren de Laminado/Cortadora continua (2.5×0.7m).
  - Pared 3 (Salida): Mesa Auxiliar/Empanadas (1.2×0.7m) y estacionamiento para 2 zorras bandejeras.
  - Esquina limpia: Bacha de lavado (1.0×0.6m).
### Obra 2: Instalación Compresor + Línea de Aire
- **Ref Pliego:** SP-OC-2026-002
- **Estado real (12-Jun-2026):** ⚠️ COMPRA POR SEPARADO. Belachur y Nitram descartados permanentemente. **NUEVA COTIZACIÓN RECIBIDA: BTA Tools** (7.5HP, 3 cilindros, 895 L/min, 300L, trif. 380V, mando indirecto). Ofrece pago contado con 5% dto. o e-cheq 0/30/60. Plazo entrega: 1 semana (Flete local en Bahía Blanca sin cargo). Se prefiere esta opción por caudal superior. Casilla cotizada por Mega Herrería. Cañerías SmartPipe por Provín S.A. **Se solicitó presupuesto de instalación a Proing SA (Duración estimada de obra: 1 semana).**
- **Especificaciones compresor:** 7.5HP, 3 cilindros, mando indirecto, tanque 300L, trifásico 380V, caudal 895 L/min.
- **Nota:** El compresor se dimensionó a 7.5 HP para alimentar la demanda simultánea total: Tapadora RLS (100 L/min) + Autoclave (50 L/min) + Rompedora (10 L/min) + Llenadora LSL (10 L/min) = **170 L/min**. Con un margen de seguridad del 30%, la demanda máxima es de **221 L/min a 6 bar**, muy por debajo de los ~895 L/min que genera el equipo BTA Tools.
- **Requisito Técnico:** Es obligatorio instalar un **Regulador de Presión General** a la salida del compresor y FRLs en cada punto de uso para compensar las caídas de presión por filtros y cañerías.
- **Pliego de Materiales:** Se generó un pliego exclusivo para cañerías y accesorios (sin compresor). Archivo: `01_Proyectos > 01_Linea_Aire_Comprimido > Pliegos > Pliego_Materiales_Aire_Comprimido.docx`

### Obra 3: Adecuación Sala Rompedora de Huevos (2.8×2.3m)
- **Ref Pliego:** SP-OC-2026-001 (Rev 1 = V2)
- **Estado real (12-Jun-2026):** 💰 COTIZADO por Gabriel. Total M.O.: $4.330.000. Materiales (Albañilería+Terminaciones): $2.430.546. **TOTAL: $6.760.546** + 8% Honorarios. *Nota: La rompedora NO cabe en el depósito actual ni en la cocina, por lo que NO se puede hacer una prueba temporal. Hay que esperar a tener la sala terminada.*
- **Máquina:** Rompedora automática (1.75×1.15m). Req: 6 bar aire, 10 L/min, 300W, conexión a tierra.
- **Layout definido:** Máquina + bacha pedal inox + tacho cáscaras + mesa huevo líquido + rejilla desagüe + tomas IP65.
- **Archivo layout:** Ver artefacto `layout_rompedora_huevos.md` en la carpeta de la conversación.

### Obra 4: Ampliación Trasera de Fábrica (Futuro)
- **Estado real (22-May-2026):** ❌ IDEA / CONCEPTO — No hay pliego ni cotización.
- **Concepto:** Ampliación de la fábrica hacia atrás para albergar:
  - Toda la línea de procesamiento de huevos (máquinas chinas: pasteurizador, homogeneizador, tanque refrigeración, llenadora de pasta, blast freezer).
  - Posiblemente una 2da liofilizadora.
  - Infraestructura asociada (electricidad 380V, aire comprimido, agua, desagües).
- **Se verá a detalle más adelante.**

### Obra 5: Readecuación Desagüe Cloacal
- **Estado real (09-Jun-2026):** 💰 COTIZADO por Gabriel. M.O. de Zanjeo y Montaje: $8.450.000 + 8% Honorarios. Nueva conexión cloacal no incluida.
- **Motivo:** Correr el trazado ~2m a la derecha (mirando a la calle). Actualmente las tapas de registro quedaron tapadas por el reefer, y la única tapa libre quedará justo debajo del futuro Módulo Exterior de Harinas.
- **Concepto:** Se hace ahora planificando acceso fácil y teniendo en cuenta la futura Ampliación Trasera de Fábrica.

### Obra 6: Relevamiento Eléctrico y Estabilizador
- **Estado real (11-Jun-2026):** ⚠️ EN PROCESO. Se visitó la fábrica con Gustavo (electricista industrial nuevo). Plan: pedir a Gabriel el relevamiento existente; si no lo entrega, Gustavo lo hace desde cero. Posiblemente Gustavo haga la instalación de los estabilizadores.
- **Concepto:** Relevamiento completo de la fábrica actual para conocer capacidad de carga máxima sin riesgo antes de conectar los equipos nuevos.
- **Protección Roboqbo:** 💰 COTIZADO por Gabriel/Electroprima: 3 Estabilizadores SOLYTEC ST-11KVA BOOSTER ($10.718.331) + Montaje $1.300.000 + 8% Honorarios. **TAMBIÉN se pidió cotización DIRECTA a Solytec** (pendiente respuesta).

### Proyecto 7: Reemplazo de Cajones Logísticos
- **Carpeta:** `01_Proyectos\09_Reemplazo_Cajones_Logisticos`
- **Estado real (10-Jun-2026):** 💡 EN EVALUACIÓN INICIAL.
- **Concepto:** Reemplazar los 100 cajones de madera actuales por cajones plásticos (30×50×25cm). Se inicia con una primera tanda de 50 cajones para optimizar el ciclo de uso acelerando la dinámica en el área de etiquetado.

### Proyecto 8: Integración Horno Argental y Abatidor Nuevo
- **Carpeta:** `01_Proyectos\10_Integracion_Argental_Abatidor`
- **Estado real (12-Jun-2026):** 💡 REEVALUANDO MODELO. Visita técnica realizada. Horno rotativo descartado. Evaluando hornos compactos de 8 bandejas.
- **Bloqueante de Altura (Panier III descartado):**
  - La visita técnica confirmó que el Horno Rotativo Panier III (4570) no entra de alto bajo la campana extractora de la cocina, ya que la campana deja un límite de altura máximo de 2 metros.
  - **Decisión de Dirección:** "Se descarta la idea de sacar la campana. Eso no se toca."
- **Nueva Estrategia (Novedad 12-Jun):**
  - Se descarta el horno rotativo con carro.
  - Se llamó al vendedor para evaluar modelos compactos de 8 bandejas que quepan sin necesidad de alterar la infraestructura de la campana extractora.

---

## PLIEGOS TÉCNICOS — RESUMEN
| Ref | Proyecto | Destinatario | Dimensiones | Estado Real |
|-----|----------|-------------|-------------|-------------|
| SP-OC-2026-001 | Adecuación Sala Rompedora Huevos | Arq. Gabriel | 2.8×2.3m | Pliego V2 enviado a Gabriel para cotizar |
| SP-OC-2026-002 | Compresor + Línea de Aire | Compras por separado | 7.5HP | Belachur descartado. Consiguiendo precios individuales. |
| SP-OC-2026-003 | ~~Mampara Área de Amasado~~ | ~~Metalúrgica Belachur~~ | ~~4×2×2.5m~~ | **CANCELADO** |
| SP-OC-2026-004 | Módulo Exterior Harinas (TACC-free) | Arquitecto (Rosario) | 4×4×2.8m | EN COTIZACIÓN (presup. $20.18M recibido) |

---

## CATÁLOGO DE PRODUCTOS (Actualizado con códigos de artículo)

### Línea A — Conservas/Mermeladas/Hummus/Salsas
| Código | Producto |
|--------|----------|
| 04010000 | Confitura de Arándano x 215g |
| 04010001 | Mermelada de Ciruela x 430g |
| 04010002 | Mermelada de Durazno x 430g |
| 04010003 | Mermelada de Frutilla x 430g |
| 04010004 | Mermelada de Higo x 430g |
| 04010005 | Mermelada de Naranja x 430g |
| 04010006 | Mermelada de Pera x 450g |
| 04010007 | Mermelada de Tomate x 430g |
| 04010008 | Mermelada Zapallo/Manzana x 450g |
| 04030000 | Mermelada de Arándano BC x 215g |
| 02030002 | Berenjena en Escabeche x 360g |
| 02030004 | Lentejas en Escabeche x 330g |
| 02030005 | Morrones en Escabeche x 450g |
| 02030008 | Porotos Pallares en Escabeche x 330g |
| 02030011 | Garbanzos en Escabeche x 330g |
| 02020000 | Pepinillos en Vinagre x 450g |
| 02020002 | Encurtidos Mixtos SP x 400g |
| 02020005 | Ajíes en Vinagre x 350g |
| 02020006 | Ajíes en Vinagre x 750g |
| 03010000 | Hummus con Guacamole x 220g |
| 03010001 | Hummus de Finas Hierbas x 220g |
| 03010002 | Hummus de Ajo x 220g |
| 03010003 | Hummus de Berenjena x 220g |
| 03010004 | Hummus de Pimientos x 220g |
| 03010005 | Hummus de Remolacha x 220g |
| 03010006 | Hummus de Zanahoria x 220g |
| 03010007 | Hummus Tradicional x 220g |
| 03020000 | Babaganush Ber/Pi/Ag x 215g |
| 03020001 | Babaganush de Berenjena x 215g |
| 03020002 | Paté de Cebolla Morada x 215g |
| 03020004 | Paté de Remolacha x 215g |
| 03020005 | Paté de Tomate x 215g |
| 03020006 | Paté de Zanahoria x 215g |
| 02010000 | Tomate Cherry Confitado x 335g |
| 02010001 | Tomates Confitados x 340g |
| 02010002 | Cebolla Caramelizada x 160g |
| 08010000 | Tomate Triturado x 940g |
| 08010001 | Tomate Triturado x 500g |
| 04020000 | Zapallo en Almíbar x 750g |
| 04020001 | Higos en Almíbar x 840g |
| 04020002 | Higos en Almíbar x 450g |

### Línea B — Tartas y Tortillas
| Código | Producto |
|--------|----------|
| 07010000 | Tortilla Papa y Cebolla x 600g |
| 07010001 | Tortilla Papa x 600g |
| 07020000 | Tarta Calabaza |
| 07020001 | Tarta Acelga |
| 07020002 | Tarta de Verduras Asadas |
| 07020003 | Tarta Caprese |
| 07020004 | Tarta Humita |
| 07020005 | Tarta Jamón y Queso |
| 07020006 | Tarta Cebolla Caramelizada |
| 07020007 | Tarta Calabaza INTEGRAL |
| 07020008 | Tarta Acelga INTEGRAL |
| 07020009 | Tarta Verduras Asadas INTEGRAL |
| 07020010 | Tarta Caprese INTEGRAL |
| 07020011 | Tarta Humita INTEGRAL |
| 07020012 | Tarta Cebolla Caramelizada INTEGRAL |

### Línea D — Aceitunas y Aceites
| Código | Producto |
|--------|----------|
| 05010001 | AC VE C/C N°0 x 370g |
| 05010002 | AC VE C/C N°0 x 1.55kg |
| 05010006 | AC VE S/C N°0 x 1.38kg |
| 05010010 | AC VE RELL N°0 x 1.55kg |
| 05010011 | AC VE C/C N°00 x 370g |
| 05020002 | AC NEG C/C N°0 x 1.55kg |
| 05020003 | AC NEG C/C N°0 x 8kg |

---

## SISTEMA DIGITAL — FORMULARIO DE REPORTE DIARIO
- **Tecnología:** Google Apps Script Web App + Google Sheets
- **Versión actual:** V3.2 (evolución: V2.1 → V3.2)
- **Hojas del Sheet:** Registros, Controles, Lista de Productos, Lotes, Opciones
- **Columnas Lista de Productos:** Productos, Código de Artículo, Categoría, Desc. Adicional, Familia + columnas Si/No por sección
- **Secciones del formulario:** Producción (con desglose por lote, °Brix, PH), Reproceso (con adición de múltiples insumos), Decomiso/Descarte, Mermas/Recuperos, En Proceso, Comentarios/Novedades
- **Algoritmo Lotes Mágicos:** Se implementó una normalización (NFD) para cruzar automáticamente los insumos con sus lotes sin importar si tienen tildes o diferencias de mayúsculas (ej. PATÉ vs pate).
- **Auto-detección Estado:** El código ahora re-lee los headers tras la inserción y busca explícitamente "Estado", arrastrando el data validation (desplegables) automáticamente a las nuevas filas.
- **Lógica E/S:** Producción=E, Decomiso=S, Mermas=según tipo (Pérdida=S, Recupero=E)

## GOOGLE SHEETS DE PRODUCCIÓN (4 hojas)

### 1. Registros Web App
- **ID:** `10ym38nAt6UfymKKZpemMyUmkSki4grXnesZznxNHhLg`
- **Descripción:** Salida formulario Web App.
- **Archivo local:** `sheet_registros_webapp.csv` — Última actualización: 2026-05-07

### 2. Producción FÁBRICA (Histórico)
- **ID:** `1QHWpmZLaRWAaWedIlWY1iroPnPe4IOnzAJRiyg5Gw0k`
- **Descripción:** Registro histórico Nov 2024 — Jun 2025 (~800+ registros).
- **Archivo local:** `sheet_produccion_fabrica.csv` — Última actualización: 2026-05-07

### 3. Insumos Necesarios
- **ID:** `1xRI331CIEk2-UnM8R6QwmOXSpm8xytsRbCy6fvgHzZ0`
- **Descripción:** Planificación compras. Total necesario $322M ARS, a comprar $245M ARS.
- **Archivo local:** `sheet_insumos_necesarios.csv` — Última actualización: 2026-05-07

### 4. Fórmulas / Recetas (BOM)
- **ID:** `19QO5Gnqut6j5zQ4eIE9jZeAWdUlx7xX31-D8dC_v0WI`
- **Descripción:** Bill of Materials escabeches.
- **Archivo local:** `sheet_formulas_recetas.csv` — Última actualización: 2026-05-07

---

## BRANDING
- **Color primario:** #4A5D23 (verde oliva)
- **Color secundario:** #7A9B3A (verde claro)
- **Acento:** #C5D6A0
- **Fondo:** #f5f5ee
- **Fuente:** Segoe UI / Calibri

---

## REGISTRO HISTÓRICO DE DECISIONES

| Fecha | Decisión | Motivo | Reemplaza | Documentos Asociados |
|-------|----------|--------|-----------|---------------------|
| Abr 2026 | Creación Plan Maestro V1 | Presentación a Dirección — readecuación completa de planta | — | `Plan_Maestro\01_Plan_Maestro.doc` |
| Abr 2026 | Definición rol Jefe de Operaciones | Formalizar responsabilidades de Juan Manuel | — | `Propuesta_Rol_Operaciones.docx` |
| Abr 2026 | Proyecto mampara amasado 4×2m | Separar zona amasado dentro de cocina | — | `Pliego Mampara Area Amasado.docx`, `Mampara_Amasado_2D.dxf` |
| Abr-May 2026 | **CANCELACIÓN mampara → Ampliación TACC-free 4×4m** | Se decidió que la mampara era insuficiente; mejor construir un módulo completo fuera de cocina que libere espacio y permita TACC-free + empanadas | SP-OC-2026-003 | `Pliego Ampliacion Area TACC - Sabor Pampeano.docx` (SP-OC-2026-004) |
| May 2026 | Pliego compresor a Belachur | Necesidad de aire comprimido para Cadec + Rompedora | — | `Pliego Línea compresor - Sabor Pampeano.docx` (SP-OC-2026-002) |
| May 2026 | Pliego rompedora V1 | Adecuación básica sala 2.8×2.3m | — | `Pliego Rompedora Huevos - Sabor Pampeano.docx` (SP-OC-2026-001) |
| 22-May-2026 | Pliego rompedora V2 | Se descubrió del manual que necesita aire comprimido (6 bar) y tomas IP65 | SP-OC-2026-001 V1 | `Pliego Rompedora Huevos - Sabor Pampeano_V2.docx` |
| 22-May-2026 | Layout sala rompedora definido | Distribución: máquina + bacha + tacho + mesa + rejilla | — | Artefacto `layout_rompedora_huevos.md` |
| 22-May-2026 | Análisis presupuesto módulo harinas | Presupuesto arquitecto recibido ($20.18M) — es solo el "cascarón". Falta electricidad, agua, climatización, flete. Riesgo piso OSB. | — | PDF en Descargas: `PRESUPUESTO MODULO EXTERIOR HARINAS.pdf` |
| 28-May-2026 | Análisis anexo Luz/Agua Módulo | Se revisaron presupuestos de luz y plomería. Se acordó construir el módulo por partes para evitar hidrogrúa, y derivar los desagües a un proyecto general de planta. | — | Presupuestos Módulo Exterior |
| 08-Jun-2026 | Creación de Dashboard Interactivo | Se creó Planificación y Proyectos.html (reemplazo de Estado_Proyectos.html). Dashboard avanzado estilo web con navegación lateral, gestión por prioridades (estrellas 1-5), enlaces directos a presupuestos/pliegos y auto-sincronización con esta Biblia. | Estado_Proyectos.html | `Planificación y Proyectos.html` |
| 08-Jun-2026 | Modificación Obra Desagüe Cloacal | Necesidad de correr cloaca 2m a la derecha por interferencia con el reefer y futura sala de harinas. | — | — |
| 08-Jun-2026 | Cambio estrategia Aire Comprimido | Presupuesto Belachur descartado 100%. Se decide comprar equipos e insumos por separado y escalar el compresor a 7.5HP. | — | — |
| 08-Jun-2026 | Despliegue de Formulario V3.2 | Se arreglaron bugs críticos: la columna "Estado" no copiaba el desplegable (ahora se detecta dinámicamente) y el auto-completado de lotes fallaba por tildes/espacios (solucionado con normalización NFD). | Formulario V2.1 | `Code_v3.2.gs` |
| 08-Jun-2026 | Reorganización completa del Workspace | Se pasó de estructura orgánica a 6 áreas numeradas. Se borraron archivos basura de CAD. Se crearon archivos Z_Archivo_Historico para ordenar. | — | Ver nuevo índice. |
| 08-Jun-2026 | Prueba Piloto Moldes Microperforados | Se aprobó comprar 10-20 moldes microperforados de chapa oscura para probar mejorar el piso de las tartas. | — | `Reporte_Gerencia.pdf` |
| 08-Jun-2026 | Evaluación Cotización Aire Nitram | Se revisó cotización Nitram ($1.07M) y solo cotizaron tubería de 1" y 4 válvulas de corte. Faltan compresor, FRLs, mangueras y acoples. | — | `Presupuesto_Nitram_AireComprimido.pdf` |
| Jun 2026 | Cotizaciones Spiing MCD2 recibidas | Se recibieron cotizaciones formales de Spiing para la cortadora de discos. | — | `Resumen_Compras_Fase1.html` |
| Jun 2026 | Decisión: Línea Continua Automática de Empanadas | Se descartó la armadora semiautomática (DGMAX/Dosarmec) y se optó por una línea continua 100% automática. En proceso de cotización. | DGMAX 4 PRO / Dosarmec | `Resumen_Compras_Fase1.html` |
| Jun 2026 | Lógica térmica dividida | Se define separar el flujo: lo cocinado en horno Rational pasa al Abatidor Viejo. Lo cocinado en horno Argental pasará a un Abatidor Nuevo (a definir) mediante carro bandejero directo. | — | — |
| Jun 2026 | Variedades iniciales de empanadas definidas | Básicas: J&Q, carne a cuchillo, carne picada, 4 quesos, roquefort y nuez, humita, verdura. Futuras: carne desmechada, bondiola, panceta y cebolla. | — | — |
| Jun 2026 | Peladora de papas arreglada | Se cambió la correa de la peladora abrasiva. Ya funciona bien. | — | — |
| Jun 2026 | Fumigación y Limpieza | Se realizó fumigación integral contra cucarachas seguida de limpieza profunda el día sábado. | — | — |
| Jun 2026 | Horno Rotativo Panier III 4570 | Juan (el dueño) pidió que se cotice en Argental. Es compra nueva, NO está en planta. | — | — |
| Jun 2026 | Resumen de Compras Fase 1 | Se generó documento ejecutivo para presentar al dueño con todas las máquinas elegidas y sus precios. | — | `Resumen_Compras_Fase1.html`, `Resumen_Compras_Fase1.pdf` |
| 08-Jun-2026 | Backup Automático Inteligente | Se creó script en PowerShell (`backup_script.ps1`) y tarea programada (`SaborPampeano_WorkspaceBackup`). Se ejecuta **todos los días** y guarda en OneDrive\Desktop. Retención automática: 1er mes (todos los días), 2do mes (1 por semana), 3er mes en adelante (1 por mes). Se ejecuta solo y en segundo plano sin intervención. | — | `backup_script.ps1` |
| 08-Jun-2026 | Reestructuración Workspace a Proyectos | Se abandonó la estructura departamental (01-06) y se migró a una arquitectura orientada a proyectos: `01_Proyectos` (con subcarpetas independientes por proyecto), `02_Operaciones_de_Fabrica`, `03_Herramientas_Sistemas`. Dashboard se movió a `00_Dashboard_Proyectos`. | Estructura V2 (departamental) | `AI_INSTRUCTIONS.md` actualizado |
| 08-Jun-2026 | Pliego de Materiales Aire Comprimido | Se generó pliego exclusivo para cotizar cañerías y accesorios (sin compresor): caño aluminio SmartPipe 25mm, 12m de manguera PU 12mm, regulador de presión, filtro coalescente, derivaciones y acoples rápidos. | — | `Pliego_Materiales_Aire_Comprimido.docx` |
| 09-Jun-2026 | Nueva cotización BTA Tools recibida | Se recibió presupuesto con 2 opciones de compresor trifásico 380V: **Opción 1: 7.5HP, 3 cilindros, 895 L/min, $ver PDF** / Opción 2: 5.5HP, 2 cilindros, 620 L/min. Se descartó la de 5.5HP (menor caudal, 2 cilindros = más calor, menos vida útil). Se prefiere la de 7.5HP. Pago: contado -5% o e-cheq 0/30/60. Entrega: 1 semana. | — | `Presupuesto_BTATools_Compresor_Alternativa.pdf` |

---

## COTIZACIONES RECIBIDAS — MAQUINARIA

| Proveedor | Equipo | Precio | Detalles | Estado |
|-----------|--------|--------|----------|--------|
| Spiing | MCD2 **Usada** (con garantía) | USD 9.500 | 350-500 doc/hora. 1 cabezal 130mm + mesa, 1 cabezal 140mm + mesa, 1 calibrador de masa. Obsequio: 1 cabezal o 1 tolva harinadora. | ✅ Cotización recibida |
| Spiing | MCD2 **Nueva** | USD 13.500 | 350-500 doc/hora. 1 cabezal (diámetro a elección) + mesa, 1 cabezal (diámetro a elección) + mesa, 1 calibrador de masa. Obsequio: 1 cabezal o 1 tolva harinadora. | ✅ Cotización recibida |
| Spiing | MCD5 | USD 17.500 | Mayor capacidad. | ✅ Cotización recibida (descartada por espacio) |
| Argental | Sobadora Pesada Blindada | ~USD 8.000 (estimado) | Rodillos pesados, laminado exacto, incansable. | ⚠️ Pendiente cotización formal |
| Argental | Horno Rotativo Panier III 4570 | **USD 11.672,66 c/IVA** | Opciones de bandejas soportadas: **45×70, 45×65, o 40×60 cm (cap. 15 bandejas).** Trabaja con carro bandejero directo. Acero inox exterior, doble vidrio, vaporización manual, panel programable, 50.000 Kcal/h, 1.75 kW/h accionamientos, 380V trifásico, gancho aéreo. | ⚠️ A Definir tamaño de bandeja |
| Sel-Maq / Empamec | Línea Continua Automática Empanadas | A cotizar | 1.000-2.000 u/hora, 100% automática. Analizar opción VENTA vs ALQUILER. Medidas Empamec: 2.6m x 0.7m x 0.9m. | ⚠️ En evaluación |

| — | Selladora Térmica de Pedal | ~USD 300-500 | Termosellado de bolsas para empanadas congeladas (IQF). | ⚠️ Pendiente compra |

| 08-Jun-2026 | Nueva Estantería Cocina (1.5m) | Se inició armado de una estantería de 1.5m para optimizar espacio en la cocina en reemplazo de la original. Faltan pintar estantes con epoxi y reubicar. | — | Reporte verbal |

---

## TEMAS PENDIENTES (CONFIRMAR ESTADO CON JUAN MANUEL)
- [ ] Verificar capacidad bomba para viscosidad hummus
- [ ] Armar esquema de tiempos coordinados Abatidor (Línea B vs C)
- [ ] Contratar técnico electromecánico (mantenimiento preventivo/correctivo/predictivo)
- [ ] Sistema de seguridad: cámaras, cerraduras, lector código de barras
- [ ] Sistema de pedido interno para almacén de secos
- [ ] Depósito PT: pendiente de verificar/reorganizar
- [ ] **Cotizar ampliación 4×4m** — presupuesto recibido, pendiente decisión
- [x] ~~Definir marca/modelo empanadora semiautomática~~ → Se cambió a Línea Continua Automática (Jun 2026)
- [x] ~~Definir variedades de empanadas congeladas y sus rellenos~~ → Definidas (Jun 2026)
- [ ] **Instalación Liofilizadora ORZF-5**
- [ ] **Registrar Línea G (empanadas) en sistema Web App**
- [ ] **Aprobar presupuesto Gabriel: Sala Rompedora de Huevos ($6.76M + mats elect/plom)**
- [ ] **Aprobar presupuesto Gabriel: Reforma Desagüe Cloacal (M.O. $8.450.000)**
- [ ] **Aprobar presupuesto Gabriel: Estabilizadores Roboqbo (Equipos $10.7M + M.O. $1.3M)**
- [ ] **Recibir informe de relevamiento eléctrico de Gabriel (capacidad de carga máxima) - PENDIENTE**
- [ ] **Confirmar método de construcción por partes para módulo prefabricado**
- [ ] **Cotizar instalaciones faltantes del módulo (puerta, cortina PVC, aire acondicionado)**
- [ ] **Contactar instalador para mano de obra de línea de aire comprimido (7.5HP)**
- [ ] **Cotizar Equipamiento Modular (Plan B)** — buscar presupuesto para Sobadora Automática (Argental/Pauna), Cortadora de Discos (Spiing/Empatec) y Armadora Rotativa (Dosarmec).**
- [ ] **Comprar 10-20 moldes microperforados para Prueba Piloto de Tartas**
- [ ] **Aprobar cotización final del proyecto de aire comprimido: Compresor BTA Tools 7.5HP (preferida) o Casa Bernabé + Casilla Mega Herrería + Cañerías Provín S.A. (recotizar con pliego actualizado)**
- [ ] **Recibir cotización formal Sobadora Pesada Argental**
- [ ] **Definir compra de Horno Argental ($11.6k vs $19.2k) y coordinar desarme (puerta 1.5m)**
- [ ] **Evaluar cotizaciones Línea Continua (Analizar opción ALQUILER vs VENTA en Empamec)**
- [ ] **Revisar abatidor viejo (averiguar por qué no funciona)**
- [ ] **Verificar si la cámara de frío de la cocina sale por la puerta armada o hay que desarmarla para la reubicación**
- [ ] ~~Comprar Selladora Térmica de Pedal (~USD 300-500)~~ → PROYECTO PAUSADO. Se evaluará cuando haya cortadora de discos y layout B2C.
- [ ] **Revisar y actualizar Plan Maestro V2 con cronograma real**
- [x] ~~Terminar armado estantería para cámara de frío (identificación de lotes tartas/tortillas)~~ → HECHO (12-Jun). Se utilizarán papeles adhesivos temporales por bandeja indicando el lote hasta que se compren los contadores de 4 dígitos.
- [ ] **Comprar 50 cajones plásticos (30×50×25cm)** para reemplazar gradualmente la madera. Estrategia: comprar tanda inicial y buscar optimizar el uso de los cajones mejorando la velocidad en el área de etiquetado, evitando comprar 100 de una vez.
- [ ] **Decisión clave de compra:** El horno Argental ofrece 3 opciones (45x70, 45x65, 40x60). Como el Abatidor Chino Nuevo tiene 60cm de profundidad, **la única opción de bandejas para el Argental que entraría en el abatidor sin chocar con la puerta es la de 40x60 cm.** Confirmar si el abatidor es de tipo "Roll-in" (entra el carro entero) o de guías (hay que pasar las bandejas a mano).

---

## CIRCUITO TÉRMICO — LÓGICA DE BANDEJAS (10-Jun-2026)

### Circuito 1 (Existente — Ya compatible)
- **Horno:** Rational → bandejas GN 1/1 = **32,5 × 52,5 cm**
- **Abatidor:** Viejo → mismo tamaño **32,5 × 52,5 cm**
- **Intercambio directo:** ✅ Sí. Las bandejas del Rational sirven en el abatidor viejo y viceversa sin modificaciones.

### Circuito 2 (Nuevo — A implementar)
- **Horno:** Argental Panier III → bandejas **40 × 60 cm** (única opción válida por restricción del abatidor chino)
- **Abatidor:** Chino Nuevo → guías internas de 56-58 cm de ancho × 60 cm de profundidad

**Hallazgo clave (10-Jun-2026):** Las bandejas de **40×60 cm** del carro Argental **SÍ caben en el abatidor chino girándolas 90°**: el lado de 60 cm apoya sobre las guías de 56-58 cm de ancho, y la bandeja entra 40 cm en profundidad (dejando ~20 cm libres al fondo). Esto permite **pasar el producto caliente del carro directamente al abatidor sin maniobrar cada bandeja individualmente**, ahorrando tiempo y manipulación.

- **Las bandejas del abatidor chino NO sirven para el horno Argental** (son más anchas, 56×60 cm, no entran en el Argental).
- **Pendiente confirmar:** Si el abatidor chino es de tipo "Roll-in" (entra el carro completo empujado con ruedas) o de guías (hay que transferir bandejas a mano). El Roll-in sería el escenario ideal.

