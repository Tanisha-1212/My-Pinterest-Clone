const mongoose = require('mongoose');

// Board schema
const boardSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pins: [
    {
      title: String,
      image: String
    }
  ]
});

const Board = mongoose.model('Board', boardSchema);

// Dummy boards
const dummyBoards = [
  {
    name: 'Travel',
    pins: [
      { title: 'Beach Sunset', image: 'https://i.pinimg.com/736x/4a/6e/65/4a6e6598e8c9c1389d6b10fd08d836ab.jpg' },
      { title: 'Mountain Hike', image: 'https://i.pinimg.com/1200x/67/d1/5d/67d15d925c1b1f10d36d2305cad7c858.jpg'}
    ]
  },
  {
    name: 'Food',
    pins: [
      { title: 'Delicious Cake', image: 'https://i.pinimg.com/736x/ff/e5/7d/ffe57de7135d8ac709f8390a862a2791.jpg' },
      { title: 'Sushi', image: 'https://i.pinimg.com/736x/4c/56/51/4c5651a18195d9a4fbc52859bfc0da3d.jpg' }
    ]
  },
  {
    name: 'Photography',
    pins: [
      { title: 'City Night', image: 'https://i.pinimg.com/736x/e5/f5/66/e5f566af3be04a6dc0dab557efadf053.jpg' }
    ]
  }
];

module.exports = { Board, dummyBoards };
