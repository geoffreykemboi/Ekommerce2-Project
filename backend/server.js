#!/usr/bin/env node

// Set production environment
process.env.NODE_ENV = 'PRODUCTION';

// Import and run the app
import('./app.js')
  .then(() => {
    console.log('✅ Application started successfully in production mode');
  })
  .catch((error) => {
    console.error('❌ Failed to start application:', error);
    process.exit(1);
  });
