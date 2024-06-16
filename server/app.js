var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var usersRouter_v2 = require('./routes/usersVtwo');
var chatsRouter = require('./routes/chats');
var messagesRouter = require('./routes/messages');

mongoose.connect(process.env.ATLAS_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {console.log('-------------------');console.log('Connection to Altas Established')})
 .catch(err => console.log("Connection to Atlas failed : " ,err));

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/chatKgv/users', usersRouter);
// app.use('/chatKgv/users', usersRouter_v2);
app.use('/chatKgv/chats', chatsRouter);
app.use('/chatKgv/messages', messagesRouter);

module.exports = app;
