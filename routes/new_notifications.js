const express = require('express');
const router = express.Router();
const Users = require('../models/UserRepository');

router.post('/new_notifications', async (req, res) => {
    let user_id = Number(req.session.userId);

    if (isNaN(user_id))
        return res.status(404).send(false);

    let user = (await Users).get_user_by_id(user_id)[0];
    let notifications = await user.get_latest_notifications();
    notifications = notifications.resources.concat(notifications.posts).concat(notifications.reply).concat(notifications.comment);
    if (notifications.length === 0)
        return res.status(404).send(false);
    res.send({ notifications: notifications });
});

module.exports = router;
