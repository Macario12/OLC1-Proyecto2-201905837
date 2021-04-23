const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operacion/Operacion");
const Simbolo = require("../Ambito/Simbolo");

function Declaracion(_instruccion, _ambito){
    if(_instruccion.tipo_dato === TIPO_DATO.INT){
        var valor = 0.0
        if(_instruccion.valor != null){
            var op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if(tipo === TIPO_DATO.INT){
                valor = op.valor;
            }
            else{
                "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.DECIMAL+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }

        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.INT, _instruccion.linea, _instruccion.columna)

        if(_ambito.existeSimbolo(nuevoSimbolo.id)!= false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        console.log(_ambito)
        return null
    }
}

module.exports = Declaracion