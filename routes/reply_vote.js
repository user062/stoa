const express = require('express');
const router = express.Router();
const Modules = require('../models/ModuleRepository');

router.post('/reply_vote', async (req, res) => {
    let module_id = Number(req.body.module_id);
    let post_id = req.body.post_id;
    let reply_id = req.body.reply_id;
    let choice = req.body.choice;
    let module = (await Modules).get_module_by_id(Number(module_id))[0];
    await module.get_post_by_id(Number(post_id))[0].get_response_by_id(Number(reply_id))[0].vote(Number(req.session.userId), Number(choice));
    res.send('/');
});
module.exports = router;
