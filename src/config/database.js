
const Sequelize = require('sequelize')
require('dotenv').config()


const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'postgres',
});




// Test connection and log errors
sequelize.authenticate()
  .then(() => {
    console.log('Conexão realizada com sucesso.');
  })
  .catch(err => {
    console.error(`Erro ao conectar com o banco de dados: ${err.message}`);
  });

module.exports = sequelize
