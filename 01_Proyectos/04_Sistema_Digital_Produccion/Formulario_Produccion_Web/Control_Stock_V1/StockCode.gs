// --- NUEVO ARCHIVO: StockCode.gs ---
// IMPORTANTE: Este archivo contiene SOLO la lógica para el nuevo formulario de Control de Stock.
// NO reemplace el Code.gs original con esto. Simplemente agregue este archivo como uno nuevo en el proyecto.

function guardarControlStock(datos) {
  try {
    // 1. Validaciones de entrada (Anti-roturas)
    if (!datos || !datos.items || datos.items.length === 0) {
      throw new Error("Datos inválidos o vacíos. No se pudo procesar el formulario.");
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var hoja = ss.getSheetByName('Control de Stock');
    
    // 2. Auto-reparación: Si la hoja no existe, la creamos y la formateamos como corresponde
    if (!hoja) {
      hoja = ss.insertSheet('Control de Stock');
      hoja.getRange("A1:F1").setValues([[
        'Fecha del Registro', 'Fecha del Turno', 'Producto', 
        'Código Artículo', 'Cantidad', 'Comentarios'
      ]]);
      hoja.getRange("A1:F1").setFontWeight("bold").setBackground("#4A5D23").setFontColor("white");
      hoja.setFrozenRows(1);
      hoja.getRange("D:D").setNumberFormat("@"); // Forzar columna D como texto
    }
    
    var timestampReal = new Date();
    var filas = [];
    
    // 3. Compilación de los datos en orden
    for (var i = 0; i < datos.items.length; i++) {
      var item = datos.items[i];
      var comentarioFila = (i === 0) ? datos.comentarios : "";
      
      filas.push([
        timestampReal,           // Col A: Fecha del Registro
        datos.fecha,             // Col B: Fecha del Turno
        item.producto,           // Col C: Producto
        String(item.codigo).trim(), // Col D: Código Artículo (como texto estricto)
        item.cantidad,           // Col E: Cantidad
        comentarioFila           // Col F: Comentarios
      ]);
    }
    
    // 4. Inserción de los datos
    // Insertamos DESPUÉS de la fila 1 (encabezados) para que los nuevos registros queden arriba
    hoja.insertRowsAfter(1, filas.length);
    
    // Aseguramos nuevamente que la columna D (4) se trate como texto en esta inserción
    hoja.getRange(2, 4, filas.length, 1).setNumberFormat("@");
    
    // Guardar los datos en bloque (Altamente eficiente)
    hoja.getRange(2, 1, filas.length, 6).setValues(filas);
    
    // 5. Raya visual sin romper la base de datos (Mejora 10x)
    // En lugar de una fila vacía que rompe filtros y tablas dinámicas, aplicamos un borde inferior grueso
    var filaSeparadoraIndex = 2 + filas.length - 1; // La última fila del bloque que acabamos de insertar
    hoja.getRange(filaSeparadoraIndex, 1, 1, 6).setBorder(
      null, null, true, null, null, null, // (top, left, bottom, right, vertical, horizontal) -> Solo bottom
      "black", 
      SpreadsheetApp.BorderStyle.SOLID_THICK
    );
    
    return true;
  } catch (error) {
    throw new Error("Error en servidor al guardar stock: " + error.message);
  }
}

function mostrarLinkStock() {
  var props = PropertiesService.getDocumentProperties();
  var urlGuardada = props.getProperty('WEB_APP_URL');
  if (urlGuardada) {
    var urlStock = urlGuardada + "?vista=stock";
    var html = '<div style="font-family:Arial,sans-serif;padding:15px;text-align:center;">'
      +'<h3 style="color:#4A5D23;margin-top:0;">Link de Control de Stock</h3>'
      +'<p style="font-size:13px;color:#555;">Copiá este enlace para el formulario de Stock:</p>'
      +'<input type="text" id="urlInput" value="'+urlStock+'" readonly style="width:100%;padding:10px;margin:15px 0;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;text-align:center;font-size:11px;background:#f9f9f9;">'
      +'<button onclick="copiarLink()" style="background:#7A9B3A;color:#fff;border:none;padding:10px 20px;border-radius:4px;cursor:pointer;font-weight:bold;width:100%;">Copiar Enlace</button>'
      +'<p id="msg" style="color:#27ae60;font-size:12px;margin-top:10px;display:none;">¡Copiado!</p>'
      +'<script>function copiarLink(){var c=document.getElementById("urlInput");c.select();document.execCommand("copy");document.getElementById("msg").style.display="block";setTimeout(function(){document.getElementById("msg").style.display="none";},3000);}<\/script>'
      +'</div>';
    SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(html).setWidth(400).setHeight(230),'Link de Stock');
  } else {
    SpreadsheetApp.getUi().alert("Primero configurá el link oficial desde 'Obtener Link del Reporte'.");
  }
}
