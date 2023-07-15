const Sequelize = require('sequelize');
const sequelize = new Sequelize('root', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
  });
  
  const Usuario = sequelize.define('Usuario', {
    nome:{type:Sequelize.STRING},
    email: {type:Sequelize.STRING},
  });

   async function inserirDados(nomeCriado, emailCriado) {
    try {
      Usuario.create({
        nome:nomeCriado,
        email:emailCriado,
      });
      console.log("Usuário Criado com Sucesso");
      return "<b>Usuário criado com sucesso.</b>";
    } catch (erro) {
      console.log("Erro ao criar o Usuário: " + erro);
      return "<b>Erro ao criar</b>";
    }
  }

  sequelize.sync().then(() => {
    Usuario.count().then(count => {
      if (count === 0) {
        Usuario.bulkCreate([
          { nome: 'nada', email: "nadasss@gmail.com" },
        ]).then(() => {
          console.log("Registros iniciais criados com sucesso");
        }).catch(erro => {
          console.log("Erro ao criar registros iniciais: " + erro);
        });
      }
    });
  });


module.exports={
    Usuario,
    inserirDados
}
