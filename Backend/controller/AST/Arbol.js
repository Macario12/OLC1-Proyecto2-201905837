const { exec } = require("child_process");
const fs = require("fs");

const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");

function formaID(numId) {
  return "nodo" + numId;
}

function definirNodo(nodoId, etiqueta) {
  return formaID(nodoId) + '[label="' + etiqueta + '"] \n'
}

function defEdge(id1, id2) {
  return formaID(id1) + " -> " + formaID(id2) + "\n"
}

function getNodo(id, etiqueta, idPadre) {
  dotText = "";
  dotText += definirNodo(id, etiqueta);
  dotText += defEdge(idPadre, id);
  return dotText;
}

function graficarAst(arbolAst) {
  dotText = "digraph ast { \n";
  dotText += 'rankdir = "TB"; \n';
  dotText += "node[shape = box] \n";
  dotText += definirNodo(0, "Lista_Ins");
  for (let sentencia of arbolAst) {
    dotText += graficarSentencia(0, sentencia);
  }
  dotText += "}";
  fs.writeFile("./Controller/GrafoArbol/arbolast.dot", dotText, (err) => {});
  exec("dot -Tjpg ./Controller/GrafoArbol/arbolast.dot -o ./Controller/GrafoArbol/arbolast.jpg");
  const base64 = fs.readFileSync("./Controller/GrafoArbol/arbolast.jpg", "base64");
  return base64;
}

function graficarSentencia(idPadre, sentencia) {
  dotText = "";
  if (
    sentencia.tipo === TIPO_VALOR.INT ||
    sentencia.tipo === TIPO_VALOR.DOUBLE ||
    sentencia.tipo === TIPO_VALOR.BOOLEAN ||
    sentencia.tipo === TIPO_VALOR.CHAR ||
    sentencia.tipo === TIPO_VALOR.STRING ||
    sentencia.tipo === TIPO_VALOR.IDENTIFICADOR
  ) {
    return graficarSimbolo(idPadre, sentencia);
  } else if (
    sentencia.tipo === TIPO_OPERACION.SUMA ||
    sentencia.tipo === TIPO_OPERACION.RESTA ||
    sentencia.tipo === TIPO_OPERACION.MULTIPLICACION ||
    sentencia.tipo === TIPO_OPERACION.DIVISION ||
    sentencia.tipo === TIPO_OPERACION.POTENCIA ||
    sentencia.tipo === TIPO_OPERACION.MODULO ||
    sentencia.tipo === TIPO_OPERACION.IGUALIGUAL ||
    sentencia.tipo === TIPO_OPERACION.DIFERENTE ||
    sentencia.tipo === TIPO_OPERACION.MENOR ||
    sentencia.tipo === TIPO_OPERACION.MENORIGUAL ||
    sentencia.tipo === TIPO_OPERACION.MAYOR ||
    sentencia.tipo === TIPO_OPERACION.MAYORIGUAL ||
    sentencia.tipo === TIPO_OPERACION.OR ||
    sentencia.tipo === TIPO_OPERACION.AND ||
    sentencia.tipo === TIPO_OPERACION.NOT ||
    sentencia.tipo === TIPO_OPERACION.NEGACION
  ) {
    return graficarNuevaOpBinaria(idPadre, sentencia);
  } /*else if (
    sentencia.tipo === TIPO_OPERACION.NOT ||
    sentencia.tipo === TIPO_OPERACION.UMENOS
  ) {
    return graficarNuevaOpUnaria(idPadre, sentencia);
  }*/ else if (sentencia.tipo === TIPO_INSTRUCCION.EXEC) {
    return graficarExec(idPadre, sentencia);
  } else if (sentencia.tipo === TIPO_INSTRUCCION.LLAMADA_METODO) {
    return graficarLlamadaFuncMetodo(idPadre, sentencia);
  } else if (sentencia.tipo === TIPO_INSTRUCCION.PRINT) {
    return graficarPrint(idPadre, sentencia);
  } else if (sentencia.tipo === TIPO_INSTRUCCION.DE_METODO) {
    return graficarDecMetodo(idPadre, sentencia);
  } else if (sentencia.tipo === TIPO_INSTRUCCION.DECLARACION) {
    return graficarDecVar(idPadre, sentencia);
  } else if (sentencia.tipo === TIPO_INSTRUCCION.ASIGNACION) {
    return graficarAsgVar(idPadre, sentencia);
  } /*else if (sentencia.tipo === TIPO_INSTRUCCION.IF || sentencia.tipo === TIPO_INSTRUCCION.IFCELSEIF || sentencia.tipo === TIPO_INSTRUCCION.IFELSE) {
    return graficarIf(idPadre, sentencia);
  } else if (sentencia.tipo === TIPO_INSTRUCCION.CCASES || sentencia.tipo === TIPO_INSTRUCCION.SWDEFAULT || sentencia.tipo === TIPO_INSTRUCCION.CASE) {
    return graficarSwitch(idPadre, sentencia);
  }*/ else if (sentencia.tipo === TIPO_INSTRUCCION.WHILE) {
    return graficarWhile(idPadre, sentencia);
  } else if (sentencia.tipo === TIPO_INSTRUCCION.DOWHILE) {
    return graficarDoWhile(idPadre, sentencia);
  } else if (sentencia.tipo === TIPO_INSTRUCCION.FOR) {
    return graficarFor(idPadre, sentencia);
  } else if (
    sentencia.tipo === TIPO_INSTRUCCION.INCREMENTO ||
    sentencia.tipo === TIPO_INSTRUCCION.DECREMENTO
  ) {
    return graficarActualizacion(idPadre, sentencia);
  }
  return dotText;
}

