const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Post = require('../models/Post');
const Modules = require('../models/ModuleRepository');

router.post('/delete_post', async (req, res) => {
    let module_id = Number(req.body.module);
    let post_id = Number(req.body.post);
    let module = (await Modules).get_module_by_id(module_id)[0];
    await module.delete_post(post_id);
    res.send(true);

});

module.exports = router;
