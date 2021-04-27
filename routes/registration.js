const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const bcrypt = require('bcryptjs');

// @desc registration/Landing page
// @route POST registration/
router.post('/registration', async (req, res) => {
    let email = req.body.email;
    let pwd = req.body.password;
    let f_name = req.body.f_name;
    let l_name = req.body.l_name;
    let gender = req.body.gender;
    let birth = req.body.birth;
    let status = req.body.status;
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(pwd, salt);
    let values = [email, hash, f_name, l_name, gender, birth, status].map((x) => "'" + x + "'").join(', ');
    let query = ["insert into COMPTE (EMAIL, HASH, NOM, PRENOM, SEXE, DATE_NAISSANCE, TYPE) values (", values, ")"].join('');

    connection.query("select compteID from COMPTE where email=" + "'" + email + "'", (err, results) => {
        if (err)
            throw err;

        else if (results[0]) {
            req.session.error = 'email exists';
            res.redirect('/registration');
        }
        else
            connection.query(query, (err, results) => {
                if (err)
                    throw err;
                else {
                    req.session.loggedIn = true;
                    req.session.userId = req.body.email;
                    res.redirect('/');
                }
            });
    });
});

module.exports = router;
