const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// @desc login/Landing page
// @route POST /login

router.post('/validaion', async (req, res) => {
    let emadress = req.session.userId;
    let sql_query = 'Select vcode, compteID from COMPTE where COMPTE.EMAIL=' + connection.escape(emadress);

    connection.query(sql_query, async (error, results) => {
        if (error)
            throw error;

        else if (results[0] && req.body.code == results[0].vcode) {
            req.session.loggedIn = true;
            req.session.userId = results[0].compteID;
            res.redirect('/');
        }

        else {
            req.session.error = 'Incorrect verefication code';
            res.redirect('/validation');
        }
    });
}
);


module.exports = router;
