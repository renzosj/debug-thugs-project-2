// Christina adding routes and sessions to page

const express = require('express');
const router = express.Router();

// Login route (GET)
router.get('/login', (req, res) => {
  res.render('login');
});

// Login route (POST)
router.post('/login', (req, res) => {
  // Check username and password
  const { username, password } = req.body;
  // Perform authentication logic here, e.g., check if the user exists in the database
  
  // Set session and cookie
  req.session.loggedIn = true;
  req.session.username = username;
  
  res.redirect('/dashboard');
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
  
  res.redirect('/dashboard');
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

module.exports = router;