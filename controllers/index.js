// Christina adding routes and sessions to page

const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

// About route (GET)
router.get('/about', (req, res) => {
  res.render('about');
});

// Login route (GET)
router.get('/login', (req, res) => {
  res.render('login');
});

// Login route (POST)
router.post('/login', async (req, res) => {
  // Check username and password
  const { username, password } = req.body;

  // renzo's code to connect login to database
  // Find User 
  const userData = await Users.findOne({
    where: {
      user_name: username,
      password: password
    }
  });

  //console.log(userData);
  const user = userData.get({ plain: true});
/*
  // Sample user logins for testing
  const sampleUsers = [
    { username: 'xtina', password: '12345' },
    { username: 'kings', password: '123' },
  ];

  // Find the user in the sampleUsers array
  const user = sampleUsers.find(user => user.username === username && user.password === password);
*/

  // Perform authentication logic here, e.g., check if the user exists in the database
  if (user) {
    // Set session and cookie
    req.session.loggedIn = true;
    req.session.username = username;
    res.render('user-dashboard', user);
  } else {
    // Invalid credentials
    res.render('login', { error: 'Invalid username or password' });
  }


});

// Sign up route (GET)
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Sign up route (POST)
router.post('/signup', (req, res) => {
  // Create a new user in the database with the provided username and password
  
  // Set session and cookie
  req.session.loggedIn = true;
  req.session.username = req.body.username;
  
  res.redirect('/user/dashboard');
});

// homepage route
router.get('/homepage', (req, res) => {
  // Check if the user is logged in
  if (req.session.loggedIn) {
    const username = req.session.username;
    res.render('homepage', { username });
  } else {
    res.redirect('/login');
  }
});

router.use('/user', require('./user_view'));

module.exports = router;