function graficarExec(idPadre, sentencia) {
  dotText = "";
  dotText += getNodo(sentencia.idSent, "EXEC", idPadre);
  dotText += getNodo(
    sentencia.idSent + 1,
    "id \n" + sentencia.id,
    sentencia.idSent
  );
  if (sentencia.lista_valores != null) {
    dotText += getNodo(sentencia.idSent + 2, "PARAMETROS", sentencia.idSent);
    for (let sent of sentencia.lista_valores) {
        dotText += graficarSentencia(sentencia.idSent + 2, sent);
    }
}
  return dotText;
}

function graficarLlamadaFuncMetodo(idPadre, sentencia) {
  dotText = "";
  dotText += getNodo(sentencia.idSent, "LLAMADA_FUNC", idPadre);
  dotText += getNodo(sentencia.idSent + 1, "id", sentencia.idSent);
  dotText += getNodo(sentencia.idSent + 2, "LISTA_VALORES", sentencia.idSent);
  for (let sent of sentencia.lista_valores) {
    dotText += graficarSentencia(sentencia.idSent + 2, sent);
  }
  return dotText;
}

function graficarSimbolo(idPadre, sentencia) {
  dotText = "";
  dotText += definirNodo(sentencia.idSent, sentencia.valor);
  dotText += defEdge(idPadre, sentencia.idSent);
  return dotText;
}

function graficarDecMetodo(idPadre, sentencia) {
    dotText = ""
    dotText += getNodo(sentencia.idSent, (sentencia.tipoRetorno === null? "DEC_METODO" : "DEC_FUNCION"), idPadre)
    dotText += getNodo(sentencia.idSent+1, "Tipo Retorno \n" +"Void", sentencia.idSent)
    dotText += getNodo(sentencia.idSent+2, "Nombre \n" + sentencia.nombre, sentencia.idSent)
    if (sentencia.lista_parametros != null) {
        dotText += getNodo(sentencia.idSent+3, "LISTA_PARAMS", sentencia.idSent)
        cont = 4
        for (let sent of sentencia.lista_parametros){
            dotText += graficarSentencia(sentencia.idSent+3, sent)
        }
    }
    if (sentencia.instrucciones != null) {
        dotText += getNodo(sentencia.idSent+4, "LISTA_INS", sentencia.idSent)
        for (let sent of sentencia.instrucciones){
            dotText += graficarSentencia(sentencia.idSent+4, sent)
        }
    }
    return dotText
}

