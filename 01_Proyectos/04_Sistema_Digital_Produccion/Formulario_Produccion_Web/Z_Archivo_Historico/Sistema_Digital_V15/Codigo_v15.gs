// Código Backend (Google Apps Script) - VERSIÓN 15

function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('Reporte Producción - Sabor Pampeano')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Busca el índice de una columna por nombre de encabezado (case-insensitive, trim)
function findCol(headers, name) {
  var n = name.toLowerCase().trim();
  for (var i = 0; i < headers.length; i++) {
    if (headers[i].toString().toLowerCase().trim() === n) return i;
  }
  return -1;
}

function obtenerOpciones() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) throw new Error("No se pudo acceder al archivo de Excel.");

    // --- ENCARGADOS + TURNOS ---
    var encargados = [];
    var turnos = [];
    var hojaOpciones = ss.getSheetByName('Opciones');
    if (hojaOpciones) {
      var lastRow = hojaOpciones.getLastRow();
      if (lastRow > 1) {
        var datosOpc = hojaOpciones.getRange("A2:B" + lastRow).getValues();
        var turnosVistos = {};
        datosOpc.forEach(function(r) {
          var nombre = r[0] ? r[0].toString().trim() : "";
          var turno  = r[1] ? r[1].toString().trim() : "";
          if (nombre) {
            encargados.push({ nombre: nombre, turno: turno });
            if (turno && !turnosVistos[turno]) {
              turnos.push(turno);
              turnosVistos[turno] = true;
            }
          }
        });
      }
    }

    // --- LISTA DE PRODUCTOS (lee por encabezado, no por posición) ---
    var catalogo = [];
    var hojaProd = ss.getSheetByName('Lista de Productos');
    if (!hojaProd) throw new Error("No se encontró la pestaña 'Lista de Productos'.");

    var datosProd = hojaProd.getDataRange().getDisplayValues();
    if (datosProd.length < 2) throw new Error("La Lista de Productos está vacía.");

    var h = datosProd[0];
    var iProducto    = findCol(h, "Productos");
    var iCodigo      = findCol(h, "Código de Artículo");
    var iCategoria   = findCol(h, "Categoría");
    var iDescAd      = findCol(h, "Desc. Adicional");
    var iFamilia     = findCol(h, "Familia");
    var iProduccion  = findCol(h, "Producción");
    var iReproceso   = findCol(h, "Reproceso");
    var iDecomiso    = findCol(h, "Decomiso / Descarte");
    var iMermas      = findCol(h, "Mermas / Recuperos");
    var iEnProceso   = findCol(h, "En Proceso");

    if (iProducto === -1) throw new Error("No se encontró la columna 'Productos' en Lista de Productos.");
    if (iCategoria === -1) throw new Error("No se encontró la columna 'Categoría' en Lista de Productos.");

    for (var i = 1; i < datosProd.length; i++) {
      var row = datosProd[i];
      if (!row[iProducto] || !row[iProducto].trim()) continue;

      catalogo.push({
        producto:   row[iProducto].trim(),
        codigo:     iCodigo !== -1 && row[iCodigo] ? row[iCodigo].trim() : "",
        categoria:  row[iCategoria] ? row[iCategoria].trim() : "",
        descAd:     iDescAd !== -1 && row[iDescAd] ? row[iDescAd].trim() : "",
        familia:    iFamilia !== -1 && row[iFamilia] ? row[iFamilia].trim() : "",
        produccion: iProduccion !== -1 && row[iProduccion] ? row[iProduccion].trim().toLowerCase() === "si" : true,
        reproceso:  iReproceso !== -1 && row[iReproceso] ? row[iReproceso].trim().toLowerCase() === "si" : true,
        decomiso:   iDecomiso !== -1 && row[iDecomiso] ? row[iDecomiso].trim().toLowerCase() === "si" : true,
        mermas:     iMermas !== -1 && row[iMermas] ? row[iMermas].trim().toLowerCase() === "si" : true,
        enProceso:  iEnProceso !== -1 && row[iEnProceso] ? row[iEnProceso].trim().toLowerCase() === "si" : true
      });
    }

    return { encargados: encargados, turnos: turnos, catalogo: catalogo };
  } catch (error) {
    throw new Error(error.message);
  }
}

