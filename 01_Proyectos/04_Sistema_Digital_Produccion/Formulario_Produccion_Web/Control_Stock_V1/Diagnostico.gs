function EJECUTAR_DIAGNOSTICO() {
  var ui = SpreadsheetApp.getUi();
  var log = "=== REPORTE DE DIAGNÓSTICO S. PAMPEANO ===\n\n";
  
  // 1. Revisar Pestañas del Excel
  log += "1. REVISIÓN DE PESTAÑAS EXCEL:\n";
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var nombresHojas = ss.getSheets().map(function(s) { return s.getName(); });
  log += "- Pestañas encontradas: " + nombresHojas.join(", ") + "\n";
  
  if (nombresHojas.indexOf("Lotes") === -1) log += "❌ ERROR FATAL: No existe la pestaña 'Lotes'.\n";
  else log += "✅ Pestaña 'Lotes' OK.\n";
  
  if (nombresHojas.indexOf("Control de Stock") === -1) log += "❌ ERROR FATAL: No existe la pestaña 'Control de Stock'.\n";
  else log += "✅ Pestaña 'Control de Stock' OK.\n";
  
  // 2. Revisar Web App URL
  log += "\n2. CONFIGURACIÓN DEL SISTEMA:\n";
  var props = PropertiesService.getDocumentProperties();
  var url = props.getProperty('WEB_APP_URL');
  if (!url) {
    log += "❌ ERROR: No hay URL configurada en el sistema.\n";
  } else {
    log += "✅ URL oficial: " + url + "\n";
    if (url.indexOf("/exec") === -1) log += "❌ ERROR: La URL no termina en /exec.\n";
  }
  
  // 3. Revisar Nombres de Archivos HTML
  log += "\n3. DIAGNÓSTICO DE ARCHIVOS HTML:\n";
  log += "Voy a intentar abrir virtualmente los 3 archivos...\n";
  
  try {
    HtmlService.createHtmlOutputFromFile("Index");
    log += "✅ Archivo 'Index' encontrado exitosamente.\n";
  } catch(e) {
    log += "❌ ERROR FATAL: No se encuentra 'Index'. (Posiblemente lo llamaste 'Index.html' en la barra izquierda).\n";
  }
  
  try {
    HtmlService.createHtmlOutputFromFile("Lotes");
    log += "✅ Archivo 'Lotes' encontrado exitosamente.\n";
  } catch(e) {
    log += "❌ ERROR FATAL: No se encuentra 'Lotes'. (Fijate si dice 'Lotes.html' en la barra izquierda, debe decir solo 'Lotes').\n";
  }
  
  try {
    HtmlService.createHtmlOutputFromFile("Stock");
    log += "✅ Archivo 'Stock' encontrado exitosamente.\n";
  } catch(e) {
    log += "❌ ERROR FATAL: No se encuentra 'Stock'. (Fijate si dice 'Stock.html' en la barra izquierda, debe decir solo 'Stock').\n";
  }
  
  // 4. Mostrar Reporte
  ui.alert("DIAGNÓSTICO FINALIZADO", "Copiá este mensaje y pasaselo al programador:\n\n" + log, ui.ButtonSet.OK);
}
