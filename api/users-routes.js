const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// route to GET ALL THE USERS
router.get('/dashboard', async (req, res) => {
    // user.findbypk yada yada
    try{
        const userData = await User.findAll();
        const users = userData.map((user) => user.get({ plain: true }));
        res.render('user-dashboard', { users});
    } catch(err) {
        res.status(500).json(err);
        // add error handling to view
    }
    // pass serialized user data to dashboard
    res.render('user-dashboard' /*,some object*/);
});

module.exports = router;