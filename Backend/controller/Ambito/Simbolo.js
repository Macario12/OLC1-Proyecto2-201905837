const TIPO_SIMBOLO = require("../Enums/TipoSimbolo");

class Simbolo{
    constructor(_id, _valor, _tipo, _linea, _columna){
        this.id = _id;
        this.valor = _valor;
        this.tipoSimbolo = TIPO_SIMBOLO.VARIABLE;
        this.tipo = _tipo;
        this.linea = _linea;
        this.columna = _columna;
    }
}

module.exports = Simbolo