const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Pin = mongoose.model('Pin', pinSchema);

const dummyPins = [
  { title: 'Beach Sunset', category: 'Travel', image: 'https://i.pinimg.com/736x/e2/76/4d/e2764d6ae295c8f0f7ad224d4e77b90c.jpg' },
  { title: 'Delicious Pizza', category: 'Food', image: 'https://i.pinimg.com/736x/c7/54/d6/c754d67a720bf998f7a7e0926d6bbb2a.jpg' },
  { title: 'Street Fashion', category: 'Fashion', image: 'https://i.pinimg.com/736x/16/fa/ad/16faad442f099d8812f365e64074869c.jpg' },
  { title: 'Books', category: 'Books', image: 'https://i.pinimg.com/736x/cb/0b/97/cb0b97e604a70e9c2e5e15827eca1963.jpg' },
  { title: 'Girly Pop', category: 'Pink', image: 'https://i.pinimg.com/736x/7e/d8/f8/7ed8f82413d99e1beec93d699f51b6f7.jpg' },
  { title: 'Manifestation', category: 'Manifestation', image: 'https://i.pinimg.com/1200x/e5/af/1a/e5af1a0201ef41eb679ab7d85b8f063b.jpg' },
];

module.exports = { Pin, dummyPins };

