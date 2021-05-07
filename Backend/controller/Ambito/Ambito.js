const reporteTabla = require('../TablaSimbolos/TablaSimbolos')
class TablaSimbolos {
  constructor(identificador, tipoSimbolo, tipoVar, entorno, linea, columna) {
      this.identificador = identificador
      this.tipoSimbolo = tipoSimbolo
      this.tipoVar = tipoVar
      this.entorno = entorno
      this.linea = linea
      this.columna = columna
  }
}

function getEntornoString(ambitoActual) {
  let listaEntornos = []
  e = ambitoActual
  while (e != null) {
      listaEntornos.push(e.nombre)
      e = e.anterior
  }
  listaEntornos.reverse()
  return  (listaEntornos.length > 0)? listaEntornos.join("_") : listaEntornos.join("")
}


class Ambito {
  constructor(_anterior, _nombre) {
    this.anterior = _anterior;
    this.nombre = _nombre;
    this.tablaSimbolos = new Map();
    this.tablaMetodos = new Map();
  }

  addSimbolo(_s, _simbolo) {
    this.tablaSimbolos.set(_s.toLowerCase(), _simbolo);
     let filaTabla = new TablaSimbolos (
            _simbolo.id,
            _simbolo.tipoSimbolo,
           _simbolo.tipo,
           getEntornoString(this),
            _simbolo.linea,
            _simbolo.columna
        )
        reporteTabla.tablaSimbolos.push(filaTabla)
  }

  addMetodo(_s, _metodo) {
    this.tablaMetodos.set(_s.toLowerCase(), _metodo);
    let filaTabla = new TablaSimbolos (
      _metodo.id,
      _metodo.tipoSimbolo,
      _metodo.tipo,
     getEntornoString(this),
     _metodo.linea,
     _metodo.columna
  )
  reporteTabla.tablaSimbolos.push(filaTabla)
  }

  getSimbolo(_s) {
    for (let e = this; e != null; e = e.anterior) {
      var encontrado = e.tablaSimbolos.get(_s.toLowerCase());
      if (encontrado != null) {
        return encontrado;
      }
    }

    return null;
  }

  getMetodo(_s) {
    for (let e = this; e != null; e = e.anterior) {
      var encontrado = e.tablaMetodos.get(_s.toLowerCase());
      if (encontrado != null) {
        return encontrado;
      }
    }

    return null;
  }

  existeSimbolo(_s) {
    for (let e = this; e != null; e = e.anterior) {
      var encontrado = e.tablaSimbolos.get(_s.toLowerCase());
      if (encontrado != null) {
        return true;
      }
    }

    return false;
  }
  existeSimboloAmbitoActual(_s) {
    var encontrado = this.tablaSimbolos.get(_s.toLowerCase());
    if (encontrado != null) {
      return true;
    }

    return false;
  }

  existeMetodo(_s) {
    for (let e = this; e != null; e = e.anterior) {
      var encontrado = e.tablaMetodos.get(_s.toLowerCase());
      if (encontrado != null) {
        return true;
      }
    }

    return false;
  }

  actualizar(_s, _simbolo) {
    for (let e = this; e != null; e = e.anterior) {
      var encontrado = e.tablaSimbolos.get(_s.toLowerCase());
      if (encontrado != null) {
        e.tablaSimbolos.set(_s, _simbolo);
        return true;
      }
    }
    return false;
  }
}

module.exports = Ambito;
