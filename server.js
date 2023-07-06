const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const sequelize = require('./config/connection');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables
require('dotenv').config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Handlebars setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(require('./controllers'));
// API
app.use('/api', require('./api/index'));

app.get('/email', (req, res) => {
  res.render('email');
});


// Send email route
app.post('/send-email', (req, res) => {
  const { email, subject, message } = req.body;

  // Create Nodemailer transporter
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
    text: message
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
});

// Start the server with sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
