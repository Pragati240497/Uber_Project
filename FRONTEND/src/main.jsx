// src/main.jsx
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './Context/UserContext.jsx';
import { CaptainProvider } from './Context/CaptainContext.jsx';
import SocketProvider from './Context/SocketContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import axios from 'axios';
import { MapProvider } from './Context/MapProvider.jsx'; // adjust path as needed

// Axios interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <UserProvider>
        <CaptainProvider>
          <BrowserRouter>
            <SocketProvider>
              <MapProvider>
                <App />
              </MapProvider>
            </SocketProvider>
          </BrowserRouter>
        </CaptainProvider>
      </UserProvider>
    </ErrorBoundary>
  </StrictMode>
);
