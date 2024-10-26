import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Row, Col, Input, Spin, message } from 'antd';

const CustomerDetail = () => {
  const { customerId } = useParams();
  
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchCustomerDetails = () => {
      // Giả lập dữ liệu khách hàng
      const mockCustomers = {
        '1': {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '123456789',
          address: '123 Main St, Springfield',
          orders: 5,
        },
        '2': {
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '987654321',
          address: '456 Elm St, Springfield',
          orders: 3,
        },
      };

      const foundCustomer = mockCustomers[customerId];

      if (foundCustomer) {
        setCustomer(foundCustomer);
        setName(foundCustomer.name);
        setPhone(foundCustomer.phone);
        setAddress(foundCustomer.address);
      } else {
        message.error('Không tìm thấy thông tin khách hàng.');
      }
      setLoading(false);
    };

    fetchCustomerDetails();
  }, [customerId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Cập nhật thông tin khách hàng (có thể gọi API ở đây)
    message.success('Thông tin khách hàng đã được cập nhật!');
    setIsEditing(false);
  };

  if (loading) return <Spin size="large" style={{ margin: '20px' }} />;
  if (!customer) return <div>Không tìm thấy thông tin khách hàng.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Chi tiết khách hàng</h2>
      <Row gutter={16}>
        <Col span={12}>
          <div style={{ border: '1px solid #f0f0f0', padding: '16px', borderRadius: '8px', backgroundColor: 'white' }}>
            <h3>Thông tin cá nhân</h3>
            <p><strong>Tên:</strong> {isEditing ? (
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                style={{ marginTop: '8px' }}
              />
            ) : (
              name
            )}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Số điện thoại:</strong> {isEditing ? (
              <Input 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                style={{ marginTop: '8px' }}
              />
            ) : (
              phone
            )}</p>
            <p><strong>Địa chỉ:</strong> {isEditing ? (
              <Input 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                style={{ marginTop: '8px' }}
              />
            ) : (
              address
            )}</p>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ border: '1px solid #f0f0f0', padding: '16px', borderRadius: '8px', backgroundColor: 'white' }}>
            <h3>Thông tin mua hàng</h3>
            <p><strong>Số đơn hàng đã mua:</strong> {customer.orders}</p>
          </div>
        </Col>
      </Row>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button 
          type="primary" 
          onClick={isEditing ? handleSave : handleEdit}
          style={{ marginRight: '10px' }}
        >
          {isEditing ? 'Lưu' : 'Chỉnh sửa'}
        </Button>
      </div>
    </div>
  );
};

export default CustomerDetail;
