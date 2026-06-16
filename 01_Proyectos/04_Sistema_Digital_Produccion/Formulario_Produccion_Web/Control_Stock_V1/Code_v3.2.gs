// Código Backend (Google Apps Script) - VERSIÓN 3.2 (Auditoría Completa)

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

function codigoTexto(cod) {
  if (cod === null || cod === undefined) return "";
  return String(cod).trim();
}

function guardarReporte(datos) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var timestampReal = new Date();
    var ESTADO_DEFAULT = "Pendiente de carga en sistema";

    // =============================================
    // HOJA REGISTROS
    // =============================================
    var hojaReg = ss.getSheetByName('Registros');
    if (!hojaReg) hojaReg = ss.insertSheet('Registros');

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

    // Leer headers INICIALES para construir las filas de datos (columnas A-L)
    var regLastCol = hojaReg.getLastColumn();
    var regHeaders = hojaReg.getRange(1, 1, 1, regLastCol).getValues()[0];
    
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
      lote:        findCol(regHeaders, "Lote") + 1, 
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

    // =============================================
    // HOJA CONTROLES (leer antes de armar las filas)
    // =============================================
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
      estado:      -1
    };
    for (var c = 0; c < ctrlHeaders.length; c++) {
      var hName = ctrlHeaders[c] ? ctrlHeaders[c].toString().toLowerCase().trim() : "";
      if (hName === "estado") { cCtrl.estado = c + 1; break; }
    }

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

    // =============================================
    // ARMAR FILAS DE DATOS
    // =============================================

    // 1. Producción
    if (datos.produccion && datos.produccion.length > 0) {
      datos.produccion.forEach(function(p) {
        var codTxt = codigoTexto(p.codigo);
        if (p.lotes && p.lotes.length > 0) {
          p.lotes.forEach(function(l) {
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

    // 6. Observaciones / Comentarios
    if (datos.observaciones && datos.observaciones.trim() !== "") {
      filasRegistros.push(crearFilaReg("COMENTARIOS", "-", "-", "-", "-", "-", "-", datos.observaciones.trim()));
    }

    // =============================================
    // INSERTAR EN REGISTROS
    // =============================================
    if (filasRegistros.length > 0) {
      hojaReg.insertRowsAfter(1, filasRegistros.length);
      if (cReg.codigo > 0) hojaReg.getRange(2, cReg.codigo, filasRegistros.length, 1).setNumberFormat("@");
      if (cReg.lote > 0)   hojaReg.getRange(2, cReg.lote, filasRegistros.length, 1).setNumberFormat("@");
      hojaReg.getRange(2, 1, filasRegistros.length, regLastCol).setValues(filasRegistros);

      // *** FIX CRÍTICO: Re-leer headers DESPUÉS de insertar, para captar columnas
      // extras como "Estado" que el usuario haya agregado manualmente más allá de la L ***
      var headersRegPost = hojaReg.getRange(1, 1, 1, hojaReg.getLastColumn()).getValues()[0];
      var colEstadoReg = -1;
      for (var c = 0; c < headersRegPost.length; c++) {
        var hName = headersRegPost[c] ? headersRegPost[c].toString().toLowerCase().trim() : "";
        if (hName === "estado") { colEstadoReg = c + 1; break; }
      }
      if (colEstadoReg > 0) {
        var filaRef = 2 + filasRegistros.length; // Primera fila existente debajo de las nuevas
        var rangoDestino = hojaReg.getRange(2, colEstadoReg, filasRegistros.length, 1);
        if (filaRef <= hojaReg.getLastRow()) {
          // Copiar formato + dropdown de la celda de referencia
          var celdaOrigen = hojaReg.getRange(filaRef, colEstadoReg);
          celdaOrigen.copyTo(rangoDestino, SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
        } else {
          // No hay fila de referencia (primera carga) → crear dropdown desde cero
          var ruleReg = SpreadsheetApp.newDataValidation()
            .requireValueInList(["Pendiente de carga en sistema", "Cargado en sistema"], true)
            .setAllowInvalid(false)
            .build();
          rangoDestino.setDataValidation(ruleReg);
        }
        // Siempre setear el valor por defecto
        var valoresEstado = [];
        for (var v = 0; v < filasRegistros.length; v++) { valoresEstado.push([ESTADO_DEFAULT]); }
        rangoDestino.setValues(valoresEstado);
      }

      // Color por turno en Registros
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

    // =============================================
    // INSERTAR EN CONTROLES (solo PRODUCCIÓN)
    // =============================================
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

      // Copiar formato + dropdown de Estado en Controles
      if (cCtrl.estado > 0) {
        var filaRefCtrl = 2 + entradas_ctrl.length;
        var rangoDestinoCtrl = hojaCtrl.getRange(2, cCtrl.estado, entradas_ctrl.length, 1);
        if (filaRefCtrl <= hojaCtrl.getLastRow()) {
          var celdaOrigenCtrl = hojaCtrl.getRange(filaRefCtrl, cCtrl.estado);
          celdaOrigenCtrl.copyTo(rangoDestinoCtrl, SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
        } else {
          // Primera carga: crear dropdown desde cero
          var ruleCtrl = SpreadsheetApp.newDataValidation()
            .requireValueInList(["Pendiente de carga en sistema", "Cargado en sistema"], true)
            .setAllowInvalid(false)
            .build();
          rangoDestinoCtrl.setDataValidation(ruleCtrl);
        }
        // Siempre setear el valor por defecto
        var valCtrl = [];
        for (var vc = 0; vc < entradas_ctrl.length; vc++) { valCtrl.push([ESTADO_DEFAULT]); }
        rangoDestinoCtrl.setValues(valCtrl);
      }

      // Copiar fórmula de "Total Final" si existe
      var colTotalFinal = findCol(ctrlHeaders, "total final") + 1;
      if (colTotalFinal > 0) {
        var filaRefFormula = 2 + entradas_ctrl.length;
        if (filaRefFormula <= hojaCtrl.getLastRow()) {
          var celdaFormula = hojaCtrl.getRange(filaRefFormula, colTotalFinal);
          var rangoDestinoFormula = hojaCtrl.getRange(2, colTotalFinal, entradas_ctrl.length, 1);
          celdaFormula.copyTo(rangoDestinoFormula, SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
        }
      }

      // Color por turno en Controles
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
// LÓGICA DE MENÚS
// -------------------------------------------------------

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('📝 Formulario')
    .addItem('Obtener Link del Reporte', 'mostrarLink')
    .addItem('Link Tabla de Lotes', 'mostrarLinkLotes')
    .addItem('Link Control de Stock', 'mostrarLinkStock')
    .addItem('Modo de Uso', 'mostrarModoUso')
    .addSeparator()
    .addItem('✨ Auto-completar Lotes (Cat y Var)', 'autocompletarLotesMagico')
    .addToUi();
}

function autocompletarLotesMagico() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hojaProd = ss.getSheetByName('Lista de Productos');
  if (!hojaProd) {
    SpreadsheetApp.getUi().alert("Error: No se encontró la hoja 'Lista de Productos'.");
    return;
  }
  
  var datos = hojaProd.getDataRange().getDisplayValues();
  if (datos.length < 2) return;
  var headers = datos[0];
  var colProd = findCol(headers, "Productos");
  var colDesc = findCol(headers, "Desc. Adicional");
  var colFam  = findCol(headers, "Familia");
  var colCat  = findCol(headers, "Cat");
  var colVar  = findCol(headers, "Var");
  
  if (colProd === -1) { SpreadsheetApp.getUi().alert("Error: Falta la columna 'Productos'."); return; }
  if (colCat === -1 || colVar === -1) {
    SpreadsheetApp.getUi().alert("Faltan las columnas 'Cat' o 'Var'. Creálas primero al final de la tabla.");
    return;
  }
  
  var actualizados = 0;
  for (var i = 1; i < datos.length; i++) {
    var pName = datos[i][colProd] || "";
    var pDesc = colDesc !== -1 ? datos[i][colDesc] || "" : "";
    var pFam  = colFam !== -1 ? datos[i][colFam] || "" : "";
    
    if (pName.trim() === "") continue;
    
    var res = mapearLoteMago(pName, pDesc, pFam);
    var vCat = res[0] !== "" ? res[0] : "";
    var vVar = res[1] !== "" ? res[1] : "";
    
    hojaProd.getRange(i + 1, colCat + 1).setValue(vCat);
    hojaProd.getRange(i + 1, colVar + 1).setValue(vVar);
    if (vCat !== "") actualizados++;
  }
  
  SpreadsheetApp.getUi().alert("¡Magia completada! ✨\nSe han revisado todos los productos y se actualizaron " + actualizados + " lotes.\n\nNota: Los insumos fueron ignorados a propósito.");
}

// Algoritmo V3.2: Normalización de acentos y exclusión de insumos
function mapearLoteMago(producto, desc, familia) {
  // 1. Excluir INSUMOS (solo Productos Terminados tienen lote)
  var famStr = familia ? familia.toString().toUpperCase() : "";
  if (famStr.indexOf("INSUMO") > -1) return ["", ""];
  
  // 2. Normalizar texto (quitar acentos: PATÉ -> PATE, JAMÓN -> JAMON)
  var txtBruto = (producto + " " + desc).toUpperCase();
  var txt = txtBruto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // 1: Hummus
  if (txt.indexOf("HUMMUS") > -1) {
    if (txt.indexOf("AJO") > -1) return [1, 1];
    if (txt.indexOf("BERENJENA") > -1) return [1, 2];
    if (txt.indexOf("GUACAMOLE") > -1) return [1, 3];
    if (txt.indexOf("PIMIENTOS") > -1) return [1, 4];
    if (txt.indexOf("HIERB") > -1) return [1, 5];
    if (txt.indexOf("REMOLACHA") > -1) return [1, 6];
    if (txt.indexOf("TRADICIONAL") > -1) return [1, 7];
    if (txt.indexOf("ZANAHORIA") > -1) return [1, 8];
  }
  
  // 2: Patés y Babaganush
  if (txt.indexOf("BABAGANUSH") > -1) {
    if (txt.indexOf("BERENJENA X") > -1 || txt.indexOf("BERENJENA/PIMIENTOS") > -1 || txt.indexOf("BER/PI/AG") > -1) return [2, 6];
    if (txt.indexOf("PIMIENTOS") > -1) return [3, 2];
    return [3, 1];
  }
  if (txt.indexOf("PATE") > -1) {
    if (txt.indexOf("CEBOLLA") > -1) return [2, 1];
    if (txt.indexOf("PIMIENTO") > -1) return [2, 2];
    if (txt.indexOf("REMOLACHA") > -1) return [2, 3];
    if (txt.indexOf("TOMATE") > -1) return [2, 4];
    if (txt.indexOf("ZANAHORIA") > -1) return [2, 5];
  }
  
  // 3: Aderezos
  if (txt.indexOf("CEBOLLA CARAMELIZADA X") > -1 && txt.indexOf("TARTA") === -1) return [3, 3];
  
  // 4: Conservas
  if (txt.indexOf("AJIES EN VINAGRE") > -1) return [4, 1];
  if (txt.indexOf("BERENJENA E/ESCAB") > -1 || txt.indexOf("BERENJENA EN ESCAB") > -1) return [4, 2];
  if (txt.indexOf("CEBOLLITAS EN VINAGRE") > -1) return [4, 3];
  if (txt.indexOf("CHERRY CONFIT") > -1) return [4, 4];
  if (txt.indexOf("ENCURTIDOS MIXTOS") > -1) return [4, 5];
  if (txt.indexOf("GARBANZOS E/ESCAB") > -1) return [4, 6];
  if (txt.indexOf("LENTEJAS E/ESCAB") > -1) return [4, 7];
  if (txt.indexOf("MORRONES E/ESCAB") > -1) return [4, 8];
  if (txt.indexOf("PEPINILLOS EN VINAGRE") > -1) return [4, 9];
  if (txt.indexOf("POROT COLORAD") > -1) return [4, 13];
  if (txt.indexOf("POROT NEGROS") > -1) return [4, 11];
  if (txt.indexOf("POROT PALLARES") > -1) return [4, 12];
  if (txt.indexOf("TOMATES CONFITADOS") > -1) return [4, 14];
  if (txt.indexOf("TOMATE TRITURADO") > -1) return [4, 15];
  if (txt.indexOf("HIGOS EN ALMIBAR") > -1) return [4, 16];
  if (txt.indexOf("ZAPALLO EN ALMIBAR") > -1) return [4, 17];
  if (txt.indexOf("BROCOLIS EN VINAGRE") > -1) return [4, 18];
  
  // 5: Mermeladas
  if (txt.indexOf("MERMELADA") > -1 || txt.indexOf("CONFITURA") > -1) {
    if (txt.indexOf("CONFITURA") > -1 && txt.indexOf("ARANDANO") > -1) return [5, 15];
    if (txt.indexOf("BC") > -1) {
      if (txt.indexOf("ARANDANO") > -1) return [5, 10];
      if (txt.indexOf("CEREZA") > -1) return [5, 11];
      if (txt.indexOf("FRUT ROJ") > -1) return [5, 12];
      if (txt.indexOf("PERA Y MANZANA") > -1) return [5, 13];
    } else {
      if (txt.indexOf("FRUTILLA") > -1) return [5, 1];
      if (txt.indexOf("HIGO") > -1) return [5, 2];
      if (txt.indexOf("ARANDANO") > -1) return [5, 3];
      if (txt.indexOf("TOMATE") > -1) return [5, 4];
      if (txt.indexOf("CEREZA") > -1) return [5, 5];
      if (txt.indexOf("CIRUELA") > -1) return [5, 6];
      if (txt.indexOf("PERA") > -1) return [5, 7];
      if (txt.indexOf("NARANJA") > -1) return [5, 8];
      if (txt.indexOf("ZAPALL/MANZAN") > -1) return [5, 9];
      if (txt.indexOf("DURAZNO") > -1) return [5, 14];
    }
  }
  
  // 6: Aceitunas y Aceite
  if (txt.indexOf("AC NEG") > -1 || txt.indexOf("ACEITUNAS NEGRAS") > -1) {
    if (txt.indexOf("RODAJAS") > -1) return [6, 4];
    if (txt.indexOf("S/C") > -1 || txt.indexOf("S/CAROZO") > -1 || txt.indexOf("S/CAROZ") > -1) return [6, 3];
    if (txt.indexOf("N° 00") > -1 || txt.indexOf("N°00") > -1) return [6, 2];
    if (txt.indexOf("N° 0") > -1 || txt.indexOf("N°0") > -1) return [6, 1];
  }
  if (txt.indexOf("AC VE") > -1 || txt.indexOf("ACEITUNAS VERDES") > -1) {
    if (txt.indexOf("RODAJA") > -1) return [6, 8];
    if (txt.indexOf("RELL") > -1) return [6, 7];
    if (txt.indexOf("S/C N° 00") > -1 || txt.indexOf("S/C N°00") > -1) return [6, 11];
    if (txt.indexOf("S/C N° 0") > -1 || txt.indexOf("S/C N°0") > -1) return [6, 10];
    if (txt.indexOf("C/C N° 00") > -1 || txt.indexOf("C/C N°00") > -1) return [6, 6];
    if (txt.indexOf("C/C N° 0") > -1 || txt.indexOf("C/C N°0") > -1) return [6, 5];
  }
  if (txt.indexOf("ACEITE DE OLIVA") > -1 || txt.indexOf("ACEITE OLIVA") > -1) {
    return [6, 9];
  }
  
  // 7: Tartas y Tortillas
  if (txt.indexOf("TARTA") > -1) {
    var int = txt.indexOf("INTEGRAL") > -1;
    if (txt.indexOf("ACELGA") > -1) return int ? [7, 10] : [7, 1];
    if (txt.indexOf("VERDURAS ASADAS") > -1) return int ? [7, 11] : [7, 2];
    if (txt.indexOf("JAMON Y QUESO") > -1) return [7, 3];
    if (txt.indexOf("CAPRESE") > -1) return int ? [7, 12] : [7, 4];
    if (txt.indexOf("HUMITA") > -1) return int ? [7, 13] : [7, 5];
    if (txt.indexOf("CEBOLLA CARAMELIZADA") > -1) return int ? [7, 14] : [7, 6];
    if (txt.indexOf("CALABAZA") > -1) return int ? [7, 15] : [7, 7];
  }
  if (txt.indexOf("TORTILLA") > -1) {
    if (txt.indexOf("CEB") > -1) return [7, 9];
    return [7, 8];
  }
  
  // 8: Viandas
  if (txt.indexOf("MILANESA DE MERLUZA") > -1) return [8, 1];
  var s = txt.replace(/\s+/g, ' ');
  if (s.indexOf("SUPREMA DE POLLO C/ PAPAS") > -1 || s.indexOf("SUPREMA DE POLLO C/PAPAS") > -1) return [8, 2];
  if (s.indexOf("SUPREMA DE POLLO C/VERDURAS") > -1 || s.indexOf("SUPREMA DE POLLO C/ VERDURAS") > -1) return [8, 3];
  if (txt.indexOf("MILANESA DE BERENJENA") > -1) return [8, 4];
  if (txt.indexOf("FILETE DE MERLUZA") > -1) return [8, 5];
  if (txt.indexOf("BONDIOLA") > -1) return [8, 6];
  if (txt.indexOf("WOK DE VEGETALES C/POLLO") > -1) return [8, 7];
  if (txt.indexOf("WOK DE VEGETALES C/ARROZ") > -1) return [8, 8];
  if (txt.indexOf("CUADRIL") > -1) return [8, 9];
  if (txt.indexOf("CREPES RELLENOS") > -1) return [8, 10];
  
  return ["", ""];
}

// -------------------------------------------------------
// LINK Y MODOS DE USO
// -------------------------------------------------------
function mostrarLink() {
  var props = PropertiesService.getDocumentProperties();
  var urlGuardada = props.getProperty('WEB_APP_URL');
  if (urlGuardada) {
    var html = '<div style="font-family:Arial,sans-serif;padding:15px;text-align:center;">'
      +'<h3 style="color:#4A5D23;margin-top:0;">Link del Parte Diario</h3>'
      +'<input type="text" id="urlInput" value="'+urlGuardada+'" readonly style="width:100%;padding:10px;margin:15px 0;border:1px solid #ccc;text-align:center;">'
      +'<button onclick="copiarLink()" style="background:#7A9B3A;color:#fff;border:none;padding:10px 20px;cursor:pointer;width:100%;">Copiar Enlace</button>'
      +'<script>function copiarLink(){document.getElementById("urlInput").select();document.execCommand("copy");}<\/script>'
      +'</div>';
    SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(html).setWidth(400).setHeight(200),'Compartir Formulario');
  }
}
function mostrarLinkLotes() {}
function mostrarLinkStock() {}
function mostrarModoUso() {}
