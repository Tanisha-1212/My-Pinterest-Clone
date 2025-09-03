const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  pins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pin' }]
});

module.exports = mongoose.model('Board', boardSchema);

