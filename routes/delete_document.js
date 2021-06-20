const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Modules = require('../models/ModuleRepository');

router.post('/delete_document', async (req, res) => {
    let module_id = Number(req.body.module);
    let module = (await Modules).get_module_by_id(module_id)[0];
    await module.delete_document(Number(req.body.file));
    res.send(true);

});

module.exports = router;
