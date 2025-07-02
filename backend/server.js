#!/usr/bin/env node

// Load environment variables FIRST
import dotenv from 'dotenv';
dotenv.config();

// Set production environment (only if not already set)
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'PRODUCTION';
}

// Import and run the app
import('./app.js')
  .then(() => {
    console.log('✅ Application started successfully in production mode');
  })
  .catch((error) => {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  });
