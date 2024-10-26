import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './modules/Login/Login';
import DashboardLayout from './modules/dashboards/DashboardLayout';
import Dashboard from './modules/dashboards/Dashboard';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import DeliveryHistoryPage from './pages/DeliveryHistoryPage';
import CustomersPage from './pages/CustomersPage';
import AccountPage from './pages/AccountPage';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Cập nhật class cho body dựa trên trạng thái đăng nhập
  useEffect(() => {
    document.body.className = isAuthenticated ? 'dashboard-background' : 'login-background';
  }, [isAuthenticated]);

  return (
    <Routes>
      {/* Route đăng nhập */}
      <Route path="/" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/account" />} />

      {/* Route cho DashboardLayout */}
      <Route
        path="*"
        element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/" />}
      >
        {/* Các route con bên trong DashboardLayout */}
        <Route path="account" element={<AccountPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products/*" element={<ProductsPage />} />
        <Route path="orders/*" element={<OrdersPage />} />
        <Route path="delivery-history/*" element={<DeliveryHistoryPage />} />
        <Route path="customers/*" element={<CustomersPage />} />
      </Route>
    </Routes>
  );
};

export default App;
