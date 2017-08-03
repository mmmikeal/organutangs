var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var User = require('../database-mongo/models/user');

// Register User
router.post('/register', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  // Validation
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  req.asyncValidationErrors().then(function() {
    var newUser = new User({
      username: username,
      password: password
    });
    User.createUser(newUser, (err, user) => {
      if (err) {
        console.log("error creating user");
        throw err;
      } else {
        res.status(201).send();
      }
    });
  // all good here
  }, function(errors) {
    console.log("ERRR", errors);
    res.status(404).send("Not found");
    // validation errors!
  });
});



passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, {message: 'Unknown User'});
      }

    User.comparePassword(password, user.password, function(err, isMatch){
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid password'});
      }
    });
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.status(201).send(req.isAuthenticated());
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logout();
  res.status(201).send(req.isAuthenticated());
  //res.redirect('/users/login');
});

module.exports = router;