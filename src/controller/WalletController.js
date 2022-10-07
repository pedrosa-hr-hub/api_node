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
    
        res.sendStatus(400);
    
      });
      
    } catch (error) {
      
      res.sendStatus(500);

    }

});

router.get('/sell', (req, res) =>{
    
  try {

      Wallet.findAll().then(
          (data)=>{
              res.status(200).send(data);
          }
      ).catch(
          (error) => {
              res.sendStatus(400);
          }
      )

  } catch (error) {

      res.sendStatus(500);
      
  }

});

router.delete('/wallet/:id', (req, res) => {

  try {
    
    const id = req.params.id;

      Wallet.findOne({ where: {id: id} }).then(

        (data) => {
          
          Wallet.destroy({ where: {id: id}});

          res.sendStatus(200);
          
        }
      ).catch(
        (error) => {

          res.sendStatus(400);

        }
      )

  } catch (error) {

    res.sendStatus(500);
    
  }

});

router.put('/wallet/:id', (req, res) => {

  try {
    
    const user = req.body.user;
    const wallet_name = req.body.wallet;

    Wallet.update({ user: user, wallet: wallet_name },
      {
      where: 
        {

          id: id

        }

    }).then(

      (data) => {

        res.status(200).send(data);

      }
    ).catch(

      (error) => {

        res.sendStatus(400);

      }

    );

  } catch (error) {

    res.sendStatus(500);
    
  }
  
});

//----------------------------------routers------------------------------------------//

module.exports = router;