// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Cập nhật import
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')); // Sử dụng createRoot
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
