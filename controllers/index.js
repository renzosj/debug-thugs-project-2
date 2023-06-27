// Christina adding routes and sessions to page

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const app = express();

// Function to read the email template file
const readHTMLTemplate = (templatePath) => {
    const filePath = path.join(__dirname, templatePath);
    const html = fs.readFileSync(filePath, 'utf-8');
    return handlebars.compile(html);
  };
  
  app.post('/send-email', (req, res) => {
    const { recipient, subject, text } = req.body;
  
    // Create a transporter object
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'christinahoang32@gmail.com',
        pass: 'Linkinparkpark32***'
      }
    });
  
    // Compile the email template
    const template = readHTMLTemplate('views/emailTemplate.handlebars');
  
    // Create the dynamic content for the email using Handlebars
    const emailContent = template({ subject: subject, message: text });
  
    const mailOptions = {
      from: 'christinahoang32@gmail.com',
      to: recipient,
      subject: subject,
      html: emailContent
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.send('Email sent successfully');
      }
    });
  });

// Login route (GET)
router.get('/login', (req, res) => {
  res.render('login');
});

// Login route (POST)
router.post('/login', (req, res) => {
  // Check username and password
  const { username, password } = req.body;

  // Sample user logins for testing
  const sampleUsers = [
    { username: 'xtina', password: '12345' },
    { username: 'kings', password: '123' },
  ];

  // Find the user in the sampleUsers array
  const user = sampleUsers.find(user => user.username === username && user.password === password);


  // Perform authentication logic here, e.g., check if the user exists in the database
  if (user) {
    // Set session and cookie
    req.session.loggedIn = true;
    req.session.username = username;
    res.redirect('/homepage');
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