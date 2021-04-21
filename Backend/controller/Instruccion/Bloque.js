const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion");

function Bloque(_instrucciones, _ambito){
    _instrucciones.array.forEach(instruccion => {
        if(instruccion.tipo === TIPO_INSTRUCCION.PRINT){

        }
    });
}

module.exports = Bloque