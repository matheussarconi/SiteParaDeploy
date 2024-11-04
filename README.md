<h1>Portal do Oráculo</h1>

<h2>Informações do trabalho</h2>
<li>Banco de dados</li>
<li>Rota de Login</li>
<li>Rota de Cadastro de usuario</li>
<li>Rota de Cadastro de produtos</li>



<h2>Criando o banco de dados</h2>

<h3>Criando a databse</h3>

````
create database SiteParaDeploy;
````
<h3>Selecionar a database</h3>

````
use SiteParaDeploy;
````

<h3>Criar a tabela de usuarios</h3>

````
create table usuario(
    id_usuario int not null primary key auto_increment,
    nomeUsuario varchar(500) not null,
    email varchar(500) not null unique,
    senha varchar(20) not null unique
);
````
<h3>Criar a tabela de produtos</h3>

````
create table produtos(
    id_produtos int not null primary key auto_increment,
    nomeProduto varchar(500) not null,
    precoProdutos float not null,
    descricao varchar(1000) not null,
    qtdDisponivel float
);

````
<h3>Criar tabela de carrinho fazendo um link com usuario e produtos</h3>

````
create table carrinho(
    id_produtos int not null,
    id_usuario int not null,
    totalProdutos int not null,
    precoCarrinho float not null, 
    precoProdutos float not null,
    nomeProduto varchar(500) not null,
    primary key (id_produtos, id_usuario),
    foreign key (id_usuario) references usuario(id_usuario),
    foreign key (id_produtos) references produtos(id_produtos)
);
````
<h3>Para ver se tem algo dentro das tabelas</h3>

````
select * from produtos;
````
<h2>Criando a API</h2>

<h3>Abrir o gitbash e usar a pasta no terminal</h3>

````
cd lojaTecnico
````
<h3>Criar o arquivo package.json para gerenciaros pacotes node</h3>

````
npm init -y
````
<h3>Instalar os 4 pacotes necessários para o uso das api`s</h3>

````
npm i express nodemon mysql2 cors
````

O que cada pacote faz:
<li>express: framework web para construção da infraestrutura da API;</li>
<li>nodemon: Monitora as mudanças nos arquivos do projeto e reinicia automaticamente o servidor do Node;</li>
<li>mysql2: Conectar e mandar comandos SQL para o banco;</li>
<li>cors: Mecanismo para adicionar cabeçalhos HTTP que informam aos navegadores para permitir que uma aplicação web seja executada em origem e acesse recursos de outra origem diferente</li>




<h2>Abrir o arquivo no VSCODE</h2>

````
code . 
````
<h3>Agora criar um folder dentro do VSCODE com o nome SRC</h3>

<h3>Dentro do SRC, vai criar um file com o nome de dp_config.js </h3>
<h3>Dentro do dp_config.js:</h3>

<li>linkar o mysql com o VSCODE</li>

````
const mysql = require('mysql2')

const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root',
database: 'PortalDoOraculo'

});

connection.connect((err) => {
    if(err){
        throw err;
    } else{
        console.log('Mysql conectado');
    }
})

module.exports = connection;
````
<h3>Agora criar um file dentro do SRC com o nome server.js</h3>

<h3>Dentro do server.js sera feito as nossas rotas, mas antes, vamos criar as portas:</h3>

<li>Definir a porta</li>

````
const express = require('express');
const cors = require('cors');
````
<li>Habilitar o cors e utilizar o json</li>

````
const porta = 3002;
const app = express();
````

<li>Fazer uma conexão com o file criado anteriormente, o dp_config.js</li>

````
const connection = require('./dp_config');
````

<h3>Paginas</h3>
<ul>
<li>Pagina inicial</li>
<li>Pagina principal</li>
<li>Cadastro</li>
<li>Login</li>
<li>Login de ADM</li>
<li>pagina de cada produto</li>
<li>Carrinho</li>
<li>Poastar produto</li>
</ul>


<li>Agora, sera feito a primeira rota, a rota de cadastro, pra ela sera usado o post, pois ele server para adicionar o cadastro no banco de dados e verificar se é verdadeiro para o login. Será verificado também um verdadeiro ou falso pra caso na hora de testar esteja errado</li>


````
app.post('/usuario/cadastrar', (request, response) => {
    let params = Array(
        request.body.nomeUsuario,
        request.body.email,
        request.body.senha
    );

    let query = "INSERT INTO usuario(nomeUsuario, email, senha) values(?,?,?);";
    connection.query(query, params, (err, results) => {
        if(results) {
            response
            .status(201)
            .json({
                sucess: true,
                message: "suceesso",
                data: results
            })

        } else { 
            response
            .status(400)
            .json({
                sucess: false,
                message: "sem suceesso",
                data: err
            })
        }
    })
});
````
Body: {"nomeUsuario":"Guilherme",
        "senha": "lalalalal",
        "email": "guimm@gmail}
<li>Agora é a rota de Login, onde o post verificara se existe ja o cadastro, e caso seja verdade ele traz como resposta o usuario</li>

````
app.post('/logar/usuario', (req, res) => {
    console.log('Dados recebidos:', req.body);

    let params = [req.body.email];
    let query = "SELECT id_usuario, nomeUsuario, senha, perfil FROM usuario WHERE email = ?";
    
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro na consulta ao banco de dados:', err);
            return res.status(500).json({
                success: false,
                message: "Erro no servidor"
            });
        }

        if (results.length > 0) {
            let senhaDigitada = req.body.senha;
            let senhaBanco = results[0].senha;

            if (senhaBanco === senhaDigitada) {
                res.status(200).json({
                    success: true,
                    message: "Sucesso",
                    data: results[0]
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: "Senha não cadastrada"
                });
            }
        } else {
            res.status(400).json({
                success: false,
                message: "Email não cadastrado"
            });
        }
    });
});
````
body: {"email":"blablabla",
        "senha":"blablabla"}

<li>Uma rota para o cadastro de produtos </li>

````
app.post('/cadastrar/produto', upload.single('imagemProduto'), (request, response) => {
    let params = [
        request.body.nomeProduto,
        request.body.precoProduto,
        request.body.descricao,
        request.body.qtdDisponivel,
        request.file.filename // Corrigido para usar o nome do arquivo salvo
    ];

    let query = "INSERT INTO produtos(nomeProduto,precoProdutos,descricao,qtdDisponivel,imagemProduto) VALUES(?,?,?,?,?)";
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error(err);
            return response.status(400).json({
                success: false,
                message: "Sem sucesso!",
                data: err
            });
        }

        response.status(200).json({
            success: true,
            message: "Sucesso!",
            data: results
        });
    });
});

app.use('/uploads', express.static(__dirname +  '\\public'))

//ROTA PARA LISTAR OS PRODUTOS
app.get('/produtos/listar', (request, response) => {
    let query = "SELECT * FROM produtos";

    connection.query(query, (err, results) => {
        if(results){
            response
            .status(200)
            .json({
                success: true,
                message: "Sucesso!",
                data: results
            })
        } else{
            response
            .status(400)
            .json({
                success: false,
                message: "Sem sucesso!",
                data: results
            })
        }
    })
})

app.listen(porta, () => console.log(`rodando na porta ` + porta));
````

<li>Para testar, basta usar os inputs da pagina de verificar produto</li>
