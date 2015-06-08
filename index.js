//Instancia o gerenciador de dependencias Express
var express = require('./node_modules/express');
var bodyParser = require('./node_modules/body-parser');
var app = express();

//utilizar JSON
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
	extended: true
}));

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
//Instancia o BD mysql
var mysql = require('./node_modules/mysql/');

//createConnection -> Método para conexão com banco de dados,  recebe o array com os dados da conexão
//no formato JSON
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'first_nodeapp',
	port: 3306
});

// ----------------- ROTAS -------------------
app.get('/', function (req, res) {
  res.send('<h1>First NodeJS app!</h1>');
});

app.post('/usuarios', function (req, res){
	
	//BUSCA OS DADOS PASSADOS COMO PARÂMETRO NA REQUISIÇÃO
	var usuario = req.param('usuario', null);
	var email = req.param('email', null);
	var senha = req.param('senha', null);


	var query = connection.query("INSERT INTO tbl_usuarios(usuario,email,senha) VALUES('"+usuario+"', '"+email+"', '"+senha+"')" , function(err, result, fields ){
		//Verifica se possui algum erro na execução da Query , caso exista , imprime-o na tela
		if(err){
			throw err;
		}
		else{
			res.send(result);
		}

	});

});


app.get('/usuarios', function (req, res){
	
	var query = connection.query("SELECT * FROM tbl_usuarios" , function(err, result, fields ){
		//Verifica se possui algum erro na execução da Query , caso exista , imprime-o na tela
		if(err){
			throw err;
		}
		else{
			res.send(result);
		}

	});

});

app.delete('/usuarios/:id', function (req, res){
	
	var id = req.params('id'); //Busca o parâmetro passado

	var query = connection.query("DELETE FROM tbl_usuarios WHERE id="+id , function(err, result, fields ){
		//Verifica se possui algum erro na execução da Query , caso exista , imprime-o na tela
		if(err){
			throw err;
		}
		else{
			res.send(result);
		}

	});

});



//Função que realiza a Query no Banco instanciado na conexão acima
// err : erro retornado da query;
// result : dados retornados da query;
// fields : campos da tabela;
// var query = connection.query("SELECT * FROM tbl_usuarios" , function(err, result, fields ){
// 	//Verifica se possui algum erro na execução da Query , caso exista , imprime-o na tela
// 	if(err) throw err;

// 	//Imprime os dados no console
// 	console.log('DADOS: ' , result);

// });


//Encerra a Conexão
// connection.end();