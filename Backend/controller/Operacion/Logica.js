const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Relacional = require("./Relacional");
const ValorExpresion = require("./ValorExpresion");

function Logica(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.INT || _expresion.tipo === TIPO_VALOR.STRING || _expresion.tipo === TIPO_VALOR.BOOLEAN
        || _expresion.tipo === TIPO_VALOR.CHAR || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return ValorExpresion(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.MAYOR  || _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.DIFERENTE || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL || _expresion.tipo === TIPO_OPERACION.MENORIGUAL ){
        return Relacional(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.OR){
        return or(_expresion.opIzq,_expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.AND){
        return and(_expresion.opIzq,_expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.NOT){
        return not(_expresion.opIzq, _ambito)
    }
}

function or(_opIzq, _opDer, _ambito){
    const opIzq = Logica(_opIzq, _ambito);
    const opDer = Logica(_opDer, _ambito);

    if(opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.BOOLEAN){
        var resultado = false
        if(opIzq.valor || opDer.valor){
            resultado = true
        }

        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEAN,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function and(_opIzq, _opDer, _ambito){
    const opIzq = Logica(_opIzq, _ambito);
    const opDer = Logica(_opDer, _ambito);

    if(opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.BOOLEAN){
        var resultado = false
        if(opIzq.valor && opDer.valor){
            resultado = true
        }

        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEAN,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "")+(opDer.tipo===null ? opDer.valor: "") //true+5+10+5
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function not(_opIzq, _ambito){
    const opIzq = Logica(_opIzq, _ambito);

    if(opIzq.tipo && opIzq.tipo === TIPO_DATO.BOOLEAN){
        var resultado = false
        if(!opIzq.valor){
            resultado = true
        }

        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEAN,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo===null ? opIzq.valor: "") //true+5+10+5
    return{
        valor: respuesta+ `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \n... Linea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = Logica