// -------------------------------------------------------
// GUARDAR REPORTE (Registros + Controles)
// -------------------------------------------------------

function guardarReporte(datos) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // --- HOJA REGISTROS ---
    var hoja = ss.getSheetByName('Registros');
    if (!hoja) hoja = ss.insertSheet('Registros');

    if (hoja.getLastRow() === 0 || hoja.getRange("A1").getDisplayValue() !== "Fecha del Registro") {
      if (hoja.getLastRow() > 0) hoja.insertRowBefore(1);
      hoja.getRange("A1:K1").setValues([[
        'Fecha del Registro', 'Fecha del Turno', 'Turno', 'Encargado',
        'Tipo de Registro', 'E/S', 'Categoría', 'Producto / Insumo',
        'Código Artículo', 'Cantidad', 'Motivo / Detalle / Comentarios'
      ]]);
      hoja.getRange("A1:K1").setFontWeight("bold").setBackground("#4A5D23").setFontColor("white");
      hoja.setFrozenRows(1);
      hoja.getRange("I:I").setNumberFormat("@"); // Toda la columna I como texto
    }

    // --- HOJA CONTROLES ---
    var hojaCtrl = ss.getSheetByName('Controles');
    if (!hojaCtrl) hojaCtrl = ss.insertSheet('Controles');

    if (hojaCtrl.getLastRow() === 0 || hojaCtrl.getRange("A1").getDisplayValue() !== "Fecha del Registro") {
      if (hojaCtrl.getLastRow() > 0) hojaCtrl.insertRowBefore(1);
      hojaCtrl.getRange("A1:J1").setValues([[
        'Fecha del Registro', 'Fecha del Turno', 'Turno', 'Encargado',
        'Producto', 'Código de Artículo', 'Lote', 'Cantidad', '°Brix', 'PH'
      ]]);
      hojaCtrl.getRange("A1:J1").setFontWeight("bold").setBackground("#4A5D23").setFontColor("white");
      hojaCtrl.setFrozenRows(1);
      hojaCtrl.getRange("F:F").setNumberFormat("@"); // Toda la columna F como texto
    }

    var timestampReal = new Date();
    var baseRow = [timestampReal, datos.fecha, datos.turno, datos.encargado];
    var filasRegistros = [];
    var filasControles = [];

    // 1. Producción
    if (datos.produccion && datos.produccion.length > 0) {
      datos.produccion.forEach(function(p) {
        filasRegistros.push([].concat(baseRow, ["PRODUCCIÓN", "E", p.categoria, p.producto, p.codigo, p.cantidad, datos.observaciones]));
        if (p.lotes && p.lotes.length > 0) {
          p.lotes.forEach(function(l) {
            filasControles.push([timestampReal, datos.fecha, datos.turno, datos.encargado, p.producto, p.codigo, l.numero, l.cantidad, l.brix || "", l.ph || ""]);
          });
        }
      });
    }

    // 2. Reproceso
    if (datos.reproceso && datos.reproceso.length > 0) {
      datos.reproceso.forEach(function(r) {
        var det = r.motivo ? (r.motivo + " | " + datos.observaciones) : datos.observaciones;
        filasRegistros.push([].concat(baseRow, ["REPROCESO (Producto Salvado)", "E", r.categoria, r.producto, r.codigo, r.cantidad, det]));
        if (r.insumos_nuevos && r.insumos_nuevos.trim() !== "") {
          filasRegistros.push([].concat(baseRow, ["REPROCESO (Insumos Gastados)", "S", "INSUMOS EXTRAS", r.insumos_nuevos, "", "Asociado a reproceso de: " + r.producto, ""]));
        }
      });
    }

    // 3. Decomiso
    if (datos.decomiso && datos.decomiso.length > 0) {
      datos.decomiso.forEach(function(d) {
        var det = d.motivo ? (d.motivo + " | " + datos.observaciones) : datos.observaciones;
        filasRegistros.push([].concat(baseRow, ["DECOMISO", "S", d.categoria, d.producto, d.codigo, d.cantidad, det]));
      });
    }

    // 4. Mermas / Recuperos
    if (datos.mermas && datos.mermas.length > 0) {
      datos.mermas.forEach(function(m) {
        var det = m.motivo ? (m.motivo + " | " + datos.observaciones) : datos.observaciones;
        var tipoRegistro = m.tipo_movimiento === "Pérdida" ? "MERMA" : "RECUPERO";
        var es = m.tipo_movimiento === "Pérdida" ? "S" : "E";
        filasRegistros.push([].concat(baseRow, [tipoRegistro, es, m.categoria, m.producto, m.codigo, m.cantidad, det]));
      });
    }

    // 5. En Proceso
    if (datos.en_proceso && datos.en_proceso.length > 0) {
      datos.en_proceso.forEach(function(ep) {
        var det = ep.motivo ? (ep.motivo + " | " + datos.observaciones) : datos.observaciones;
        filasRegistros.push([].concat(baseRow, ["EN PROCESO", "-", ep.categoria || "-", ep.producto, ep.codigo || "-", ep.cantidad, det]));
      });
    }

    // 6. Solo comentarios
    if (filasRegistros.length === 0 && datos.observaciones.trim() !== "") {
      filasRegistros.push([].concat(baseRow, ["SOLO COMENTARIOS", "", "", "", "", "", datos.observaciones]));
    }

    // --- INSERTAR EN REGISTROS (más nuevos arriba) ---
    if (filasRegistros.length > 0) {
      hoja.insertRowsAfter(1, filasRegistros.length);
      hoja.getRange(2, 1, filasRegistros.length, filasRegistros[0].length).setValues(filasRegistros);
    }

    // --- INSERTAR EN CONTROLES (más nuevos arriba) ---
    if (filasControles.length > 0) {
      hojaCtrl.insertRowsAfter(1, filasControles.length);
      hojaCtrl.getRange(2, 1, filasControles.length, filasControles[0].length).setValues(filasControles);
    }

    return true;
  } catch (error) {
    throw new Error("Error en servidor al guardar: " + error.message);
  }
}

