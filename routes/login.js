const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const bcrypt = require('bcryptjs');


// @desc login/Landing page
// @route POST /login
router.post('/login', (req, res) => {
    let sql_query = 'Select PASSWORD from COMPTE where COMPTE.EMAIL=' + "'" + req.body.email + "'";
    connection.query(sql_query, (error, results) => {
        if (req.body.password === "root" && req.body.email === "root@root") {
            console.log("authented");
            res.redirect('/');
        }

        else {
            console.log("not authented");
            res.redirect('/login');
        }
    });
});

module.exports = router;
