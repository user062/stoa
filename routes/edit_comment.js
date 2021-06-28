const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Post = require('../models/Post');
const Modules = require('../models/ModuleRepository');

router.post('/edit_comment', async (req, res) => {
    let module_post_id = req.header('referer').split('?')[1].split('&').map((param) => param.split('=')[1]);
    let module_id = Number(module_post_id[0]);
    let post_id = Number(module_post_id[1]);
    let reply_id = Number(module_post_id[2]);
    let comment_id = Number(module_post_id[3]);
    let comment_content = req.body.keyboard_cat;
    let module = (await Modules).get_module_by_id(module_id)[0];
    let post = module.get_post_by_id(post_id)[0];
    let reply = post.get_response_by_id(reply_id)[0];
    let comment = reply.get_comment_by_id(comment_id)[0];

    await comment.edit(comment_content);

    res.redirect('/modules/' + module_id + `/my_posts?post_id=${post_id}&reply_id=${reply_id}&comment_id=${comment.id}`);

});

module.exports = router;
