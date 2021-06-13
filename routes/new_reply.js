const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Post = require('../models/Post');
const Response = require('../models/Response');
const Modules = require('../models/ModuleRepository');

router.post('/new_reply', async (req, res) => {
    let module_post_id = req.header('referer').split('?')[1].split('&');
    let module_id = Number(module_post_id[0]);
    let post_replied_to = Number(module_post_id[1]);
    let reply_creator = req.session.userId;
    let reply_content = req.body.keyboard_cat;
    let uploaded_files = req.files ? req.files.uploads : [];
    let added_reply = await Response(null, post_replied_to, new Date(), reply_creator, reply_content, [], []);
    let module = (await Modules).get_module_by_id(module_id)[0];
    let post = module.get_post_by_id(post_replied_to)[0];
    await post.add_response(added_reply);

    if (Array.isArray(uploaded_files))
        for (const file of uploaded_files)
            await added_reply.add_file(file);
    else
        await added_reply.add_file(uploaded_files);
    res.redirect('/');

});

module.exports = router;
