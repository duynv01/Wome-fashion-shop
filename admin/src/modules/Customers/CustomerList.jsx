// src/components/Modules/Customers/CustomerList.jsx
import React from 'react';
import { Table, Space, Button } from 'antd';
import { Link } from 'react-router-dom';

const CustomerList = () => {
  const customers = [
    {
      id: '1',
      name: 'Mai Phương Anh',
      email: 'stu715105011@hnue.edu.vn',
      phone: '123456789',
    },
    {
      id: '2',
      name: 'Trần Thái Dương',
      email: 'thaiduongjr4@gmail.com',
      phone: '987654321',
    },
    // Thêm nhiều khách hàng nữa ở đây
  ];

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/customers/${record.id}`}>Chi tiết</Link> {/* Đảm bảo record.key là customerId */}
        </Space>
      ),
    }
  ];

  return (
    <div>
      <h2>Danh sách khách hàng</h2>
      <Table columns={columns} dataSource={customers} />
    </div>
  );
};

export default CustomerList;
