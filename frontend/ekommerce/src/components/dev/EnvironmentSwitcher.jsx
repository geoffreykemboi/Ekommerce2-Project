// src/components/dev/EnvironmentSwitcher.jsx
// Development component to easily switch between environments

import React, { useState } from 'react';
import { API_URL, getApiUrlForEnvironment } from '../../config/api';

const EnvironmentSwitcher = () => {
  const [currentEnv, setCurrentEnv] = useState(
    window.location.hostname === 'localhost' ? 'development' : 'production'
  );

  const switchEnvironment = (env) => {
    setCurrentEnv(env);
    // You could implement actual switching logic here if needed
    window.location.reload(); // Simple reload to apply changes
  };

  // Only show in development
  if (process.env.NODE_ENV === 'production' && window.location.hostname !== 'localhost') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: '#333',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>
        🌐 API Environment
      </div>
      <div style={{ marginBottom: '5px', fontSize: '10px' }}>
        Current: {API_URL}
      </div>
      <div>
        <button
          onClick={() => switchEnvironment('development')}
          style={{
            margin: '2px',
            padding: '2px 6px',
            fontSize: '10px',
            background: currentEnv === 'development' ? '#4CAF50' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Local
        </button>
        <button
          onClick={() => switchEnvironment('production')}
          style={{
            margin: '2px',
            padding: '2px 6px',
            fontSize: '10px',
            background: currentEnv === 'production' ? '#4CAF50' : '#666',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Prod
        </button>
      </div>
    </div>
  );
};

export default EnvironmentSwitcher;
