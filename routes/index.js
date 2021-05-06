const express = require('express');
const router = express.Router();

// @desc index/Landing page
// @route GET /
router.get('/', (req, res) => {
    /*
    if (!req.session.userId)
        res.redirect('/login');

    else
    */
    class Post {
        constructor(id, author, title, content, responses) {
            this.id = id;
            this.author = author;
            this.title = title;
            this.content = content;
            this.responses = responses;
        }
    }

    class Response {
        constructor(author, content) {
            this.author = author;
            this.content = content;
        }
    }
    let resps = [
        [new Response('john blow hmidat', "this is response 1 from blow"),
        new Response('john blow kader', "this is response 2 from blow"),
        new Response('john blow dja3fer', "this is response 3 from blow")],

        [new Response('casey muratori', "this is a response from casey"),
        new Response('senior dev', "this is a response from a dev"),
        new Response('prof', "this is a response from prof")],

        [new Response('alan turin', "this is a response from turing"),
        new Response('boyce', "this is a response from a boyce"),
        new Response('codd', "this is a response from codd")]
    ];

    let posts = [
        new Post('1', 'djamel moubahli9', "question about unity", "this is Q1", resps[0]),
        new Post('2', 'idriss moubahli9', "question about openBSD", "this is Q2", resps[1]),
        new Post('3', 'abdou japan expret', "question about compiler", "this is Q3", resps[2])
    ];

    res.render('index', { layout: '', posts: posts });
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

router.get('/validation', (req, res) => {
    res.render('validation', { layout: '' });
});

router.get('/new_post', (req, res) => {
    res.render('new_post', { layout: '' });
});

router.get('/new_post2', (req, res) => {
    res.render('new_post2', { layout: '' });
});

module.exports = router;
