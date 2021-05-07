const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")


function SentenciaIf(_instruccion, _ambito){
    var mensaje = ""
    var hayBreak = false
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if(operacion.tipo === TIPO_DATO.BOOLEAN){
        if(operacion.valor){
            const Bloque = require("./Bloque")
            var nuevoambito = new Ambito(_ambito, "if")
            var ejec = Bloque(_instruccion.instrucciones,nuevoambito)
            hayBreak = ejec.hayBreak;
            //mensaje += Bloque(_instruccion.instrucciones, nuevoambito)
            mensaje += ejec.cadena
           
        }
        return{
            hayBreak: hayBreak,
            cadena: mensaje
        }
    }
    return {
        hayBreak: hayBreak,
        cadena: `Error: No es una condicion válida para el if... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
    }
}
module.exports = SentenciaIf    