import mongoose from 'mongoose';
import dotenv from 'dotenv';
import products from './data.js';
import Product from './models/product.js';

// Load environment variables from config file
dotenv.config();

const seedProducts = async () => {
  try {
    // 1. Connect to the database using the secure URI
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected for seeding...");

    // 2. Clear all existing products to ensure a clean slate
    await Product.deleteMany();
    console.log("Existing products have been cleared.");

    // 3. Insert the new array of products
    await Product.insertMany(products);
    console.log("All products have been seeded successfully!");

  } catch (error) {
    // Log any errors that occur during the process
    console.error("ERROR during seeding process:", error.message);
    process.exit(1); // Exit with a failure code
  } finally {
    // 4. This block will always run, ensuring the database connection is closed.
    await mongoose.disconnect();
    console.log("Database disconnected.");
  }
};

// Execute the seeder function
seedProducts();