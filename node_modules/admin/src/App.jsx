import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './modules/Login/Login'; // Import Login component
import DashboardLayout from './modules/dashboards/DashboardLayout'; // Import layout cho Dashboard
import Dashboard from './modules/dashboards/Dashboard'; // Trang Dashboard
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import DeliveryHistoryPage from './pages/DeliveryHistoryPage';
import CustomersPage from './pages/CustomersPage';
import AccountPage from './pages/AccountPage';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (token, role) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
    setUserRole(role); 
    setIsAuthenticated(true);
    resetIdleTimer();
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
    clearTimeout(idleTimer);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  useEffect(() => {
    document.body.className = isAuthenticated ? 'dashboard-background' : 'login-background';
  }, [isAuthenticated]);

  // const [idleTimer, setIdleTimer] = useState(null);

  // const resetIdleTimer = () => {
  //   if (idleTimer) clearTimeout(idleTimer);

  //   setIdleTimer(setTimeout(() => {
  //     alert("Bạn đã bị đăng xuất do không hoạt động trong 5 phút!");
  //   }, 5 * 60 * 1000));
  // };

  // useEffect(() => {
  //   const activityEvents = ['click', 'keypress', 'mousemove'];
  //   activityEvents.forEach((event) => {
  //     window.addEventListener(event, resetIdleTimer);
  //   });

  //   return () => {
  //     activityEvents.forEach((event) => {
  //       window.removeEventListener(event, resetIdleTimer);
  //     });
  //   };
  // }, [idleTimer]);

  return (
    <Routes>
      <Route 
        path="/" 
        element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/account" />} 
      />
      <Route 
        path="*"
        element={isAuthenticated ? <DashboardLayout/> : <Navigate to="/" />}
      >
        <Route path="account" element={<AccountPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products/*" element={<ProductsPage />} />
        <Route path="orders/*" element={<OrdersPage />} />
        <Route path="delivery-history/*" element={<DeliveryHistoryPage />} />
        <Route path="customers/*" element={<CustomersPage />} />
      </Route>
      {isAuthenticated && (
        <Route path="/logout" element={<Navigate to="/" replace />} />
      )}
    </Routes>
  );
};

export default App;
