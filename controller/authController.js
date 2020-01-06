const express = require('express');
const router = express.Router();

const User = require('../model/user');

//login
router.post('/', (req, res, next) => {
    const email = req.body.flogin;
    const password = req.body.fpass;
    const user = User.findByEmail(email);
    if (user) {
        user.comparePassword(password)
            .then(result => {
                if (result) {
                    req.session.isUserLoggedIn = true;
                    req.session.loggedUser = user;
                    res.redirect('/users/');
                } else {
                    invalidEmailOrPassword(req, res);
                }
            })
    } else {
        invalidEmailOrPassword(req, res);
    }
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});

function invalidEmailOrPassword(req, res) {
    req.flash('loginError', 'Nieprawidłowy email lub hasło');
    res.redirect('/');
}

module.exports.route = router;
