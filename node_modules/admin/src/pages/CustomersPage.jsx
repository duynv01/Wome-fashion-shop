// src/pages/CustomersPage.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomerList from '../modules/Customers/CustomerList';
import CustomerDetail from '../modules/Customers/CustomerDetail';

const CustomersPage = () => {
  return (
    <Routes>
      <Route index element={<CustomerList />} />
      <Route path=":customerId" element={<CustomerDetail />} />
    </Routes>
  );
};

export default CustomersPage;
