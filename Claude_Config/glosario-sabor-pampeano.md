# Glosario Sabor Pampeano

> Vocabulario del negocio extraído de las 58 conversaciones de Antigravity + auditoría adversarial cruzando contra BIBLIA, Drive inventory y artifacts reales. Claude debe entender estos términos como propios — Juan los va a usar sin explicar.
>
> **v2 — corregido y completado tras auditoría R1.**

---

## Productos / SKUs

> Total declarado: **44 SKUs**. Los archivos individuales de receta no existen como `.docx` — las recetas vivas están en la **Sheet "Recetas"** (Apps Script). El glosario refleja las líneas y los productos identificados en artifacts.

### Líneas de producción internas (nomenclatura canónica)

| Línea | Productos | Encargada |
|---|---|---|
| **Línea A** | Hummus | Any |
| **Línea A-bis** | Escabeches | Any |
| **Línea B** | Tartas | Any |
| **Línea G** | Empanadas Congeladas | Any |
| (sin letra) | Tortillas, Aceitunas, Huevos cascados | varios |

### Tartas (clásicas + integrales)
- Acelga / Acelga Integral
- Calabaza / Calabaza Integral
- Caprese / Caprese Integral
- Cebolla Caramelizada / Cebolla Caram. Integral
- Verduras Asadas / Verduras Asadas Integral
- Humita / Humita Integral
- Jamón y Queso

### Tortillas
- Papa y Cebolla
- Papa (sola)

### Empanadas
- Línea piloto en montaje (máquina manual para 2 empanadas comprada)
- Variedades por definir (encargada: Any)
- Línea G = Empanadas Congeladas (fluyen por fuera de los abatidores, van directo a congelados)

### Otras líneas activas
- **Hummus** (Línea A) — desde Roboqbo hacia Cadec vía Bomba Elevadora
- **Escabeches** (Línea A-bis)
- **Aceitunas envasadas** — proyecto `12_Estandarizacion_Aceitunas`, SOP `04_Envasado_Aceitunas`
- **Huevos cascados / pasteurizados** — output de la Sala Rompedora, SOP `01_Cascado_Huevos`

### Unidades de negocio futuras
- **Tapas de empanadas y tartas al público** — usando tren laminado Junior 600 con módulo interfoliador. No es SKU actual, es propuesta.

### Categorías terminológicas
- "Tarta" = producto base
- "Integral" = variante con masa integral
- "TACC-Free" = línea libre de gluten (módulo dedicado)

---

## Equipos industriales

### Cocina / producción
- **MCD2** — Cortadora de discos (12 mm). Discos de 40×60 cm.
- **Amasadora** — operativa
- **Llenadora LSL 100CNC** (Cadec) — inyecta relleno, presión 6 bar
- **Tapadora RSL 1800P** (Cadec) — ciclo 4-6 s
- **Horno Argental** — compacto, 8 bandejas, 180°C (12 min)
- **Roboqbo Qbo 25-4** — máquina italiana multifunción
- **Procesadora KW-180** — `EQUIPOS/procesadora/`
- **Peladora** — `EQUIPOS/peladora/`
- **Cortadora** — `EQUIPOS/cortadora/` (4 fotos numeradas)
- **Etiquetadora** — operativa
- **Compresor BTA 300L** — ⚠️ **HP a confirmar**: BIBLIA dice 7.5 HP, resumen al dueño dice 5.5 HP. Análisis técnico valida 7.5 HP. Aprobado $2.250.000.
- **Bomba Elevadora** (Línea A) — pendiente verificar fuerza para empujar hummus de Roboqbo a Cadec
- **Tren de Laminado Junior 600** (MONV) con módulo interfoliador — evaluado para escalar tartas 500 → 2.000 u/día
- **Empanadora semiautomática** — pendiente definición de modelo (distinta de la máquina manual de 2 empanadas)
- **Cremallera** — `EQUIPOS/cremallera/` (sin descripción documentada, preguntar a Juan)
- **Válvula esférica + Batea** — `EQUIPOS/valvula esferica/batea/` (preguntar a Juan)

### Frío / Vacío
- **Cámara de frío** — cuello de botella (15 min para enfriar)
- **Abatidor Friolinux** — `EQUIPOS/abatidora (friolinux)/`
- **Tercer Abatidor Industrial** — Fase 2, romper techo de cristal (bajar enfriado a 5 hs)
- **Envasadora vacío Ehrlich EH19** (Juan a veces escribe "Erlich" sin H)
- **Envasadora vacío Turbovac**
- **Envasadora Continua** — Fase 2, necesaria para 2.500 u/día (bajar vacío a 3,5 hs)
- **Soud Vide Erlich** — combinado en la carpeta `HORNOS ERLICH- SOUD VIDE/`. Juan escribe **"Soud Vide"** (no "Sous Vide") — no es typo, es su naming.

