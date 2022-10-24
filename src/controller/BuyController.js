//----------------------------------config-------------------------------------------//

const express = require('express');
const router = express.Router();
const Buy = require("../model/Buy");

//----------------------------------routers------------------------------------------//

router.post('/buy', (req, res) => {

    try {

        const name = req.body.name;
        const ticker = req.body.ticker;
        const price = req.body.price;
        const dateBuy = req.body.date;
        const idWallet = req.body.wallet;
    
        Buy.create({
    
            name: name,
            ticker: ticker,
            price:price,
            dateBuy:dateBuy,
            idWallet: idWallet
    
        }).then(()=> {
    
            res.sendStatus(201);
    
        }).catch(()=>{
    
            res.sendStatus(400);
    
        });
        
    } catch (error) {

        res.sendStatus(500);
        
    }
});

router.get('/buy', (req, res) =>{
    
    try {

        Buy.findAll().then(
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

router.delete('/buy/:id', (req, res) => {

    try {
      
      const id = req.params.id;
  
        Buy.findOne({ where: {id: id} }).then(
  
          (data) => {
            
            Buy.destroy({ where: {id: id}});

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

router.put('/buy/:id', (req, res) => {

  try {
    
    const id = req.params.id;
    const name = req.body.name;
    const ticker = req.body.ticker;
    const price = req.body.price;
    const dateSell = req.body.date;

    Buy.update({ name: name, ticker: ticker, price: price, date: dateSell },
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