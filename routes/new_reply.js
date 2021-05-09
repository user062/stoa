const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Post = require('../models/Post');
const Response = require('../models/Response');
const Module = require('../models/Module');

router.post('/new_reply', (req, res) => {
    let reply_creator = req.session.userID;
    let reply_content = req.body.keyboard_cat;
    let added_reply = new Response(null, reply_creator, reply_content, null, null);
    Module.posts[0].add_response(added_reply);
    res.redirect('/');

});

module.exports = router;
