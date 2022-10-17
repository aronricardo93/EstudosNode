const express = require("express")
const app = express()
const handlebars = require('express-handlebars')
const Post = require("./models/Post")
const post = require("./models/Post")

//Configurações
    //template engine
    app.engine('handlebars', handlebars.engine({defaultLayout:'main'}))
    app.set('view engine', 'handlebars')

//Capturar os dados do formulário e envia-los
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())


//rotas
app.get('/', function(req,res){
    post.findAll().then(function(posts){
        res.render('layouts/home', {posts: posts.map(posts => posts.toJSON())})
    })
})

app.get('/cadastro', function(req,res){
    res.render('layouts/formulario')
})

app.post('/add', function(req,res){
    post.create({
        titulo : req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        //res.send('Post criado com sucesso!')
        res.redirect('/')
    }).catch(function(erro){
        res.send("Houve um erro " + erro + "!")
    })
})

app.get("/deletar/:id",function(req,res){
    post.destroy({where: {'id':  req.params.id}}).then(function(){
        res.send('Post ' + req.params.id + ' deletado com sucesso!')
    }).catch(function(erro){
        res.send('Post não encontrado!')
    })
})

/*app.get("/", function(req,res){
    res.sendFile(__dirname + "/html/index.html")
})

app.get("/sobre", function(req,res){
    res.sendFile(__dirname + "/html/sobre.html")
})

app.get("/cadastro/:cargo/:nome", function(req,res){
    res.send("Olá, " + req.params.nome + "! "
     + "Cargo: " + req.params.cargo)
})*/

app.listen(8080)