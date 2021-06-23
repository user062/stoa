const express = require('express');
const router = express.Router();
const Modules = require('../models/ModuleRepository');
const Users = require('../models/UserRepository');

// @desc index/Landing page
// @route GET /
router.get('/', async (req, res) => {
    if (!req.session.loggedIn)
        res.redirect('/login');

    else {
        let modules = await Modules;
        res.render('index', { layout: '', user: req.session.userId, modules: modules.all_posts });
    }
});


// @desc login page
// @route GET /login
router.get('/login', (req, res) => {
    if (req.session.error) {
        res.render('login', { error: req.session.error, layout: 'login' });
        req.session.error = null;
    }

    else if (req.session.loggedIn)
        res.redirect('/');

    else
        res.render('login', { layout: 'login' });
});

router.get('/logout', (req, res) => {
    req.session.loggedIn = null;
    req.session.userId = null;
    res.redirect('/login');
});

// @desc registration/ page
// @route GET registration/
router.get('/registration', (req, res) => {
    if (req.session.error) {
        res.render('registration', { error: req.session.error, layout: 'registration' });
        req.session.error = null;
    }

    else if (req.session.loggedIn)
        res.redirect('/');
    else
        res.render('registration', { layout: 'registration' });
});

router.get('/modules/:module/resources', async (req, res) => {
    let params = req.params;
    let modules = await Modules;
    let users = await Users;
    let module = modules.get_module_by_id(Number(params.module))[0];
    let user = users.get_user_by_id(Number(req.session.userId))[0];
    if (!module)
        return res.redirect('/error');
    res.render('module_resources', { layout: '', files: module.documents, moduleId: module.id, folders: module.folders, user: user.id, is_teacher: user.modules_taught.includes(Number(params.module)) });
});


router.get('/validation', (req, res) => {
    if (req.session.error) {
        res.render('validation', { error: req.session.error, layout: '' });
        req.session.error = null;
    }
    else
        res.render('validation', { layout: '' });
});

router.get('/new_post', async (req, res) => {
    let module_id = Number(Object.keys(req.query));
    let module = (await Modules).get_module_by_id(module_id)[0];
    res.render('new_post', { layout: '', error: req.session.error, folders: module.folders, moduleId: module.id });
    req.session.error = null;
});

router.get('/new_reply', async (req, res) => {
    let module_id = Number(Object.keys(req.query)[0]);
    let module = (await Modules).get_module_by_id(module_id)[0];
    res.render('new_reply', { layout: '', folders: module.folders, moduleId: module.id });
});

router.get('/new_comment', async (req, res) => {
    let module_id = Number(Object.keys(req.query)[0]);
    let module = (await Modules).get_module_by_id(module_id)[0];
    res.render('new_comment', { layout: '', folders: module.folders, moduleId: module.id });
});

router.get('/new_folder', async (req, res) => {
    let module_id = Number(Object.keys(req.query)[0]);
    let module = (await Modules).get_module_by_id(module_id)[0];
    res.render('new_folder', { error: req.session.error, folders: module.folders, moduleId: module.id });
    req.session.error = null;
});

router.get('/edit_post', async (req, res) => {
    let module = (await Modules).get_module_by_id(Number(req.query.module_id))[0];
    let post = module.get_post_by_id(Number(req.query.post_id))[0];
    if (post.author_id !== Number(req.session.userId))
        return res.redirect('/error');

    res.render('edit_post', { layout: '', folders: module.folders, moduleId: module.id, post: post });
});

router.get('/edit_reply', async (req, res) => {
    let module = (await Modules).get_module_by_id(Number(req.query.module_id))[0];
    let post = module.get_post_by_id(Number(req.query.post_id))[0];
    let reply = post.get_response_by_id(Number(req.query.reply_id))[0];
    if (reply.author_id !== Number(req.session.userId))
        return res.redirect('/error');

    res.render('edit_reply', { layout: '', folders: module.folders, moduleId: module.id });
});

router.get('/edit_comment', async (req, res) => {
    let module = (await Modules).get_module_by_id(Number(req.query.module_id))[0];
    let post = module.get_post_by_id(Number(req.query.post_id))[0];
    let reply = post.get_response_by_id(Number(req.query.reply_id))[0];
    let comment = reply.get_comment_by_id(Number(req.query.comment_id))[0];
    if (comment.author_id !== Number(req.session.userId))
        return res.redirect('/error');

    res.render('edit_comment', { layout: '', moduleId: module.id, folders: module.folders });
});

