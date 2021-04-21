const TIPO_VALOR = require("../Enums/TipoValor");
const ValorExpresion = require("./ValorExpresion");

function Operacion(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.INT){
        return ValorExpresion(_expresion, _ambito)
    }
}

module.exports = Operacion