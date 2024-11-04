const express = require('express');
const cors = require('cors');
//definir a porta 
const porta = 3002;
const app = express();
//habilitar o cors e utilizar json
app.use(cors());
app.use(express.json());
//Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Define a configuração do Swagger
 const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API of Portal do Oráculo',
      version: '1.0.0',
      description: 'A simple Express API with Swagger documentation',
    },
    servers: [
      {
        url: 'http://localhost:3002',
      },
    ],
  },
  apis: ['./src/server.js'], // Define onde o Swagger buscará os comentários das rotas | Caminho para os arquivos com anotações
 
 };
 const swaggerDocs = swaggerJsdoc(swaggerOptions);
 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
//testar
const connection = require('./dp_config');
const upload = require('./multer')
 /**
 * @swagger
 * /usuario/cadastrar:
 *   post:
 *     summary: cadastrar um novo usuario
 *     responses:
 *       200:
 *         description: cadastro
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
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
/**
 * @swagger
 * /logar/usuario:
 *   post:
 *     summary: logar um usuario ja existente
 *     responses:
 *       200:
 *         description: login
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
//LOGIN
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


/**
 * @swagger
 * /cadastrar/produto:
 *   post:
 *     summary: cadastrar um novo produto
 *     responses:
 *       200:
 *         description: adicionar novo produto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
// Rota para adicionar um novo produto
app.post('/cadastrar/produto', upload.single('imagemProduto'), (request, response) => {
    let params = [
        request.body.nomeProduto,
        request.body.precoProduto,
        request.body.descricao,
        request.body.qtdDisponivel,
        request.file.imagemProduto // Corrigido para usar o nome do arquivo salvo
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

/**
 * @swagger
 * /produtos/listar:
 *   post:
 *     summary: listar produto
 *     responses:
 *       200:
 *         description: Listar produto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

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

/**
 * @swagger
 * /produto/:id:
 *   post:
 *     summary: Atualizar produto
 *     responses:
 *       200:
 *         description: Listar produto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */

//ROTA PARA ATUALIZAR OS PRODUTOS
app.put('/produto/:id', upload.single('imagemProduto'), (request, response) => {
    let params = Array(
        request.body.nomeProduto ,
        request.body.precoProdutos,
        request.file.imagemProduto,
        request.body.qtdDisponivel,
        request.body.descricao,
        request.params.id_produtos
    )
    console.log(params)
    let query = `UPDATE produtos SET nomeProduto = ?, precoProdutos = ?, imagemProduto = ?, qtdDisponivel = ?, descricao = ? WHERE id_produtos = ?`

    connection.query(query, params, (err, results) =>{
        if(results) {
            response
            .status(200)
            .json({
                success: true,
                message: "suceesso!",
                data: results
            })

        } else { 
            response
            .status(400)
            .json({
                success: false,
                message: "sem suceesso",
                data: err
            })
        }
    })
})


app.listen(porta, () => console.log(`rodando na porta ` + porta));


