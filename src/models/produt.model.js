
const Sequelize = require('sequelize')
const sequelize = require('../config/database')


const Produto = sequelize.define(
    "produtos",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        codigo: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        descricao: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        preco: {
            type: Sequelize.FLOAT,
            allowNull: false,
            validate: {
                isFloat: true,
                min: 0,
            },
        },
    },

    // {
    //   sequelize, // Passa a instância do Sequelize
    //   modelName: "Produto", // Nome do modelo na base de dados
    //   tableName: "produtos", // Nome da tabela na base de dados
    // },

    // {
    //   timestamps: false,
    // }
);

//Produto.sync({ force: true });
//console.log("The table for the User model was just (re)created!");

module.exports = Produto
