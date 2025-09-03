// seedPins.js
const mongoose = require('mongoose');
const {Pin} = require('./model/pin'); // adjust path if needed

// Replace this with an existing user _id from your User collection
const existingUserId = '68b57acfc9543df994bf9c98';

const dummyPins = [
  {
    title: 'Beach Sunset',
    category: 'Travel',
    image: 'https://i.pinimg.com/736x/e2/76/4d/e2764d6ae295c8f0f7ad224d4e77b90c.jpg',
    description: 'Beautiful sunset by the ocean'
  },
  { 
    title: 'Mountain Adventure', 
    category: 'Travel', 
    image: 'https://i.pinimg.com/1200x/4d/97/97/4d9797f054c874c9406f8c2f5c88b5e7.jpg' ,
    description: 'Pretty Mountains'
  },
  {
    title: 'Santorini Sunset',
    category: 'Travel',
    image: 'https://i.pinimg.com/1200x/9b/a7/71/9ba7716ad5bd6df77a12459bf6517e76.jpg',
    description: 'Beautiful sunset in Santorini, Greece'
  },
  {
    title: 'Swiss Alps',
    category: 'Travel',
    image: 'https://i.pinimg.com/1200x/b3/eb/67/b3eb671a4d30b6fc9c8362aa476b9d0d.jpg',
    description: 'Snow-capped mountains in Switzerland'
  },
  {
    title: 'Tokyo Streets',
    category: 'Travel',
    image: 'https://i.pinimg.com/736x/c4/ef/fc/c4effc198c346999d99129e0e556f755.jpg',
    description: 'Neon lights and bustling streets of Tokyo'
  },
  {
    title: 'Maldives Paradise',
    category: 'Travel',
    image: 'https://i.pinimg.com/736x/0f/0c/4b/0f0c4b47cac22f43efd922eebc158e9d.jpg',
    description: 'Crystal clear water and overwater villas'
  },
  {
    title: 'Iceland Waterfalls',
    category: 'Travel',
    image: 'https://i.pinimg.com/736x/fd/f6/99/fdf6994293e1be1ff9a7184a717201c2.jpg',
    description: 'Majestic waterfalls of Iceland'
  },
  {
    title: 'New York Skyline',
    category: 'Travel',
    image: 'https://i.pinimg.com/1200x/83/d0/00/83d0002353119238fc1e42c5d49e976b.jpg',
    description: 'Manhattan skyline at night'
  },
  {
    title: 'Delicious Pizza',
    category: 'Food',
    image: 'https://i.pinimg.com/736x/c7/54/d6/c754d67a720bf998f7a7e0926d6bbb2a.jpg',
    description: 'Cheesy pizza fresh from the oven'
  },
  { 
    title: 'Chocolate Cake', 
    category: 'Food', 
    image: 'https://i.pinimg.com/1200x/2b/1b/34/2b1b345330ccd52a6235b042e74180e4.jpg',
    description: 'Gooey Cake'
  },
  {
    title: 'Italian Pasta',
    category: 'Food',
    image: 'https://i.pinimg.com/736x/39/8e/74/398e74738f42abeee34e10a0668ef4ef.jpg',
    description: 'Delicious creamy pasta with herbs'
  },
  {
    title: 'Sushi Platter',
    category: 'Food',
    image: 'https://i.pinimg.com/1200x/1c/78/f4/1c78f4ffacffbb0e4858cffa67fc7009.jpg',
    description: 'Fresh Japanese sushi rolls'
  },
  {
    title: 'Chocolate Cake',
    category: 'Food',
    image: 'https://i.pinimg.com/736x/ef/cf/f2/efcff26f28ae06f1dfcaae3bd44d0c72.jpg',
    description: 'Rich chocolate layered cake'
  },
  {
    title: 'Street Tacos',
    category: 'Food',
    image: 'https://i.pinimg.com/736x/55/7a/87/557a8797cc7e253e1a5b2becb6cf34a2.jpg',
    description: 'Authentic Mexican street tacos'
  },
  {
    title: 'French Croissants',
    category: 'Food',
    image: 'https://i.pinimg.com/736x/aa/9d/a0/aa9da0fe202800f5e309a3b56cf97825.jpg',
    description: 'Flaky butter croissants'
  },
  {
    title: 'Indian Thali',
    category: 'Food',
    image: 'https://i.pinimg.com/736x/33/d7/8e/33d78e107bb7aea1ab8fdf617ffd6b49.jpg',
    description: 'Traditional Indian thali meal'
  },
  {
    title: 'Street Fashion',
    category: 'Fashion',
    image: 'https://i.pinimg.com/736x/16/fa/ad/16faad442f099d8812f365e64074869c.jpg',
    description: 'Trendy streetwear style'
  },
  { 
    title: 'Casual Outfit', 
    category: 'Fashion', 
    image: 'https://i.pinimg.com/736x/e6/3b/62/e63b62e0906e6f529e129181b2d64398.jpg',
    description: 'Daily laid back style'
  },
   {
    title: 'Summer Outfit',
    category: 'Fashion',
    image: 'https://i.pinimg.com/736x/e3/5e/4f/e35e4ff8b4b71a4505ff09d9edf3d0b3.jpg',
    description: 'Light and breezy summer style'
  },
  {
    title: 'Streetwear Vibes',
    category: 'Fashion',
    image: 'https://i.pinimg.com/736x/d2/33/51/d23351c5bf7335117a68543d50e3dda6.jpg',
    description: 'Trendy urban street fashion'
  },
  {
    title: 'Classic Suit',
    category: 'Fashion',
    image: 'https://i.pinimg.com/736x/6b/33/e1/6b33e11aee5d3b89a253c83ad02f063c.jpg',
    description: 'Elegant formal wear for men'
  },
  {
    title: 'Boho Chic',
    category: 'Fashion',
    image: 'https://i.pinimg.com/1200x/35/72/38/35723807feba5fe7db4fe53d1c133efd.jpg',
    description: 'Bohemian inspired outfit'
  },
  {
    title: 'Winter Layering',
    category: 'Fashion',
    image: 'https://i.pinimg.com/736x/5d/0a/42/5d0a42b785a1818f7e8e68017b0d052a.jpg',
    description: 'Stylish and cozy winter layers'
  },
  {
    title: 'Evening Gown',
    category: 'Fashion',
    image: 'https://i.pinimg.com/736x/bc/52/b8/bc52b834de194cb388cc6f003bbad436.jpg',
    description: 'Elegant evening dress'
  }, 
  {
    title: 'Books',
    category: 'Books',
    image: 'https://i.pinimg.com/736x/cb/0b/97/cb0b97e604a70e9c2e5e15827eca1963.jpg',
    description: 'A cozy reading corner'
  },
  { 
    title: 'Library Asthetic', 
    category: 'Books', 
    image: 'https://i.pinimg.com/1200x/b2/17/2e/b2172e0f7cc28a36dd89e1e450729e61.jpg',
    description: 'Rain and books'
  },
  {
    title: 'Classic Literature',
    category: 'Books',
    image: 'https://i.pinimg.com/736x/1a/2b/65/1a2b65eb6d702951b1170a2d9dfd522d.jpg',
    description: 'A timeless collection of classic novels'
  },
  {
    title: 'Mystery Thriller',
    category: 'Books',
    image: 'https://i.pinimg.com/1200x/ba/26/4b/ba264b0f9823bee969eaeefd02c58e66.jpg',
    description: 'Suspense-filled crime and detective stories'
  },
  {
    title: 'Fantasy World',
    category: 'Books',
    image: 'https://i.pinimg.com/1200x/00/b9/c5/00b9c5ce8db7f7c9d8f4d18f27564e2b.jpg',
    description: 'Dive into magical adventures'
  },
  {
    title: 'Self Help Reads',
    category: 'Books',
    image: 'https://i.pinimg.com/736x/3c/f8/33/3cf833cab1711fe6b1afdd1591cc058a.jpg',
    description: 'Motivational books to inspire personal growth'
  },
  {
    title: 'Historical Fiction',
    category: 'Books',
    image: 'https://i.pinimg.com/736x/ff/fb/4e/fffb4e68c3ba50aacf71d9af9ef626f6.jpg',
    description: 'Stories from the past brought to life'
  },
  {
    title: 'Sci-Fi Collection',
    category: 'Books',
    image: 'https://i.pinimg.com/736x/06/51/48/065148aefaa0a77b276ddf3bfa1e28a9.jpg',
    description: 'Exploring the future and beyond'
  },
  {
    title: 'Girly Pop',
    category: 'Pink',
    image: 'https://i.pinimg.com/736x/7e/d8/f8/7ed8f82413d99e1beec93d699f51b6f7.jpg',
    description: 'Pink aesthetic vibes'
  },
  { 
    title: 'Pink Vibes', 
    category: 'Pink', 
    image: 'https://i.pinimg.com/1200x/a1/34/df/a134df07ecf6233200f17ad3651c8c5e.jpg',
    description: 'Girls Way'
  },
  {
    title: 'Manifestation Board',
    category: 'Manifestation',
    image: 'https://i.pinimg.com/1200x/e5/af/1a/e5af1a0201ef41eb679ab7d85b8f063b.jpg',
    description: 'Manifest your dreams'
  },
  { 
    title: 'Vision Board', 
    category: 'Manifestation', 
    image: 'https://i.pinimg.com/736x/c9/b2/a5/c9b2a5ad1e8c6f03ebe4a6bb22c48714.jpg',
    description: 'Vision for the month'
  },
  {
    title: 'Vision Board Inspiration',
    category: 'Manifestation',
    image: 'https://i.pinimg.com/736x/81/fb/f8/81fbf8f62682b41bf882d9ebe690d8ae.jpg',
    description: 'Create your own vision board for dreams and goals'
  },
  {
    title: 'Daily Affirmations',
    category: 'Manifestation',
    image: 'https://i.pinimg.com/736x/70/21/f0/7021f0e1196d30bd7b1001407e3b28f0.jpg',
    description: 'Positive affirmations to start your day right'
  },
  {
    title: 'Law of Attraction Quotes',
    category: 'Manifestation',
    image: 'https://i.pinimg.com/736x/c4/ef/f9/c4eff99a766bf3a9ba9e60c994dc6e4b.jpg',
    description: 'Inspirational quotes on the power of attraction'
  },
  {
    title: 'Journaling for Manifesting',
    category: 'Manifestation',
    image: 'https://i.pinimg.com/736x/f9/13/7d/f9137d0c9655fe3e03f84ec464a1bc2a.jpg',
    description: 'Guided journal prompts for manifestation'
  },
  {
    title: 'Meditation Space Setup',
    category: 'Manifestation',
    image: 'https://i.pinimg.com/736x/17/e2/97/17e297f5edd5d09f0d783e070dd3b59e.jpg',
    description: 'Peaceful corner for manifesting and mindfulness'
  },
  {
    title: 'Manifesting Financial Abundance',
    category: 'Manifestation',
    image: 'https://i.pinimg.com/736x/3d/84/1f/3d841fea5d8fa48f8bf0c0a7409cdc6f.jpg',
    description: 'Tips and vision board ideas for wealth attraction'
  },
  { 
    title: 'Flower Field', 
    category: 'Nature', 
    image: 'https://i.pinimg.com/1200x/7f/dd/dc/7fdddc93e87c77742c59ce952fcaccbe.jpg',
    description: 'Flowers'
  },
  { 
    title: 'Ocean Waves', 
    category: 'Nature', 
    image: 'https://i.pinimg.com/736x/32/ec/c7/32ecc772d48e0f390df1ffeb26b873a4.jpg',
    description: 'Ocean'
  },
  {
    title: 'Misty Forest Morning',
    category: 'Nature',
    image: 'https://i.pinimg.com/736x/28/c1/69/28c169c61c1433467afc21dbacd3ea34.jpg',
    description: 'Fog covering a dense pine forest'
  },
  {
    title: 'Golden Sunset Over Hills',
    category: 'Nature',
    image: 'https://i.pinimg.com/736x/f2/e1/6c/f2e16c3eab1d39747c20941b7d0160fa.jpg',
    description: 'A breathtaking sunset over rolling hills'
  },
  {
    title: 'Waterfall in the Wild',
    category: 'Nature',
    image: 'https://i.pinimg.com/736x/1c/f3/eb/1cf3ebd20bea4f22cc22386a3f1e1b01.jpg',
    description: 'Crystal-clear water cascading down rocks'
  },
  {
    title: 'Mountain Lake Reflection',
    category: 'Nature',
    image: 'https://i.pinimg.com/736x/8a/5c/2c/8a5c2cf98dfd71f9a928ebf65a2124b6.jpg',
    description: 'Still water reflecting a snowy mountain peak'
  },
  {
    title: 'Autumn Leaves Pathway',
    category: 'Nature',
    image: 'https://i.pinimg.com/736x/fe/6c/f0/fe6cf028b1e2f762b01a3be73816109b.jpg',
    description: 'Pathway covered in golden autumn leaves'
  },
  {
    title: 'Northern Lights Glow',
    category: 'Nature',
    image: 'https://i.pinimg.com/736x/f8/96/7b/f8967b5d16fd44be5de7de645a36c8e3.jpg',
    description: 'Aurora borealis lighting up the night sky'
  },
  { 
    title: 'Your Eyes Tell', 
    category: 'Film', 
    image: 'https://i.pinimg.com/1200x/13/a7/4a/13a74af8ae3848decd7edc224137e856.jpg',
    description: 'Korean Movie'
  },
  { 
    title: 'The Call', 
    category: 'Film', 
    image: 'https://i.pinimg.com/736x/84/30/ab/8430ab43715f2de8a0c9360b4a963d6a.jpg',
    description: 'Thriller Korean Movie'
  },
  { 
    title: 'A Silent Voice', 
    category: 'Film', 
    image: 'https://i.pinimg.com/1200x/65/cf/14/65cf149409fa7f9d19eff52bd1699e1d.jpg',
    description: 'Japanese Animated Film'
  },
  { 
    title: 'Parasite', 
    category: 'Film', 
    image: 'https://i.pinimg.com/736x/98/ff/c0/98ffc01fba89d5f8b073271a2e022aba.jpg',
    description: 'Oscar Winning Film'
  },
  { 
    title: 'Train to Busan', 
    category: 'Film', 
    image: 'https://i.pinimg.com/736x/20/67/fe/2067fe907f9d666f19acaf36db409174.jpg',
    description: 'Zombie Thriller'
  },
  { 
    title: 'Weathering With You', 
    category: 'Film', 
    image: 'https://i.pinimg.com/736x/73/4a/c9/734ac9d75f0ff815c4f07cfc5daf3473.jpg',
    description: 'Japanese Anime Film'
  },
  { 
    title: 'Pretty Interior', 
    category: 'Architecture & Interiors', 
    image: 'https://i.pinimg.com/736x/cb/da/9f/cbda9f311784130c9050ae84bf0fbdbd.jpg',
    description: 'Cozy home'
  },
  { 
    title: 'Hawa Mahal', 
    category: 'Architecture & Interiors', 
    image: 'https://i.pinimg.com/736x/35/f9/b9/35f9b9dcf00f65044ef448e9495bf660.jpg',
    description: 'Crazy creations'
  },
  {
    title: 'Modern Living Room',
    category: 'Architecture & Interiors',
    image: 'https://i.pinimg.com/736x/6b/eb/59/6beb591bb64b4a14e5f95798715cfe04.jpg',
    description: 'Minimalist interior with cozy vibes'
  },
  {
    title: 'Luxury Villa Design',
    category: 'Architecture & Interiors',
    image: 'https://i.pinimg.com/736x/12/58/95/125895115d299703a40876ec16f367cc.jpg',
    description: 'Stunning villa with modern architecture'
  },
  {
    title: 'Cozy Bedroom Setup',
    category: 'Architecture & Interiors',
    image: 'https://i.pinimg.com/736x/c5/08/1c/c5081cfe7ef0e4340843be6325e0b00a.jpg',
    description: 'Warm tones and soft lighting for relaxation'
  },
  {
    title: 'Office space',
    category: 'Architecture & Interiors',
    image: 'https://i.pinimg.com/736x/08/c3/d1/08c3d15bf21aa4f6ee85791dd7cec47a.jpg',
    description: 'Creative workspace with sleek design'
  },
  {
    title: 'Rustic Kitchen Charm',
    category: 'Architecture & Interiors',
    image: 'https://i.pinimg.com/1200x/b3/01/ae/b301aef562ddac7e4e21c89b7b1e9699.jpg',
    description: 'A blend of wood and stone for earthy vibes'
  },
  {
    title: 'Glass House Exterior',
    category: 'Architecture & Interiors',
    image: 'https://i.pinimg.com/1200x/07/7a/a2/077aa2d70935370a7d47624bc3180370.jpg',
    description: 'Transparent modern house surrounded by nature'
  },
  { 
    title: 'Tigers', 
    category: 'Wildlife', 
    image: 'https://i.pinimg.com/1200x/a9/79/f0/a979f0c3986a7047d6e195d4f5a9f50a.jpg',
    description: 'Animals'
  },
  { 
    title: 'Peacock', 
    category: 'Wildlife', 
    image: 'https://i.pinimg.com/1200x/e7/58/78/e75878cb2b6f1e8be38a5fc595de6ab7.jpg',
    description: 'Animals'
  },
  {
    title: 'Majestic Tiger',
    category: 'Wildlife',
    image: 'https://i.pinimg.com/1200x/4c/9f/b9/4c9fb9032a870a9969ad48c3d99805db.jpg',
    description: 'A powerful Bengal tiger in its natural habitat'
  },
  {
    title: 'Elephant Herd',
    category: 'Wildlife',
    image: 'https://i.pinimg.com/1200x/e2/f5/93/e2f5933ae757c417dade73c42c5749ed.jpg',
    description: 'Gentle giants roaming the savanna'
  },
  {
    title: 'Colorful Parrot',
    category: 'Wildlife',
    image: 'https://i.pinimg.com/736x/d7/ad/c6/d7adc645f392ccbca9365159fb0c1eda.jpg',
    description: 'A vibrant parrot perched on a branch'
  },
  {
    title: 'Snow Leopard',
    category: 'Wildlife',
    image: 'https://i.pinimg.com/736x/f8/69/e7/f869e7b2074ac0506059633d4d279dd7.jpg',
    description: 'Elusive predator in snowy mountains'
  },
  {
    title: 'Sea Turtle',
    category: 'Wildlife',
    image: 'https://i.pinimg.com/736x/8c/8a/58/8c8a58961504518b5438d838054d0ebd.jpg',
    description: 'Gracefully swimming in crystal-clear water'
  },
  {
    title: 'African Lion',
    category: 'Wildlife',
    image: 'https://i.pinimg.com/736x/26/47/73/264773c6ee77787f8469c814969f65da.jpg',
    description: 'The king of the jungle on the lookout'
  },
];

mongoose.connect('mongodb://127.0.0.1:27017/pin')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedPins = async () => {
  try {
    // Remove all existing pins first
    await Pin.deleteMany({});
    console.log('Old pins cleared.');

    // Attach the user to each pin
    const pinsWithUser = dummyPins.map(pin => ({
      ...pin,
      user: existingUserId
    }));

    // Insert new pins
    await Pin.insertMany(pinsWithUser);
    console.log('Pins seeded successfully!');
  } catch (err) {
    console.error('Error seeding pins:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedPins();



