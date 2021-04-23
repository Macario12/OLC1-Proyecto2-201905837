const TIPO_VALOR = require("../Enums/TipoValor");
const ValorExpresion = require("./ValorExpresion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const Aritmetica = require("./Aritmetica");

function Operacion(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.INT || _expresion.tipo === TIPO_VALOR.STRING || _expresion.tipo === TIPO_VALOR.BOOLEAN
        || _expresion.tipo === TIPO_VALOR.CHAR){
        return ValorExpresion(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.SUMA){
        return Aritmetica(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.RESTA){
        return Aritmetica(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        return Aritmetica(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.DIVISION){
        return Aritmetica(_expresion, _ambito)
    }
}

module.exports = Operacion