const express = require('express');
const router = express.Router();
const Modules = require('../models/ModuleRepository');

router.post('/reply_vote', async (req, res) => {
    let module_id = Number(req.body.module_id);
    let post_id = Number(req.body.post_id);
    let reply_id = Number(req.body.reply_id);
    let choice = Number(req.body.choice);
    let module = (await Modules).get_module_by_id(module_id)[0];
    let post = module.get_post_by_id(post_id)[0];
    let reply = post.get_response_by_id(reply_id)[0];
    await reply.vote(Number(req.session.userId), choice);
    res.redirect('/');
});
module.exports = router;