### Aire comprimido (FASE 0/1 activa)
- **Red neumática** — Provín aprobada $1.450.000, pendiente tender cañerías
- **Servicios:** Llenadora, Tapadora, Autoclave, Rompedora
- **Marcas evaluadas:** Kaeser (compresor a tornillo, cotizó Provín), Festo (racores neumáticos premium)

### Máquinas chinas (lote nuevo) — futura ampliación trasera
- **Liofilizador Industrial ORZF-5** (50kg) — `EQUIPOS/maquinas nuevas chinas/Liofilizador Industrial/`
- **Spray dryer 10L** — `Manuales Chinos/10L spray dryer manual.pdf`
- **Autoclave** — `Manuales Chinos/Autoclave.pdf`
- **Llenadora pasta cremas horizontal** — manuales en chino
- **Pasteurizador + Homogeneizador** — pendientes, para futura línea de huevos
- (posible 2da liofilizadora en ampliación)

### Equipos del dashboard / control
- **LST 1001** — equipo con manual de usuario
- **RSL** — manual usuario
- **Estabilizadores** (P1 PAUSADO)

---

## Salas / módulos de la planta

| Sala | Estado | Notas |
|---|---|---|
| **Módulo Exterior Harinas 4x4m (TACC-Free)** | Estructura prefabricada en fabricación | Bloqueado por cloacas. Es "cascarón" (estructura sin rubros internos). Riesgo OSB pudrición en piso. |
| **Sala Rompedora de Huevos** | Pendiente albañil + materiales | Arranca después de la platea del compresor. Output: huevos cascados/pasteurizados. |
| **Cocina principal** | Operativa | Cadec instalado, faltan calibraciones |
| **Cámara de frío** | Cuello de botella | Necesita ventilación forzada / 3er abatidor |
| **Casilla compresor** | Aprobada, platea en proceso | |
| **Depósito Producto Terminado (PT)** | Pendiente reorganizar | |
| **Almacén de secos** | Operativo | Separado, sistema de pedido interno informal |
| **Mampara Area Amasado** | **CANCELADO** | Sustituido por Módulo Exterior Harinas |
| **Ampliación trasera** | Futura | Para línea completa de huevos (pasteurizador, homogeneizador, posible 2da liofilizadora) |

---

## Personas / roles

| Nombre | Rol | Notas |
|---|---|---|
| **Juan Manuel Grasso** | Dueño / operador | `juanmanuelgrasso@saborpampeano.com`. A veces referido como "el dueño" en presentaciones (se habla de sí mismo en tercera persona). |
| **Any** | Chef / encargada de líneas | **Persona central de operaciones**. Cubre Línea B (Tartas), Línea G (Empanadas Congeladas), Línea A-bis (Escabeches). Reemplazó a Raúl. |
| **Raúl** | Chef desvinculado (histórico) | Absorbido por Any. Mencionado por contexto. |
| **Gustavo** | Electricista | Relevamiento eléctrico + plan de mejoramiento |
| **Provín** | Instalador neumático | Tendido de red de aire comprimido. También cotizó compresor a tornillo Kaeser. |
| **Radice** | Constructor | Pilar nuevo para Transformador T3BT 400kVA (P11_A) |
| **Arquitecto Gabriel** | Cotizador de obras civiles | 3 obras principales: Módulo Harinas, Sala Rompedora, ampliación trasera futura |
| **Técnico electromecánico** | Rol pendiente de contratar | Mantenimiento preventivo/correctivo |
| **Trifical** | Proveedor | Moldes microperforados (en evaluación) |
| **Equipos BB** | Proveedor | Carros 60×40 (en evaluación) |
| **Ing. en Alimentos** | Referente técnico (a contratar/consultar) | Antigravity delegaba dudas sanitarias |

---

## Proveedores y marcas

### Activos / en uso
| Marca / Empresa | Equipo / Servicio | Estado |
|---|---|---|
| **Cadec** | Llenadora LSL, Tapadora RSL, Autoclave | Instalados, pendiente puesta en marcha. Contacto: `servicios@cadec.com.ar` / `011-41667867` |
| **BTA** | Compresor 300L 7.5HP | Aprobado |
| **Provín** | Mano de obra red neumática | Aprobado |
| **Friolinux** | Abatidor | Operativo |
| **Ehrlich / Erlich** | Envasadora vacío, Soud Vide | Operativo. Juan escribe sin H. |
| **Turbovac** | Envasadora vacío | Operativo |
| **Roboqbo** (Italia) | Qbo 25-4 multifunción | Operativo |

