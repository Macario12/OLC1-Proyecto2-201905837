const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_VALOR = require("../Enums/TipoValor");

function ValorExpresion(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.INT){
        return {
            valor: Number(_expresion.valor),
            tipo: TIPO_DATO.INT,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.STRING){
        return {
            valor: _expresion.valor.substring(1, _expresion.valor.length-1),
            tipo: TIPO_DATO.STRING,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.BOOLEAN){
        return {
            valor: _expresion.valor.toLowerCase()==='true' ? true: false,
            tipo: TIPO_DATO.BOOLEAN,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
    else if(_expresion.tipo === TIPO_VALOR.CHAR){
        return {
            valor: _expresion.valor.substring(1, _expresion.valor.length-1),
            tipo: TIPO_DATO.CHAR,
            linea: _expresion.linea,
            columna: _expresion.columna
        }
    }
}

module.exports = ValorExpresion