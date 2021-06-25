const express = require('express');
const router = express.Router();
const connection = require('../config/db');
const Users = require('../models/UserRepository');

router.post('/subscribe', async (req, res) => {
    let module_id = Number(req.body.module_id);
    let user_id = Number(req.body.user_id);
    let users = await Users;
    let user = users.get_user_by_id(user_id)[0];
    user.subscribe_to_module(module_id);

    res.redirect('/');

});

module.exports = router;
