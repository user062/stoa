const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Modules = require('../models/ModuleRepository');

router.post('/new_comment', async (req, res) => {
    let module_post_reply_id = req.header('referer').split('?')[1].split('&');
    let module_id = Number(module_post_reply_id[0]);
    let post_id = Number(module_post_reply_id[1]);
    let response_id = Number(module_post_reply_id[2]);
    let creator = req.session.userId;
    let content = req.body.keyboard_cat;
    let comment = await Comment(null, new Date(), creator, content, null);
    let module = (await Modules).get_module_by_id(module_id)[0];
    let post = module.get_post_by_id(post_id)[0];
    let reply = post.get_response_by_id(response_id)[0];
    await reply.add_comment(comment);
    res.redirect('/modules/' + module_id);

});

module.exports = router;
