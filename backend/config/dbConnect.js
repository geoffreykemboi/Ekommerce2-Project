// backend/config/dbConnect.js (Corrected Version)

import mongoose from 'mongoose';

export const connectDatabase = async () => {
  const uri = process.env.MONGO_URI;

  console.log("Attempting to connect to MongoDB...");

  if (!uri) {
    console.error("MongoDB connection failed: MONGO_URI not found in your .env file.");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};