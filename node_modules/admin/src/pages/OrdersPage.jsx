// src/pages/OrdersPage.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OrderList from '../modules/Orders/OrderList';
import OrderDetail from '../modules/Orders/OrderDetail';

const OrdersPage = () => {
  return (
    <Routes>
      <Route index element={<OrderList />} />
      <Route path=":orderId" element={<OrderDetail />} />
    </Routes>
  );
};

export default OrdersPage;
