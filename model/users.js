const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  profileImage: {
    type: String, // optional default profile image
  },
  boards: {
    type: [String], // array of strings instead of generic Array
    default: []
  }
});

// Use email as username field for passport-local-mongoose
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);
