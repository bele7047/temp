const express = require('express');
const path = require('path');

const fs = require('fs');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const app = express();
const port = 4000;
app.set('view', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(fileUpload());
const db = require('./queries');


var router = express.Router(); //allows app to user url routes

// For root, return simple info
app.get('/', (req,res) => {
  res.json({info: 'API for BookCellar'});
});

//get all users
app.get('/users', db.getUsers) //get all users
app.get('/users/:id', db.getUsersByID);

//get all books.
app.get('/books', db.getBooks)
app.get('/books/:id', db.getBookByID)


/* TODO:  add the POST */

// app.post('/register', db.login);


//Link API
app.use('/api', router);

//listen to chossen port.
app.listen(port, () => {
  console.log(`App running on port ${port}`);
})
