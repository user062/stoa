const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const bcrypt = require('bcryptjs');

// @desc login/Landing page
// @route POST /login
router.post('/login', async (req, res) => {
    let emadress = req.body.email;
    let sql_query = 'Select PASSWORD from COMPTE where COMPTE.EMAIL=' + connection.escape(emadress);
    connection.query(sql_query, async (error, results) => {
        if (error)
            throw error;

        else if (results[0] && await bcrypt.compare(req.body.password, results[0].PASSWORD)) {
            req.session.loggedIn = true;
            req.session.userId = req.body.email;
            res.redirect('/');
        }

        else {
            req.session.error = 'Incorrect email or password';
            res.redirect('/login');
        }
    });
}
);


module.exports = router;
