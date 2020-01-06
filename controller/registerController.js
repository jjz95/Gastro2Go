const express = require('express');
const router = express.Router();

const User = require('../model/user');

router.get("/", (req, res, next) => {
    res.render('rejestracja')
})


module.exports.route = router; 
