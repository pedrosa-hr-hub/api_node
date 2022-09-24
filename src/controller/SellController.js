//----------------------------------config-------------------------------------------//

const express = require('express');
const router = express.Router();
const Sell = require("../model/Sell");

//----------------------------------routers------------------------------------------//

router.post('/sell', (req, res) => {

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

        res.sendStatus(501);

    });
});

//----------------------------------routers------------------------------------------//

module.exports = router;