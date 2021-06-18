const express = require('express');
const router = express.Router();
const Modules = require('../models/ModuleRepository');

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

router.get('/resources', (req, res) => {
    res.render('module_resources');
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
    res.render('new_post', { layout: '', error: req.session.error, module: module });
    req.session.error = null;
});

router.get('/new_reply', (req, res) => {
    res.render('new_reply', { layout: '' });
});

router.get('/new_comment', (req, res) => {
    res.render('new_comment', { layout: '' });
});

router.get('/new_folder', (req, res) => {
    res.render('new_folder');
});

router.get('/edit_post', async (req, res) => {
    let module = (await Modules).get_module_by_id(Number(req.query.module_id))[0];
    let post = module.get_post_by_id(Number(req.query.post_id))[0];
    if (post.author_id !== Number(req.session.userId))
        return res.redirect('/error');

    res.render('edit_post', { layout: '', module: module, post: post });
});

router.get('/edit_reply', async (req, res) => {
    let module = (await Modules).get_module_by_id(Number(req.query.module_id))[0];
    let post = module.get_post_by_id(Number(req.query.post_id))[0];
    let reply = post.get_response_by_id(Number(req.query.reply_id))[0];
    if (reply.author_id !== Number(req.session.userId))
        return res.redirect('/error');

    res.render('edit_reply', { layout: '' });
});

router.get('/edit_comment', async (req, res) => {
    let module = (await Modules).get_module_by_id(Number(req.query.module_id))[0];
    let post = module.get_post_by_id(Number(req.query.post_id))[0];
    let reply = post.get_response_by_id(Number(req.query.reply_id))[0];
    let comment = reply.get_comment_by_id(Number(req.query.comment_id))[0];
    if (comment.author_id !== Number(req.session.userId))
        return res.redirect('/error');

    res.render('edit_comment', { layout: '' });
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

router.get('/:module', async (req, res) => {
    let params = req.params;
    let modules = await Modules;
    let module = modules.get_module_by_id(Number(params.module))[0];
    if (!module)
        return res.redirect('/error');
    res.render('module', { layout: '', module: module, user: req.session.userId });
});
module.exports = router;
