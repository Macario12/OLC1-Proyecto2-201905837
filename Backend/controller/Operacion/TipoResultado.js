const TIPO_DATO = require("../Enums/TipoDato");

function ResultadoSuma(_tipo1, _tipo2){
    if(_tipo1 === TIPO_DATO.INT  && _tipo2 === TIPO_DATO.INT){return TIPO_DATO.INT}
    else if((_tipo1 === TIPO_DATO.STRING || _tipo2 === TIPO_DATO.STRING)&& _tipo1 !== null && _tipo2 !== null) { return TIPO_DATO.STRING}
    else if((_tipo1 === TIPO_DATO.STRING && _tipo2 === TIPO_DATO.BOOLEAN)&& _tipo1 !== null && _tipo2 !== null) { return TIPO_DATO.STRING}
    else if((_tipo1 === TIPO_DATO.BOOLEAN && _tipo2 === TIPO_DATO.STRING)&& _tipo1 !== null && _tipo2 !== null) { return TIPO_DATO.STRING}
    else if((_tipo1 === TIPO_DATO.CHAR && _tipo2 === TIPO_DATO.CHAR)&& _tipo1 !== null && _tipo2 !== null) { return TIPO_DATO.STRING}
    else if((_tipo1 === TIPO_DATO.CHAR && _tipo2 === TIPO_DATO.STRING)&& _tipo1 !== null && _tipo2 !== null) { return TIPO_DATO.STRING}
    else if((_tipo1 === TIPO_DATO.INT && _tipo2 === TIPO_DATO.BOOLEAN)){return TIPO_DATO.INT}
    else if((_tipo1 === TIPO_DATO.BOOLEAN && _tipo2 === TIPO_DATO.INT)){return TIPO_DATO.INT}
    else if ((_tipo1 === TIPO_DATO.INT && _tipo2 === TIPO_DATO.CHAR)){return TIPO_DATO.INT}
    else if (_tipo1 === TIPO_DATO.CHAR && _tipo2 === TIPO_DATO.INT){return TIPO_DATO.INT}
    return null;
}

function ResultadoResta(_tipo1, _tipo2){
    if(_tipo1 === TIPO_DATO.INT  && _tipo2 === TIPO_DATO.INT){return TIPO_DATO.INT}
    else if((_tipo1 === TIPO_DATO.INT && _tipo2 === TIPO_DATO.BOOLEAN)){return TIPO_DATO.INT}
    else if((_tipo1 === TIPO_DATO.BOOLEAN && _tipo2 === TIPO_DATO.INT)){return TIPO_DATO.INT}
    else if ((_tipo1 === TIPO_DATO.INT && _tipo2 === TIPO_DATO.CHAR)){return TIPO_DATO.INT}
    else if (_tipo1 === TIPO_DATO.CHAR && _tipo2 === TIPO_DATO.INT){return TIPO_DATO.INT}
    return null;
}

module.exports = {ResultadoSuma, ResultadoResta}