import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/dbConnect.js';
import errorMiddleware from "./middlewares/errors.js";
import cookieParser from 'cookie-parser';

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.error("Shutting down the server due to an uncaught exception");
  process.exit(1);
});

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config({ path: "backend/config/config.env" });

// Connect to the database
connectDatabase();

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser()); // Middleware to parse cookies

// Import routes
import productRoutes from './routes/products.js';   // Import product routes
import authRoutes from './routes/auth.js';         // Import auth routes
import orderRoutes from './routes/order.js';       // Import order routes

// Mount routes correctly
app.use("/api/v1/products", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes); // Ensures order routes are correctly prefixed

// Error handling middleware (should be placed after all routes)
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  console.error("Shutting down the server due to an unhandled promise rejection");
  process.exit(1);
});

// Export the app for testing purposes
export default app;
