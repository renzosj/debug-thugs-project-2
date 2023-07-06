const express = require('express');
const router = express.Router();

// Root (GET)
router.get('/', (req, res) => {
  res.render('homepage'); 
});

// Homepage route (GET)
// If user is logged in, homepage redirects to user's dashboard
router.get('/homepage', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('user/dashboard');
  } else {
    res.redirect('/');
  }
});

// About route (GET)
router.get('/about', (req, res) => {
  res.render('about');
});


router.use('/login', require('./login'))
router.use('/signup', require('./signup'));

/*
router.get('/logout', (req, res) => {
  console.log(`\n${req.session.loggedIn}, ${req.session.username}, ${req.session.userID}\n`);
  req.session.loggedIn = false;
  delete req.session.username;
  delete req.session.userID;
  console.log(`\n${req.session.loggedIn}, ${req.session.username}, ${req.session.userID}\n`);
  res.redirect('/login');
})
*/

//logout route
router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).redirect('/');
      });
    } else {
      res.status(404).redirect('/');
    }
  });


module.exports = router;