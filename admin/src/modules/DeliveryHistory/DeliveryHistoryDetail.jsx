// src/components/Modules/DeliveryHistory/DeliveryHistoryDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Button } from 'antd';

const DeliveryHistoryDetail = () => {
  const { deliveryId } = useParams();
  
  const delivery = {
    orderId: '1',
    deliveryDate: '2024-09-10',
    status: 'Delivered',
    address: '456 Elm St, Springfield',
    items: ['Product A', 'Product B'],
  };

  return (
    <div>
      <h2>Thông tin chi tiết lịch sử giao hàng của đơn hàng: {delivery.orderId}</h2>
      <Descriptions bordered>
        <Descriptions.Item label="Order ID">{delivery.orderId}</Descriptions.Item>
        <Descriptions.Item label="Delivery Date">{delivery.deliveryDate}</Descriptions.Item>
        <Descriptions.Item label="Status">{delivery.status}</Descriptions.Item>
        <Descriptions.Item label="Address">{delivery.address}</Descriptions.Item>
        <Descriptions.Item label="Items">{delivery.items.join(', ')}</Descriptions.Item>
      </Descriptions>
      <Button type="primary" style={{ marginTop: '20px' }}>Edit Delivery</Button>
    </div>
  );
};

export default DeliveryHistoryDetail;
