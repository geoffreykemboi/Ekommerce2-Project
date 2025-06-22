// Load environment variables BEFORE any other imports
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/config/config.env' });

import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDatabase } from './config/dbConnect.js';
import errorMiddleware from './middlewares/errors.js';

// Handle uncaught exceptions (synchronous errors)
process.on('uncaughtException', (err) => {
  console.error(`Error: ${err.message}`);
  console.error('Shutting down the server due to uncaught exception');
  process.exit(1);
});

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDatabase();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Import routes
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js';

// Mount routes
app.use('/api/v1/products', productRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1', orderRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections (asynchronous errors)
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  console.error('Shutting down the server due to unhandled promise rejection');

  server.close(() => {
    process.exit(1);
  });
});

export default app;
