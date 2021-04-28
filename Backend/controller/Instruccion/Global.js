const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Asignacion = require("./Asignacion");
const Declaracion = require("./Declaracion");
const DecMetodo = require("./Dec_Metodo");
const Exec = require("./Exec");

function Global(_instrucciones, _ambito) {
  var cadena = "";
  //console.log(_instrucciones[1].instrucciones)
  //PASASDA VER EXEC
  var contadroExec = 0;
  for (let i = 0; i < _instrucciones.length; i++) {
    if (_instrucciones[i].tipo === TIPO_INSTRUCCION.EXEC) {
      contadroExec++;
    }
  }

  if (contadroExec === 0) {
    return "ERROR: NO SE A DETECTO  LA SENTENCIA EXEC";
  } else if (contadroExec > 1) {
    return "ERROR: SE HA DETECTADO MAS DE 2 EXEC ";
  }

  //SEGUNDA DECLARAR METODS, VAR y ASIGNAR
  for (let i = 0; i < _instrucciones.length; i++) {
    if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION) {
      var message = Declaracion(_instrucciones[i], _ambito);

      if (message != null) {
        cadena += message + "\n";
      }
    } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACION) {
      var mensaje = Asignacion(_instrucciones[i], _ambito);
      if (mensaje != null) {
        cadena += mensaje + "\n";
      }
    } else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DE_METODO) {
      var mensaje = DecMetodo(_instrucciones[i], _ambito);
      if (mensaje != null) {
        cadena += mensaje + "\n";
      }
    }
  }
  //console.log(_ambito);
  //Ultima pasada Buscar exec
  for (let i = 0; i < _instrucciones.length; i++) {
    if (_instrucciones[i].tipo === TIPO_INSTRUCCION.EXEC) {
      var mensaje = Exec(_instrucciones[i], _ambito);
      if (mensaje != null) {
        cadena += mensaje 
      }
      break
    }
  }
  return cadena;
}

module.exports = Global;
