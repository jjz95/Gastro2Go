var express = require('express');
var router = express.Router();

var User = require('../model/user')

/* GET home page. */
router.get('/', function (req, res, next) {
        res.render('admin', {
            userList: User.list()
            // interestList: Interest.list()
        })
});

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
});

// router.post('/addinterest', function (req, res, next) {
//     const reqNameReg = /^([a-z]{2,})$/;
//     let name = req.body.name.trim()
//     if (reqNameReg.test(name)) {
//         let newInterest = new Interest(name)
//         Interest.add(newInterest);
//     }

//     res.redirect('/admin')

// });

// router.delete('/deleteinterests', function (req, res, next) {
//     try {
//         console.log('heyyyy')
//         req.body.interestsToDelete.forEach(e => {
//             if (e.toDelete)
//                 Interest.delete(e.id)
//             console.log('q', e)
//         });
//         console.log('w', req.body.interestsToDelete)
//         res.end()
//     }
//     catch (error) {
//         console.log(error)
//     }
// });


module.exports.route = router;