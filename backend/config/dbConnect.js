import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from config/config.env
dotenv.config({ path: './config/config.env' });

export const connectDatabase = async () => {
  const uri = process.env.MONGO_URI;

  console.log("MongoDB URI from config/config.env:", uri); // 

  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
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


