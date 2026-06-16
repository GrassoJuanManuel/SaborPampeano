// --- REEMPLAZÁ TU FUNCIÓN doGet CON ESTA NUEVA VERSIÓN ---
// Esta versión tiene un sistema "Anti-Fallos" para los nombres de los archivos.

function doGet(e) {
  var vista = (e && e.parameter && e.parameter.vista) ? e.parameter.vista : "";
  var archivo = (vista === "lotes") ? "Lotes" : (vista === "stock") ? "Stock" : "Index";
  
  var htmlOutput;
  try {
    // Intenta buscar el archivo normal (ej. "Stock")
    htmlOutput = HtmlService.createHtmlOutputFromFile(archivo);
  } catch (error1) {
    try {
      // Si falla, intenta buscarlo asumiendo que le pusiste el .html a mano (ej. "Stock.html")
      htmlOutput = HtmlService.createHtmlOutputFromFile(archivo + ".html");
    } catch (error2) {
      // Si sigue fallando, en vez de tirar el error genérico de Google, te muestra exactamente cuál es el problema.
      return ContentService.createTextOutput("❌ ERROR DE SISTEMA:\nNo se pudo encontrar el archivo visual para cargar esta pantalla.\n\nEl sistema buscó un archivo llamado '" + archivo + "' o '" + archivo + ".html' pero no existe en tu editor de Apps Script. Por favor verificá la barra izquierda de tu proyecto.");
    }
  }
  
  return htmlOutput
      .setTitle('Reporte Producción - Sabor Pampeano')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
