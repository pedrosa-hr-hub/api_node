//----------------------------------config-------------------------------------------//

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/User");
const UUID = require("uuid");
const { json } = require("express");

//----------------------------------routers------------------------------------------//

router.post("/user", (req, res) => {
    try {
        const user = req.body.user;
        const password = req.body.password;
        const email = req.body.email;

        var salt = bcrypt.genSaltSync(8);
        var hash = bcrypt.hashSync(password, salt);

        User.create({
            user: user,
            email: email,
            password: hash,
        })
            .then(() => {
                res.sendStatus(201);
            })
            .catch(() => {
                res.sendStatus(400);
            });
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get("/user", (req, res) => {
    try {
        User.findAll()
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

router.delete("/user/:id", (req, res) => {
    try {
        const id = req.params.id;

        User.findOne({ where: { id: id } })
            .then(data => {
                User.destroy({ where: { id: id } });

                res.sendStatus(200);
            })
            .catch(error => {
                res.sendStatus(400);
            });
    } catch (error) {
        res.sendStatus(500);
    }
});

router.put("/user/:id", (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body.user;
        const password = req.body.password;
        const email = req.body.email;

        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(password, salt);

        User.update(
            { user: user, password: hash, email: email },
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

router.post("/userAuth", (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        User.findOne({ where: { email: email } })
            .then(data => {
                bcrypt.compare(password, data.password).then(result => {
                    if (result == true) {
                        res.send(data);
                    } else {
                        res.sendStatus(400);
                    }
                });
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