router.get('/post_content', async (req, res) => {
    let module = (await Modules).get_module_by_id(Number(req.query.module_id))[0];
    let post = module.get_post_by_id(Number(req.query.post_id))[0];

    res.send({ text: post.content, files: post.files });
});

router.get('/reply_content', async (req, res) => {
    let module = (await Modules).get_module_by_id(Number(req.query.module_id))[0];
    let post = module.get_post_by_id(Number(req.query.post_id))[0];
    let reply = post.get_response_by_id(Number(req.query.reply_id))[0];

    res.send({ text: reply.content, files: reply.files });
});

router.get('/comment_content', async (req, res) => {
    let module = (await Modules).get_module_by_id(Number(req.query.module_id))[0];
    let post = module.get_post_by_id(Number(req.query.post_id))[0];
    let reply = post.get_response_by_id(Number(req.query.reply_id))[0];
    let comment = reply.get_comment_by_id(Number(req.query.comment_id))[0];

    res.send({ text: comment.content });
});

router.get('/error', (req, res) => {
    res.render('not_found');
});

router.get('/account', (req, res) => {
    res.render('account');
});

router.get('/edit_description', async (req, res) => {
    let module_id = Number(req.query.module_id);
    let module = (await Modules).get_module_by_id(module_id)[0];
    res.render('edit_description', { layout: '', folders: module.folders, moduleId: module.id });
});

router.get('/description_content', async (req, res) => {
    let module = (await Modules).get_module_by_id(Number(req.query.module_id))[0];
    res.send({ text: module.description });
});

router.get('/profile/:user', async (req, res) => {
    let modules = (await Modules).all_modules_informations;
    let users = await Users;
    let user = users.get_user_by_id(Number(req.params.user))[0];

    if (!user)
        return res.redirect('/error');

    res.render('profile', { layout: '', user: user, modules: modules });
});

router.get('/modules/:module/search', async (req, res) => {
    let params = req.params;
    let modules = await Modules;
    let users = await Users;
    let module = modules.get_module_by_id(Number(params.module))[0];
    let user = users.get_user_by_id(Number(req.session.userId))[0];
    if (!module)
        return res.redirect('/error');

    let query = req.query.query;
    let result = [];
    if (query) {
        let folders = req.query.folders.split(',');
        if (!folders[0]) {
            result = module.posts.filter((post) => post.title.search(query) !== -1);
        }
        else
            for (const folder of folders)
                result = result.concat(module.get_posts_by_folder(Number(folder)).filter((post) => post.title.search(query) !== -1));
    }
    res.render('search', { layout: '', result: result, moduleId: module.id, moduleName: module.name, folders: module.folders, user: user.id, is_teacher: user.modules_taught.includes(Number(params.module)) });
});

router.get('/modules/:module/all_posts', async (req, res) => {
    let params = req.params;
    let modules = await Modules;
    let users = await Users;
    let module = modules.get_module_by_id(Number(params.module))[0];
    let user = users.get_user_by_id(Number(req.session.userId))[0];
    if (!module)
        return res.redirect('/error');
    res.render('module_folder', { layout: '', folderPosts: module.posts, moduleName: module.name, moduleId: module.id, folders: module.folders, user: user.id, is_teacher: user.modules_taught.includes(Number(params.module)) });
});
router.get('/modules/:module', async (req, res) => {
    let params = req.params;
    let modules = await Modules;
    let users = await Users;
    let module = modules.get_module_by_id(Number(params.module))[0];
    let user = users.get_user_by_id(Number(req.session.userId))[0];
    if (!module)
        return res.redirect('/error');
    res.render('module', { layout: '', moduleName: module.name, moduleId: module.id, folders: module.folders, moduleDescription: module.description, user: user.id, is_teacher: user.modules_taught.includes(Number(params.module)) });
});

router.get('/modules/:module/folders/:folder', async (req, res) => {
    let params = req.params;
    let modules = await Modules;
    let users = await Users;
    let folder_id = Number(req.params.folder);
    let module = modules.get_module_by_id(Number(params.module))[0];
    let folder_name = module.folders.filter(folder => folder.id === folder_id)[0].name;
    let user = users.get_user_by_id(Number(req.session.userId))[0];
    if (!module)
        return res.redirect('/error');
    res.render('module_folder', { layout: '', folderPosts: module.get_posts_by_folder(folder_id), folderName: folder_name, moduleName: module.name, moduleId: module.id, folders: module.folders, user: user.id, is_teacher: user.modules_taught.includes(Number(params.module)) });
});

router.get('/admin', (req, res) => {    
    res.render('admin', { layout: '' });
});

router.get('/new_module', (req, res) => {    
    res.render('new_module', { layout: '' });
});


module.exports = router;
