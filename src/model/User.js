const Sequelize = require("sequelize");
const connection = require("./database");

const User = connection.define("users",{
     id:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
     },
     user:{
          type: Sequelize.STRING,
          allowNull: false
     },
     email:{
          type: Sequelize.STRING,
          allowNull: false
     }, 
     password:{
          type: Sequelize.STRING,
          allowNull: false
     }
});

//User.sync({force:true});

module.exports = User;