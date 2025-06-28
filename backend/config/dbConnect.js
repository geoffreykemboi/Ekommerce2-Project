import mongoose from 'mongoose';
import dotenv from 'dotenv';

// This will now automatically find the .env file in your backend directory
dotenv.config();

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

//import mongoose from "mongoose";

//export const connectDatabase = async () => {
  //let DB_URI = "mongodb://localhost:27017/ekommerce";

  //if (process.env.NODE_ENV === "DEVELOPMENT") DB_URI = process.env.DB_LOCAL_URI;
 // if (process.env.NODE_ENV === "PRODUCTION") DB_URI = process.env.DB_URI;

  //if (!DB_URI) {
    //console.error("MongoDB URI is missing. Check your environment variables.");
   // process.exit(1);
  //}

  //await mongoose.connect(DB_URI).then((con) => {
   // console.log(`MongoDB Database connected with HOST: ${con?.connection?.host}`);
  //});
//};


