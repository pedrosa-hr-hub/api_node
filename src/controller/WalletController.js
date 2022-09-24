//----------------------------------config-------------------------------------------//

const express = require('express');
const router = express.Router();
const Wallet = require('../model/Wallet');

//----------------------------------routers------------------------------------------//

router.post('/wallet', (req, res) => {

     const user = req.body.user;
     const wallet_name = req.body.wallet;
     
      Wallet.create({

      user: user,
      name: wallet_name,

    }).then(()=> {

      res.sendStatus(201);

    }).catch(()=>{

      res.sendStatus(501);

    });
});

router.get ('/wallet',(req, res) =>{

  Wallet.findAll().then(user =>{

    res.status(200).send(user);

  }).catch((error)=>{

    console.log(error);

  });

});

//----------------------------------routers------------------------------------------//

module.exports = router;