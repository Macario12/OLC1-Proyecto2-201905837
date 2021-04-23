const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Asignacion = require("./Asignacion");
const Declaracion = require("./Declaracion");
const Print = require("./Print");

function Bloque(_instrucciones, _ambito){
    var cadena  = ""
    _instrucciones.forEach(instruccion => {
        if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){
            cadena+=Print(instruccion, _ambito)+'\n'
        }
        else if(instruccion.tipo === TIPO_INSTRUCCION.DECLARACION){
           var message = Declaracion(instruccion, _ambito)

           if(message!= null){
               cadena += message+'\n'
           }
        }

        else if(instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION){
            var mensaje = Asignacion(instruccion, _ambito)
            if(mensaje!=null){
                cadena+=mensaje+'\n'
            }
        }
    });

    return cadena
}

module.exports = Bloque