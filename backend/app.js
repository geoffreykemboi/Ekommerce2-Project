// backend/app.js (The Final Correct Version)

import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. CONFIGURE DOTENV FIRST!
// This simple version automatically finds the .env file in the current directory.
dotenv.config();

// 2. NOW, IMPORT YOUR OTHER MODULES
import { connectDatabase } from './config/dbConnect.js';
import errorMiddleware from './middlewares/errors.js';
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import orderRoutes from './routes/order.js';

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(`ERROR: ${err.stack}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1);
});

// Initialize Express app
const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:3000",
  "https://ekommerce2-project.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// API routes
app.use('/api/v1', authRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', orderRoutes);

// Connect to the database
connectDatabase();

// Production deployment logic
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Error handling middleware
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`ERROR: ${err.stack}`);
  server.close(() => {
    process.exit(1);
  });
});

export default app;