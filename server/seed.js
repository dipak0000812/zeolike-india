const mongoose = require('mongoose');
const Property = require('./models/Property');

// MongoDB Atlas connection string
const MONGO_URI =  'mongodb+srv://zeolike_india:dipak009@cluster0.24dfcja.mongodb.net/zeolike?retryWrites=true&w=majority'
// Sample property data
const sampleData = [
  {
    name: "Modern 1BHK in Shirpur",
    price: 1200000,
    location: {
      lat: 21.3481,
      lng: 74.8806,
      city: "Shirpur"
    },
    image: "https://via.placeholder.com/100"
  },
  {
    name: "Luxury Flat in Pune",
    price: 5000000,
    location: {
      lat: 18.5204,
      lng: 73.8567,
      city: "Pune"
    },
    image: "https://via.placeholder.com/100"
  },
  {
    name: "Affordable Studio in Nashik",
    price: 900000,
    location: {
      lat: 20.0059,
      lng: 73.7898,
      city: "Nashik"
    },
    image: "https://via.placeholder.com/100"
  },
  {
    name: "Spacious 3BHK in Mumbai",
    price: 8500000,
    location: {
      lat: 19.0760,
      lng: 72.8777,
      city: "Mumbai"
    },
    image: "https://via.placeholder.com/100"
  }
];

// Seeding function
const seedProperties = async () => {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("📦 Connected to MongoDB");
    
    await Property.deleteMany();
    console.log("🗑️ Cleared old data");

    await Property.insertMany(sampleData);
    console.log("✅ Properties seeded successfully");

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    mongoose.connection.close();
  }
};

// Run the seed function
seedProperties();

  
