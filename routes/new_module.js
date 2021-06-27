const express = require('express');
const router = express.Router();
const Modules = require('../models/ModuleRepository');
const Module = require('../models/Module');

router.post('/new_module', async (req, res) => {
    let module = await Module(null, req.body.name, req.body.profs.map(prof => Number(prof)));
    await (await Modules).add_module(module);
    res.redirect('/');
});

module.exports = router;
