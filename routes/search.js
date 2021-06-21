const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Modules = require('../models/ModuleRepository');
const Users = require('../models/UserRepository');

router.post('/search', async (req, res) => {
    let module_id = Number(req.body.module);
    let module = (await Modules).get_module_by_id(module_id)[0];
    let query = req.body.query;
    let folders = req.body.folders;
    let user = (await Users).get_user_by_id(Number(req.session.userId))[0];
    let result = [];

    if (!folders)
        result = module.posts.filter((post) => post.title.search(query));

    else
        for (const folder of folders)
            result = result.concat(module.get_posts_by_folder(Number(folder)).filter((post) => post.title.search(query)));

    res.render('search', { layout: '', moduleName: module.name, moduleId: module.id, folders: module.folders, user: user.id, is_teacher: user.modules_taught.includes(Number(module_id)) });

});
