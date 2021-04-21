const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_VALOR = require("../Enums/TipoValor");

function ValorExpresion(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.INT){
        return {
            valor: _expresion.valor,
            tipo: TIPO_DATO.INT,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
}

module.exports = ValorExpresion