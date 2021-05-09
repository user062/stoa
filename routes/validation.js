const express = require('express');
const router = express.Router();
const connection = require('../config/db');

// @desc login/Landing page
// @route POST /login

router.post('/validation', async (req, res) => {
    let emadress = req.session.userId;
    let sql_query = 'Select vcode, compteID from COMPTE where COMPTE.EMAIL=' + connection.escape(emadress);
    let sql_query1 = 'update compte set vcode = 0 where compteID = ?';

    connection.query(sql_query, async (error, results) => {
        if (error)
            throw error;

        else if (results[0] && req.body.code == results[0].vcode) {
            req.session.loggedIn = true;
            let cID = results[0].compteID;
            connection.query(sql_query1, [cID], async (error, results) => {
                if (error)
                    throw error;
                else {
                  req.session.userId= cID;
                  res.redirect('/');
            }
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
