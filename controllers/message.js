const express = require('express');
const router = express.Router();
const { Messages } = require('../models');

// Message route (GET)
router.get('/', (req, res) => {
    res.render('message');
});

// Send a Message route (POST)
router.post('/', async (req, res) => {

    const { message_text, chat_id, delay_send } = req.body;
    console.log(message_text + ' ' + chat_id + ' ' + delay_send);
    try {
        const newMessageData = await Messages.create({
            message_text: message_text,
            chat_id: chat_id,
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