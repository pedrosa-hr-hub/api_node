//----------------------------------config-------------------------------------------//

const express = require("express");
const router = express.Router();
const Buy = require("../model/Buy");
const Wallet = require("../model/Wallet");

//----------------------------------routers------------------------------------------//

router.post("/buy", (req, res) => {
    try {
        const name = req.body.name;
        const ticker = req.body.ticker;
        const price = req.body.price;
        const dateBuy = req.body.date;
        const wallet = req.body.wallet;

        Wallet.findOne({ where: { name: wallet } })
            .then(data => {
                const idWallet = data.idWallet;
                dataBuy = new Date()
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " ");

                Buy.create({
                    name: name,
                    ticker: ticker,
                    price: price,
                    dateBuy: dateBuy,
                    idWallet: idWallet,
                })
                    .then(() => {
                        res.sendStatus(201);
                    })
                    .catch(error => {
                        res.send(error).status(400);
                    });
            })
            .catch(() => {
                res.sendStatus(400);
            });
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get("/buy", (req, res) => {
    try {
        Buy.findAll()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                res.sendStatus(400);
            });
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get("/buyOne", (req, res) => {});

router.delete("/buy/:id", (req, res) => {
    try {
        const id = req.params.id;

        Buy.findOne({ where: { id: id } })
            .then(data => {
                Buy.destroy({ where: { id: id } });

                res.sendStatus(200);
            })
            .catch(error => {
                res.sendStatus(400);
            });
    } catch (error) {
        res.sendStatus(500);
    }
});

router.put("/buy/:id", (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const ticker = req.body.ticker;
        const price = req.body.price;
        const dateSell = req.body.date;

        Buy.update(
            { name: name, ticker: ticker, price: price, date: dateSell },
            {
                where: {
                    id: id,
                },
            },
        )
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                res.sendStatus(400);
            });
    } catch (error) {
        res.sendStatus(500);
    }
});

//----------------------------------routers------------------------------------------//

module.exports = router;
