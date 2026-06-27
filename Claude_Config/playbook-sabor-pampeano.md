# Playbook Sabor Pampeano — Patrones de tareas recurrentes

> Este documento contiene los "how-to" de tareas que Antigravity venía haciendo recurrentemente con Juan. Claude debe usarlos como recetas reutilizables.

---

## 1. Armar pliego técnico para un equipo industrial

**Trigger:** Juan dice "armame el pliego de la [maquina]" o "tengo que cotizar [equipo]"

**Pasos:**

1. Buscar antecedentes en `02_Operaciones_de_Fabrica/Mantenimiento_y_Manuales_Generales/EQUIPOS/<equipo>/`
2. Si hay manuales o fotos previas, leerlas/listarlas para extraer specs
3. Generar `pliego_<equipo>.md` con esta estructura:
   ```
   # Pliego Técnico: <Equipo>
   ## 1. Objetivo
   ## 2. Especificaciones requeridas
      - Capacidad
      - Materiales (acero inox 304/316L según contacto con alimento)
      - Voltaje/Trifásica/Monofásica
      - Dimensiones máximas (encajar en el layout)
      - Certificaciones (CE, SENASA si aplica)
   ## 3. Servicios requeridos (aire, agua, eléctrica)
   ## 4. Garantía y servicio post-venta
   ## 5. Documentación que el proveedor debe entregar
   ```
4. Marcar con `⚠️ Sin verificar` cualquier spec que no esté validada
5. Generar `walkthrough.md` corto + preguntar: "¿Lo paso a PDF para mandar a proveedores?"

**Salida:** `02_Operaciones_de_Fabrica/Mantenimiento_y_Manuales_Generales/EQUIPOS/<equipo>/pliego_<equipo>_vN.md`

---

## 2. Comparativa de presupuestos / cotizaciones

**Trigger:** Juan manda 2+ presupuestos PDF/Word o dice "compará estos dos"

**Pasos:**

1. Leer cada presupuesto (PDF o DOCX)
2. Generar tabla normalizada: Proveedor | Item | Precio | Plazo | Garantía | Forma de pago | Notas
3. Identificar discrepancias técnicas (no comparar peras con manzanas)
4. Generar `comparativa_presupuestos_<tema>.md` con: Tabla, Pros/Contras, Discrepancias técnicas, Recomendación
5. Si falta info en alguno, no asumir — marcar "Pendiente confirmar con [proveedor]"

---

## 3. Actualizar la BIBLIA

**Trigger:** Juan reporta cambio de estado de un proyecto

**Pasos:**

1. Leer `03_Herramientas_Sistemas/Herramientas_IA_y_Scripts/contexto_completo.md`
2. Identificar sección afectada (FASE 0/1/2/3 o P# en INVENTARIO)
3. Actualizar el estado
4. Confirmar con Juan: "Actualizo la BIBLIA con: [cambio]. ¿Confirmás?"
5. Después de su OK, escribir nueva versión + actualizar header de fecha

**Importante:** la BIBLIA es source of truth. No agregar info sin confirmación.

---

## 4. Resumen para el dueño

**Trigger:** "Armame un resumen para el dueño"

**Estructura típica:**
```
# Resumen Ejecutivo — <tema>
## Situación actual
## Lo que se hizo
## Lo que viene
## Inversión pendiente
| Item | Monto | Estado |
## Decisiones que necesito de vos
> [!IMPORTANT] Aprobar/Rechazar X antes de fecha Y
```

Lenguaje no técnico salvo cuando es decisión que requiere visto bueno. Énfasis en plata y plazos.

---

## 5. Generar layout / plano de equipos

**Trigger:** "Hacé el layout de [sala/módulo]"

**Pasos:**

1. Dimensiones de la sala + footprint de equipos + servicios
2. Si faltan medidas, layout_test_*.png iterativo con `⚠️ Sin verificar`
3. Python con matplotlib o ezdxf (estilo Antigravity, scripts en `scratch/`)
4. `layout_<modulo>_real.png` con medidas confirmadas
5. `.md` explicando flujo, distancias, justificación

**Salida:** `01_Proyectos/<proyecto>/Layout/`

---

## 6. Auditar dashboard de Apps Script

**Trigger:** "Auditá el dashboard"

**Pasos:**

1. Identificar versiones del código (`Code_v2.x.gs.txt`)
2. Categorizar: Estructurales / Lógicos / Seguridad / Performance
3. Reportes separados: `auditoria_dashboard_estructural.md`, `_logica.md`, `auditoria_final_nivel3.md`
4. Por issue: severidad, descripción, archivo:línea, recomendación
5. Parches como `scratch/fix_*.py`

---

## 7. Planilla / template operativo

**Trigger:** "Armá la planilla de [tipo]"

**Pasos:**

1. Usar template previo si existe (`02_Operaciones_de_Fabrica/…/Template_*.doc (legacy; algunos también existen como .pdf)`)
2. Generar `boceto_<planilla>.md` con estructura visual (paleta verde oliva `#4A5D23`)
3. Confirmar estructura
4. Generar DOCX/PDF final con script Python

---

## 8. Resumen de reunión

**Trigger:** Juan tipea notas de reunión

**Estructura:**
```
# Reunión: <tema> — <fecha>
## Asistentes
## Decisiones tomadas
## Tareas asignadas
- [ ] <quién>: <qué> — <para cuándo>
## Próximos hitos
## Para profundizar
```

Si hay decisiones que afectan estado de proyectos, sugerir actualizar la BIBLIA.

---

## 9. Investigación de proveedor / equipo nuevo

**Trigger:** "Buscá info sobre [X]"

**Pasos:**

1. Claude in Chrome para visitar sitio oficial, descargar specs
2. Screenshots de fichas técnicas
3. `analisis_<proveedor>.md`: Resumen, Specs (verificadas + sin verificar), Precio orientativo, Pros/Contras, Conclusión
4. Si Juan dice "avanzá", generar pliego (patrón #1)

---

## 10. Patrones de cierre (siempre)

1. **Walkthrough breve**: "Hice X, Y, Z. El cambio principal es A."
2. **Recordatorio de pendientes** si quedó algo a confirmar
3. **Pregunta de próximo paso**:
   - "¿Querés que avance con [siguiente paso lógico]?"
   - "¿Lo paso a PDF / lo subo al Drive / le mando a [proveedor]?"

Si el trabajo fue grande y salió bien: tono celebratorio breve ("¡Listo!").
Si quedó incompleto: tono neutro con plan claro de qué falta.
Nunca cerrar con "¿algo más?".