// -------------------------------------------------------
// LÓGICA DE MENÚS
// -------------------------------------------------------

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('📝 Formulario')
    .addItem('Obtener Link del Reporte', 'mostrarLink')
    .addItem('Modo de Uso', 'mostrarModoUso')
    .addToUi();
}

function mostrarLink() {
  var props = PropertiesService.getDocumentProperties();
  var urlGuardada = props.getProperty('WEB_APP_URL');
  if (urlGuardada) {
    var html = '<div style="font-family:Arial,sans-serif;padding:15px;text-align:center;">'
      +'<h3 style="color:#4A5D23;margin-top:0;">Link del Parte Diario</h3>'
      +'<p style="font-size:13px;color:#555;">Copiá este enlace y envialo por WhatsApp:</p>'
      +'<input type="text" id="urlInput" value="'+urlGuardada+'" readonly style="width:100%;padding:10px;margin:15px 0;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;text-align:center;font-size:12px;background:#f9f9f9;">'
      +'<button onclick="copiarLink()" style="background:#7A9B3A;color:#fff;border:none;padding:10px 20px;border-radius:4px;cursor:pointer;font-weight:bold;width:100%;">Copiar Enlace</button>'
      +'<p id="msg" style="color:#27ae60;font-size:12px;margin-top:10px;display:none;">¡Copiado!</p><br><br>'
      +'<a href="#" onclick="google.script.run.borrarLink();google.script.host.close();" style="font-size:10px;color:#999;text-decoration:underline;">Modificar link</a>'
      +'<script>function copiarLink(){var c=document.getElementById("urlInput");c.select();document.execCommand("copy");document.getElementById("msg").style.display="block";setTimeout(function(){document.getElementById("msg").style.display="none";},3000);}<\/script>'
      +'</div>';
    SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(html).setWidth(400).setHeight(250),'Compartir Formulario');
  } else {
    var html = '<div style="font-family:Arial,sans-serif;padding:15px;text-align:center;">'
      +'<h3 style="color:#4A5D23;margin-top:0;">Configuración Inicial</h3>'
      +'<p style="font-size:12px;color:#555;">Configurá el link oficial por única vez.</p>'
      +'<p style="font-size:12px;color:#555;text-align:left;">1. Andá a <b>Implementar > Administrar implementaciones</b>.<br>2. Copiá la URL (termina en /exec).<br>3. Pegala acá:</p>'
      +'<input type="text" id="nuevoUrl" placeholder="https://script.google.com/macros/s/.../exec" style="width:100%;padding:10px;margin:10px 0;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;font-size:12px;">'
      +'<button onclick="guardar()" style="background:#4A5D23;color:#fff;border:none;padding:10px 20px;border-radius:4px;cursor:pointer;font-weight:bold;width:100%;">Guardar Link</button>'
      +'<script>function guardar(){var l=document.getElementById("nuevoUrl").value.trim();if(l.indexOf("/exec")===-1){alert("El link debe terminar en /exec");return;}google.script.run.withSuccessHandler(function(){google.script.host.close();}).guardarLinkOficial(l);}<\/script>'
      +'</div>';
    SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(html).setWidth(400).setHeight(320),'Configurar Link');
  }
}

