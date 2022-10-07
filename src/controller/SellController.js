//----------------------------------config-------------------------------------------//

const express = require('express');
const router = express.Router();
const Sell = require("../model/Sell");

//----------------------------------routers------------------------------------------//

router.post('/sell', (req, res) => {

    try {

        const name = req.body.name;
        const ticker = req.body.ticker;
        const price = req.body.price;
        const dateSell = req.body.date;
        
    
        Sell.create({
    
            name: name,
            ticker: ticker,
            price:price,
            dateSell:dateSell,
    
        }).then(()=> {
    
            res.sendStatus(201);
    
        }).catch(()=>{
    
            res.sendStatus(400);
    
        });
        
    } catch (error) {
        
        res.sendStatus(500);

    }

});

router.get('/sell', (res) =>{
    
    try {

        Sell.findAll().then(
            (data)=>{
                res.sendStatus(200).send(data);
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

router.delete('/sell/:id', (req, res) => {

    try {
      
      const id = req.params.id;
  
        Sell.findOne({ where: {id: id} }).then(
  
          (data) => {
            
            Sell.destroy({ where: {id: id}}).then(
  
              () => {
  
                res.sendStatus(200);
  
              }
            ).catch(
              (error) => {
  
                res.sendStatus(400);
  
              }
            )
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

//----------------------------------routers------------------------------------------//

module.exports = router;