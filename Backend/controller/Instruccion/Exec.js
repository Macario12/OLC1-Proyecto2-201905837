const Ambito = require("../Ambito/Ambito");
const Bloque = require("./Bloque");
const Declaracion = require("./Declaracion");
const DecMetodo = require("./Dec_Metodo");
const DecParametro = require("./Dec_Parametro");
const Instruccion = require("./Instruccion");
function Exec(_isntruccion, _ambito) {
  var cadena = "";
  var metodoEjecutar = _ambito.getMetodo(_isntruccion.nombre);

  if (metodoEjecutar != null) {
    var nuevoAmbito = new Ambito(_ambito);
    if (metodoEjecutar.lista_parametros != null) {
      if (
        _isntruccion.lista_valores != null &&
        metodoEjecutar.lista_parametros.length ==
          _isntruccion.lista_valores.length
      ) {
        //console.log("es un metodo con "+metodoEjecutar.lista_parametros.length+" parametrps")
        var error = false;

        for (let i = 0; i < metodoEjecutar.lista_parametros.length; i++) {
          var declaracionAsignacion = Instruccion.nuevaDeclaracion(
            metodoEjecutar.lista_parametros[i].id,
            _isntruccion.lista_valores[i],
            metodoEjecutar.lista_parametros[i].tipo_dato,
            _isntruccion.linea,
            _isntruccion.columna
          );
          //console.log(declaracionAsignacion)
          var message = DecParametro(declaracionAsignacion, nuevoAmbito);

          if (message != null) {
            error = true;
            cadena += message + "\n";
          }
        }
        if (error) {
          return cadena;
        }
        return Bloque(metodoEjecutar.instrucciones, nuevoAmbito);
      } else {
        return `Error: Faltan valores para el metodo ${_instruccion.nombre}... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`;
      }
    } else {
      return Bloque(metodoEjecutar.instrucciones, nuevoAmbito);
    }
  }
  return `Error: El método ${_instruccion.nombre} no existe... Linea: ${_instruccion.linea} Columna: ${_instruccion.columna}`;
}
module.exports = Exec;
