const mongoose = require('mongoose');
const {v4: uuidv4} =require('uuid');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const pinSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'Uncategorized'
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  boards: [{
    type: String // stores the board names where the pin is saved
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // users who liked this pin
  }],
  comments: [commentSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Pin = mongoose.model('pin', pinSchema); 

// Dummy pins mapped to categories


module.exports = {Pin};


