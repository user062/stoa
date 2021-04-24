const express = require('express');
const router = express.Router();

// @desc index/Landing page
// @route GET /
router.get('/', (req, res) => {
    res.render('index');
});

// @desc login/Landing page
// @route GET /login
router.get('/login', (req, res) => {
    if (req.session.user)
        res.redirect('/');
    else
        res.render('login', { layout: 'login' });
});

// @desc registration/Landing page
// @route GET /login
router.get('/registration', (req, res) => {
    if (req.session.user)
        res.redirect('/');
    else
        res.render('registration', { layout: 'registration' });
});

module.exports = router;
