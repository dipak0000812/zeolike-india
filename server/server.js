 // ✅ Load env vars at the top
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const listingsRouter = require('./routes/listings');
const authRouter = require('./routes/auth');
const favoritesRouter = require('./routes/favorites');
const { auth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ MongoDB connected");
    // Uncomment below to seed properties when server starts
    // seedProperties();
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ✅ Routes
app.use('/api/listings', listingsRouter);
app.use('/api/auth', authRouter);
app.use('/api/favorites', favoritesRouter);

// ✅ Protected route example
app.get('/api/protected', auth, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// ✅ Basic API route
app.get('/', (req, res) => {
  res.send('Zeolike API is running...');
});

// ✅ Property model
const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  type: { type: String, default: 'property' },
  price: { type: Number, required: true },
  image: { type: String },
  rating: { type: Number, min: 0, max: 5 },
  distance: { type: String },
  link: { type: String }
});

const Property = mongoose.model('Property', propertySchema);

// ✅ Get all properties
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find({});
    res.json(properties);
  } catch (err) {
    console.error('Error fetching properties:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ Seed property data (optional for development/testing)
const seedProperties = async () => {
  try {
    await Property.deleteMany({});
    const properties = [
      {
        name: "Dream House in Shirpur",
        location: { lat: 21.341, lng: 74.882 },
        price: 1200000,
        image: "https://example.com/house1.jpg",
        rating: 4.5,
        distance: "1.2km",
        link: "https://zeolike.in/property/1"
      },
      {
        name: "Student Hostel Room",
        location: { lat: 21.343, lng: 74.884 },
        price: 5000,
        image: "https://example.com/hostel.jpg",
        rating: 4.0,
        distance: "0.5km",
        link: "https://zeolike.in/property/2"
      }
    ];
    await Property.insertMany(properties);
    console.log('✅ Property data seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding property data:', error);
  }
};

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});


