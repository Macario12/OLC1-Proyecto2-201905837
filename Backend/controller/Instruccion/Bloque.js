const { IF } = require("../Enums/TipoInstruccion");
const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Asignacion = require("./Asignacion");
const Declaracion = require("./Declaracion");
const CicloDoWhile = require("./Dowhile");
const For = require("./For");
const SentenciaIf = require("./if");
const SentenciaIfElse = require("./IfElse");
const SentenciaIfElseIF = require("./IfElseIf");
const Print = require("./Print");
const SentenciaSwtchCase = require("./SwitchCase");
const SentenciaSwitchD = require("./SwitchDefault");
const CicloWhile = require("./while");

function Bloque(_instrucciones, _ambito) {
  var cadena = "";
  var haybreak = false;
  _instrucciones.forEach((instruccion) => {
    if(haybreak){
      return {
        hayBreak: haybreak,
        cadena: cadena
      }
    }
    if (instruccion.tipo === TIPO_INSTRUCCION.PRINT) {
      cadena += Print(instruccion, _ambito) + "\n";
    } else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION) {
      var message = Declaracion(instruccion, _ambito);

      if (message != null) {
        cadena += message
      }
    } else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
      var mensaje = Asignacion(instruccion, _ambito);
      if (mensaje != null) {
        cadena += mensaje ;
      }
    } else if (instruccion.tipo === TIPO_INSTRUCCION.WHILE) {
      var mensaje = CicloWhile(instruccion, _ambito);
      haybreak = false
      if (mensaje != null) {
        cadena += mensaje ;
      }
    } else if (instruccion.tipo === TIPO_INSTRUCCION.FOR) {
      var mensaje = For(instruccion, _ambito);
      haybreak = false
      if (mensaje != null) {
        cadena += mensaje ;
      }
    }else if (instruccion.tipo === TIPO_INSTRUCCION.DOWHILE) {
      var mensaje = CicloDoWhile(instruccion, _ambito);

      if (mensaje != null) {
        cadena += mensaje ;
      }
    } else if (instruccion.tipo === TIPO_INSTRUCCION.LLAMADA_METODO) {
      const Exec = require("./Exec");
      var mensaje = Exec(instruccion, _ambito);

      if (mensaje != null) {
        cadena += mensaje;
      }
    } else if (instruccion.tipo === TIPO_INSTRUCCION.IF) {
        
        var ejec = SentenciaIf(instruccion, _ambito);
        var mensaje = ejec.cadena
        haybreak = ejec.hayBreak
  
        if (mensaje != null) {
          cadena += mensaje
        }
      }
      else if (instruccion.tipo === TIPO_INSTRUCCION.BREAK) {
        haybreak = true;
        return {
          hayBreak: haybreak,
          cadena: cadena
        }
      }else if (instruccion.tipo === TIPO_INSTRUCCION.IFELSE) {
        
        var ejec = SentenciaIfElse(instruccion, _ambito);
        var mensaje = ejec.cadena
        haybreak = ejec.hayBreak
  
        if (mensaje != null) {
          cadena += mensaje
        }
      }else if (instruccion.tipo === TIPO_INSTRUCCION.IFCELSEIF) {
        
        var ejec = SentenciaIfElseIF(instruccion, _ambito);
        var mensaje = ejec.cadena
        haybreak = ejec.hayBreak
  
        if (mensaje != null) {
          cadena += mensaje
        }
      }else if (instruccion.tipo === TIPO_INSTRUCCION.SWDEFAULT) {
        console.log(instruccion)
        var ejec = SentenciaSwitchD(instruccion, _ambito);
        var mensaje = ejec.cadena
        haybreak = ejec.hayBreak
  
        if (mensaje != null) {
          cadena += mensaje
        }
      }else if (instruccion.tipo === TIPO_INSTRUCCION.CCASES) {
        //console.log(instruccion)
        var ejec = SentenciaSwtchCase(instruccion, _ambito);
        var mensaje = ejec.cadena
        haybreak = ejec.hayBreak
  
        if (mensaje != null) {
          cadena += mensaje
        }
      }
  });

  return {
    hayBreak: haybreak,
    cadena: cadena
  }
}

module.exports = Bloque;
