import mongoose from 'mongoose';
import dotenv from 'dotenv';
// FIX: Path must go up one level from 'seeder' to 'backend'
import products from '../data.js';
import Product from '../models/product.js';

// FIX: Path must go up one level to find the config directory
dotenv.config({ path: '../config/config.env' });

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected for seeding.");

    await Product.deleteMany();
    console.log("Existing products cleared.");

    await Product.insertMany(products);
    console.log("All products have been seeded successfully!");

  } catch (error) {
    console.error("Error during seeding process:", error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("Database disconnected.");
    process.exit(0);
  }
};

seedProducts();


//import mongoose from "mongoose";
//import products from "./data.js";
//import dotenv from 'dotenv';
//import Product from "../models/product.js"; // importing the Product model 

//const seedProducts = async () => {
  //try {
   // await mongoose.connect("mongodb://localhost:27017/ekommerce");
     
    //await Product.deleteMany();
    //console.log("Products are deleted successfully");

    //await Product.insertMany(products);
    //console.log("Products added successfully");

    //process.exit();
  //} catch (error) {
   // console.error("Seeding failed:", error.message);
    //process.exit(1);
  //}
//};

// seedProducts();

