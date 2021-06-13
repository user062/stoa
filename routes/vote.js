const express = require('express');
const router = express.Router();
const Modules = require('../models/ModuleRepository');

router.post('/vote', async (req, res) => {
    let module_id = Number(req.body.module_id);
    let poll_id = req.body.post_id;
    let choice = req.body.choice;
    console.log(module_id);
    let module = (await Modules).get_module_by_id(module_id)[0];
    await module.get_post_by_id(Number(poll_id))[0].poll.vote(Number(choice), Number(req.session.userId));
    res.redirect('/');
});
module.exports = router;
