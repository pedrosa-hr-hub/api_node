//----------------------------------config-------------------------------------------//

const express = require("express");
const router = express.Router();
const Sell = require("../model/Sell");
const Wallet = require("../model/Wallet");

//----------------------------------routers------------------------------------------//

router.post("/sell", (req, res) => {
    try {
        const name = req.body.name;
        const ticker = req.body.ticker;
        const price = req.body.price;
        const dateSell = req.body.date;
        const qtd = req.body.qtd;
        const wallet = req.body.wallet;

        Wallet.findOne({ where: { name: wallet } })
            .then(data => {
                const idWallet = data.idWallet;
                dataSell = new Date()
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " ");

                Sell.create({
                    name: name,
                    ticker: ticker,
                    price: price,
                    dateSell: dateSell,
                    qtd: qtd,
                    idWallet: idWallet,
                })
                    .then(() => {
                        res.sendStatus(201);
                    })
                    .catch(() => {
                        res.sendStatus(400);
                    });
            })
            .catch(() => {
                res.sendStatus(400);
            });
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get("/sell", (req, res) => {
    try {
        Sell.findAll()
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

router.post("/sellWallet", (req, res) => {
    try {
        const wallet = req.body.wallet;
        const user = req.body.user;

        Wallet.findOne({ where: { name: wallet } })
            .then(data => {
                const idWallet = data.idWallet;
                const idUser = data.idUser;

                if (user == idUser) {
                    Sell.findAll({ where: { idWallet: idWallet } })
                        .then(data => {
                            res.send(data).status(200);
                        })
                        .catch(error => {
                            res.sendStatus(400);
                        });
                } else {
                    res.sendStatus(401);
                }
            })
            .catch(error => {
                res.sendStatus(400);
            });
    } catch (error) {
        res.sendStatus(500);
    }
});

router.delete("/sell/:id", (req, res) => {
    try {
        const id = req.params.id;

        Sell.findOne({ where: { id: id } })
            .then(data => {
                Sell.destroy({ where: { id: id } });

                res.sendStatus(200);
            })
            .catch(error => {
                res.sendStatus(400);
            });
    } catch (error) {
        res.sendStatus(500);
    }
});

router.put("/sell/:id", (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const ticker = req.body.ticker;
        const price = req.body.price;
        const dateSell = req.body.date;

        Sell.update(
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