### Evaluación / cotizaciones recientes
| Marca / Empresa | Equipo / Servicio | Status |
|---|---|---|
| **Argental** | Horno compacto 8 bandejas | Evaluando |
| **MegaHerreria** | Casilla compresor | Cotizado |
| **Casa Bernabe** | Compresor | Cotizado |
| **MANELLI Hnos / BTATools** | Compresor alternativo | Cotizado |
| **Kaeser** | Compresor a tornillo | Cotizó Provín |
| **Festo** | Racores neumáticos premium | Cotizó Provín |
| **MONV** | Tren laminado Junior 600 | Evaluado para escalar tartas |
| **Remoju SRL** | Transformador (P11_A) | En cotización |
| **FOHAMA** | Transformador alternativo (44705) | Cotizado |

### Descartados / excluidos
| Marca | Motivo |
|---|---|
| **Panier III** | Horno rotativo descartado **por altura** |
| **Belachur** | **EXCLUIDO por decisión de dirección** — no llamar |

---

## Conceptos / marcos mentales

### Estado y planificación
- **La BIBLIA** — `03_Herramientas_Sistemas/Herramientas_IA_y_Scripts/contexto_completo.md`. Source of truth del estado de proyectos.
- **Master Plan V3** — documento estratégico de reestructuración
- **44 SKUs** — total de productos
- **Efecto Cascada / Efecto Acordeón** — destrabar un cuello de botella expone el siguiente
- **Techo de Cristal** — límite operativo actual de **1.400 unidades/día** en 1 turno de 8 hs (tartas + tortillas combinados)
- **Meta soñada** — 2.500 unidades/día en 1 turno totales (Fase 2)
- **Capacidad específica tartas** — de 500 a 2.000 tartas/día con tren laminado (este número es solo tartas, no total)
- **Cuellos de botella críticos:** Frío (cámara) y Vacío (envasado)

### Fases del plan (alineadas con BIBLIA — source of truth)
- **FASE 0** — Acciones inmediatas: Cadec (calibraciones), Compresor + casilla + platea, Horno rotativo (evaluando), Relevamiento eléctrico
- **FASE 1** — Protecciones y Aire: red neumática a Llenadora, Tapadora, Autoclave, Rompedora
- **FASE 2** — Obras civiles y montaje: Cloacas, Módulo Harinas TACC-Free, Sala Rompedora
- **FASE 3** — Líneas de Producción: Línea Empanadas (manual piloto comprada; cortadora y sobadora PAUSADAS)

- **P1-P13** — proyectos numerados del inventario maestro (más **P11_A** como sub-proyecto de P11)
- **Empanadas como "financiadora"** — línea genera ~$18.6M/mes y fluye por fuera de los abatidores (van a congelados directo), financiando Fase 2 sin agravar cuello de botella

### Construcción y obras
- **"Cascarón"** — estructura prefabricada sin rubros internos. Juan usa el término para el Módulo Harinas.
- **OSB con riesgo de pudrición** — preocupación específica del piso del módulo

---

## Sistema digital (Apps Script / Sheets)

### Estado actual: **V3.3** (en producción)
Archivos:
- `Code_v3.3.gs` — código principal
- `Index_v3.3.html` — frontend
- `Lotes_v3.3.html` — módulo de lotes
- `StockCode_v3.3.gs` — código control de stock (distinto del Code principal)
- `Stock_v3.3.html` — frontend stock

### Submódulos
- **Formulario_Produccion_Web**
- **Control_Stock_V1**
- **Lotes** (módulo HTML separado)

### Historial
V2.1 (con backup `Backup_Originales_V2.1`) → V3.0 → V3.3
Sub-versiones intermedias: v18-v21 mencionadas en algunos chats

### 4 sheets operativas
- Producción
- Insumos
- Recetas (las recetas reales viven acá, no en archivos sueltos)
- Registros WebApp

### Protocolos
- **`protocolo_desarrollo_seguro.md`** — reglas para desarrollar la webapp sin romper la prod

---

## Sistema de nomenclatura de pliegos

**Formato canónico:** `SP-OC-YYYY-NNN`

Ejemplos reales:
- `SP-OC-2026-001 V2` = Sala Rompedora Huevos
- `SP-OC-2026-002` = Compresor
- `SP-OC-2026-004` = Módulo Exterior Harinas

