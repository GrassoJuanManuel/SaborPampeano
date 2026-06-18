# Reglas Globales - Sabor Pampeano Workspace

## Arquitectura Dashboard V2.0 Quirúrgica (Planificación y Proyectos.html)
**NUNCA REESCRIBAS LA ESTRUCTURA DEL ARCHIVO.**
El archivo `00_Dashboard_Proyectos\Planificación y Proyectos.html` usa una arquitectura mixta (HTML estático para estructura/diseño + JS inyectado).
La Única Fuente de Verdad para el contenido en detalle de cada proyecto es el objeto `const P = { ... }` dentro de la etiqueta `<script>`.

Para actualizar el Dashboard, debes:
1. Buscar el objeto JavaScript `const P = { ... }`.
2. Modificar el texto de los detalles en la propiedad `tabs` (usualmente `tabs: {'Resumen': \`...\`, 'Historial': \`...\`}`).
3. Para reflejar avances en los **Contadores y Gráficos**, modificar las propiedades `progress:XX` y `statusType:'XXX'` dentro de cada proyecto en el objeto `P`. El motor `renderDashboard()` auto-actualiza los números de arriba y el gráfico basado en esto.
4. **NO** toques las variables CSS ni intentes reconstruir las tarjetas (`.pcard`), ya que destruirás el diseño estético de colores pasteles que el usuario aprobó.

## PROTOCOLO DE ACTUALIZACIÓN DE ESTADO (Permanente)
Cada vez que el usuario te dé un "update" de novedades de la fábrica, DEBES seguir esta rutina estricta para no dejar nada desactualizado:

1. **Absorción Pasiva y Tono:** Nunca asumas ni agregues tareas imperativas ("Aprobar", "Hacer"). Tu rol es listar la información. Usa verbos como "Analizar", "Revisar", "Decidir". El usuario es quien toma la decisión.
2. **Revisión de Dependencias (Cadena):** Si un proyecto se mueve (ej. "Cloacas presupuestadas"), piensa si eso destraba otro (ej. "Módulo Harinas"). Actualiza la información en la dependencia.
3. **Búsqueda Quirúrgica:** Debes usar scripts o `multi_replace_file_content` para buscar y reemplazar el texto exacto en el objeto `P`. Asegúrate de borrar la situación "vieja" (ej. "Esperando presupuesto") cuando ingresas la "nueva" (ej. "Presupuesto recibido").
4. **Comportamiento Tipo "App":** Tu rol al recibir updates es funcionar como el backend de una App. Actualiza los datos, guarda el archivo, y avisa. No cambies la lógica de funcionamiento ni la UI a menos que te lo pidan explícitamente.
