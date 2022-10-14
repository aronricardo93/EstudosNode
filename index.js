const express = require("express")
const app = express()

app.get("/", function(req,res){
    res.send("Seja bem-vindo!")
})

app.get("/cadastro/:cargo/:nome", function(req,res){
    res.send("Olá, " + req.params.nome + "! "
     + "Cargo: " + req.params.cargo)
})

app.listen(8080, function(){
   console.log("Server running...")
})