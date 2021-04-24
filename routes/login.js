const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const bcrypt = require('bcryptjs');

// @desc login/Landing page
// @route GET /login
router.get('/login', (req, res) => {
    res.render('login', { layout: 'login' });
});

// @desc login/Landing page
// @route POST /login
router.post('/login', (req, res) => {
    let sql_query = 'Select PASSWORD from COMPTE where COMPTE.EMAIL=' + "'" + req.body.username + "'";
    connection.query(sql_query, (error, results) => {
        if (error)
            throw error;

        if (results[0]) {
            if (bcrypt.compare(req.body.password, results[0]))
                res.redirect('/');
        }
        else {
            res.redirect('/login');
        }
    });
});

module.exports = router;
