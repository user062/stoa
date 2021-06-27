const express = require('express');
const router = express.Router();
const Modules = require('../models/ModuleRepository');
const Module = require('../models/Module');

router.post('/new_module', async (req, res) => {
    let profs = req.body.profs ? req.body.profs : [];

    let module = await Module(null, req.body.name, [], Array.isArray(profs) ? profs.map(prof => Number(prof)) : [Number(profs)]);
    await (await Modules).add_module(module);
    res.redirect('/');
});

module.exports = router;
