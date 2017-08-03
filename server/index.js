//middleware
var express = require('express');
var db = require('../database-mongo/index');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var morgan = require('morgan');
var expressValidator = require('express-validator');
var session = require('express-session');
var app = express();

//Routes
var users = require('./users.js');
var routes = require('./routes.js');

// Socket
var http = require('http').Server(app);
var io = require('socket.io')(http);
var socket = require('./sockets.js')(io);


//Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

// Express Validator (displays errors when logging in)
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'), root = namespace.shift(), formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));


app.use('/', routes);
app.use('/users', users);
app.use(express.static(__dirname + '/../react-client/dist'));

http.listen(3000, function(){
  console.log('socket listening on *:3000');
});