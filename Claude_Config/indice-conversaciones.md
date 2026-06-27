# Índice de conversaciones — Sabor Pampeano

> **52 conversaciones** del cerebro de Antigravity, filtradas para que solo contengan trabajo de Sabor Pampeano y sus proyectos. Las 6 conversaciones relacionadas a "Planillas Ro" / "Oxana" (proyecto separado) fueron movidas a `01-extracted/workspaces/non-sabor-pampeano/` y NO deben ser usadas como contexto en este workspace.
>
> **Ubicación del archivo histórico de Sabor Pampeano**: `C:\Users\jmgra\AppData\Roaming\Antigravity\antigravity-migration\01-extracted\workspaces\sabor-pampeano\conversations\<uuid>\`

---

## TOP 8 conversaciones más densas (de Sabor Pampeano)

| # | UUID corto | Título | Artifacts | Scratch | Messages | Steps | Media |
|---|---|---|---|---|---|---|---|
| 1 | `8c10379f` | **Task tracker execution phase** (auditoría dashboard) | 12 | 121 | 66 | 2 | 20 |
| 2 | `c50f3ef8` | **Factory Redesign and Process Standardization** | 16 | 0 | 4 | 16 | 28 |
| 3 | `ef096f5b` | **Reorganizing workspace + Aire Comprimido** | 7 | 63 | 33 | 3 | 6 |
| 4 | `abf8667c` | **Restructuring Master Plan into Scaling Roadmap** | 6 | 3 | 42 | 10 | 12 |
| 5 | `2932c570` | **Finalizando ejecución V3.0** (dashboard) | 3 | 1 | 35 | 0 | 11 |
| 6 | `4ceaae7f` | **Unified workflow and UI overhaul** (subtitulador SP) | 6 | 0 | 0 | 0 | 14 |
| 7 | `524e9779` | **V20 formulario Sabor Pampeano tracker** | 6 | 0 | 0 | 0 | 1 |
| 8 | `b9b0fc5b` | **Reestructuración del workspace SP** | 3 | 0 | 17 | 0 | 2 |

---

## Conversaciones con título legible (resto Sabor Pampeano)

| UUID corto | Título |
|---|---|
| `0b7306f9` | Ampliación de Planta: Área Libre de TACC + Línea Empanadas |
| `3424fa6f` | Pliego Rompedora Huevos |
| `72fb6c2b` | Revisión técnica |
| `dfb04f16` | V16 implementation complete (dashboard SP) |
| `27f971dd` | Planificación gerencia |
| `fc99b48f` | Layout Rompedora Huevos |

---

## Agrupación temática (todo Sabor Pampeano)

### A — Reestructuración / Master Plan
- `c50f3ef8` Factory Redesign (origen del Master Plan)
- `abf8667c` Restructuring Master Plan into Scaling Roadmap
- `b9b0fc5b` Reestructuración del workspace SP
- `0b7306f9` Área Libre de TACC + Línea Empanadas
- `ef096f5b` (parcial) Reorganizing workspace SP

### B — Dashboard / Webapp / Apps Script (Sabor Pampeano)
- `8c10379f` Execution phase tracker (auditoría grande, scripts Python)
- `2932c570` Finalizando V3.0
- `4ceaae7f` Unified workflow + UI overhaul (subtitulador SP)
- `524e9779` V20 formulario tracker
- `dfb04f16` V16 implementation complete

### C — Aire comprimido / equipos / pliegos
- `ef096f5b` (parcial) Aire Comprimido + presupuestos
- `3424fa6f` Pliego Rompedora Huevos
- `72fb6c2b` Revisión técnica
- `fc99b48f` Layout Rompedora Huevos

### D — Coordinación / reuniones / cortos
- `27f971dd` Planificación gerencia
- `9d547216`, `dc5b0b3f`, `df42663c`, `ea7c653a`, `ed6f8a6e`, `fb7e9b26`, `683474f7`

---

## Conversaciones EXCLUIDAS del scope Sabor Pampeano

Estas 6 conversaciones son de **Planillas Ro / proyecto Oxana** (negocio separado de Roxana, no Sabor Pampeano). Quedan archivadas en `01-extracted/workspaces/non-sabor-pampeano/conversations/` pero **Claude NO debe usarlas como contexto** cuando trabaja en Sabor Pampeano.

- `3e6f5c8c` GAS proyecto Oxana
- `6ec01b95` Planillas Ro v2.9 (grey cells)
- `52a3480e` Planillas Ro V5 (auto-run + protection)
- `114114b2` Planillas Ro v6 update
- `bfe47600` Planillas Ro v7 update
- `a08b13d1` Mejoras Integrales "Oxana" (Kits sheet)

---

## Cómo Claude debe usar este índice

1. **Cuando Juan mencione un trabajo previo** (ej. "como hicimos con el aire comprimido"), buscar en este índice + leer la conversación correspondiente desde la ubicación local.
2. **Para no repetir trabajo**: antes de iniciar un proyecto nuevo, verificar si hay UUID con título similar.
3. **Para tener antecedentes**: las conversaciones con scratch files Python son una librería de soluciones reusables.
4. **NUNCA leer las conversaciones de Planillas Ro / Oxana** como contexto en este workspace — son de un proyecto distinto.

---

## Estructura de cada conversación extraída

```
01-extracted/workspaces/sabor-pampeano/conversations/<uuid>/
├── conversation.json       # metadata
├── artifacts/
│   ├── <nombre>.md         # versión actual
│   └── _history/<nombre>/  # histórico v00 → vN (cuando hay versiones .resolved.N)
├── messages/*.json         # mensajes del chat
├── scratch/*.py            # scripts auxiliares
├── steps/                  # logs de pasos del agente
│   ├── index.json
│   └── step_N.md           # contenido verbatim de steps con "thinking"
└── browser/*.md            # notas del browser sub-agent
```