function graficarPrint(idPadre, sentencia) {
  dotText = "";
  dotText += getNodo(sentencia.idSent, "IMPRIMIR", idPadre);
  dotText += graficarSentencia(sentencia.idSent, sentencia.expresion);
  return dotText;
}

function graficarNuevaOpBinaria(idPadre, sentencia) {
  dotText = "";
  dotText += getNodo(sentencia.idSent, sentencia.tipo, idPadre);
  dotText += graficarSentencia(sentencia.idSent, sentencia.opIzq);
  if (sentencia.opDer !== null) {
    dotText += graficarSentencia(sentencia.idSent, sentencia.opDer);
  }
  return dotText;
}

function graficarNuevaOpUnaria(idPadre, sentencia) {
  dotText = "";
  dotText += getNodo(sentencia.idSent, sentencia.tipo, idPadre);
  dotText += graficarSentencia(sentencia.idSent, sentencia.op);
  return dotText;
}

function graficarDecVar(idPadre, sentencia) {
  dotText = "";
  dotText += getNodo(sentencia.idSent, "DEC_VAR", idPadre);
  dotText += getNodo(
    sentencia.idSent + 1,
    "Tipo \n" + sentencia.tipo_dato,
    sentencia.idSent
  );
  dotText += getNodo(
    sentencia.idSent + 2,
    "id \n" + sentencia.id,
    sentencia.idSent
  );
  if (sentencia.valor != null) {
    dotText += getNodo(sentencia.idSent + 3, "EXPRESION", sentencia.idSent);
    dotText += graficarSentencia(sentencia.idSent + 3, sentencia.valor);
  }
  return dotText;
}

function graficarAsgVar(idPadre, sentencia) {
  dotText = "";
  dotText += getNodo(sentencia.idSent, "ASIGNAR_VAR", idPadre);
  dotText += getNodo(
    sentencia.idSent + 1,
    "Id \n" + sentencia.id,
    sentencia.idSent
  );
  dotText += getNodo(sentencia.idSent + 2, "EXPRESION", sentencia.idSent);
  dotText += graficarSentencia(sentencia.idSent + 2, sentencia.expresion);

  return dotText;
}

