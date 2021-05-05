const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")


function nuevaOperacion(_opIzq, _opDer, _tipo, _linea, _columna){
    return{
        opIzq: _opIzq,
        opDer: _opDer,
        tipo: _tipo,
        linea: _linea,
        columna: _columna
    }
}

const Instruccion ={
    nuevoPrint: function(_expresion, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.PRINT,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoValor: function(_valor, _tipo, _linea, _columna){
        return{
            tipo: _tipo,
            valor:  _valor,
            linea: _linea,
            columna: _columna
        }
    },

    nuevaOperacionBinaria: function(_opIzq, _opDer, _tipo, _linea, _columna){
        return nuevaOperacion(_opIzq, _opDer, _tipo, _linea, _columna)
    },

    nuevaDeclaracion: function(_id, _valor, _tipo, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.DECLARACION,
            id: _id,
            valor: _valor,
            tipo_dato: _tipo,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaAsignacion: function(_id, _expresion, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoWhile: function(_expresion, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.WHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna 
        }
    },

    nuevoFor: function(_expresion, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.FOR,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna 
        }
    },

    nuevoDoWhile: function(_expresion, _instrucciones, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.DOWHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoMetodo: function(_nombre, _lista_parametros, _instrucciones, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.DE_METODO,
            nombre: _nombre,
            lista_parametros: _lista_parametros,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    
    nuevoExec: function(_nombre, _lista_valores, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.EXEC,
            nombre: _nombre,
            lista_valores: _lista_valores,
            linea: _linea,
            columna: _columna
        }
    },
    nuevaLlamada: function(_nombre, _lista_valores, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.LLAMADA_METODO,
            nombre: _nombre,
            lista_valores: _lista_valores,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoIf: function(_expresion, _instrucciones, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.IF,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoBreak: function(_linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.BREAK,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoIfElse: function(_expresion, _instruccionesif,_instruccioneselse, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.IFELSE,
            expresion: _expresion,
            instruccionesIf: _instruccionesif,
            instruccionesElse: _instruccioneselse,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoElseIf: function(_expresion, _instruccionesElseIf, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.ELSEIF,
			expresion: _expresion,
			instruccionesElseIf: _instruccionesElseIf,
            linea: _linea,
            columna: _columna
		}
    },
    nuevoIfConElseIf: function(_expresion, _instruccionesIf, _lista_elseif, _instruccionesElse, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.IFCELSEIF,
            expresion: _expresion,
            instruccionesIf: _instruccionesIf,
            lista_elseif: _lista_elseif,
            instruccionesElse: _instruccionesElse,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoSwitchConCase: function(_expresion, _lista_cases, _instruccionesDefault, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.CCASES,
            expresion: _expresion,
            lista_cases: _lista_cases,
            instruccionesDefault: _instruccionesDefault,
            linea: _linea,
            columna: _columna
        }
    },
    nuevoCase: function(_expresion, _instruccionescase, _linea, _columna){
        return {
            tipo: TIPO_INSTRUCCION.CASE,
			expresion: _expresion,
			instruccionescase: _instruccionescase,
            linea: _linea,
            columna: _columna
		}
    },
    nuevoSwitchDefault: function(_expresion,_instruccionDefault, _linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.SWDEFAULT,
            expresion: _expresion,
            instruccionDefault: _instruccionDefault,
            linea: _linea,
            columna: _columna
        }
    },
}

module.exports = Instruccion