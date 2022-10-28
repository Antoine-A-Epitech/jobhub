const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const mysql = require('mysql2');
require('dotenv').config();

// Importing the routers
const apiRouter = require('./routes/api');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const applicationRouter = require('./routes/application');

// Setting up the views
// Read the documentation on application settings
// https://expressjs.com/en/api.html#app.settings.table
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Get the static files (.js .css img files)
app.use(express.static(path.join(__dirname, 'public')));

// Body parser to handle the requested data
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use(cors());

// All the handling will be done in these routes
app.use('/api', apiRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/application', applicationRouter);

// Starting the app
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port : ${port}`);
});