Cuando Juan diga "el pliego 001" o "SP-OC-2026-NNN", Claude debe buscar en `01_Proyectos/` o en la carpeta del proyecto correspondiente.

---

## KPIs / métricas

- Tiempo de ciclo por operación
- % de rechazos
- Tiempo de cambio de lote
- Capacidad efectiva (unidades / turno)

### Tiempos por producto (desglose por operación)
**Tarta — lote 80 = 1h 45min:**
| Operación | Tiempo | Notas |
|---|---|---|
| Pesaje harina | 0,5 min | |
| Mezclado | 10 min | Optimizable con mezclador mayor |
| Reposo | 30 min | Se solapa con otras ops |
| Corte discos | 0,8 min/10 uds | |
| Llenado | 0,6 min/10 uds | Depende presión aire |
| Tapado | 0,5 min/10 uds | |
| Cocción | 12 min/8 bandejas | 180°C |
| Enfriado | 15 min | Hasta <25°C |
| Etiquetado | 0,3 min/10 uds | |
| Empacado | 0,4 min/10 uds | |

**Tortilla — lote 200 = 1h 10min:**
| Operación | Tiempo |
|---|---|
| Pesaje/carga harina | 0,5 min |
| Amasado | 5 min |
| Corte discos | 0,6 min/10 uds |
| Cocción | 0,5 min/10 uds |
| Enfriado | 2 min |
| Empaque | 0,3 min/10 uds |

---

## Documentos canónicos (templates legacy `.doc`)

Los archivos reales son **.doc** (legacy), no `.docx`. Si Claude busca un template, debe globear ambas extensiones.

- `03_Template_POES.doc` (+ PDF) — Procedimientos Operativos Estandarizados Sanitarios
- `04_Template_Receta.doc` (+ PDF)
- `06_Plan_Mantenimiento.doc` (+ PDF) + planilla separada `MANTENIMIENTO PREVENTIVO.xlsx` en `Gestion_del_Mantenimiento/`
- `05_Cronograma_Gantt.doc` (+ PDF)
- `02_Resumen_Ejecutivo.doc` (+ PDF) — para el dueño
- `01_Plan_Maestro.doc` — histórico (`Z_Archivo_Historico/`)

### SOPs específicos (en `Procedimientos_SOP/`)
- `01_Cascado_Huevos.html`
- `02_Seguridad_Cocina.html`
- `03_Camara_Frio_y_Lotes.html`
- `04_Envasado_Aceitunas.html`

### Otros artifacts canónicos recurrentes
- `Reporte_Gerencia.md` / `.pdf` — reporte interno periódico
- `Pliego_<equipo>.docx` o `.md` — por equipo (outputs nuevos generados por Claude; los templates legacy son `.doc`)
- `Comparativa_presupuestos_<tema>.md`
- `Resumen_reunion_<fecha>.md`

---

## Convenciones de naming detectadas

- Templates: `0N_Template_<TIPO>.<ext>`
- Documentos numerados: `0N_<Nombre>.doc/pdf`
- Versiones en sufijo: `_v2`, `_v7`, `_v21`, `V3.3`
- Apps Script: `<Nombre>_v3.3.<gs|html>`
- Pliegos formales: `SP-OC-YYYY-NNN [Vn]`
- Carpetas EQUIPOS con descripción de estado: `<equipo> (primer borrador word) flojo`, `(envie mail y complete formulario)` — Juan usa el nombre de carpeta como **status interno** del trabajo de documentación
- Fecha en archivo: `_YYYYMMDD`
- WhatsApp dumps: `WhatsApp Unknown YYYY-MM-DD at HH.MM.SS.zip`

---

## Paleta visual

- Verde oliva principal: `#4A5D23`
- Verde claro secundario: `#7A9B3A`
- Fondo beige sugerido: `#F5F0E5`
- Tipografía: sans-serif simple
- Planillas largas: **A4 apaisado**
- Firmas estándar: "Firma Jefe de Cocina" y "Firma Resp. de Cámara"

---

## Puntos pendientes de confirmar con Juan (anotados para preguntar cuando convenga)

1. **Compresor**: ¿7.5 HP o 5.5 HP? La BIBLIA dice 7.5 HP, el resumen al dueño dice 5.5 HP. Análisis técnico valida 7.5 HP.
2. **Capacidades**: ¿500→2.000 son solo tartas y 1.400→2.500 son totales? Aclarar para no confundir métricas.
3. **Empanadora semiautomática**: ¿modelo definitivo?
4. **Cremallera y Válvula esférica + Batea**: ¿qué máquinas son específicamente?
