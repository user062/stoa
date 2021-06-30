const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Modules = require('../models/ModuleRepository');

router.post('/add_document', async (req, res) => {
    let module_id = Number(req.body.module);
    let module = (await Modules).get_module_by_id(module_id)[0];
    let file = req.files.file;
    let types = { '0': 'course', '1': 'td', '2': 'hw' };

    let fi = await module.add_document(file, types[req.body.type]);
    res.send({ file: { path: fi.file_location, name: fi.name, id: fi.id } });

});

module.exports = router;
