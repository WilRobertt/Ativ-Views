const express = require('express');
const Usuario = require('./model/Usuario');
const app = express();
const bodyParser = require("body-parser")
var urlencodedParser = bodyParser.urlencoded({extended:false})
const Sequelize = require('sequelize');
const { Op } = Sequelize;


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('home');
});

app.get('/filtro', (req, res) => {
  res.render('filtro');
});

app.post('/CriarUsuario',urlencodedParser,(req, res) =>{
  
  var nomeCriado=req.body.nome;
    var emailCriado=req.body.email;

    const criacao=Usuario.inserirDados(nomeCriado,emailCriado)

    res.send(criacao);
})

app.get('/consulta', async (req, res) => {
  var nomeProcurado = req.query.nome;
	var emailProcurado = req.query.email;
  
  try {
  
    const UsuarioProcurado = await Usuario.Usuario.findAll({
      where: {
        nome: {
          [Op.like]: '%' + nomeProcurado + '%'
        },
        email: {
          [Op.like]: '%' + emailProcurado + '%'
        }
      }
    });
    
    res.render('consulta', { UsuarioProcurado});
  } catch (error) {
    console.error(error);
    res.status(500).send('Ocorreu um erro na consulta');
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
