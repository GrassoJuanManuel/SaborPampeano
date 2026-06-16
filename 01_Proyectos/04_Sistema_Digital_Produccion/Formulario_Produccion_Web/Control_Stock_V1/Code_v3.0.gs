// Código Backend (Google Apps Script) - VERSIÓN 3.0 (Manejo Avanzado de Lotes e Insumos)

function doGet(e) {
  var vista = (e && e.parameter && e.parameter.vista) ? e.parameter.vista : "";
  var archivo = (vista === "lotes") ? "Lotes" : (vista === "stock") ? "Stock" : "Index";
  
  var htmlOutput;
  try {
    htmlOutput = HtmlService.createHtmlOutputFromFile(archivo);
  } catch (error1) {
    try {
      htmlOutput = HtmlService.createHtmlOutputFromFile(archivo + ".html");
    } catch (error2) {
      return ContentService.createTextOutput("❌ ERROR DE SISTEMA:\nNo se encontró el archivo visual para la pantalla solicitada (" + archivo + ").\nRevisá los nombres en la barra izquierda.");
    }
  }
  
  return htmlOutput
      .setTitle('Reporte Producción - Sabor Pampeano')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function findCol(headers, name) {
  var n = name.toLowerCase().trim();
  for (var i = 0; i < headers.length; i++) {
    if (headers[i].toString().toLowerCase().trim() === n) return i;
  }
  return -1;
}

function obtenerLotes() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var hoja = ss.getSheetByName('Lotes');
    if (!hoja) throw new Error("No se encontró la pestaña 'Lotes'. Asegurate de crearla.");
    var datos = hoja.getDataRange().getDisplayValues();
    if (datos.length < 2) throw new Error("La hoja Lotes está vacía o no tiene datos.");
    var encabezados = datos[0];
    var filas = datos.slice(1).filter(function(row) {
      return row[0] && row[0].toString().trim() !== "";
    });
    return { encabezados: encabezados, filas: filas };
  } catch (error) {
    throw new Error(error.message);
  }
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
    
    // Novedad V3.0: Leer Cat y Var para prefijos automáticos de lote
    var iCat         = findCol(h, "Cat");
    var iVar         = findCol(h, "Var");

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
        catLote:    iCat !== -1 && row[iCat] ? row[iCat].toString().trim() : "",
        varLote:    iVar !== -1 && row[iVar] ? row[iVar].toString().trim() : "",
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

function codigoTexto(cod) {
  if (cod === null || cod === undefined) return "";
  return String(cod).trim();
}

