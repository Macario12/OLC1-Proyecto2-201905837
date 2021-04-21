module.exports=(parser, app)=>{
    app.post('/analizar',(req,res)=>{
        var prueba = req.body.prueba
        try {
            
            parser.parse(prueba)
            res.send({message:"exito"})
        } catch (error) {
            res.send(error)
        }
    })
}