const Bloque = require("../controller/Instruccion/Bloque")
const Ambito = require("../controller/Ambito/Ambito")
const Global = require("../controller/Instruccion/Global")
const reporteTabla = require("../controller/TablaSimbolos/TablaSimbolos")
const graficarAst = require("../controller/AST/Arbol")

module.exports=(parser, app)=>{
    app.post('/analizar',(req,res)=>{
        var prueba = req.body.prueba
        //try {
            
            var ast = parser.parse(prueba) 
            var resultado
            const AmbitoGlobal = new Ambito(null,"Global")
            //var cadena = Bloque(ast, AmbitoGlobal)
            if (ast.errorSintactico === "") {
                var arbolAst = ast.listaIns
                console.log("entra")
                var cadena = Global(arbolAst, AmbitoGlobal)
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
                    tablaSimbolos: unicos,
                    astBase64: graficarAst(arbolAst)
                }
            
            } else {
                var resultado = {
                    arbol: [],
                    consola: resAnalisSintactico.errorSintactico,
                    tablaSimbolos: [],
                    astBase64: '',
                }
            }
            res.send(resultado)
//} catch (error) {
           // res.send(error)
        //}
    })
}