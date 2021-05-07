const TIPO_SIMBOLO = require("../Enums/TipoSimbolo");

class Metodo{
    constructor(_id, _parametros, _instrucciones, _linea, _columna){
        this.tipoSimbolo = TIPO_SIMBOLO.METODO
        this.tipo = TIPO_SIMBOLO.VOID;
        this.id = _id;
        this.lista_parametros = _parametros,
        this.instrucciones = _instrucciones,
        this.linea = _linea,
        this.columna = _columna
    }
}

module.exports = Metodo