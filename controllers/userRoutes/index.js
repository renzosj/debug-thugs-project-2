const express = require('express');
const router = express.Router();
const withAuth = require('../../utils/auth');
const { Users } = require('../../models');


// User Dashboard (GET)
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const user_id = req.session.userID;
        const userData = await Users.findByPk(user_id);
        const user = userData.get({ plain: true });

        //console.log('\n' + user + chats)
        res.render('user-dashboard', { user/*, chats*/ });
    } catch (err) {
        res.status(500).json(err);
        // add error handling to view
    }
});

// User chats (GET)
router.get('/chats', withAuth, (req, res) => {
    res.render('chats');
});

// User profile route (GET)
router.get('/profile', withAuth, (req, res) => {
    res.render('user-profile');
});

router.use('/message', require('./message')); 

module.exports = router;