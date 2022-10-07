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
    
        Buy.create({
    
            name: name,
            ticker: ticker,
            price:price,
            dateBuy:dateBuy,
    
        }).then(()=> {
    
            res.sendStatus(201);
    
        }).catch(()=>{
    
            res.sendStatus(501);
    
        });
        
    } catch (error) {

        res.sendStatus(404);
        
    }
});

router.get('/buy', (res) =>{
    
    try {

        Buy.findAll().then(
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