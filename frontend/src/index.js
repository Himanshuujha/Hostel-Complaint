// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';
import App from './App';
import { AuthProvider } from './Pages/Auth/context';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
