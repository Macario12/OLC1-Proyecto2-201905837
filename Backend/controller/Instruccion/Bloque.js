const { IF } = require("../Enums/TipoInstruccion");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Asignacion = require("./Asignacion");
const Declaracion = require("./Declaracion");
const CicloDoWhile = require("./Dowhile");
const SentenciaIf = require("./if");
const Print = require("./Print");
const CicloWhile = require("./while");

function Bloque(_instrucciones, _ambito) {
  var cadena = "";
  _instrucciones.forEach((instruccion) => {
    if (instruccion.tipo === TIPO_INSTRUCCION.PRINT) {
      cadena += Print(instruccion, _ambito) + "\n";
    } else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION) {
      var message = Declaracion(instruccion, _ambito);

      if (message != null) {
        cadena += message + "\n";
      }
    } else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
      var mensaje = Asignacion(instruccion, _ambito);
      if (mensaje != null) {
        cadena += mensaje + "\n";
      }
    } else if (instruccion.tipo === TIPO_INSTRUCCION.WHILE) {
      var mensaje = CicloWhile(instruccion, _ambito);

      if (mensaje != null) {
        cadena += mensaje + "\n";
      }
    } else if (instruccion.tipo === TIPO_INSTRUCCION.DOWHILE) {
      var mensaje = CicloDoWhile(instruccion, _ambito);

      if (mensaje != null) {
        cadena += mensaje + "\n";
      }
    } else if (instruccion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO) {
      const Exec = require("./Exec");
      var mensaje = Exec(instruccion, _ambito);

      if (mensaje != null) {
        cadena += mensaje + "\n";
      }
    } else if (instruccion.tipo === TIPO_INSTRUCCION.IF) {
        const Exec = require("./Exec");
        var mensaje = SentenciaIf(instruccion, _ambito);
  
        if (mensaje != null) {
          cadena += mensaje
        }
      }
  });

  return cadena;
}

module.exports = Bloque;
