const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const mongodb = require('./mongodb/mongodb.connect');


mongodb.connect();

const app = express();
app.use(cors());


app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'bananas', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));




require('./models/User');
require('./models/Article');
require('./models/Comment');
require('./models/BannedWords');
require('./config/passport');

app.use(require('./repository'));


// Start server 
const server = app.listen(process.env.PORT || 3000, function() {
    console.log(`Listening on: ${server.address().port}`);
});