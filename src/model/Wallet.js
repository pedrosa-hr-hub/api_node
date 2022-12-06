const Sequelize = require("sequelize");
const connection = require("./database");
const User = require("./User");

const Wallet = connection.define("wallet", {
    idWallet: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

Wallet.belongsTo(User, {
    constraint: true,
    foreignKey: "idUser",
});

User.hasMany(Wallet, {
    foreignKey: "idUser",
});

//Wallet.sync({force: true});

module.exports = Wallet;
