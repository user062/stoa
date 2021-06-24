const express = require('express');
const router = express.Router();
const Users = require('../models/UserRepository');

router.get('/new_notifications', async (req, res) => {
    let user_id = Number(req.session.userId);
    let user = (await Users).get_user_by_id(user_id)[0];
    let notifications = await user.get_latest_notifications();
    res.send({ notifications: notifications });
});
