# Production Deployment Guide

## Render.com Deployment

### Required Environment Variables in Render:
- `NODE_ENV=PRODUCTION`
- `MONGO_URI=your_production_mongodb_connection_string`
- `JWT_SECRET=your_jwt_secret_key`
- `JWT_EXPIRES_TIME=7d`
- `COOKIE_EXPIRES_TIME=7`
- `CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name`
- `CLOUDINARY_API_KEY=your_cloudinary_api_key`
- `CLOUDINARY_API_SECRET=your_cloudinary_api_secret`
- `SMTP_HOST=your_smtp_host`
- `SMTP_PORT=587`
- `SMTP_EMAIL=your_email`
- `SMTP_PASSWORD=your_email_password`
- `SMTP_FROM_EMAIL=your_from_email`
- `SMTP_FROM_NAME=Ekommerce`

### Deployment Steps:
1. Connect your GitHub repository to Render
2. Set the build command: `npm install`
3. Set the start command: `npm start`
4. Add all required environment variables
5. Deploy!

### Health Check:
Once deployed, check: `https://your-app.onrender.com/health`

### CORS Configuration:
The backend is configured to accept requests from:
- http://localhost:3000 (development)
- https://ekommerce2-project.vercel.app (production frontend)

Make sure your frontend URL matches the CORS allowedOrigins in app.js.
