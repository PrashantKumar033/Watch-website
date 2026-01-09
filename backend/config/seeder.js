const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');

dotenv.config();

// Sample products data based on your HTML
const products = [
  // Featured products
  {
    name: 'Jazzmaster',
    price: 1050,
    image: 'assets/img/featured1.png',
    category: 'featured',
    description: 'Elegant Jazzmaster watch with premium design',
    isOnSale: true
  },
  {
    name: 'Ingersoll',
    price: 250,
    image: 'assets/img/featured2.png',
    category: 'featured',
    description: 'Classic Ingersoll timepiece',
    isOnSale: true
  },
  {
    name: 'Rose Gold',
    price: 890,
    image: 'assets/img/featured3.png',
    category: 'featured',
    description: 'Luxurious rose gold watch',
    isOnSale: true
  },
  // Products
  {
    name: 'Spirit Rose',
    price: 1500,
    image: 'assets/img/product1.png',
    category: 'products',
    description: 'Premium Spirit Rose collection'
  },
  {
    name: 'Khaki Pilot',
    price: 1350,
    image: 'assets/img/product2.png',
    category: 'products',
    description: 'Military-inspired Khaki Pilot watch'
  },
  {
    name: 'Jubilee Black',
    price: 870,
    image: 'assets/img/product3.png',
    category: 'products',
    description: 'Sophisticated black Jubilee model'
  },
  {
    name: 'Fosil ME3',
    price: 650,
    image: 'assets/img/product4.png',
    category: 'products',
    description: 'Modern Fossil ME3 design'
  },
  {
    name: 'Duchen',
    price: 950,
    image: 'assets/img/product5.png',
    category: 'products',
    description: 'Elegant Duchen timepiece'
  },
  // New arrivals
  {
    name: 'Longines Rose',
    price: 980,
    image: 'assets/img/new1.png',
    category: 'new',
    description: 'Latest Longines rose gold collection'
  },
  {
    name: 'Jazzmaster',
    price: 1150,
    image: 'assets/img/new2.png',
    category: 'new',
    description: 'New Jazzmaster model with enhanced features'
  },
  {
    name: 'Dreyfuss Gold',
    price: 750,
    image: 'assets/img/new3.png',
    category: 'new',
    description: 'Stunning Dreyfuss gold edition'
  },
  {
    name: 'Portuguese Rose',
    price: 1590,
    image: 'assets/img/new4.png',
    category: 'new',
    description: 'Exclusive Portuguese rose collection'
  }
];

// Sample admin user
const adminUser = {
  name: 'Admin',
  email: 'pacificodin1234@gmail.com',
  password: 'prashant1234',
  role: 'admin'
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/watchstore');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Insert products
    await Product.insertMany(products);
    console.log('Products seeded successfully');

    // Insert admin user
    const admin = new User(adminUser);
    await admin.save();
    console.log('Admin user created successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();