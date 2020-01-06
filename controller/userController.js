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

//USER UPDATE
router.post("/panel", async (req, res, next) => {
    const dateReg = /^\d{4}[\/\-]((0?[1-9]|1[012])|[a-z]+)[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const lettersReg = /^([a-zA-Z]{2,})$/;
    var numberReg = /^\d+$/;
    if (dateReg.test(req.body.fdate)) {
        let imie = req.body.fimie
        let nazwisko = req.body.fnazwisko
        let email = req.body.femail
        let pass = req.body.fpass
        let pass2 = req.body.fpass2
        let date = new Date(req.body.fdate)
        let numer = parseInt(req.body.fnumer)
        let dzialalnosc = req.body.fdzialalnosc
        let adres = req.body.fadres
        let kod = req.body.fkod
        let kraj = req.body.fkraj

        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

        if (pass === pass2 &&
            lettersReg.test(imie) &&
            lettersReg.test(nazwisko) &&
            emailReg.test(email) &&
            pass !== '' &&
            numberReg.test(numer) &&
            lettersReg.test(dzialalnosc) &&
            adres !== '' &&
            kod !== '' &&
            lettersReg.test(kraj)
        ) {
            await User.edit(imie, nazwisko, email, pass, date, numer, dzialalnosc, adres, kod, kraj, req.session.loggedUser.id);
            //firstName, lastName, email, passwordHash, dateOfBirth, contactNumber, business, address, zipCode, country, id
            req.session.loggedUser.firstName = imie
            req.session.loggedUser.lastName = nazwisko
            req.session.loggedUser.email = email
            req.session.loggedUser.dateOfBirth = date
            req.session.loggedUser.contactNumber = numer
            req.session.loggedUser.business = dzialalnosc
            req.session.loggedUser.address = adres
            req.session.loggedUser.zipCode = kod
            req.session.loggedUser.country = kraj
        } else {
            console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
        }
        console.log(User.list())
        res.redirect("/users");
    }
})

router.post("/delete", async (req, res, next) => {

})

module.exports.route = router; 