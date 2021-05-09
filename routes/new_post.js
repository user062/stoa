const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Post = require('../models/Post');
const Module = require('../models/Module');

router.post('/new_post', (req, res) => {
    let post_creator = req.session.userID;
    let post_type = req.body.type;
    let post_title = req.body.title;
    let folders = req.body.folders;
    let post_content = req.body.keyboard_cat;
    let added_post = new Post(null, post_creator, post_title, post_type, post_content, folders, []);
    Module.add_post(added_post);
    res.redirect('/');

});

module.exports = router;
