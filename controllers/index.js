// Christina adding routes and sessions to page

const express = require('express');
const router = express.Router();
//const { Users, Chats } = require('../models');

// Homepage route (GET)
router.get('/', (req, res) => {
  res.render('homepage'); 
});

// About route (GET)
router.get('/about', (req, res) => {
  res.render('about');
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

//logout route
router.get('/logout', (req, res) => {
  console.log(`\n${req.session.loggedIn}, ${req.session.username}, ${req.session.userID}\n`);
  req.session.loggedIn = false;
  delete req.session.username;
  delete req.session.userID;
  console.log(`\n${req.session.loggedIn}, ${req.session.username}, ${req.session.userID}\n`);
  res.redirect('/login');
})


router.use('/user', require('./users-routes'));
router.use('/login', require('./login'));
router.use('/message', require('./message')); 
router.use('/signup', require('./signup'));

module.exports = router;