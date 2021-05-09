const TIPO_INSTRUCCION = require("../Enums/TipoInstruccion")


function nuevaOperacion(_opIzq, _opDer, _tipo, _linea, _columna, _idSentencia){
    return{
        opIzq: _opIzq,
        opDer: _opDer,
        tipo: _tipo,
        linea: _linea,
        columna: _columna,
        idSent: _idSentencia
    }
}

const Instruccion ={
    nuevoPrint: function(_expresion, _linea, _columna, _idSentencia){
        return {
            tipo: TIPO_INSTRUCCION.PRINT,
            expresion: _expresion,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    },

    nuevoValor: function(_valor, _tipo, _linea, _columna, _idSentencia){
        return{
            tipo: _tipo,
            valor:  _valor,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    },

    nuevaOperacionBinaria: function(_opIzq, _opDer, _tipo, _linea, _columna, _idSentencia){
        return nuevaOperacion(_opIzq, _opDer, _tipo, _linea, _columna, _idSentencia)
    },

    nuevaDeclaracion: function(_id, _valor, _tipo, _linea, _columna, _idSentencia){
        return{
            tipo: TIPO_INSTRUCCION.DECLARACION,
            id: _id,
            valor: _valor,
            tipo_dato: _tipo,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    },
    nuevaAsignacion: function(_id, _expresion, _linea, _columna, _idSentencia){
        return{
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    },

    nuevoWhile: function(_expresion, _instrucciones, _linea, _columna, _idSentencia){
        return {
            tipo: TIPO_INSTRUCCION.WHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna ,
            idSent: _idSentencia
        }
    },

    nuevoFor: function(_declarcion,_expresion,_asignacion, _instrucciones, _linea, _columna, _idSentencia){
        return {
            tipo: TIPO_INSTRUCCION.FOR,
            declaracion: _declarcion,
            expresion: _expresion,
            asignacion: _asignacion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna ,
            idSent: _idSentencia
        }
    },

    nuevoDoWhile: function(_expresion, _instrucciones, _linea, _columna, _idSentencia){
        return {
            tipo: TIPO_INSTRUCCION.DOWHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    },

    nuevoMetodo: function(_nombre, _lista_parametros, _instrucciones, _linea, _columna, _idSentencia){
        return{
            tipo: TIPO_INSTRUCCION.DE_METODO,
            nombre: _nombre,
            lista_parametros: _lista_parametros,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    },
    
    nuevoExec: function(_nombre, _lista_valores, _linea, _columna, _idSentencia){
        return{
            tipo: TIPO_INSTRUCCION.EXEC,
            nombre: _nombre,
            lista_valores: _lista_valores,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    },
    nuevaLlamada: function(_nombre, _lista_valores, _linea, _columna, _idSentencia){
        return{
            tipo: TIPO_INSTRUCCION.LLAMADA_METODO,
            nombre: _nombre,
            lista_valores: _lista_valores,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    },
    nuevoIf: function(_expresion, _instrucciones, _linea, _columna, _idSentencia){
        return{
            tipo: TIPO_INSTRUCCION.IF,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    },
    nuevoBreak: function(_linea, _columna){
        return{
            tipo: TIPO_INSTRUCCION.BREAK,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    },
    nuevoIfElse: function(_expresion, _instruccionesif,_instruccioneselse, _linea, _columna, _idSentencia){
        return{
            tipo: TIPO_INSTRUCCION.IFELSE,
            expresion: _expresion,
            instruccionesIf: _instruccionesif,
            instruccionesElse: _instruccioneselse,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    },
    nuevoElseIf: function(_expresion, _instruccionesElseIf, _linea, _columna, _idSentencia){
        return {
            tipo: TIPO_INSTRUCCION.ELSEIF,
			expresion: _expresion,
			instruccionesElseIf: _instruccionesElseIf,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
		}
    },
    nuevoIfConElseIf: function(_expresion, _instruccionesIf, _lista_elseif, _instruccionesElse, _linea, _columna, _idSentencia){
        return {
            tipo: TIPO_INSTRUCCION.IFCELSEIF,
            expresion: _expresion,
            instruccionesIf: _instruccionesIf,
            lista_elseif: _lista_elseif,
            instruccionesElse: _instruccionesElse,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    },
    nuevoSwitchConCase: function(_expresion, _lista_cases, _instruccionesDefault, _linea, _columna, _idSentencia){
        return {
            tipo: TIPO_INSTRUCCION.CCASES,
            expresion: _expresion,
            lista_cases: _lista_cases,
            instruccionesDefault: _instruccionesDefault,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    },
    nuevoCase: function(_expresion, _instruccionescase, _linea, _columna, _idSentencia){
        return {
            tipo: TIPO_INSTRUCCION.CASE,
			expresion: _expresion,
			instruccionescase: _instruccionescase,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
		}
    },
    nuevoSwitchDefault: function(_expresion,_instruccionDefault, _linea, _columna, _idSentencia){
        return{
            tipo: TIPO_INSTRUCCION.SWDEFAULT,
            expresion: _expresion,
            instruccionDefault: _instruccionDefault,
            linea: _linea,
            columna: _columna,
            idSent: _idSentencia
        }
    },
}

module.exports = Instruccion