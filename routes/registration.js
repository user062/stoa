const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: 'stoasite@gmail.com',
        pass: 'stoasite123'
    }
});


// @desc registration/Landing page
// @route POST registration/
router.post('/registration', async (req, res) => {
    let vcode = Math.floor((Math.random() * 100000000) + 10000000);

    let mail = 'your verification code is : ' + vcode;

    let email = req.body.email;
    let pwd = req.body.password;
    let f_name = req.body.f_name;
    let l_name = req.body.l_name;
    let gender = req.body.gender;
    let birth = req.body.birth;
    let status = req.body.status;
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(pwd, salt);
    let values = [email, hash, f_name, l_name, gender, birth, status, vcode].map((x) => "'" + x + "'").join(', ');
    let query = ["insert into COMPTE (EMAIL, PASSWORD, NOM, PRENOM, SEXE, DATE_NAISSANCE, TYPE, VCODE) values (", values, ")"].join('');
    let checkEmail = 'select compteID from COMPTE where email= ?';
    let email_exists = await connection.query(checkEmail, [email]);
    if (email_exists[0][0]) {
        req.session.error = 'email exists';
        res.redirect('/registration');
    }

    else {
        transporter.sendMail({
            from: 'stoaSite@gmail.com',
            to: req.body.email,
            subject: 'validation code',
            text: mail
        });

        connection.query(query).then((results) => {

            req.session.loggedIn = false;

            req.session.userId = req.body.email;


            res.redirect('/validation');
        });

    }
});

module.exports = router;
