const express = require('express');
const router = express.Router();
const Wallet = require('../model/Wallet');

router.post('/wallet', (req, res) => {

     //catch infos
     const user = req.body.user;
     const wallet_name = req.body.wallet;
     
     //save on database
    Wallet.create({

     user: user,
     name: wallet_name,

   }).then(()=> {

     res.sendStatus(201);

   }).catch(()=>{

     res.sendStatus(501);

   });
});

module.exports = router;