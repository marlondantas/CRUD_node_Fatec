//Importa a classe de conexão do mongo;
var mongoClient = require("mongodb").MongoClient;

//Conecta com o bando de dados mongo;
mongoClient.connect("mongodb://localhost/fatecDog",
    {
    useUnifiedTopology: true,
    useNewUrlParser: true,  
    })
        .then(conn => global.conn = conn.db("fatecDog"))
        .then(function aviso(){
            console.log('Conectado com sucesso')
        })
        .catch(err => console.log(err))

//Faz a leitura de todo o banco de dados;
function findAll(callback) {
    global.conn.collection("alunos").find({}).toArray(callback);
    console.log("Foi realizado uma pesquisa em todos os registros.");
}

//Insere um novo registro dentro do banco de dados;
function insert(aluno, callback){
    global.conn.collection("alunos").insert(aluno, callback);
}

//Faz a busca de um registro no banco de dados;
var ObjectId = require("mongodb").ObjectId;

function findOne(id,callback) {
    global.conn.collection("alunos").find(new ObjectId(id)).toArray(callback);
}

//Edita um registro no banco de dados;
function update(id, aluno, callback) {
    global.conn.collection("alunos").updateOne({_id: new ObjectId(id)}, {$set: aluno}, callback)
}

//Apaga um registro do banco de dados;
function delet(id,callback) {
    global.conn.collection("alunos").deleteOne({_id: new ObjectId(id)},callback);
}

//Para fazer a exportação de arquivo no javascript, todas as funções que serão exportadas devem estar no 
//module.exports = {AQUI};

module.exports = {findAll, insert, findOne, update, delet}