function guardarReporte(datos) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var timestampReal = new Date();
    var ESTADO_DEFAULT = "Pendiente de carga en sistema";

    // --- HOJA REGISTROS ---
    var hojaReg = ss.getSheetByName('Registros');
    if (!hojaReg) hojaReg = ss.insertSheet('Registros');

    // Inicializar headers si está vacía
    if (hojaReg.getLastRow() === 0 || hojaReg.getRange("A1").getDisplayValue() !== "Fecha del Registro") {
      if (hojaReg.getLastRow() > 0) hojaReg.insertRowBefore(1);
      hojaReg.getRange("A1:L1").setValues([[
        'Fecha del Registro', 'Fecha del Turno', 'Turno', 'Encargado',
        'Tipo de Registro', 'E/S', 'Categoría', 'Producto / Insumo',
        'Código Artículo', 'Lote', 'Cantidad', 'Motivo / Detalle / Comentarios'
      ]]);
      hojaReg.getRange("A1:L1").setFontWeight("bold").setBackground("#4A5D23").setFontColor("white");
      hojaReg.setFrozenRows(1);
    }

    var regLastCol = hojaReg.getLastColumn();
    var regHeaders = hojaReg.getRange(1, 1, 1, regLastCol).getValues()[0];
    
    // Mapeo dinámico de Registros (Novedad V3.0)
    var cReg = {
      fecha_reg:   findCol(regHeaders, "Fecha del Registro") + 1,
      fecha_turno: findCol(regHeaders, "Fecha del Turno") + 1,
      turno:       findCol(regHeaders, "Turno") + 1,
      encargado:   findCol(regHeaders, "Encargado") + 1,
      tipo_reg:    findCol(regHeaders, "Tipo de Registro") + 1,
      es:          findCol(regHeaders, "E/S") + 1,
      categoria:   findCol(regHeaders, "Categoría") + 1,
      producto:    findCol(regHeaders, "Producto / Insumo") + 1,
      codigo:      findCol(regHeaders, "Código Artículo") + 1,
      lote:        findCol(regHeaders, "Lote") + 1, // Nuevo campo!
      cantidad:    findCol(regHeaders, "Cantidad") + 1,
      comentarios: findCol(regHeaders, "Motivo / Detalle / Comentarios") + 1
    };

    function crearFilaReg(tipo, es, cat, prod, cod, lote, cant, obs) {
      var f = [];
      for (var col = 0; col < regLastCol; col++) f.push("");
      if (cReg.fecha_reg > 0)   f[cReg.fecha_reg - 1]   = timestampReal;
      if (cReg.fecha_turno > 0) f[cReg.fecha_turno - 1] = datos.fecha;
      if (cReg.turno > 0)       f[cReg.turno - 1]       = datos.turno;
      if (cReg.encargado > 0)   f[cReg.encargado - 1]   = datos.encargado;
      if (cReg.tipo_reg > 0)    f[cReg.tipo_reg - 1]    = tipo;
      if (cReg.es > 0)          f[cReg.es - 1]          = es;
      if (cReg.categoria > 0)   f[cReg.categoria - 1]   = cat;
      if (cReg.producto > 0)    f[cReg.producto - 1]    = prod;
      if (cReg.codigo > 0)      f[cReg.codigo - 1]      = cod;
      if (cReg.lote > 0)        f[cReg.lote - 1]        = lote;
      if (cReg.cantidad > 0)    f[cReg.cantidad - 1]    = cant;
      if (cReg.comentarios > 0) f[cReg.comentarios - 1] = obs;
      return f;
    }

    var filasRegistros = [];
    var entradas_ctrl = [];

    // --- HOJA CONTROLES ---
    var hojaCtrl = ss.getSheetByName('Controles');
    if (!hojaCtrl) hojaCtrl = ss.insertSheet('Controles');

    var ctrlLastCol = hojaCtrl.getLastColumn();
    var ctrlHeaders = [];
    if (hojaCtrl.getLastRow() > 0 && ctrlLastCol > 0) {
      ctrlHeaders = hojaCtrl.getRange(1, 1, 1, ctrlLastCol).getValues()[0];
    }

    var cCtrl = {
      fecha_reg:   findCol(ctrlHeaders, "Fecha del Registro") + 1,
      fecha_turno: findCol(ctrlHeaders, "Fecha del Turno") + 1,
      turno:       findCol(ctrlHeaders, "Turno") + 1,
      encargado:   findCol(ctrlHeaders, "Encargado") + 1,
      tipo_reg:    findCol(ctrlHeaders, "Tipo de Registro") + 1,
      producto:    findCol(ctrlHeaders, "Producto") + 1,
      codigo:      findCol(ctrlHeaders, "Código de Artículo") + 1,
      lote:        findCol(ctrlHeaders, "Lote") + 1,
      cantidad:    findCol(ctrlHeaders, "Cantidad") + 1,
      brix:        findCol(ctrlHeaders, "°Brix") + 1,
      ph:          findCol(ctrlHeaders, "PH") + 1,
      estado:      findCol(ctrlHeaders, "Estado") + 1
    };

    if (ctrlHeaders.length === 0 || cCtrl.producto === 0) {
      if (hojaCtrl.getLastRow() > 0) hojaCtrl.insertRowBefore(1);
      hojaCtrl.getRange("A1:L1").setValues([[
        'Fecha del Registro', 'Fecha del Turno', 'Turno', 'Encargado',
        'Tipo de Registro', 'Producto', 'Código de Artículo', 'Lote',
        'Cantidad', '°Brix', 'PH', 'Estado'
      ]]);
      hojaCtrl.getRange("A1:L1").setFontWeight("bold").setBackground("#4A5D23").setFontColor("white");
      hojaCtrl.setFrozenRows(1);
      ctrlHeaders = hojaCtrl.getRange(1, 1, 1, 12).getValues()[0];
      cCtrl.fecha_reg=1; cCtrl.fecha_turno=2; cCtrl.turno=3; cCtrl.encargado=4;
      cCtrl.tipo_reg=5; cCtrl.producto=6; cCtrl.codigo=7; cCtrl.lote=8;
      cCtrl.cantidad=9; cCtrl.brix=10; cCtrl.ph=11; cCtrl.estado=12;
      ctrlLastCol = 12;
    }

    // 1. Producción
    if (datos.produccion && datos.produccion.length > 0) {
      datos.produccion.forEach(function(p) {
        var codTxt = codigoTexto(p.codigo);
        if (p.lotes && p.lotes.length > 0) {
          p.lotes.forEach(function(l) {
            // Novedad V3.0: 1 fila por lote en Registros
            filasRegistros.push(crearFilaReg("PRODUCCIÓN", "E", p.categoria, p.producto, codTxt, l.numero, l.cantidad, ""));
            entradas_ctrl.push({
              tipo: "PRODUCCIÓN", producto: p.producto, codigo: codTxt,
              lote: l.numero, cantidad: l.cantidad, brix: l.brix || "", ph: l.ph || ""
            });
          });
        } else {
          filasRegistros.push(crearFilaReg("PRODUCCIÓN", "E", p.categoria, p.producto, codTxt, "", p.cantidad, ""));
          entradas_ctrl.push({
            tipo: "PRODUCCIÓN", producto: p.producto, codigo: codTxt,
            lote: "", cantidad: p.cantidad, brix: "", ph: ""
          });
        }
      });
    }

    // 2. Reproceso
    if (datos.reproceso && datos.reproceso.length > 0) {
      datos.reproceso.forEach(function(r) {
        var codTxt = codigoTexto(r.codigo);
        if (r.lotes && r.lotes.length > 0) {
          r.lotes.forEach(function(l) {
            filasRegistros.push(crearFilaReg("REPROCESO (Producto Salvado)", "E", r.categoria, r.producto, codTxt, l.numero, l.cantidad, r.motivo));
          });
        } else {
          filasRegistros.push(crearFilaReg("REPROCESO (Producto Salvado)", "E", r.categoria, r.producto, codTxt, "", r.cantidad, r.motivo));
        }
        
        // Insumos Estructurados
        if (r.insumos && r.insumos.length > 0) {
          r.insumos.forEach(function(ins) {
            var obs = ins.motivo ? "Asociado a reproceso de: " + r.producto + " / " + ins.motivo : "Asociado a reproceso de: " + r.producto;
            filasRegistros.push(crearFilaReg("REPROCESO (Insumos Gastados)", "S", "INSUMOS EXTRAS", ins.nombre, "", "", ins.cantidad, obs));
          });
        }
      });
    }

    // 3. Decomiso
    if (datos.decomiso && datos.decomiso.length > 0) {
      datos.decomiso.forEach(function(d) {
        var codTxt = codigoTexto(d.codigo);
        if (d.lotes && d.lotes.length > 0) {
          d.lotes.forEach(function(l) {
            filasRegistros.push(crearFilaReg("DECOMISO", "S", d.categoria, d.producto, codTxt, l.numero, l.cantidad, d.motivo));
          });
        } else {
          filasRegistros.push(crearFilaReg("DECOMISO", "S", d.categoria, d.producto, codTxt, "", d.cantidad, d.motivo));
        }
      });
    }

    // 4. Mermas / Recuperos
    if (datos.mermas && datos.mermas.length > 0) {
      datos.mermas.forEach(function(m) {
        var codTxt = codigoTexto(m.codigo);
        var tipoReg = m.tipo_movimiento === "Pérdida" ? "MERMA" : "RECUPERO";
        var es = m.tipo_movimiento === "Pérdida" ? "S" : "E";
        if (m.lotes && m.lotes.length > 0) {
          m.lotes.forEach(function(l) {
            filasRegistros.push(crearFilaReg(tipoReg, es, m.categoria, m.producto, codTxt, l.numero, l.cantidad, m.motivo));
          });
        } else {
          filasRegistros.push(crearFilaReg(tipoReg, es, m.categoria, m.producto, codTxt, "", m.cantidad, m.motivo));
        }
      });
    }

    // 5. En Proceso
    if (datos.en_proceso && datos.en_proceso.length > 0) {
      datos.en_proceso.forEach(function(ep) {
        var codTxt = codigoTexto(ep.codigo);
        filasRegistros.push(crearFilaReg("EN PROCESO", "-", ep.categoria || "-", ep.producto, codTxt, "", ep.cantidad, ep.motivo || ""));
      });
    }

    // 6. Observaciones
    if (datos.observaciones && datos.observaciones.trim() !== "") {
      filasRegistros.push(crearFilaReg("COMENTARIOS", "-", "-", "-", "-", "-", "-", datos.observaciones.trim()));
    }

    // --- INSERTAR EN REGISTROS ---
    if (filasRegistros.length > 0) {
      hojaReg.insertRowsAfter(1, filasRegistros.length);
      
      // Forzar formato de columnas clave (si existen)
      if (cReg.codigo > 0) hojaReg.getRange(2, cReg.codigo, filasRegistros.length, 1).setNumberFormat("@");
      if (cReg.lote > 0)   hojaReg.getRange(2, cReg.lote, filasRegistros.length, 1).setNumberFormat("@");
      
      hojaReg.getRange(2, 1, filasRegistros.length, regLastCol).setValues(filasRegistros);

      // Copiar Validación de Estado
      var colEstadoReg = findCol(regHeaders, "estado") + 1;
      if (colEstadoReg > 0) {
        var filaRef = 2 + filasRegistros.length;
        var rangoDestino = hojaReg.getRange(2, colEstadoReg, filasRegistros.length, 1);
        if (filaRef <= hojaReg.getLastRow()) {
          var celdaOrigen = hojaReg.getRange(filaRef, colEstadoReg);
          celdaOrigen.copyTo(rangoDestino, SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
        } else {
          var ruleReg = SpreadsheetApp.newDataValidation().requireValueInList(["Pendiente de carga en sistema", "Cargado en sistema"], true).setAllowInvalid(false).build();
          rangoDestino.setDataValidation(ruleReg);
        }
        var valoresEstado = [];
        for (var v = 0; v < filasRegistros.length; v++) { valoresEstado.push([ESTADO_DEFAULT]); }
        rangoDestino.setValues(valoresEstado);
      }

      // Color por Turno
      if (cReg.turno > 0) {
        for (var tr = 0; tr < filasRegistros.length; tr++) {
          var turnoVal = filasRegistros[tr][cReg.turno - 1];
          var colorFondo = null;
          if (turnoVal === "Roboqbo") colorFondo = "#D6EAF8";
          else if (turnoVal === "Mañana") colorFondo = "#FCF3CF";
          else if (turnoVal === "Tarde") colorFondo = "#FADBD8";
          if (colorFondo) hojaReg.getRange(2 + tr, cReg.turno, 1, 1).setBackground(colorFondo);
        }
      }
    }

    // --- INSERTAR EN CONTROLES ---
    if (entradas_ctrl.length > 0) {
      hojaCtrl.insertRowsAfter(1, entradas_ctrl.length);

      if (cCtrl.codigo > 0) hojaCtrl.getRange(2, cCtrl.codigo, entradas_ctrl.length, 1).setNumberFormat("@");
      if (cCtrl.lote > 0)   hojaCtrl.getRange(2, cCtrl.lote, entradas_ctrl.length, 1).setNumberFormat("@");

      var filasCtrl = [];
      for (var i = 0; i < entradas_ctrl.length; i++) {
        var ec = entradas_ctrl[i];
        var fila = [];
        for (var col = 0; col < ctrlLastCol; col++) { fila.push(""); }
        if (cCtrl.fecha_reg > 0)   fila[cCtrl.fecha_reg - 1]   = timestampReal;
        if (cCtrl.fecha_turno > 0) fila[cCtrl.fecha_turno - 1] = datos.fecha;
        if (cCtrl.turno > 0)       fila[cCtrl.turno - 1]       = datos.turno;
        if (cCtrl.encargado > 0)   fila[cCtrl.encargado - 1]   = datos.encargado;
        if (cCtrl.tipo_reg > 0)    fila[cCtrl.tipo_reg - 1]    = ec.tipo;
        if (cCtrl.producto > 0)    fila[cCtrl.producto - 1]    = ec.producto;
        if (cCtrl.codigo > 0)      fila[cCtrl.codigo - 1]      = ec.codigo;
        if (cCtrl.lote > 0)        fila[cCtrl.lote - 1]        = ec.lote;
        if (cCtrl.cantidad > 0)    fila[cCtrl.cantidad - 1]    = ec.cantidad;
        if (cCtrl.brix > 0)        fila[cCtrl.brix - 1]        = ec.brix;
        if (cCtrl.ph > 0)          fila[cCtrl.ph - 1]          = ec.ph;
        if (cCtrl.estado > 0)      fila[cCtrl.estado - 1]      = ESTADO_DEFAULT;
        filasCtrl.push(fila);
      }
      hojaCtrl.getRange(2, 1, filasCtrl.length, ctrlLastCol).setValues(filasCtrl);

      // Copiar Estado Controles
      if (cCtrl.estado > 0) {
        var filaRefCtrl = 2 + entradas_ctrl.length;
        var rangoDestinoCtrl = hojaCtrl.getRange(2, cCtrl.estado, entradas_ctrl.length, 1);
        if (filaRefCtrl <= hojaCtrl.getLastRow()) {
          var celdaOrigenCtrl = hojaCtrl.getRange(filaRefCtrl, cCtrl.estado);
          celdaOrigenCtrl.copyTo(rangoDestinoCtrl, SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
          var valCtrl = [];
          for (var vc = 0; vc < entradas_ctrl.length; vc++) { valCtrl.push([ESTADO_DEFAULT]); }
          rangoDestinoCtrl.setValues(valCtrl);
        }
      }

      // Fórmulas
      var colTotalFinal = findCol(ctrlHeaders, "total final") + 1;
      if (colTotalFinal > 0) {
        var filaRefFormula = 2 + entradas_ctrl.length;
        if (filaRefFormula <= hojaCtrl.getLastRow()) {
          var celdaFormula = hojaCtrl.getRange(filaRefFormula, colTotalFinal);
          var rangoDestinoFormula = hojaCtrl.getRange(2, colTotalFinal, entradas_ctrl.length, 1);
          celdaFormula.copyTo(rangoDestinoFormula, SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
        }
      }

      // Colores Controles
      if (cCtrl.turno > 0) {
        for (var tc = 0; tc < filasCtrl.length; tc++) {
          var turnoCtrl = filasCtrl[tc][cCtrl.turno - 1];
          var colorCtrl = null;
          if (turnoCtrl === "Roboqbo") colorCtrl = "#D6EAF8";
          else if (turnoCtrl === "Mañana") colorCtrl = "#FCF3CF";
          else if (turnoCtrl === "Tarde") colorCtrl = "#FADBD8";
          if (colorCtrl) hojaCtrl.getRange(2 + tc, cCtrl.turno, 1, 1).setBackground(colorCtrl);
        }
      }
    }

    return true;
  } catch (error) {
    throw new Error("Error en servidor al guardar: " + error.message);
  }
}

// -------------------------------------------------------
// LÓGICA DE MENÚS (Intacta)
// -------------------------------------------------------

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('📝 Formulario')
    .addItem('Obtener Link del Reporte', 'mostrarLink')
    .addItem('Link Tabla de Lotes', 'mostrarLinkLotes')
    .addItem('Link Control de Stock', 'mostrarLinkStock')
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
      +'<button onclick="google.script.run.withSuccessHandler(function(){google.script.host.close();}).borrarLink();" style="background:none;border:none;cursor:pointer;font-size:10px;color:#999;text-decoration:underline;padding:0;">Modificar link</button>'
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

function mostrarLinkLotes() {
  var props = PropertiesService.getDocumentProperties();
  var urlGuardada = props.getProperty('WEB_APP_URL');
  if (urlGuardada) {
    var urlLotes = urlGuardada + "?vista=lotes";
    var html = '<div style="font-family:Arial,sans-serif;padding:15px;text-align:center;">'
      +'<h3 style="color:#4A5D23;margin-top:0;">Link de Tabla de Lotes</h3>'
      +'<p style="font-size:13px;color:#555;">Copiá este enlace para que los empleados vean los lotes:</p>'
      +'<input type="text" id="urlInput" value="'+urlLotes+'" readonly style="width:100%;padding:10px;margin:15px 0;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;text-align:center;font-size:11px;background:#f9f9f9;">'
      +'<button onclick="copiarLink()" style="background:#7A9B3A;color:#fff;border:none;padding:10px 20px;border-radius:4px;cursor:pointer;font-weight:bold;width:100%;">Copiar Enlace</button>'
      +'<p id="msg" style="color:#27ae60;font-size:12px;margin-top:10px;display:none;">¡Copiado!</p>'
      +'<script>function copiarLink(){var c=document.getElementById("urlInput");c.select();document.execCommand("copy");document.getElementById("msg").style.display="block";setTimeout(function(){document.getElementById("msg").style.display="none";},3000);}<\/script>'
      +'</div>';
    SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(html).setWidth(400).setHeight(230),'Link de Lotes');
  } else {
    SpreadsheetApp.getUi().alert("Primero configurá el link oficial desde 'Obtener Link del Reporte'.");
  }
}

function guardarLinkOficial(url){PropertiesService.getDocumentProperties().setProperty('WEB_APP_URL',url);}
function borrarLink(){PropertiesService.getDocumentProperties().deleteProperty('WEB_APP_URL');}
function guardarLinkManual(url){PropertiesService.getDocumentProperties().setProperty('MANUAL_PDF_URL',url);}
