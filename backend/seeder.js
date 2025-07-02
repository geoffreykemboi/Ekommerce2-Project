import mongoose from 'mongoose';
import dotenv from 'dotenv';
import products from './data.js';
import Product from './models/product.js';
import User from './models/user.js';

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

    // 3. Find an admin user to assign as the creator of all products
    let adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      // Create a default admin user if none exists
      adminUser = await User.create({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
      });
      console.log("Created default admin user for products.");
    }

    // 4. Add user field to all products
    const productsWithUser = products.map(product => ({
      ...product,
      user: adminUser._id
    }));

    // 5. Insert the new array of products
    await Product.insertMany(productsWithUser);
    console.log("All products have been seeded successfully!");

  } catch (error) {
    // Log any errors that occur during the process
    console.error("ERROR during seeding process:", error.message);
    process.exit(1); // Exit with a failure code
  } finally {
    // 6. This block will always run, ensuring the database connection is closed.
    await mongoose.disconnect();
    console.log("Database disconnected.");
  }
};

// Execute the seeder function
seedProducts();