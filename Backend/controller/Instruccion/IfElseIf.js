const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operacion/Operacion");

function SentenciaIfElseIF(_instruccion, _ambito) {
  var mensaje = "";
  var hayBreak = false;
  var operacion = Operacion(_instruccion.expresion, _ambito);
  if (operacion.tipo === TIPO_DATO.BOOLEAN) {
    if (operacion.valor) {
      const Bloque = require("./Bloque");
      var nuevoambito = new Ambito(_ambito);
      var ejec = Bloque(_instruccion.instruccionesIf, nuevoambito);
      hayBreak = ejec.hayBreak;
      //mensaje += Bloque(_instruccion.instrucciones, nuevoambito)
      mensaje += ejec.cadena;
      return {
        hayBreak: hayBreak,
        cadena: mensaje,
      };
    }
    for (let i = 0; i < _instruccion.lista_elseif.length; i++) {
      var op = Operacion(_instruccion.lista_elseif[i].expresion, _ambito);
      if (op.tipo == TIPO_DATO.BOOLEAN) {
        if (op.valor) {
          const Bloque = require("./Bloque");
          var nuevoambito = new Ambito(_ambito);
          var ejec = Bloque(
            _instruccion.lista_elseif[i].instruccionesElseIf,
            nuevoambito
          );
          hayBreak = ejec.hayBreak;
          //mensaje += Bloque(_instruccion.instrucciones, nuevoambito)
          mensaje += ejec.cadena;
          return {
            hayBreak: hayBreak,
            cadena: mensaje,
          };
        }
      } else {
        mensaje += `Error: No es una condicion válida para el if... Linea: ${_instruccion.lista_elseif[i].linea} Columna: ${_instruccion.lista_elseif[i].columna}`;
      }
    }
    if (_instruccion.instruccionesElse != null) {
      const Bloque = require("./Bloque");
      var nuevoambito = new Ambito(_ambito);
      var ejec = Bloque(_instruccion.instruccionesElse, nuevoambito);
      hayBreak = ejec.hayBreak;
      //mensaje += Bloque(_instruccion.instrucciones, nuevoambito)
      mensaje += ejec.cadena;
     
    }
    return {
        hayBreak: hayBreak,
        cadena: mensaje,
      };
  }
  return {
    hayBreak: hayBreak,
    cadena: `Error: No es una condicion válida para el if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
  };
}
module.exports = SentenciaIfElseIF;
