const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Module = require('../models/Module');

router.post('/new_comment', async (req, res) => {
    let post_reply_id = req.header('referer').split('?');
    let post_id = post_reply_id[1];
    let response_id = post_reply_id[2];
    let creator = req.session.userId;
    let content = req.body.keyboard_cat;
    let comment = new Comment(null, new Date(), creator, content, [], []);
    let post = Module.get_post_by_id(parseInt(post_id))[0];
    let reply = post.get_response_by_id(parseInt(response_id))[0];
    await reply.add_comment(comment);
    res.redirect('/');

});

module.exports = router;
