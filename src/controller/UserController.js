//----------------------------------config-------------------------------------------//

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../model/User');

//----------------------------------routers------------------------------------------//

router.post('/user', (req, res) => {

    try {

      const user = req.body.user;
      const password = req.body.password;
      const email = req.body.email;

      var salt = bcrypt.genSaltSync(8);
      var hash = bcrypt.hashSync(password, salt);

      User.create({

        user: user,
        email: email,
        password: hash

      }).then(()=> {

        res.sendStatus(201);

      }).catch(()=>{

        res.sendStatus(501);

      });
      
    } catch (error) {
      
      res.sendStatus(404);
      
    }

});

router.get('/user', (res) =>{
    
  try {

      User.findAll().then(
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