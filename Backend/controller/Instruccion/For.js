const TIPO_DATO = require("../Enums/TipoDato")
const Operacion = require("../Operacion/Operacion")
const Ambito = require("../Ambito/Ambito")
const Asignacion = require("./Asignacion")
const Declaracion = require("./Declaracion")
function For(_instruccion, _ambito){
    var mensaje = ""
    var cadena = "";
    var nuevoAmbito = new Ambito(_ambito, "FOR")
    const Bloque = require('./Bloque')
    mensaje += Bloque([_instruccion.declaracion], nuevoAmbito).cadena
    console.log(mensaje)
    
    var operacion = Operacion(_instruccion.expresion, nuevoAmbito)
    if(operacion.tipo === TIPO_DATO.BOOLEAN){
        while(operacion.valor){
            const Bloque = require('./Bloque')
            var ejec =Bloque(_instruccion.instrucciones, nuevoAmbito)
            mensaje+=ejec.cadena
            if(ejec.hayBreak){
                return mensaje
            
            //UPDATE
            }
            
            mensaje += Bloque([_instruccion.asignacion], nuevoAmbito).cadena
            operacion = Operacion(_instruccion.expresion, nuevoAmbito)
        }
        
        return mensaje
    }
    return `Error: No es una expresion de tipo BOOLEAN en la condicion... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`
}

module.exports = For