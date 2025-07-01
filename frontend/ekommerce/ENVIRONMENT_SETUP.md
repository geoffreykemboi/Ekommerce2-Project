# Environment Configuration Guide

## 🌐 Dual Environment Setup

This project is configured to automatically switch between development and production API endpoints based on your environment.

### 📁 Environment Files

- `.env` - Main environment variables
- `.env.development` - Development-specific variables  
- `.env.production` - Production-specific variables

### 🔧 API Configuration

The app automatically detects your environment and uses the appropriate API URL:

- **Development**: `http://localhost:4000/api/v1` (when running locally)
- **Production**: `https://ekommerce2-project.onrender.com/api/v1` (when deployed)

### 🚀 Running the Application

#### Development Mode (Local Backend)
```bash
npm run start:dev
# or
npm start
```

#### Production Mode (Remote Backend)
```bash
npm run start:prod
```

#### Building for Different Environments
```bash
# Build for development
npm run build:dev

# Build for production  
npm run build:prod
```

### 🎛️ Environment Switcher

In development mode, you'll see a small environment switcher in the top-right corner that shows:
- Current API URL being used
- Buttons to switch between Local/Prod (for testing)

### 🔍 Debugging

The console will show API configuration details including:
- Current environment
- Hostname
- API URL being used
- Environment detection status

### 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL_DEV` | Development API URL | `http://localhost:4000/api/v1` |
| `REACT_APP_API_URL_PROD` | Production API URL | `https://ekommerce2-project.onrender.com/api/v1` |
| `REACT_APP_ENV` | Override environment detection | Auto-detected |
| `NODE_ENV` | Node environment | Auto-detected |

### 🛠️ How It Works

1. **Automatic Detection**: The app checks `NODE_ENV`, hostname, and custom environment variables
2. **Dynamic Switching**: API URLs are loaded from the centralized config file
3. **Fallback System**: If environment variables are missing, sensible defaults are used
4. **Development Tools**: Environment switcher and console logging help with debugging

### 📋 Troubleshooting

If products aren't loading:
1. Check the console for API configuration logs
2. Verify your backend is running on the expected port
3. Use the environment switcher to test different endpoints
4. Check network tab for API call errors

### 🔄 Backend Requirements

Make sure your backend is running:
```bash
cd backend
npm run dev
```

The backend should be available at `http://localhost:4000`
