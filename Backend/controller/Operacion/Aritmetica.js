const TIPO_DATO = require("../Enums/TipoDato");
const TIPO_OPERACION = require("../Enums/TipoOperacion");
const TIPO_VALOR = require("../Enums/TipoValor");
const Resultado = require("./TipoResultado");
const ValorExpresion = require("./ValorExpresion");

function Aritmetica(_expresion, _ambito){
    if(_expresion.tipo === TIPO_VALOR.INT || _expresion.tipo === TIPO_VALOR.STRING || _expresion.tipo === TIPO_VALOR.BOOLEAN
        || _expresion.tipo === TIPO_VALOR.CHAR){
        return ValorExpresion(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.SUMA){
        return suma(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.RESTA){
        return resta(_expresion.opIzq, _expresion.opDer, _ambito)
    }

}

function suma(_OpzIzq, _OpDer, _ambito){
    const opIzq = Aritmetica(_OpzIzq, _ambito)
    const opDer = Aritmetica(_OpDer, _ambito)

    const tipoRes = Resultado.ResultadoSuma(opIzq.tipo, opDer.tipo)
    if(tipoRes!= null){
        if(tipoRes === TIPO_DATO.INT){
            var resultado = Number(opIzq.valor)+ Number(opDer.valor);
            if(!Number(opIzq.valor)){resultado = opIzq.valor.charCodeAt() + Number(opDer.valor);}
            if(!Number(opDer.valor)){resultado = Number(opIzq.valor) + opDer.valor.charCodeAt();}
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _OpzIzq.linea,
                columna: _OpzIzq.columna
            }
        }

        else if(tipoRes === TIPO_DATO.STRING){
            const resultado = opIzq.valor.toString() + opDer.valor.toString();
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _OpzIzq.linea,
                columna: _OpzIzq.columna
            }
        }
 
        
    }

    var respuesta = (opIzq.tipo === null ? opIzq.valor: "") + (opDer.tipo === null ? opDer.valor: "")

    return {
        valor: respuesta + '\n ERROR SEMANTICO: NO SE PUDE REALIZAR LA SUMA... Linea: '+ _OpzIzq.linea +'Columna: '+ _OpzIzq.columna,
        tipo: null,
        linea: _OpzIzq.linea,
        columna: _OpzIzq.columna

    }
}
function resta(_OpzIzq, _OpDer, _ambito){
    const opIzq = Aritmetica(_OpzIzq, _ambito)
    const opDer = Aritmetica(_OpDer, _ambito)

    const tipoRes = Resultado.ResultadoResta(opIzq.tipo, opDer.tipo)
    if(tipoRes!= null){
        if(tipoRes === TIPO_DATO.INT){
            var resultado = Number(opIzq.valor) - Number(opDer.valor);
            if(!Number(opIzq.valor)){resultado = opIzq.valor.charCodeAt() - Number(opDer.valor);}
            if(!Number(opDer.valor)){resultado = Number(opIzq.valor) - opDer.valor.charCodeAt();}
            return{
                valor: resultado,
                tipo: tipoRes,
                linea: _OpzIzq.linea,
                columna: _OpzIzq.columna
            }
        }
 
    }

    var respuesta = (opIzq.tipo === null ? opIzq.valor: "") + (opDer.tipo === null ? opDer.valor: "")

    return {
        valor: respuesta + '\n ERROR SEMANTICO: NO SE PUDE REALIZAR LA SUMA... Linea: '+ _OpzIzq.linea +'Columna: '+ _OpzIzq.columna,
        tipo: null,
        linea: _OpzIzq.linea,
        columna: _OpzIzq.columna

    }
}
module.exports = Aritmetica