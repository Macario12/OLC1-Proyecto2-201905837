const Ambito = require("../Ambito/Ambito");
const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operacion/Operacion");

function SentenciaSwtchCase(_instruccion, _ambito) {
  var mensaje = "";
  var hayBreak = false;
  var operacion = Operacion(_instruccion.expresion, _ambito);
  //if (operacion.tipo === TIPO_DATO.BOOLEAN) {
    if (operacion.valor) {
    for (let i = 0; i < _instruccion.lista_cases.length; i++) {
      var op = Operacion(_instruccion.lista_cases[i].expresion, _ambito);
      //if (op.tipo == TIPO_DATO.BOOLEAN) {
        if (op.valor === operacion.valor) {
          const Bloque = require("./Bloque");
          var nuevoambito = new Ambito(_ambito, "Switch");
          var ejec = Bloque(
            _instruccion.lista_cases[i].instruccionescase,
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
     /* } else {
       mensaje += `Error: No es una condicion válida para el if... Linea: ${_instruccion.lista_elseif[i].linea} Columna: ${_instruccion.lista_elseif[i].columna}`;
      }*/
    }
}
    if (_instruccion.instruccionesDefault != null) {
      const Bloque = require("./Bloque");
      var nuevoambito = new Ambito(_ambito, "Switch");
      var ejec = Bloque(_instruccion.instruccionesDefault, nuevoambito);
      hayBreak = ejec.hayBreak;
      //mensaje += Bloque(_instruccion.instrucciones, nuevoambito)
      mensaje += ejec.cadena;
     
    }
    return {
        hayBreak: hayBreak,
        cadena: mensaje,
      };
  }
 /* return {
    hayBreak: hayBreak,
    cadena: `Error: No es una condicion válida para el if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`,
  };
}*/
module.exports = SentenciaSwtchCase;
