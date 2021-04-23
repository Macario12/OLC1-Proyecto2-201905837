const Bloque = require("../controller/Instruccion/Bloque")
const Ambito = require("../controller/Ambito/Ambito")

module.exports=(parser, app)=>{
    app.post('/analizar',(req,res)=>{
        var prueba = req.body.prueba
        //try {
            
            var ast = parser.parse(prueba) 
            const AmbitoGlobal = new Ambito(null)
            var cadena = Bloque(ast, AmbitoGlobal)
            var resultado = {
                arbol: ast,
                consola: cadena
            }
            res.send(resultado)
//} catch (error) {
           // res.send(error)
        //}
    })
}