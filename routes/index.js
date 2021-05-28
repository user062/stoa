const express = require('express');
const router = express.Router();
const Module = require('../models/Module');

// @desc index/Landing page
// @route GET /
router.get('/', (req, res) => {
    if (!req.session.loggedIn)
        res.redirect('/login');

    else {
        res.render('index', { layout: '', user: req.session.userId, posts: Module.posts });
    }
});


// @desc login page
// @route GET /login
router.get('/login', (req, res) => {
    if (req.session.error) {
        res.render('login', { error: req.session.error, layout: 'login' });
        req.session.error = null;
    }

    else if (req.session.loggedIn)
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

    else if (req.session.loggedIn)
        res.redirect('/');
    else
        res.render('registration', { layout: 'registration' });
});

router.get('/module', (req, res) => {
    res.render('module');
});

router.get('/validation', (req, res) => {
    if (req.session.error) {
        res.render('validation', { error: req.session.error, layout: '' });
        req.session.error = null;
    }
    else
        res.render('validation', { layout: '' });
});

router.get('/new_post', (req, res) => {
    res.render('new_post', { layout: '', error: req.session.error });
    req.session.error = null;
});

router.get('/new_reply', (req, res) => {
    res.render('new_reply', { layout: '' });
});

router.get('/new_comment', (req, res) => {
    res.render('new_comment', { layout: '' });
});

router.get('/new_folder', (req, res) => {
    res.render('new_folder');
});

module.exports = router;