function mostrarModoUso() {
  var props = PropertiesService.getDocumentProperties();
  var manualUrl = props.getProperty('MANUAL_PDF_URL');
  var btn = manualUrl
    ? '<a href="'+manualUrl+'" target="_blank" style="display:block;background:#4A5D23;color:#fff;text-decoration:none;padding:12px;border-radius:4px;font-weight:bold;margin-bottom:20px;">📄 Leer Manual</a>'
    : '<p style="color:#e74c3c;font-size:13px;margin-bottom:20px;font-weight:bold;">⚠️ No hay manual cargado.</p>';
  var html = '<div style="font-family:Arial,sans-serif;padding:15px;text-align:center;">'
    +'<h2 style="color:#4A5D23;margin-top:0;font-size:20px;">Manual del Sistema</h2>'
    +'<p style="font-size:12px;color:#555;margin-bottom:20px;">Instrucciones del Parte Diario.</p>'
    +btn
    +'<hr style="border:0;border-top:1px solid #ccc;margin:20px 0;">'
    +'<h4 style="color:#333;margin-bottom:10px;font-size:14px;">Actualizar Manual</h4>'
    +'<p style="font-size:11px;color:#666;text-align:left;">Subí el PDF a Drive, obtené el enlace público y pegalo aquí:</p>'
    +'<input type="text" id="nUrl" placeholder="https://drive.google.com/file/d/..." style="width:100%;padding:10px;margin-bottom:12px;border:1px solid #ccc;border-radius:4px;font-size:12px;box-sizing:border-box;">'
    +'<button onclick="gm()" style="background:#7A9B3A;color:#fff;border:none;padding:10px 15px;border-radius:4px;cursor:pointer;font-size:13px;font-weight:bold;width:100%;">Guardar PDF</button>'
    +'<script>function gm(){var l=document.getElementById("nUrl").value.trim();if(!l){alert("Pegá un link primero.");return;}google.script.run.withSuccessHandler(function(){alert("¡Actualizado!");google.script.host.close();}).guardarLinkManual(l);}<\/script>'
    +'</div>';
  SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(html).setWidth(380).setHeight(380),'Modo de Uso');
}

function guardarLinkOficial(url){PropertiesService.getDocumentProperties().setProperty('WEB_APP_URL',url);}
function borrarLink(){PropertiesService.getDocumentProperties().deleteProperty('WEB_APP_URL');}
function guardarLinkManual(url){PropertiesService.getDocumentProperties().setProperty('MANUAL_PDF_URL',url);}
