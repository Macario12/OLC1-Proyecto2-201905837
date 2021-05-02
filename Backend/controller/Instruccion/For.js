const Operacion = require("../Operacion/Operacion")

function For(_instruccion, _ambito){

    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito)

    if(operacion.tipo === TIPO_DATO.BOOLEAN){
        for (let index = 0; operacion.valor; index++) {
            const element = array[index];
            
        }
    }
}

module.exports = For