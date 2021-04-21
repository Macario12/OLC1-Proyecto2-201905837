
const procesarCadena = require("../Operacion/ProcesarCadena")

function Print(_instruccion, _ambito){
    const cadena = procesarCadena(_instruccion.expresion, _ambito).valor

    return cadena 
}

module.exports = Print