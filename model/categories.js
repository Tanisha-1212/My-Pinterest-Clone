const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  image: String
});

const Category = mongoose.model('Category', categorySchema);

const dummyCategories = [
  { name: 'Travel', image: 'https://images.unsplash.com/photo-1707343848552-893e05dba6ac?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxzZWFyY2h8MXx8dHJhdmVsfGVufDB8fDB8fHww' },
  { name: 'Food', image: 'https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D' },
  { name: 'Nature', image: 'https://plus.unsplash.com/premium_photo-1755882951317-a1a2205879d4?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Film', image: 'https://images.unsplash.com/photo-1756574564260-16e2c043ba13?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwfGhtZW52UWhVbXhNfHxlbnwwfHx8fHw%3D' },
  { name: 'Architecture & Interiors', image: 'https://images.unsplash.com/photo-1756471818388-af6aadafbf07?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfE04alZiTGJUUndzfHxlbnwwfHx8fHw%3D' },
  { name: 'Wildlife', image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2lsZGxpZmV8ZW58MHx8MHx8fDA%3D' },
  { name: 'Cottage core', image: 'https://images.unsplash.com/photo-1580202313707-46a966af5c6f?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y290dGFnZSUyMGNvcmV8ZW58MHx8MHx8fDA%3D' }
];

module.exports = { Category, dummyCategories };

