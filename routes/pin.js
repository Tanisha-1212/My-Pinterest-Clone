const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pin', pinSchema);
