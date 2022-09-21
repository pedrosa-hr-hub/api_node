const Sequelize = require("sequelize");
const connection = require("./database");
const User = require('./User');

const Wallet = connection.define("wallet",{
     id:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
     },
     name:{
          type: Sequelize.STRING,
          allowNull: false
     }
});

Wallet.belongsTo(User,{
     constraint: true,
     foreignKey: 'idWallet'
});

User.hasMany(Wallet,{
     foreignKey: 'idWallet'
});

//Wallet.sync({force: true});

module.exports = Wallet;