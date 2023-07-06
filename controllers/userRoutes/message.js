const express = require('express');
const router = express.Router();
const { Messages } = require('../../models');
const withAuth = require('../../utils/auth');

// Message route (GET)
router.get('/', withAuth, async (req, res) => {
    res.render('message');
});

// Send a Message route (POST)
router.post('/', withAuth, async (req, res) => {

    const { message_text, chat_id, box_check } = req.body;
    let delay_send;
    if (!box_check) {
        delay_send = false;
    } else {
        delay_send = true;
    }
    const { userID, username } = req.session;
    console.log(`\n${userID}: ${username} sends the message: '${message_text}' at chat with ID: ${chat_id} with delay send? ${delay_send}\n`);
    try {
        const newMessageData = await Messages.create({
            message_text: message_text,
            chat_id: chat_id,
            user_id: userID,
            delay_send: delay_send
        })
        const newMessage = newMessageData.get({ plain: true});
        //console.log("Your new msg king!: " + newMessage);
        res.json(newMessage);
        // render sent message page here
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;