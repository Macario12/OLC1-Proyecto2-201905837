const TIPO_DATO = require("../Enums/TipoDato");
const Operacion = require("../Operacion/Operacion");
const Simbolo = require("../Ambito/Simbolo");

function DecParametro(_instruccion, _ambito){
    if(_instruccion.tipo_dato === TIPO_DATO.INT){
        var valor = 0
        if(_instruccion.valor != null){
            var op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if(tipo === TIPO_DATO.INT){
                valor = Number(op.valor);
            }
            else{
                "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.INT+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }

        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.INT, _instruccion.linea, _instruccion.columna)

        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!= false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }
    else if (_instruccion.tipo_dato == TIPO_DATO.STRING){
        var valor = ""

        if(_instruccion.valor != null){
            op = Operacion(_instruccion.valor, _ambito)
            valor = String(op.valor)
        }

        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.STRING, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }
     else if (_instruccion.tipo_dato == TIPO_DATO.CHAR){
        var valor = ''

        if(_instruccion.valor != null){
            op = Operacion(_instruccion.valor, _ambito)
            valor = String(op.valor)
        }
        
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CHAR, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.DOUBLE){
        var valor = 0
        if(_instruccion.valor != null){
            var op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if(tipo === TIPO_DATO.DOUBLE){
                valor = Number(op.valor);
            }
            else{
                "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.DECIMAL+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }

        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.DOUBLE, _instruccion.linea, _instruccion.columna)

        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!= false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        //console.log(_ambito)
        return null
    }
    else if(_instruccion.tipo_dato === TIPO_DATO.BOOLEAN){
        var valor = false 
        if(_instruccion.valor!=null){
            op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo
            if(tipo===TIPO_DATO.BOOLEAN){
                valor = Boolean(op.valor)
            }
            else{
                return "Error: No es posible asignar un valor de tipo "+tipo+" a la variable \n'"+ _instruccion.id +"' que es de tipo "+TIPO_DATO.BOOLEAN+"... Linea: "+_instruccion.linea+" Columna: "+ _instruccion.columna;
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.BOOLEAN, _instruccion.linea, _instruccion.columna)
        if(_ambito.existeSimboloAmbitoActual(nuevoSimbolo.id)!=false){
            return "Error: La variable '"+ nuevoSimbolo.id +"' ya existe... Linea: "+nuevoSimbolo.linea+" Columna: "+ nuevoSimbolo.columna;
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }
}

module.exports = DecParametro