const router = express.Router();
const express = require('express');
const connection = require('../config/db');
const bcrypt = require('bcryptjs');
const tinymce = require('tinymce');

router.post('/new_post', (req, res) => {
    let poste_creator = req.session.userID;
    let post_type = req.body.post_type;
    let post_title = tinymce.get('post_title').getContent();
    let post_content = tinymce.get('post_body').getContent();
});
