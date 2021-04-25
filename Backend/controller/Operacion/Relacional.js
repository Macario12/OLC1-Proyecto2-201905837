const TIPO_DATO = require("../Enums/TipoDato")
const TIPO_OPERACION = require("../Enums/TipoOperacion")
const TIPO_VALOR = require("../Enums/TipoValor")
const Aritmetica = require("./Aritmetica")
const ValorExpresion = require("./ValorExpresion")

function Relacional(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.INT || _expresion.tipo === TIPO_VALOR.STRING || _expresion.tipo === TIPO_VALOR.BOOLEAN
        || _expresion.tipo === TIPO_VALOR.CHAR || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR){
        return ValorExpresion(_expresion, _ambito)
    }else if (_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA
        || _expresion.tipo === TIPO_OPERACION.MULTIPLICACION || _expresion.tipo === TIPO_OPERACION.DIVISION
        || _expresion.tipo === TIPO_OPERACION.POTENCIA || _expresion.tipo === TIPO_OPERACION.MODULO
        || _expresion.tipo === TIPO_OPERACION.NEGACION){
        return Aritmetica(_expresion, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.IGUALIGUAL){
        return igualigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.DIFERENTE){
        return diferente(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MAYOR){
        return mayor(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MENOR){
        return menor(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MAYORIGUAL){
        return mayorigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if(_expresion.tipo === TIPO_OPERACION.MENORIGUAL){
        return menorigual(_expresion.opIzq, _expresion.opDer, _ambito)
    }
}


function igualigual(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if (opIzq.tipo == opDer.tipo){
        var resultado = false
        if(opIzq.valor == opDer.valor){
            resultado = true
        }

        return{
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

function diferente(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if (opIzq.tipo == opDer.tipo){
        var resultado = false
        if(opIzq.valor != opDer.valor){
            resultado = true
        }

        return{
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

function menor(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if (opIzq.tipo == opDer.tipo){
        var resultado = false
        if(opIzq.valor < opDer.valor){
            resultado = true
        }

        return{
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
function mayor(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if (opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.INT || opIzq.tipo === TIPO_DATO.DOUBLE){
        var resultado = false
        if(opIzq.valor > opDer.valor){
            resultado = true
        }

        return{
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

function mayorigual(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if (opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.INT || opIzq.tipo === TIPO_DATO.DOUBLE){
        var resultado = false
        if(opIzq.valor >= opDer.valor){
            resultado = true
        }

        return{
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

function menorigual(_opIzq, _opDer, _ambito){
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if (opIzq.tipo == opDer.tipo && opIzq.tipo === TIPO_DATO.INT || opIzq.tipo === TIPO_DATO.DOUBLE){
        var resultado = false
        if(opIzq.valor <= opDer.valor){
            resultado = true
        }

        return{
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
module.exports = Relacional