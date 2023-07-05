const express = require('express');
const router = express.Router();
const { Chats } = require('../models');

// view all chats using session user_id (GET)
router.get('/', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login');
    }
    
    const { userID, username } = req.session;

    const chatData = await Chats.findAll({
        where: { user_id: userID }
    })

    let chats;
    // See if any chats are found, if only one, and for more than one
    if (chatData.length === 0) {
        return res.json("No chatData found for " + username);
    } else if (chatData.length > 1) {
        chats = chatData.map((chat) => chat.get({ plain: true }));
    } else {
        chats = chatData.get({ plain: true });
    }
    console.log(chats);
    res.status(200).json(chats);

    //check if they have chats, pull in the instances then render them
    // res.render(')
});


module.exports = router;