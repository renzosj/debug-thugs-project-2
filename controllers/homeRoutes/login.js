const express = require('express');
const router = express.Router();
const { Users } = require('../../models');
const bcrypt = require('bcrypt');

// Login route (GET)
router.get('/', (req, res) => {
    res.render('login');
});

// Login route (POST)
router.post('/', async (req, res) => { 
    // Check username and password
    let { username, password } = req.body;

    //trim
    username = username.trim();
    password = password.trim();

    // Find User 
    const userData = await Users.findOne({
        where: {
            user_name: username
        }
    });

    if (!userData) {
        console.log('No user found: ' + userData + 'Please login again');
        res.redirect('/login');
        return;
    }

    // use `bcrypt.compare()` to compare the provided password and the hashed password
    const validPassword = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      // if they do not match, return error message
      if (!validPassword) {
        res.status(400).json({ message: 'Login failed. Please try again!' });
        return;
      }

    // Serialize user data  
    const user = userData.get({ plain: true });

    // destructure user_id and stored in session as user_id, to be used in other endpoints
    const { user_id } = user;

    // Perform authentication logic here, e.g., check if the user exists in the database
    if (user) {
        // Set session and cookie
        req.session.loggedIn = true;
        req.session.username = username;
        req.session.userID = user_id;

        //console.log(`\n${req.session.loggedIn}, ${req.session.username}, ${req.session.userID}\n`);

        res.redirect(`/user/dashboard`)
    } else {
        // Invalid credentials
        res.render('login', { error: 'Invalid username or password' });
    }
});

module.exports = router;
