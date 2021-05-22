const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const bcrypt = require('bcryptjs');

// @desc login/Landing page
// @route POST /login
router.post('/login', (req, res) => {
    let emadress = req.body.email;
    let sql_query = 'Select PASSWORD, VCODE, COMPTEID  from COMPTE where COMPTE.EMAIL=' + connection.escape(emadress);
    connection.query(sql_query).then((results) => {
        if (results[0][0] && bcrypt.compare(req.body.password, results[0][0].PASSWORD)) {
            if (results[0][0].VCODE === 0) {
                req.session.loggedIn = true;
                req.session.userId = results[0][0].COMPTEID;
                res.redirect('/');
            }
            else {
                req.session.userId = results[0][0].COMPTEID;
                res.redirect('/validation');
            }

        }

        else {
            req.session.error = 'Incorrect email or password';
            res.redirect('/login');
        }
    });
}
);


module.exports = router;
