const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Post = require('../models/Post');
const Module = require('../models/Module');

router.post('/new_post', async (req, res) => {
    let post_creator = req.session.userId;
    let post_type = req.body.type;
    let post_title = req.body.title;
    let folders = req.body.folders;
    let post_content = req.body.keyboard_cat;
    let uploaded_files = req.files ? req.files.uploads : [];
    let added_post = new Post(null, new Date(), post_creator, post_title, post_type, post_content, folders, [], []);
    await Module.add_post(added_post);
    if (Array.isArray(uploaded_files))
        for (const file of uploaded_files)
            await added_post.add_file(file);
    else
        await added_post.add_file(uploaded_files);
    console.log(added_post.files);
    res.redirect('/');

});

module.exports = router;
