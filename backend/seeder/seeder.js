import mongoose from "mongoose";
import products from "./data.js";
import Product from "../models/product.js"; // importing the Product model 

const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ekommerce");
     
    await Product.deleteMany();
    console.log("Products are deleted successfully");

    await Product.insertMany(products);
    console.log("Products added successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();