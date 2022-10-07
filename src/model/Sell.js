const Sequelize = require("sequelize");
const connection = require("./database");
const Wallet = require('./Wallet');

const Sell = connection.define("sell",{
     id:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
     },
     name:{
          type: Sequelize.STRING,
          allowNull: false
     },
     ticker:{
          type: Sequelize.STRING,
          allowNull: false
     },
     price:{
          type: Sequelize.DOUBLE,
          allowNull: false
     },
     dateSell:{
          type: Sequelize.DATE,
          allowNull: false
     }

});

Sell.belongsTo(Wallet,{
     constraint: true,
     foreignKey: 'idWallet'
});

Sell.hasMany(Sell,{
     foreignKey: 'idSell'
});

Sell.sync({force:true});

module.exports = Sell;