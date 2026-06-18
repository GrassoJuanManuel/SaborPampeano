# Reglas Globales - Sabor Pampeano Workspace

## Dashboard V2.0 (Planificación y Proyectos.html)
**NUNCA MODIFIQUES EL HTML DIRECTAMENTE PARA ACTUALIZAR DATOS.**
El archivo `00_Dashboard_Proyectos\Planificación y Proyectos.html` ha sido refactorizado a una arquitectura **Data-Driven (V2.0)**.
Existe una Única Fuente de Verdad (Single Source of Truth) ubicada en la sección `<script>` al final del archivo.

Para actualizar el Dashboard, debes:
1. Buscar el objeto JavaScript `const DASHBOARD_DATA = { ... }`.
2. Modificar, agregar o eliminar datos únicamente dentro de ese objeto JS (fechas, `pendientes`, `projects`, presupuestos).
3. Guardar el archivo. El motor de renderizado (`renderDashboard`) auto-generará todos los contadores, gráficos, tarjetas HTML y tablas basándose estrictamente en ese objeto.

### Atributos Clave:
- `progress`: Porcentaje entero de avance (0-100).
- `statusType`: Puede ser `"en_curso"`, `"cotizando"`, `"revision"`, `"paralizado"`, o `"conceptual"`. (Importante para los contadores superiores).
- `badge`: String HTML con la etiqueta visual.
- `priority`: Entero 1-6 (6 es MÁXIMA PRIORIDAD/URGENTE).
