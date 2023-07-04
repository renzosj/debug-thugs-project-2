const express = require('express');
const router = express.Router();
const { Users, Chats } = require('../models');

// route to display dashboard with logged-in user info
router.get('/dashboard/:id', async (req, res) => {
    try {
        const user_id = req.params.id;
        const userData = await Users.findByPk(user_id);
        const user = userData.get({ plain: true });

       /* const chatData = await Chats.findAll({
            where: {
                user_id: user_id
            },
            //include: [{model: Users}]
        });*/

      /*  let chats;
        if (chatData) {
            if (chatData.length > 1) {
                chats = chatData.map((chat) => chat.get({ plain: true }));
            } else {
                chats = chatData.get({ plain: true });
            }
            console.log(chats);
        } else {
            console.log("No chats with user_id: " + user_id + " found");
        }*/
        
        //console.log('\n' + user + chats)
        res.render('user-dashboard', { user/*, chats*/ });
    } catch (err) {
        res.status(500).json(err);
        // add error handling to view
    }
});


router.get('/message', async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;