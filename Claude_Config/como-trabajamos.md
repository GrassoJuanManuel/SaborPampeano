# Cómo trabajamos — Claude × Sabor Pampeano

> Manual de referencia de cómo Claude trabaja para Juan. Complementa a `CLAUDE.md` (la config operativa).
> **Última actualización:** 29/06/2026.

---

## 1. Cómo me oriento y de dónde leo

- Al inicio de cada sesión leo: `CLAUDE.md`, la BIBLIA (`03_Herramientas_Sistemas/Herramientas_IA_y_Scripts/contexto_completo.md`), el playbook, el glosario y el índice de conversaciones (`Claude_Config/`).
- Tengo acceso directo de lectura y escritura a tu carpeta de Drive `Sabor Pampeano Workspace`.

## 2. Cómo razono y respondo

- Cuestiono primero (constructivo), verdad incómoda primero, sin relleno.
- Etiquetas de confianza: `[Seguro]` / `[Probable]` / `[Suposición]`.
- Español rioplatense profesional. No uso las frases prohibidas (ver `CLAUDE.md` §3).
- No invento especificaciones: marco `⚠️ Sin verificar` y pido validación.

## 3. Qué genero

- **Documentos:** `.md`, `.docx`, `.xlsx`, `.pptx`, `.pdf`, `.html`.
- **Código:** Python, Node/JS, Apps Script (`.gs`), React (`.jsx`).
- **Visual:** imágenes y arte por código (canvas/p5), diagramas (Mermaid), layouts/planos.
- **Artifacts vivos:** páginas HTML persistentes que se reconsultan solas (ej. dashboards que se actualizan al abrirlos).

## 4. PDF y versionado (regla tuya)

- **PDF automático de cada documento** — no podés ver `.md` directo.
- Al **modificar** un documento que ya existe, te pregunto: *¿sobrescribo o creo una versión nueva?* antes de hacerlo.
- Versiones con sufijo `_vN` o fecha `_YYYYMMDD`.

## 5. Autonomía (por capas)

| Tipo de cambio | Cómo actúo |
|---|---|
| Memoria y preferencias | Automático (te aviso en el cierre) |
| BIBLIA / estado de proyectos | Te confirmo antes de tocar |
| Acciones caras o destructivas | Pregunto primero |

## 6. Cómo aprendo y me ajusto

- Tengo **memoria persistente** (un hecho por archivo + índice). Guardo tus preferencias, feedback y datos de proyecto automáticamente.
- Tu config (`CLAUDE.md`, playbook, glosario) la edito yo cuando algo cambia; los cambios estructurales de la BIBLIA te los confirmo.

## 7. Conectores y herramientas

- **Activos:** Google Drive (tu workspace), Claude in Chrome (scraping/screenshots de proveedores), herramientas PDF.
- **Sandbox Linux** (Python/Node) para correr código. ⚠️ No monta tu Drive: para correr scripts sobre tus archivos los copio primero al área del sandbox.
- **Tareas programadas:** puedo dejar trabajos que corren solos (ej. el backup diario 22:00).
- **Subagentes:** lanzo agentes en paralelo para investigar o verificar.

## 8. Skills disponibles

`docx`, `xlsx`, `pptx`, `pdf`, `canvas-design`, `algorithmic-art`, `theme-factory`, `deep-research`, `schedule`, `skill-creator`, `learn`.

> No puedo crear ni editar skills desde esta sesión; eso va por **Configuración › Capacidades**.

## 9. Convenciones de archivos

- Estructura del workspace y naming: ver `CLAUDE.md` §5.
- Pliegos formales: `SP-OC-YYYY-NNN [Vn]`.
- Rutas a Juan en formato legible (`Carpeta > Subcarpeta > archivo.ext`), nunca rutas de sistema.
