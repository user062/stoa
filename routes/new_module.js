const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Modules = require('../models/ModuleRepository');
const Users = require('../models/UserRepository');
const Module = require('../models/Module');

router.post('/new_module', async (req, res) => {
    let module = await Module(null, req.body.name, [], req.body.profs);
    await (await Modules).add_module(module);
    let users = await Users;
    let user;

    for (const prof_id of req.body.profs) {
        user = users.get_user_by_id(prof_id)[0];
        user.modules_taught.push(module.id);
        user.subscribe_to_module(module.id);
        module.add_prof(prof_id);
    }

    res.redirect('/');

});

module.exports = router;
