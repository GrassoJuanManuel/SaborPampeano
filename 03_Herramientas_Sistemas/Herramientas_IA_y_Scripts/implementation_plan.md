# Ampliación de Planta: Área Libre de TACC + Línea Empanadas

## Contexto
Se reemplaza el proyecto de la mampara 4×2m (SP-OC-2026-003) por una **ampliación de planta de ~4×4m** contigua a la cocina pero no conectada directamente, accesible por el pasillo existente. Esta nueva área será **libre de TACC** y alojará la rompedora de huevos, el amasado, y una nueva línea de empanadas.

## Alcance del Trabajo

### 1. Pliego de Obra Civil (SP-OC-2026-004)
Documento técnico para cotizar la ampliación con:
- Construcción en seco con paneles aislantes (igual a cocina existente)
- Piso de hormigón con pintura epoxi
- Rejilla lineal de desagüe en suelo
- Iluminación LED
- A/C y ventilación al exterior
- Cortina tipo carnicería (~1m) en acceso
- Instalación eléctrica (sin panel independiente) y agua
- Equipamiento a ubicar: rompedora, amasadora, sobadora, mesada 3×0.9m, rack de insumos, área empanadas con prensa, 1-2 heladeras

### 2. Actualización del PPT (Presentación Líneas)
Cambios del usuario ya aplicados + nuevos:
- **Dani y Karen:** No asignadas a turno específico, trabajan juntas mañana y tarde en la línea Roboqbo. Raúl NO opera Roboqbo.
- **Slide 3 (Tartas):** Eliminar referencia a mampara, reemplazar por "Área libre de TACC (ampliación 4×4m)"
- **Nueva slide:** Línea Empanadas (nueva)
- **QC:** Agregar control de calidad a liofilizados y viandas
- **Slide 7 (Resumen):** Actualizar con nueva área y línea empanadas

### 3. Actualización del Knowledge Item
- Nuevo layout con ampliación
- Nueva línea de empanadas (Línea G)
- Corrección de asignación de personal
- Cancelación del pliego mampara (SP-OC-2026-003)

## User Review Required

> [!IMPORTANT]
> La idea de la línea de empanadas con prensa, heladeras para rellenos, y área de armado dentro del mismo espacio TACC-free parece viable. La distribución sugerida sería:
> - **Zona 1 (fondo):** Rompedora de huevos (habitación adecuada)
> - **Zona 2 (centro):** Amasado — Amasadora + Sobadora sobre mesada 3×0.9m + Rack insumos (harina, sal, azúcar, manteca, huevos, agua)
> - **Zona 3 (frente):** Empanadas — Mesa de trabajo, prensa/máquina armadora, 1-2 heladeras para rellenos
> - **Rejilla lineal:** A lo largo de la zona de trabajo

> [!WARNING]
> - El pliego de la mampara (SP-OC-2026-003) queda **cancelado/reemplazado** por este proyecto.
> - ¿El acceso a la nueva área comparte el pasillo con el peladero? Confirmar que el ancho del pasillo es suficiente para circulación con carros.
> - ¿La prensa de empanadas necesita alimentación eléctrica especial (380V) o es 220V estándar?

## Open Questions
1. ¿Dimensiones exactas disponibles para la ampliación? (Asumí 4×4m como indicaste)
2. ¿La rompedora de huevos va en una habitación separada dentro de la ampliación, o es un sector delimitado?
3. ¿Las empanadas serán un producto nuevo de Sabor Pampeano o para viandas?
4. ¿Marca/modelo de la prensa de empanadas? (Para especificar conexión eléctrica)
5. ¿Cantidad de heladeras: 1 o 2?

## Proposed Changes

### Pliego de Obra Civil
#### [NEW] Pliego_Ampliacion_Area_TACC.docx
Pliego técnico completo (SP-OC-2026-004) para cotización de la ampliación, con todas las especificaciones constructivas, equipamiento, y condiciones comerciales.

---

### Presentación Líneas de Producción
#### [MODIFY] Presentacion_Lineas_Produccion.pptx
- Slide 2: Actualizar turnos (Dani-Karen ambos turnos, agregar empanadas)
- Slide 3: Eliminar mampara, referenciar nueva área TACC 4×4m
- Slide 6: Agregar QC a liofilizados y viandas
- Slide 7: Actualizar resumen con nueva línea
- Nueva slide: Línea Empanadas

---

### Knowledge Item
#### [MODIFY] contexto_completo.md
- Agregar ampliación 4×4m como proyecto
- Nueva Línea G (Empanadas)
- Actualizar asignación de personal
- Marcar mampara como cancelada/reemplazada
- Actualizar pliego SP-OC-2026-004

## Verification Plan

### Automated Tests
- Ejecutar script Python del pliego y verificar generación DOCX
- Ejecutar script PPT y verificar generación PPTX
- Verificar que el KI refleja todos los cambios

### Manual Verification
- El usuario revisará el pliego y la presentación
