// christina - getting sign up page to display/properly route and save to the DB
// work in progess: to test with UI

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

// Parse incoming requests with body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gnk_db'
});

// Handle GET request to display the sign-up page
app.get('/', (req, res) => {
  res.render('signup');
});

// Handle POST request to process sign-up form
app.post('/signup', (req, res) => {
    const { username, password, firstName, lastName, email, bedtime } = req.body;
  
    // Insert user data into the database
    connection.query(
      'INSERT INTO users (user_name, password, first_name, last_name, email, bed_time) VALUES (?, ?, ?, ?, ?, ?)',
      [username, password, firstName, lastName, email, bedtime],
      (error, results, fields) => {
        if (error) {
          console.log('Error saving user to database:', error);
          res.sendStatus(500);
          return;
        }
  
        // Set up session and cookie
        req.session.username = username;
        res.cookie('username', username);
  
        // Redirect to user dashboard
        res.redirect('/user/dashboard');
      }
    );
  });