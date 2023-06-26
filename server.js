const express = require('express');

const session = require('express-session');

const cookieParser = require('cookie-parser');

const exphbs = require('express-handlebars');


const app = express();

const port = 3000;

// Middleware
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
}));

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });