const express = require('express');
const router = express.Router();

// @desc login/Landing page
// @route GET /login
router.get('/registration', (req, res) => {
    res.render('registration', {layout: 'registration'});
});

module.exports = router;
