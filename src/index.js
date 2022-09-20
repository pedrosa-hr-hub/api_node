//-----------------------------------config--------------------------------------------//

//express
const express = require('express');
const app = express();

//dotenv
const dotenv = require('dotenv');
dotenv.config();

//body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//port
const port = process.env.PORT;

//------------------------------------------------------------------------------------//

//-----------------------------------datababse----------------------------------------//

const connection = require("../src/model/database");
connection
     .authenticate()
     .then(() => {
          console.log("DATABASE ONLINE");
     }).catch((error) =>{
          console.log(error);
     });

//------------------------------------------------------------------------------------//

//----------------------------------router-user---------------------------------------//

const UserController = require('./controller/UserController');

app.use('/', UserController);

//------------------------------------------------------------------------------------//

//----------------------------------router-wallet-------------------------------------//

const WalletController = require('./controller/WalletController');

app.use('/wallet', WalletController);

//------------------------------------------------------------------------------------//

//------------------------------------server-run--------------------------------------//
app.listen(port, () => 
     console.log(`${port}!`)
);

//------------------------------------------------------------------------------------//