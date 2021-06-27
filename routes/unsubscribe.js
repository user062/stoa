const express = require('express');
const router = express.Router();
const Users = require('../models/UserRepository');

router.post('/unsubscribe', async (req, res) => {
    let module_id = Number(req.body.module);
    let user_id = Number(req.session.userId);
    let users = await Users;
    let user = users.get_user_by_id(user_id)[0];
    user.unsubscribe_to_module(module_id);
    res.send(true);

});

module.exports = router;
