// src/components/Modules/Orders/OrderList.jsx
import React from 'react';
import { Table, Space, Button } from 'antd';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const orders = [
    {
      orderId: '1',
      customer: 'Nguyễn Thị A',
      total: '200000 VNĐ',
      status: 'Chờ xác nhận',
    },
    {
      orderId: '2',
      customer: 'Nguyễn Thị B',
      total: '30000000 VNĐ',
      status: 'Đang gửi',
    },
    // Thêm nhiều đơn hàng nữa ở đây
  ];

  const columns = [
    {
      title: '#',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Tổng tiền thanh toán',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/orders/${record.orderId}`}>Chi tiết</Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Danh sách đơn hàng</h2>
      <Table columns={columns} dataSource={orders} />
    </div>
  );
};

export default OrderList;
