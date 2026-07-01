# Análisis de Ingeniería de Proceso — Egg Bites Sous Vide (Fase 1)

> Ing. Juan Manuel Grasso — Jefe de Operaciones e Ingeniería. 01/07/2026.
> ⚠️ Los PDFs fundacionales no especifican equipos ni proceso: buena parte de esto es **inferencia de ingeniería** a partir del producto elegido. Marcado `[Suposición]` / `[Probable]` / ⚠️ Sin verificar. A validar con Dalma (I+D).

## 1. Cadena de proceso (propuesta)

1. **Huevo líquido pasteurizado** — insumo base. `[Probable]` Fuente definitiva: Sala Rompedora (P6). Para el piloto: huevo de la cocina actual, a escala mínima.
2. **Formulación / mezclado** — huevo + lácteo + inclusiones (jamón/queso, espinaca/queso, pollo/morrón). Evaluar Roboqbo Qbo 25-4 para la mezcla.
3. **Dosificado** en molde / envase individual.
4. **Cocción sous vide** — baño termostático a baja temperatura controlada. Evaluar el "Soud Vide Erlich" existente. ⚠️ Sin verificar capacidad.
5. **Abatido rápido** — abatidor Friolinux existente (inocuidad + vida útil).
6. **Envasado** — al vacío (Ehrlich EH19 / Turbovac) o termosellado; atmósfera modificada (MAP) si se busca la punta alta de vida útil. `[Suposición]`
7. **Refrigeración / cadena de frío** — producto refrigerado, no congelado.

## 2. Enfoque piloto (escala mínima — definido)

Probar 1–2 sabores con equipos de cocina actuales: mezcla → dosificado manual → sous vide existente → abatidor → envasado al vacío existente → cámara. Objetivo: validar receta, parámetros y vida útil **sin comprar equipos ni depender de obras**.

Registrar: binomio temperatura/tiempo de cocción, rendimiento, merma, y comportamiento en frío a lo largo de los días.

## 3. Equipos a dimensionar para industrializar (fase posterior)

| Equipo | Uso | Estado |
|---|---|---|
| Rompedora de Huevos (P6) | Huevo líquido propio | Pendiente (bloqueada por cloaca P4) |
| Cocedor sous vide industrial | Cocción a volumen | A cotizar |
| Abatidor | Enfriado rápido | Existe (Friolinux); evaluar capacidad |
| Envasadora al vacío / termoselladora + MAP | Vida útil | Existe parcial; evaluar MAP |
| Dosificadora / llenadora + moldes Egg Bites | Escala | A cotizar |
| Cámara de frío | Almacenamiento | Cuello de botella actual |

## 4. Cruces con la reestructuración (P1–P13)

- **P6 Sala Rompedora** — fuente de huevo líquido; Protein Lab le agrega volumen y justificación. **Habilitante del salto a escala.**
- Sous vide y abatidor ya existen en planta.
- Cuellos de botella conocidos: **frío** (cámara) y **vacío/envasado**.

## 5. Inocuidad y vida útil

Objetivo 30–45 días refrigerado, **a validar** con Dalma (I+D): protocolo de estabilidad microbiológica y organoléptica; validaciones HACCP mínimas para huevo cocido refrigerado. `[Probable]` el binomio tiempo/temperatura de sous vide + abatido + barrera de envase define el número final.

## 6. Pliegos a generar (cuando se defina equipamiento)

Formato `SP-OC-2026-NNN`: cocedor sous vide, dosificadora/moldes, envasado/MAP. Recién **después** de validar el piloto y el costeo (M3).

## 7. Pendientes de ingeniería

- Relevar capacidad real del sous vide y del abatidor existentes.
- Confirmar si el Roboqbo sirve para la mezcla.
- Definir formato/packaging con Alan (impacta dosificado y sellado).
