const express = require('express');
const router = express.Router();
const Module = require('../models/Module');

router.post('/vote', async (req, res) => {
    let poll_id = req.body.post_id;
    let choice = req.body.choice;
    let module = await Module;
    await module.get_post_by_id(Number(poll_id))[0].poll.vote(Number(choice), Number(req.session.userId));
    res.redirect('/');
});
module.exports = router;
