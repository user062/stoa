const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Post = require('../models/Post');
const Modules = require('../models/ModuleRepository');

router.post('/new_post', async (req, res) => {
    let module_id = Number(req.header('referer').split('?')[1]);
    let post_creator = req.session.userId;
    let post_type = req.body.type[0];
    let post_title = req.body.title;
    let folders = req.body.folders;
    let module = (await Modules).get_module_by_id(module_id)[0];

    if (!folders) {
        req.session.error = "Please select at least one folder";
        return res.redirect('/new_post?' + module_id);
    }

    folders = module.folders.filter((folder) => folders.includes(String(folder.id)));

    let post_content = req.body.keyboard_cat;
    let uploaded_files = req.files ? req.files.uploads : [];

    let added_post = await Post(null, new Date(), post_creator, post_title, post_type, post_content, folders, [], []);

    if (post_type === 'p') {
        let poll_elements = req.body.choices;
        added_post.poll_elements = poll_elements;
        if (!Array.isArray(poll_elements) || poll_elements.length < 2) {
            req.session.error = "Please add at least 2 choices to the poll";
            res.redirect('/new_post?' + module_id);
            return false;
        }
    }
    await module.add_post(added_post);
    await added_post.add_poll();

    if (Array.isArray(uploaded_files))
        for (const file of uploaded_files)
            await added_post.add_file(file);
    else
        await added_post.add_file(uploaded_files);

    res.redirect('/modules/' + module_id + '/all_posts');

});

module.exports = router;
