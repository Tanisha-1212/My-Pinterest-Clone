var express = require('express');
var router = express.Router();
const User = require('../model/users');
const {Pin, dummyPins} = require('../model/pin');         // Pin schema
const {Category, dummyCategories} = require('../model/categories'); // Category schema
const { Board, dummyBoards } = require('../model/boards');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const upload = require('./multer');


passport.use(new LocalStrategy({usernameField: 'email'}, User.authenticate()));

router.get('/', function(req, res, next) {
  res.render('index', {nav: false});
});

router.get('/signup', function(req, res, next){
  res.render('signup', {nav: false})
});


router.get('/explore', async (req, res) => {
  try {
    // Map each category to include preview pins (first 2 pins)
    const categories = dummyCategories.map(category => {
      // Filter pins that belong to this category
      const pinsForCategory = dummyPins.filter(pin => pin.category === category.name);

      return {
        ...category,
        previewPins: pinsForCategory.slice(0, 2), // first 2 pins
        totalPins: pinsForCategory.length // total pins count
      };
    });

    // Render explore page
    res.render('explore', {
      user: req.user,
      categories, 
      nav: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});





router.get('/profile', isLoggedIn, async function(req, res){
  try {
    const query = req.query.q || '';

    // Use dummyBoards
    let boards = dummyBoards;

    // Filter boards if search query exists
    if (query) {
      const lowerQuery = query.toLowerCase();
      boards = boards.filter(board => 
        board.name.toLowerCase().includes(lowerQuery) ||
        board.pins.some(pin => pin.title.toLowerCase().includes(lowerQuery))
      );
    }

    // Pass current URL for navbar search form
    const currentUrl = req.path;

    // Render profile page
    res.render("profile", {
      user: req.user,   // logged-in user
      boards,           // filtered boards
      query,            // so search input keeps value
      currentUrl,       // for navbar form
      nav: true
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});




router.get('/feed', isLoggedIn, function(req, res){
  const query = req.query.q || '';

  let filteredPins = dummyPins; // or your DB pins

  if (query) {
    const lowerQuery = query.toLowerCase();
    filteredPins = dummyPins.filter(pin => 
      pin.title.toLowerCase().includes(lowerQuery)
      // || (pin.description && pin.description.toLowerCase().includes(lowerQuery))
    );
  }

  res.render('feed', {
    pins: filteredPins,
    user: req.user,
    query, // so search input keeps value
    nav: true
  });
});




router.get('/about', (req, res) => {
  res.render('about', { user: req.user, nav: true });
});

router.post('/fileupload', isLoggedIn, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

        // Update user's profilePic in DB
        const userId = req.user._id; // assuming req.user is set after login
        await User.findByIdAndUpdate(userId, { profileImage: "/images/uploads/" + req.file.filename });

        res.json({
            success: true,
            filePath: "/images/uploads/" + req.file.filename
        });
    } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: "Server error" });
        }
    }
});




router.post('/signup', function (req, res, next) {
  const data = new User({
    username: req.body.username,
    email: req.body.email,
  });

  User.register(data, req.body.password).then(() => {
    passport.authenticate('local')(req, res, function(){
      res.redirect('/feed');
    });
  });
});

router.get('/login', function(req, res, next) {
  res.render("login", {nav:false});
});

router.post("/login", passport.authenticate('local', {
  successRedirect: "/feed", // redirect to profile after successful login
  failureRedirect: "/login",   // redirect back to login on failure
}), function(req, res){});


router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);

    req.session.destroy(err => {
      if (err) return next(err);

      // Only send one response: redirect the user
      res.redirect('/');  // or res.render('index') if you prefer
    });
  });
});



function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}



module.exports = router;
