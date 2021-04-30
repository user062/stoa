const express = require('express');
const router = express.Router();

// @desc index/Landing page
// @route GET /
router.get('/', (req, res) => {
    if (!req.session.userId)
        res.redirect('/login');

    else
        res.render('index');
});


// @desc login page
// @route GET /login
router.get('/login', (req, res) => {
    if (req.session.error) {
        res.render('login', { error: req.session.error, layout: 'login' });
        req.session.error = null;
    }

    else if (req.session.userId)
        res.redirect('/');

    else
        res.render('login', { layout: 'login' });
});

// @desc registration/ page
// @route GET registration/
router.get('/registration', (req, res) => {
    if (req.session.error) {
        res.render('registration', { error: req.session.error, layout: 'registration' });
        req.session.error = null;
    }

    else if (req.session.userId)
        res.redirect('/');
    else
        res.render('registration', { layout: 'registration' });
});

router.get('/module', (req, res) => {
    res.render('module');
});

module.exports = router;
