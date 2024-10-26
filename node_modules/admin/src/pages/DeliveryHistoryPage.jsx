// src/pages/DeliveryHistoryPage.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DeliveryHistoryList from '../modules/DeliveryHistory/DeliveryHistoryList';
import DeliveryHistoryDetail from '../modules/DeliveryHistory/DeliveryHistoryDetail';

const DeliveryHistoryPage = () => {
  return (
    <Routes>
      <Route index element={<DeliveryHistoryList />} />
      <Route path=":deliveryId" element={<DeliveryHistoryDetail />} />
    </Routes>
  );
};

export default DeliveryHistoryPage;
