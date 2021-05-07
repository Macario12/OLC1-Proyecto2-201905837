const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")


function SentenciaSwitchD(_instruccion, _ambito){
    var mensaje = ""
    var hayBreak = false
    var operacion = Operacion(_instruccion.expresion, _ambito)
   // if(operacion.tipo === TIPO_DATO.BOOLEAN || operacion.tipo === TIPO_DATO.INT || operacion.tipo === TIPO_DATO.STRING){
        switch(operacion.valor){
           
        default:
            const Bloque = require("./Bloque")
            var nuevoambito = new Ambito(_ambito, "SwitchDefault")
            var ejec = Bloque(_instruccion.instruccionDefault,nuevoambito)
            hayBreak = ejec.hayBreak;
            //mensaje += Bloque(_instruccion.instrucciones, nuevoambito)
            mensaje += ejec.cadena
        }
        return{
            hayBreak: hayBreak,
            cadena: mensaje
        }
    }
    /*return {
        hayBreak: hayBreak,
        cadena: `Error: No es una condicion válida para el switch... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
}*/
module.exports = SentenciaSwitchD    