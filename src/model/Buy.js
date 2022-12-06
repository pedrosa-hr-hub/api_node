const Sequelize = require("sequelize");
const connection = require("./database");
const Wallet = require("./Wallet");

const Buy = connection.define("buy", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ticker: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    dateBuy: {
        type: Sequelize.DATE,
        allowNull: false,
    },
});

Buy.belongsTo(Wallet, {
    constraint: true,
    foreignKey: "idWallet",
});

//Buy.sync({force:true});

module.exports = Buy;
