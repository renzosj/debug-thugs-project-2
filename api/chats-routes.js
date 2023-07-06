const express = require('express');
const router = express.Router();
const Chats = require('../models/Chats');

// route to (GET) ALL THE Chats
router.get('/', async (req, res) => {
    try {
        const chatData = await Chats.findAll();
        res.status(200).json(chatData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// (GET) Chat by id
router.get('/:id', async (req, res) => {
    try {
        const chatData = await Chats.findByPk(req.params.id);
        res.status(200).json(chatData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// (DELETE) Chat by id
router.delete('/:id', async (req, res) => {
    try {
        const chatData = await Chats.findByPk(req.params.id);
        await Chats.destroy({
            where: {
                chat_id: req.params.id
            }
        });
        res.status(200).json("Deleted Chat: ", + chatData);
    } catch (err) {
        res.status(500).json("Chat not found " + err);
    }
});


// Create Chat (POST)
router.post('/', (req, res) => {
    try {
        const chatData = Chats.create({
            chat_name: req.body.chat_name,
            user_id: req.body.user_id
        })
        res.status(200).json("Chat created: " + chatData);
    } catch(err) {
        res.status(500).json("Something went wrong: " + err);
    }

})

// (UPDATE) Chat by id
router.put('/:id', async (req, res) => {
    try {
        const chatData = await Chats.update(
            {
                chat_name: req.body.chat_name,
                user_id: req.body.user_id
            },
            {
                where: {
                    Chat_id: req.params.id
                }
            }
        );
        res.status(200).json("Updated Chat: ", + chatData);

    } catch (err) {
        res.status(500).json("Chat not found " + err);
    }
})
module.exports = router;