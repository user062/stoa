const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// @desc login/Landing page
// @route POST /login

router.post('/validation', (req, res) => {
    let id = req.session.userId;
    let sql_query = `Select vcode from COMPTE where  compteID=${id}`;
    let sql_query1 = `update COMPTE set vcode = 0 where compteID = ${id}`;

    connection.query(sql_query).then((results) => {
        if (results[0][0] && req.body.code == results[0][0].vcode) {
            req.session.loggedIn = true;
            connection.query(sql_query1, [id]).then((results) => {
                req.session.userId = id;
                res.redirect('/');
            });
        }

        else {
            req.session.loggedIn = false;

            req.session.error = 'Incorrect verefication code';
            res.redirect('/validation');
        }
    });
}
);


module.exports = router;
