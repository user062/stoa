const express = require('express');
const router = express.Router();
const Users = require('../models/UserRepository');
const Modules = require('../models/ModuleRepository');
const Module = require('../models/Module');

router.post('/new_module', async (req, res) => {
    let profs = req.body.profs ? req.body.profs : [];

    let users = await Users;
    let module = await Module(null, req.body.name, [], Array.isArray(profs) ? profs.map(prof => Number(prof)) : [Number(profs)]);
    let user;

    for (const prof_id of req.body.profs) {
        user = users.get_user_by_id(prof_id)[0];
        user.modules_taught.push(module.id);
        user.subscribe_to_module(module.id);
        module.add_prof(prof_id);
    }
    await (await Modules).add_module(module);
    res.redirect('/');
});

module.exports = router;
