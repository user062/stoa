const express = require('express');
const router = express.Router();
const Module = require('../models/Module');

router.post('/reply_vote', async (req, res) => {
    let post_id = req.body.post_id;
    let reply_id = req.body.reply_id;
    let choice = req.body.choice;
    let module = await Module;
    await module.get_post_by_id(Number(post_id))[0].get_response_by_id(Number(reply_id))[0].vote(Number(req.session.userId), Number(choice));
    res.redirect('/');
});
module.exports = router;
