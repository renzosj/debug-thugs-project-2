const express = require('express');
const router = express.Router();
const Messages = require('../models/Messages');

// route to (GET) ALL THE Messages
router.get('/', async (req, res) => {
    try {
        const msgData = await Messages.findAll();
        res.status(200).json(msgData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// (GET) Message by id
router.get('/:id', async (req, res) => {
    try {
        const msgData = await Messages.findByPk(req.params.id);
        res.status(200).json(msgData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// (DELETE) Message by id
router.delete('/:id', async (req, res) => {
    try {
        const msgData = await Messages.findByPk(req.params.id);
        await Messages.destroy({
            where: {
                Message_id: req.params.id
            }
        });
        res.status(200).json("Deleted Message: ", + msgData);
    } catch (err) {
        res.status(500).json("Message not found " + err);
    }
});


// Create Message (POST)
router.post('/', (req, res) => {
    try {
        const msgData = Messages.create({
            chat_id: req.body.chat_id,
            user_id: req.body.user_id,
            message_text: req.body.message_text,
            delay_send: req.body.delay_send,
        })
        res.status(200).json("Message created: " + msgData);
    } catch (err) {
        res.status(500).json("Something went wrong: " + err);
    }

})

// (UPDATE) Message by id
router.put('/:id', async (req, res) => {
    try {
        const msgData = await Messages.update(
            {
                chat_id: req.body.chat_id,
                user_id: req.body.user_id,
                message_text: req.body.message_text,
                delay_send: req.body.delay_send,
            },
            {
                where: {
                    Message_id: req.params.id
                }
            }
        );
        res.status(200).json("Updated Message: ", + msgData);

    } catch (err) {
        res.status(500).json("Message not found " + err);
    }
})
module.exports = router;