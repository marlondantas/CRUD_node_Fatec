var express = require("express");
var app = express();

app.set('view engine', 'ejs');

var bodyParser = require("body-parser")

// var mongoose = require("mongoose")

global.db = require('./db.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    global.db.findAll(function (e, docs) {
        if(e){
            console.log("Deu esse erro:"+e);
        }
        
        res.render(__dirname + '/views/index',{title:"Aloha world - Main",docs: docs, form: {"user":"","moedas":""}, action:'/cadastro'});
    })
})

app.post("/cadastro", (req, res, next) => {
    var user = req.body.user;
    var moedas = parseInt(req.body.moedas);

    global.db.insert({user, moedas}, (err, result) => {
            if(err) { return console.log(err); }
            res.redirect('/');
    })
})

app.get('/editar/:id', (req, res, next) => {
    
    var ID = req.params.id;

    global.db.findOne(ID,(e,docs)=>{
        if (e) {return console.log(e);}
        console.log("Tentando localizar esse ID:"+ID+"\nEsse foi o resultado:"+docs[0])
        res.render(__dirname + '/views/index',{title:"Aloha world - Editar", form: docs[0], action:"/editar/"+ docs[0]._id})
    });
});

app.post('/editar/:id', (req, res) => {
    //params = GET
    //Body = post
    var id = req.params.id;

    var user = req.body.user;
    var moedas = req.body.moedas;

    global.db.update(id,{'user':user,'moedas':moedas},(e, result) =>
    {
        if(e) {return console.log(e);}
        res.redirect('/');
    });

});

app.get('/deletar/:id', (req, res) => {
    var id = req.params.id;

    global.db.delet(id,(e,result) =>
    {
        if (e) {console.log("Esse erro:"+e)}
        res.redirect('/');
    }
    );
});

app.listen(3000, () => {
    console.log("3000 is the magic port");
    console.log("http://localhost:3000/")
})