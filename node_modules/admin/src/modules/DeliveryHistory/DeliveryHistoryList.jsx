// src/components/Modules/DeliveryHistory/DeliveryHistoryList.jsx
import React from 'react';
import { Table, Space, Button } from 'antd';
import { Link } from 'react-router-dom';

const DeliveryHistoryList = () => {
  const deliveries = [
    {
      orderId: '1',
      email: 'example@123.com',
      deliveryDate: '2024-09-10',
      status: 'Đã giao hàng',
      shippingUnit: 'Giao hàng nhanh',
      address: '128 Xuân thủy',
      name: 'Áo thun'
    },
    {
      orderId: '2',
      email: 'example@456.com',
      deliveryDate: '2024-09-12',
      status: 'Đang giao hàng',
      shippingUnit: 'Giao hàng nhanh',
      address: '136 Xuân thủy',
      name: 'Quần Jean'
    },
    // Thêm nhiều lịch sử giao hàng nữa ở đây
  ];

  const columns = [
    {
      title: '#',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày giao hàng',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Đơn vị vận chuyển',
      dataIndex: 'shippingUnit',
      key: 'shippingUnit',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div>
      <h2>Lịch sử giao hàng</h2>
      <Table columns={columns} dataSource={deliveries} />
    </div>
  );
};

export default DeliveryHistoryList;
