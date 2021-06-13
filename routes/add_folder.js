const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Modules = require('../models/ModuleRepository');

router.post('/add_folder', async (req, res) => {
    let module_id = Number(req.header('referer').split('?')[1]);
    let folder_name = req.body.name;
    let folder_creator = Number(req.session.userId);
    let module = (await Modules).get_module_by_id(module_id)[0];
    console.log(folder_name, folder_creator);
    await module.add_folder(folder_name, folder_creator);
    res.redirect('/' + module_id);

});

module.exports = router;
