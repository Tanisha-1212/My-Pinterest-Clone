const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String
  },
  profileImage: {
    type: String,
    default: '/images/default-profile.png' // default profile picture
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  boards: {
    type: [String],
    default: [] // ensures every user has a boards array
  },
  boardsPins: {
    type: Map,
    of: [String], // stores array of pin IDs per board
    default: {}
  },
  active: {
    type: Boolean,
    default: true // for account deactivation
  },
  isPrivate: {
    type: Boolean,
    default: false // public by default
  }
});

// Use email as username field for passport-local-mongoose
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);
