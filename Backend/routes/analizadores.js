const Bloque = require("../controller/Instruccion/Bloque")
const Ambito = require("../controller/Ambito/Ambito")
const Global = require("../controller/Instruccion/Global")
const reporteTabla = require("../controller/TablaSimbolos/TablaSimbolos")

module.exports=(parser, app)=>{
    app.post('/analizar',(req,res)=>{
        var prueba = req.body.prueba
        //try {
            
            var ast = parser.parse(prueba) 
            const AmbitoGlobal = new Ambito(null,"Global")
            //var cadena = Bloque(ast, AmbitoGlobal)
            var cadena = Global(ast, AmbitoGlobal)
            var unicos = []
            var cont  = 0
            for (let element of reporteTabla.tablaSimbolos) {
                for (let elem of unicos) {
                    if (element.identificador === elem.identificador && 
                        element.entorno === elem.entorno) {
                        cont += 1
                        if (cont > 0) {
                            break
                        }
                    }
                }
                if (cont === 0) {
                    unicos.push(element)
                }
            }
            var resultado = {
                arbol: ast,
                consola: cadena,
                tablaSimbolos: unicos
            }
            res.send(resultado)
//} catch (error) {
           // res.send(error)
        //}
    })
}