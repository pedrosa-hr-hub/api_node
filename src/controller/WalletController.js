//----------------------------------config-------------------------------------------//

const express = require('express');
const router = express.Router();
const Wallet = require('../model/Wallet');

//----------------------------------routers------------------------------------------//

router.post('/wallet', (req, res) => {

    try {

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
      
    } catch (error) {
      
      res.sendStatus(404);

    }

});

router.get('/sell', (res) =>{
    
  try {

      Wallet.findAll().then(
          (data)=>{
              res.sendStatus(200).send(data);
          }
      ).catch(
          (error) => {
              res.sendStatus(400);
          }
      )
      
  } catch (error) {

      res.sendStatus(404);
      
  }

});


//----------------------------------routers------------------------------------------//

module.exports = router;