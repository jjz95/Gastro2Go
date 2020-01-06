const express = require('express');
const router = express.Router();

const User = require('../model/user');

router.get("/", (req, res, next) => {
    res.render('profil')
})


router.get("/panel", (req, res, next) => {
    console.log('cccccccccccccccccccccccccccccccccccccccccccccccc2011-09-29', req.session.loggedUser.dateOfBirth)
    var dateObj = new Date(req.session.loggedUser.dateOfBirth)
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    let date
    if (month < 10)
        date = year + "-" + "0" + month + "-" + day;
    else {
        date = year + "-" + month + "-" + day;
    }
    console.log('ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd', req.session.loggedUser.country)
    res.render('panel', {
        user: req.session.loggedUser,
        date: date
    })
})

module.exports.route = router; 