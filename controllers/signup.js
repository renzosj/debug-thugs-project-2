const express = require('express');
const router = express.Router();
const { Users } = require('../models');

// Sign up route (GET)
router.get('/', (req, res) => {
    res.render('signup');
});

// Sign up route (POST)
router.post('/', async (req, res) => {
    const { box_check } = req.body;
    //console.log(req.body);
    if (!box_check) {
        res.redirect('/signup');
        // add alert or something saying that they have to agree to ToS
    }
    try {
        const newUser = await Users.create({ ...req.body })

        const { user_id, user_name } = newUser;

        // Set session and cookie
        req.session.loggedIn = true;
        req.session.username = user_name;
        
        res.redirect(`/user/dashboard/${user_id}`);
    } catch (err) { 
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;