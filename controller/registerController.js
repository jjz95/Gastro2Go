const express = require('express');
const router = express.Router();

const User = require('../model/user');

router.get("/", (req, res, next) => {
    res.render('rejestracja')
})

router.post("/", (req, res, next) => {
  User.hashPassword(req.body.password)
    .then(hash => {
      const newUser = new User(req.body.first_name, req.body.last_name, req.body.email, hash);
      User.add(newUser);
      res.redirect("/users");
    }); 
});

module.exports.route = router; 
