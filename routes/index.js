const express = require('express');
const router = express.Router();

// @desc index/Landing page
// @route GET /
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/registration', (req, res) => {
    res.render('registration', {layout: 'registration'});
});

router.get('/login', (req, res) => {
    res.render('login', {layout: 'login'});
});
module.exports = router;
