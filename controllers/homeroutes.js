const express = require('express');
const router = express.Router();
const { Users, Chats, Messages } = require('../models');
const withAuth = require('../utils/auth');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

// Root (GET)
router.get('/', (req, res) => {
    res.render('homepage'); 
  });
  
  // Homepage route (GET)
  router.get('/homepage', (req, res) => {
    res.redirect('/');
  });
  
  // Sign up route (GET)
  router.get('/signup', (req, res) => {
      res.render('signup');
  });
  
  // Sign up route (POST)
  router.post('/signup', async (req, res) => {
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
          req.session.user_id = user_id;
          
          res.redirect(`/`);
      } catch (err) { 
          console.log(err);
          res.status(500).json(err);
      }
  });


// Login route (GET)
router.get('/login', (req, res) => {
    res.render('login');
});

// Login route (POST)
router.post('/login', async (req, res) => { 
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

// About route (GET)
router.get('/about', (req, res) => {
  res.render('about');
});


// User Dashboard (GET)
router.get('/user/dashboard', withAuth, async (req, res) => {
    try {
        if(!req.session.loggedIn) {
            res.redirect('/login');
        }
        const user_id = req.session.userID;
        const userData = await Users.findByPk(user_id, {
            include: [ 
                {
                    model: Chats,
                    include: [Messages]
                }
            ]
        });
        const user = userData.get({ plain: true });
        res.render('user-dashboard', { user });
    } catch (err) {
        res.status(500).json(err);
        // add error handling to view
    }
});


// User chats (GET)
router.get('/user/chats', withAuth, async (req, res) => {
    try {
        if(!req.session.loggedIn) {
            res.redirect('/login');
        }
        const user_id = req.session.userID;
        const userData = await Users.findByPk(user_id, {
            include: [ 
                {
                    model: Chats,
                    include: [Messages]
                }
            ]
        });
        const user = userData.get({ plain: true });
        res.render('chats', { user });
    } catch (err) {
        res.status(500).json(err);
        // add error handling to view
    }
});

// User profile route (GET)
router.get('/user/profile', withAuth, (req, res) => {
    res.render('user-profile');
});


// Message route (GET)
router.get('/user/message', withAuth, async (req, res) => {
    res.render('message');
});

// Send a Message route (POST)
router.post('/user/message', withAuth, async (req, res) => {
    try {
        const { box_check } = req.body;
        // const originalMessageText = req.body.message_text;
        let delay_send;
        if (!box_check) {
            delay_send = false;
        } else {
            delay_send = true;
        }
        const { userID } = req.session;


        //console.log(`\n${userID}: ${username} sends the message: '${originalMessageText}' to user: ${recipient_user_name} with delay send? ${delay_send}\n`);

        //Find recipient user model
        // const userRecipientData = await Users.findOne({ 
        //     where: { user_name: recipient_user_name } },
        //     {
        //         include: [ 
        //             {
        //                 model: Chats,
        //                 include: [Messages]
        //             } 
        //         ]
        //     });

    
        // check if there is user data for recipient
        // if (!userRecipientData) {
        //     res.status(500).json("Recipient User not found. Please try again with valid recipient user name");
        // }

        // const userRecipient = [userRecipientData[0].get({ plain: true })];

        // console.log("\nUser recip: " + userRecipient + "\n");
        

        // const newMessageData = await Messages.create({
        //     message_text: originalMessageText,
        //     user_id: userID,
        //     delay_send: delay_send
        // })
        // const newMessage = newMessageData.get({ plain: true });
        // console.log("Your new msg king!: " + newMessage);

        // plug in nodemailer 
        const { email, subject, message_text } = req.body;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        // Define email options
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: subject,
            text: message_text
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.redirect('/'); // Redirect to an error page or handle the error accordingly
            } else {
                console.log('Email sent: ' + info.response);
                res.redirect('/'); // Redirect to a success page or handle the success accordingly
            }
        });

        // render sent message page here
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

module.exports = router;