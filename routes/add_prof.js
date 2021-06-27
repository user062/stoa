const express = require('express');
const router = express.Router();
const Modules = require('../models/ModuleRepository');
const Users = require('../models/UserRepository');

router.post('/add_prof', async (req, res) => {
    let prof_id = Number(req.body.prof);
    let module_id = Number(req.body.module);
    let module = (await Modules).get_module_by_id(module_id)[0];
    module.add_prof(prof_id);
    let user = (await Users).get_user_by_id(prof_id)[0];
    user.modules_taught.push(module_id);
    res.send({ name: user.name, family_name: user.family_name, email: user.email });

});

module.exports = router;
