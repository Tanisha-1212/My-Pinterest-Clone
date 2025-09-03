var express = require('express');
var router = express.Router();
const User = require('../model/users');
const {Pin} = require('../model/Pin');         // Pin schema
const {Category, dummyCategories} = require('../model/categories'); // Category schema
const passport = require('passport');
const LocalStrategy = require('passport-local');
const upload = require('../multer/multerUploads');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');


passport.use(new LocalStrategy({usernameField: 'email'}, User.authenticate()));

router.get('/', function(req, res, next) {
  res.render('index', {nav: false});
});

router.get('/signup', function(req, res, next){
  res.render('signup', {nav: false})
});


router.get('/explore', async (req, res) => {
  res.render('explore', {categories: dummyCategories})
});


// Profile page
router.get('/profile', isLoggedIn, async (req, res) => {
  try {
    const query = req.query.q || '';

    // Fetch boards for the logged-in user with pins populated
    let boards = await Board.find({ user: req.user._id })
      .populate({ path: 'pins', model: 'pin' });

    // Filter boards if search query exists
    if (query) {
      const lowerQuery = query.toLowerCase();
      boards = boards.filter(board => board.name.toLowerCase().includes(lowerQuery));
    }

    // Fetch user info
    const user = await User.findById(req.user._id);

    res.render('profile', {
      user,
      boards,
      query,
      currentUrl: req.path,
      nav: true
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Board Details Page
router.get('/boards/:id', isLoggedIn, async (req, res) => {
  try {
    // Find board by ID and populate pins
    const board = await Board.findById(req.params.id)
      .populate({ path: 'pins', model: 'pin' })
      .lean(); // converts Mongoose doc to plain JS object for easier rendering

    if (!board) {
      return res.status(404).send('Board not found');
    }

    console.log('Board fetched:', board); // debug: ensure pins exist
    const user = await User.findById(req.user._id);

    res.render('boardDetails', {
      board,
      nav: true,
      user
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



router.get('/feed', isLoggedIn, async function (req, res) {
  try {
    const query = req.query.q || '';

    // Fetch pins from DB, most recent first
    let pins = await Pin.find().sort({ createdAt: -1 });

    // Apply search filter if query exists
    if (query) {
      const lowerQuery = query.toLowerCase();
      pins = pins.filter(pin =>
        (pin.category && pin.category.toLowerCase().includes(lowerQuery)) ||
        (pin.title && pin.title.toLowerCase().includes(lowerQuery)) ||
        (pin.description && pin.description.toLowerCase().includes(lowerQuery))
      );
    }

    // Render feed with real pins only
    res.render('feed', {
      pins,
      user: req.user,
      query,  // keeps search input filled
      nav: true
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading feed");
  }
});



router.get('/category/:categoryName', (req, res) => {
  const categoryName = req.params.categoryName;
  console.log('Category requested:', categoryName);

  const filteredPins = dummyPins.filter(pin => 
    pin.category.toLowerCase() === categoryName.toLowerCase()
  );

  console.log('Pins found:', filteredPins);

  res.render('category', { pins: filteredPins, category: categoryName, nav: false });
});


router.get("/createPin",isLoggedIn, (req, res) => {
  res.render("createPin", {user: req.user, nav: true})
});

// Route to get single pin by ID
router.get('/pin/:id', isLoggedIn, async (req, res) => {
  try {
    const pinId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(pinId)) {
      return res.status(400).send("Invalid Pin ID");
    }

    const pin = await mongoose.connection.db
      .collection('pins')
      .findOne({ _id: new mongoose.Types.ObjectId(pinId) });

    if (!pin) return res.status(404).send("Pin not found");

    const relatedPins = await mongoose.connection.db
      .collection('pins')
      .find({ 
        category: pin.category, 
        _id: { $ne: new mongoose.Types.ObjectId(pinId) } 
      })
      .limit(12)
      .toArray();

    res.render('pinDetails', {
      user: req.user,
      pin,
      relatedPins,
      nav: true
    });
  } catch (err) {
    console.error("Error in /pin/:id route:", err);
    res.status(500).send("Server Error");
  }
});


// POST /like-pin
router.post('/like-pin', isLoggedIn, async (req, res) => {
  try {
    const { pinId } = req.body;
    const pin = await Pin.findById(pinId);
    if (!pin) return res.status(404).send("Pin not found");

    const userId = req.user._id;

    if (pin.likes.includes(userId)) {
      // unlike if already liked
      pin.likes.pull(userId);
    } else {
      pin.likes.push(userId);
    }

    await pin.save();
    res.json({ likesCount: pin.likes.length });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


// POST /add-comment
router.post('/add-comment', isLoggedIn, async (req, res) => {
  try {
    const { pinId, text } = req.body;
    const pin = await Pin.findById(pinId);
    if (!pin) return res.status(404).send("Pin not found");

    pin.comments.push({ user: req.user._id, text });
    await pin.save();

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
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

// GET Edit Profile Page
router.get('/edit-profile', isLoggedIn, (req, res) => {
  res.render('editProfile', { user: req.user });
});

// POST Update Profile
const profileUpload = require('../multer/multerProfile');

router.post('/edit-profile', isLoggedIn, profileUpload.single('profileImage'), async (req, res) => {
  try {
    const { username, email } = req.body;
    const updateData = { username, email };

    if (req.file) {
      updateData.profileImage = '/images/profile/' + req.file.filename;
    }

    await User.findByIdAndUpdate(req.user._id, updateData, { new: true });
    res.redirect('/edit-profile');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating profile');
  }
});

// GET Account Management Page
router.get('/account-management', isLoggedIn, (req, res) => {
  res.render('accountManagement', { user: req.user });
});

// Change Email
router.post('/account-management/change-email', isLoggedIn, async (req, res) => {
  try {
    const { newEmail } = req.body;
    await User.findByIdAndUpdate(req.user._id, { email: newEmail });
    res.redirect('/account-management');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating email');
  }
});

// Change Password
router.post('/account-management/change-password', isLoggedIn, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(400).send('Current password is incorrect');

    const hashed = await bcrypt.hash(newPassword, 12);
    user.password = hashed;
    await user.save();

    res.redirect('/account-management');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating password');
  }
});

// Deactivate Account (example: set active=false)
router.post('/account-management/deactivate', isLoggedIn, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { active: false });
    req.logout(); // or destroy session
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deactivating account');
  }
});

// Delete Account
router.post('/account-management/delete', isLoggedIn, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    req.logout(); // or destroy session
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting account');
  }
});

// GET Profile Visibility Page
router.get('/profile-visibility', isLoggedIn, (req, res) => {
  res.render('profileVisibility', { user: req.user });
});

// POST Update Profile Visibility
router.post('/profile-visibility', isLoggedIn, async (req, res) => {
  try {
    const isPrivate = req.body.isPrivate === 'on' ? true : false;
    await User.findByIdAndUpdate(req.user._id, { isPrivate });
    res.redirect('/profile-visibility');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating profile visibility');
  }
});

const Board = require('../model/boards');




// Save pin to a board
router.post('/save-pin-to-board', isLoggedIn, async (req, res) => {
  try {
    const { pinId, boardId, newBoardName } = req.body;
    const user = await User.findById(req.user._id);

    // Create new board if name is provided
    if (newBoardName) {
      if (!user.boards.includes(newBoardName)) {
        user.boards.push(newBoardName); // <-- important
      }
      if (!user.boardsPins) user.boardsPins = {};
      user.boardsPins[newBoardName] = [pinId];
      await user.save();
      return res.json({ success: true, message: 'Pin saved to new board!' });
    }

    // Otherwise add pin to existing board
    if (boardId) {
      if (!user.boardsPins) user.boardsPins = {};
      if (!user.boardsPins[boardId]) user.boardsPins[boardId] = [];
      if (!user.boardsPins[boardId].includes(pinId)) {
        user.boardsPins[boardId].push(pinId);
        await user.save();
      }
      return res.json({ success: true, message: 'Pin saved to board!' });
    }

    res.status(400).json({ success: false, message: 'No board selected' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
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
