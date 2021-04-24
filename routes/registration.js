const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const bcrypt = require('bcryptjs');

router.post('/registration', (req, res) => {
    let add_user_query = "insert into COMPTE values ('" + req.body.email.split('@')[0] + "', '" + req.body.email + "', " + "'" + req.body.password + "', 'john', 'doe', 'm', '2021-01-01', 'student'" + ")";

    connection.query(add_user_query, (errors) => {
        if (errors)
            throw errors;
        res.redirect('/login');
    });

});

module.exports = router;
