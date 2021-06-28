const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Post = require('../models/Post');
const Modules = require('../models/ModuleRepository');

router.post('/edit_post', async (req, res) => {
    let module_post_id = req.header('referer').split('?')[1].split('&').map((param) => param.split('=')[1]);
    let module_id = Number(module_post_id[0]);
    let post_id = Number(module_post_id[1]);
    let post_title = req.body.title;
    let folders = req.body.folders;
    let post_content = req.body.keyboard_cat;
    let uploaded_files = req.files ? req.files.uploads : [];
    let old_files = req.body.old_files ? req.body.old_files : [];

    if (!folders) {
        req.session.error = "Please select at least one folder";
        return res.redirect('/edit_post?' + module_id + '&' + post_id);
    }

    let module = (await Modules).get_module_by_id(module_id)[0];

    folders = module.folders.filter((folder) => folders.includes(String(folder.id)));

    let post = module.get_post_by_id(post_id)[0];

    if (!Array.isArray(uploaded_files))
        uploaded_files = [uploaded_files];

    await post.edit(folders, post_title, post_content, uploaded_files, old_files);

    res.redirect('/modules/' + module_id + `/my_posts?post_id=${post_id}`);

});

module.exports = router;