function graficarIf(idPadre, sentencia) {
  dotText = "";
  dotText += getNodo(sentencia.idSent, "SENTENCIA_IF", idPadre);
  //grafica if simple
  dotText += getNodo(sentencia.ifSimple.idSent, "IF_SIMPLE", sentencia.idSent);
  dotText += getNodo(
    sentencia.ifSimple.idSent + 1,
    "CONDICION",
    sentencia.ifSimple.idSent
  );
  dotText += getNodo(
    sentencia.ifSimple.idSent + 2,
    "LISTA_INS",
    sentencia.ifSimple.idSent
  );
  dotText += graficarSentencia(
    sentencia.ifSimple.idSent + 1,
    sentencia.ifSimple.condicion
  );
  for (let sent of sentencia.ifSimple.listaIns) {
    dotText += graficarSentencia(sentencia.ifSimple.idSent + 2, sent);
  }
  //grfica los else if
  for (let sent of sentencia.listaElseIf) {
    dotText += getNodo(sent.idSent, "ELSE_IF", sentencia.idSent);
    dotText += getNodo(sent.idSent + 1, "CONDICION", sent.idSent);
    dotText += getNodo(sent.idSent + 2, "LISTA_INS", sent.idSent);
    dotText += graficarSentencia(sent.idSent + 1, sent.condicion);
    for (let sent2 of sent.listaIns) {
      dotText += graficarSentencia(sent.idSent + 2, sent2);
    }
  }
  //grfica el esle
  if (sentencia.listaInsElse.length > 0) {
    dotText += getNodo(sentencia.idSent + 1, "ELSE", sentencia.idSent);
    for (let sent of sentencia.listaInsElse) {
      dotText += graficarSentencia(sentencia.idSent + 1, sent);
    }
  }

  return dotText;
}
/*
function graficarSwitch(idPadre, sentencia) {
  dotText = "";
  dotText += getNodo(sentencia.idSent, "SWITCH", idPadre);
  dotText += getNodo(sentencia.idSent + 1, "EXPRESION", sentencia.idSent);
  dotText += getNodo(sentencia.idSent + 2, "SWITCH_CUERPO", sentencia.idSent);
  dotText += graficarSentencia(sentencia.idSent + 1, sentencia.expresion);
  for (let sent of sentencia.switchCuerpo.caseList) {
    dotText += getNodo(sent.idSent, "CASE", sentencia.idSent + 2);
    dotText += getNodo(sent.idSent + 1, "EXPRESION", sent.idSent);
    dotText += graficarSentencia(sent.idSent + 1, sent.expCase);
    for (let sent2 of sent.caseListIns) {
      dotText += graficarSentencia(sent.idSent, sent2);
    }
  }
  if (sentencia.switchCuerpo.defaultListIns.length != 0) {
    dotText += getNodo(sentencia.idSent + 3, "Default", sentencia.idSent + 2);
  }
  for (let sent of sentencia.switchCuerpo.defaultListIns) {
    dotText += graficarSentencia(sentencia.idSent + 3, sent);
  }
  return dotText;
}
*/
function graficarWhile(idPadre, sentencia) {
  dotText = "";
  dotText += getNodo(sentencia.idSent, "WHILE", idPadre);
  dotText += getNodo(sentencia.idSent + 1, "CONDICION", sentencia.idSent);
  dotText += getNodo(sentencia.idSent + 2, "LISTA_INS", sentencia.idSent);
  dotText += graficarSentencia(sentencia.idSent + 1, sentencia.expresion);
  for (let sent of sentencia.instrucciones) {
    dotText += graficarSentencia(sentencia.idSent + 2, sent);
  }
  return dotText;
}

function graficarDoWhile(idPadre, sentencia) {
  dotText = "";
  dotText += getNodo(sentencia.idSent, "DO_WHILE", idPadre);
  dotText += getNodo(sentencia.idSent + 1, "LISTA_INS", sentencia.idSent);
  dotText += getNodo(sentencia.idSent + 2, "CONDICION", sentencia.idSent);
  dotText += graficarSentencia(sentencia.idSent + 2, sentencia.expresion);
  for (let sent of sentencia.instrucciones) {
    dotText += graficarSentencia(sentencia.idSent + 1, sent);
  }
  return dotText;
}

function graficarFor(idPadre, sentencia) {
  dotText = "";
  dotText += getNodo(sentencia.idSent, "FOR", idPadre);
  dotText += graficarSentencia(sentencia.idSent, sentencia.declaracion);
  dotText += getNodo(sentencia.idSent + 2, "CONDICION", sentencia.idSent);
  dotText += getNodo(sentencia.idSent + 3, "ACTUALIZACION", sentencia.idSent);
  dotText += getNodo(sentencia.idSent + 4, "LISTA_INS", sentencia.idSent);
  dotText += graficarSentencia(sentencia.idSent + 2, sentencia.expresion);
  dotText += graficarSentencia(sentencia.idSent + 3, sentencia.asignacion);
  for (let sent of sentencia.instrucciones) {
    dotText += graficarSentencia(sentencia.idSent + 4, sent);
  }
  return dotText;
}

function graficarActualizacion(idPadre, sentencia) {
  dotText = "";
  dotText += getNodo(
    sentencia.idSent,
    sentencia.tipo + "\n" + sentencia.id,
    idPadre
  );
  return dotText;
}

module.exports = graficarAst;
