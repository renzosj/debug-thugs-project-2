const express = require('express');

const session = require('express-session');

const cookieParser = require('cookie-parser');

const exphbs = require('express-handlebars');


const app = express();

const port = 3000;

// Middleware

app.
use(cookieParser());

// app.
// use(session
// ({

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });