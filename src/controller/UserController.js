const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');

router.post('/users', (req, res) => {

    //catch infos
    const user = req.body.user;
    const password = req.body.password;
    const email = req.body.email;

    //encrypt
    var salt = bcrypt.genSaltSync(8);
    var hash = bcrypt.hashSync(password, salt);

    //save on database
    User.create({

      user: user,
      email: email,
      password: hash

    }).then(()=> {

      res.sendStatus(201);

    }).catch(()=>{

      res.sendStatus(501);

    });

});

module.exports = router;