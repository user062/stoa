const express = require('express');
const router = express.Router();

router.get('/module', (req, res) => {
    res.render('module');
});

module.exports = router;