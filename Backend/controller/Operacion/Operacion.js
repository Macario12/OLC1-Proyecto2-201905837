const TIPO_VALOR = require("../Enums/TipoValor");
const ValorExpresion = require("./ValorExpresion");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const Aritmetica = require("./Aritmetica");
const Relacional = require("./Relacional");

function Operacion(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.INT || _expresion.tipo === TIPO_VALOR.STRING || _expresion.tipo === TIPO_VALOR.BOOLEAN
        || _expresion.tipo === TIPO_VALOR.CHAR || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return ValorExpresion(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.SUMA){
        return Aritmetica(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.RESTA){
        return Aritmetica(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.MULTIPLICACION){
        return Aritmetica(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.DIVISION){
        return Aritmetica(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.POTENCIA){
        return Aritmetica(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.MODULO){
        return Aritmetica(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.NEGACION){
        return Aritmetica(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.MAYOR  || _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.DIFERENTE || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL || _expresion.tipo === TIPO_OPERACION.MENORIGUAL ){
        return Relacional(_expresion, _ambito)
    }
}

module.exports = Operacion