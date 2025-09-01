var express = require('express');
var router = express.Router();
const User = require('./users');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const upload = require('./multer')
const samplePins = require('../public/data/pins')

passport.use(new LocalStrategy({usernameField: 'email'}, User.authenticate()));

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/signup', function(req, res, next){
  res.render('signup')
});

router.get('/profile', isLoggedIn, function(req, res, next){
  res.render("profile", {user : req.user})
});

router.get('/feed', isLoggedIn, function(req, res){
  res.render('feed', { pins: samplePins });
});

router.post('/fileupload', isLoggedIn, upload.single("image"), function(req, res, next){
  res.send("uploaded");
});

router.post('/signup', function (req, res, next) {
  const data = new User({
    username: req.body.username,
    email: req.body.email,
  });

  User.register(data, req.body.password).then(() => {
    passport.authenticate('local')(req, res, function(){
      res.redirect('/profile');
    });
  });
});

router.get('/login', function(req, res, next) {
  res.render("login");
});

router.post("/login", passport.authenticate('local', {
  successRedirect: "/profile", // redirect to profile after successful login
  failureRedirect: "/login",   // redirect back to login on failure
}), function(req, res){});


router.get('/logout', function(req, res, next){
  req.logout(function(err){
    if(err) {return next(err)}
    res.redirect("/");
  })
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}



module.exports = router;
