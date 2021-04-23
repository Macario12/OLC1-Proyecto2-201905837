const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");
const Print = require("./Print");

function Bloque(_instrucciones, _ambito){
    var cadena  = ""
    _instrucciones.forEach(instruccion => {
        if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){
            cadena+=Print(instruccion, _ambito)+'\n'
        }
    });

    return cadena
}

module.exports = Bloque