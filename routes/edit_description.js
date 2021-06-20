const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Post = require('../models/Post');
const Modules = require('../models/ModuleRepository');

router.post('/edit_description', async (req, res) => {
    let module_id = Number(req.header('referer').split('?')[1].split('=')[1]);
    let description_content = req.body.keyboard_cat;
    let module = (await Modules).get_module_by_id(module_id)[0];

    await module.edit_description(description_content);

    res.redirect('/modules/' + module_id);

});

module.exports = router;
