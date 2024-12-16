import React, { useState } from 'react';
import { Table, Space, Button, Modal, Select, message } from 'antd';

const DeliveryHistoryList = () => {
  const [deliveries, setDeliveries] = useState([
    {
      orderId: '1',
      email: 'stu715105011@hnue.edu.vn',
      deliveryDate: '2024-09-10',
      status: 'Đã giao hàng',
      shippingUnit: '',
      address: '128 Xuân thủy',
      name: 'Áo thun',
    },
    {
      orderId: '2',
      email: 'stu715105011@hnue.edu.vn',
      deliveryDate: '2024-09-12',
      status: 'Đang giao hàng',
      shippingUnit: '',
      address: '136 Xuân thủy',
      name: 'Quần Jean',
    },
    // Add more deliveries here
  ]);

  const [visible, setVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  // Open modal for updating status
  const handleStatusUpdateClick = (orderId, currentStatus) => {
    setSelectedOrderId(orderId);
    setNewStatus(currentStatus);
    setVisible(true);
  };

  // Handle status change
  const handleStatusChange = (value) => {
    setNewStatus(value);
  };

  // Confirm the status update
  const handleStatusConfirm = () => {
    setDeliveries((prevDeliveries) => {
      return prevDeliveries.map((delivery) => {
        if (delivery.orderId === selectedOrderId) {
          return { ...delivery, status: newStatus };
        }
        return delivery;
      });
    });
    setVisible(false);
    message.success('Cập nhật trạng thái thành công!');
  };

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
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleStatusUpdateClick(record.orderId, record.status)}
          >
            Cập nhật trạng thái
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Lịch sử giao hàng</h2>
      <Table columns={columns} dataSource={deliveries} rowKey="orderId" />

      {/* Modal for status update */}
      <Modal
        title="Cập nhật trạng thái"
        visible={visible}
        onOk={handleStatusConfirm}
        onCancel={() => setVisible(false)}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <Select
          value={newStatus}
          onChange={handleStatusChange}
          style={{ width: '100%' }}
        >
          <Select.Option value="Đang giao hàng">Đang giao hàng</Select.Option>
          <Select.Option value="Đã giao hàng">Đã giao hàng</Select.Option>
          <Select.Option value="Chưa giao hàng">Chưa giao hàng</Select.Option>
          {/* Add more statuses as needed */}
        </Select>
      </Modal>
    </div>
  );
};

export default DeliveryHistoryList;
