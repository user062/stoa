const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Post = require('../models/Post');
const Response = require('../models/Response');
const Module = require('../models/Module');

router.post('/new_reply', async (req, res) => {
    let post_replied_to = req.header('referer').split('?')[1];
    let reply_creator = req.session.userId;
    let reply_content = req.body.keyboard_cat;
    let uploaded_files = req.files ? req.files.uploads : [];
    let added_reply = new Response(null, new Date(), reply_creator, reply_content, [], []);
    await Module.get_post_by_id(parseInt(post_replied_to))[0].add_response(added_reply);

    if (Array.isArray(uploaded_files))
        for (const file of uploaded_files)
            await added_reply.add_file(file);
    else
        await added_reply.add_file(uploaded_files);
    res.redirect('/');

});

module.exports = router;
