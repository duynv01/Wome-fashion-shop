import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { FacebookOutlined, InstagramOutlined, ShoppingOutlined, PhoneOutlined } from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: '#f9f9f9', padding: '40px 0', borderTop: '1px solid #ddd' }}>
      <div className="footer-top">
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={6}>
            <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>FIVE M FASHION</h3>
            <p>Địa chỉ: Số 136, Xuân Thủy, Hà Nội</p>
            <p>Điện thoại: 0979026052</p>
            <p>Email: stu715105011@hnue.edu.vn</p>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>HỖ TRỢ</h3>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="/" style={{ color: '#555', textDecoration: 'none' }}>Chính sách khách hàng</a></li>
              <li style={{ marginBottom: '10px' }}><a href="/" style={{ color: '#555', textDecoration: 'none' }}>Vận chuyển & đổi trả</a></li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>THÔNG TIN LIÊN HỆ</h3>
            <div className="social-icons" style={{ marginBottom: '20px' }}>
              <FacebookOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#4267B2' }} />
              <InstagramOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#E1306C' }} />
              <ShoppingOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#000' }} />
              <PhoneOutlined style={{ fontSize: '24px', marginRight: '10px', color: '#34B7F1' }} />
            </div>
            <p style={{ marginBottom: '10px' }}>Đăng kí nhận thông tin ưu đãi:</p>
            <Input.Group compact>
              <Input style={{ width: '70%' }} placeholder="Email của bạn" />
              <Button type="primary">Gửi</Button>
            </Input.Group>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
