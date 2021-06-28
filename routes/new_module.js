const express = require('express');
const router = express.Router();
const Users = require('../models/UserRepository');
const Modules = require('../models/ModuleRepository');
const Module = require('../models/Module');

router.post('/new_module', async (req, res) => {
    let profs = req.body.profs ? req.body.profs : [];

    let users = await Users;
    let module = await Module(null, req.body.name, [], Array.isArray(profs) ? profs.map(prof => Number(prof)) : [Number(profs)]);
    await (await Modules).add_module(module);

    let user;

    for (const prof_id of profs) {
        user = users.get_user_by_id(Number(prof_id))[0];
        user.modules_taught.push(module.id);
        user.subscribe_to_module(module.id);
        module.add_prof(Number(prof_id));
    }
    res.redirect('/');
});

module.exports = router;
