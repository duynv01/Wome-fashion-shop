import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, message, Row, Col, Input, Spin } from 'antd';

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [shippingProvider, setShippingProvider] = useState('');
  const [status, setStatus] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      // Giả lập gọi API
      const mockOrderData = {
        orderId: orderId || '12345',
        customer: 'Nguyễn Thị A',
        items: ['Áo thun', 'Váy'],
        total: '200000 VNĐ',
        status: 'Chờ xác nhận',
        address: '136 Xuân Thủy, Cầu Giấy, Hầ Nội',
      };

      // Simulate a delay to mimic API call
      setTimeout(() => {
        setOrder(mockOrderData);
        setStatus(mockOrderData.status);
        setAddress(mockOrderData.address);
        setLoading(false);
      }, 1000);
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    message.success('Order updated successfully!');
    // Thực hiện cập nhật thông tin đơn hàng ở đây (gọi API nếu cần)
  };

  const handleDelete = () => {
    message.success('Order deleted successfully!');
    // Thực hiện xóa đơn hàng ở đây (gọi API nếu cần)
  };

  if (loading) return <Spin size="large" style={{ margin: '20px' }} />;
  if (!order) return <div>Không thấy đơn hàng.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Thông tin chi tiết của đơn hàng: {order.orderId}</h2>
      <Row gutter={16}>
        <Col span={12}>
          <div style={{ border: '1px solid #f0f0f0', padding: '16px', borderRadius: '8px', backgroundColor: 'white' }}>
            <h3>Thông tin đơn hàng</h3>
            <p><strong>ID:</strong> {order.orderId}</p>
            <p><strong>Total:</strong> {order.total}</p>
            <p><strong>Items:</strong> {order.items.join(', ')}</p>
            <p><strong>Customer:</strong> {order.customer}</p>
          </div>
        </Col>
        <Col span={12}>
          <div style={{ border: '1px solid #f0f0f0', padding: '16px', borderRadius: '8px', backgroundColor: 'white' }}>
            <h3>Thông tin giao hàng</h3>
            <p><strong>Status:</strong> {isEditing ? (
              <Input 
                value={status} 
                onChange={(e) => setStatus(e.target.value)} 
                style={{ marginTop: '8px' }}
              />
            ) : (
              status
            )}</p>
            <p><strong>Address:</strong> {isEditing ? (
              <Input 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                style={{ marginTop: '8px' }}
              />
            ) : (
              address
            )}</p>
            <p><strong>Đơn vị vận chuyển: </strong>
              {isEditing ? (
                <Input 
                  placeholder="Đơn vị vận chuyển" 
                  value={shippingProvider}
                  onChange={(e) => setShippingProvider(e.target.value)}
                  style={{ marginTop: '8px' }}
                />
              ) : (
                shippingProvider || 'Chưa có thông tin'
              )}
            </p>
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

export default OrderDetail;
