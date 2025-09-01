const mongoose = require('mongoose');
const passport = require('passport');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/pin");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  profileImage: String,
  boards: {
    type: Array,
    default: []
  }
})

userSchema.plugin(plm,  { usernameField: 'email' });


module.exports = mongoose.model('User', userSchema)