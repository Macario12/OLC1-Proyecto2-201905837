class Ambito {
  constructor(_anterior) {
    this.anterior = _anterior;
    this.tablaSimbolos = new Map();
    this.tablaMetodos = new Map();
  }

  addSimbolo(_s, _simbolo) {
    this.tablaSimbolos.set(_s.toLowerCase(), _simbolo);
  }

  addMetodo(_s, _metodo) {
    this.tablaMetodos.set(_s.toLowerCase(), _metodo);
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
