const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Post = require('../models/Post');
const Modules = require('../models/ModuleRepository');

router.post('/delete_reply', async (req, res) => {
    let module_id = Number(req.body.module);
    let post_id = Number(req.body.post);
    let reply_id = Number(req.body.reply);
    let module = (await Modules).get_module_by_id(module_id)[0];
    let post = module.get_post_by_id(post_id)[0];
    await post.delete_response(reply_id);
    res.send(true);

});

module.exports = router;
