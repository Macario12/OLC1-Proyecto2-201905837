const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")
const Ambito = require("../Ambito/Ambito")
function CicloWhile(_instruccion, _ambito){
    var mensaje = ""

    var operacion = Operacion(_instruccion.expresion, _ambito, "While")

    if(operacion.tipo === TIPO_DATO.BOOLEAN){
        while(operacion.valor){
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            //mensaje += Bloque(_instruccion.instrucciones, nuevoAmbito)
            var ejec =Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje+=ejec.cadena
            if(ejec.hayBreak){
                return mensaje
            
            //UPDATE
            }
            
            operacion = Operacion(_instruccion.expresion, _ambito)
        }
        
        return mensaje
    }
    return `Error: No es una expresion de tipo BANDERA en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = CicloWhile