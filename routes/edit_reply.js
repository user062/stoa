const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Post = require('../models/Post');
const Modules = require('../models/ModuleRepository');

router.post('/edit_reply', async (req, res) => {
    let module_post_id = req.header('referer').split('?')[1].split('&').map((param) => param.split('=')[1]);
    let module_id = Number(module_post_id[0]);
    let post_id = Number(module_post_id[1]);
    let reply_id = Number(module_post_id[2]);
    let reply_content = req.body.keyboard_cat;
    let uploaded_files = req.files ? req.files.uploads : [];
    let module = (await Modules).get_module_by_id(module_id)[0];
    let post = module.get_post_by_id(post_id)[0];
    let reply = post.get_response_by_id(reply_id)[0];
    let old_files = req.body.old_files ? req.body.old_files : [];
    if (!Array.isArray(uploaded_files))
        uploaded_files = [uploaded_files];

    await reply.edit(reply_content, uploaded_files, old_files);

    res.redirect('/modules/' + module_id + '/all_posts');

});

module.exports = router;
