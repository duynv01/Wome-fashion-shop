import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { FacebookOutlined, InstagramOutlined, ShoppingOutlined, PhoneOutlined } from '@ant-design/icons';
import './Footer.css';  // Thêm file CSS để tạo hiệu ứng

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Row gutter={[32, 16]} justify="center">
          <Col xs={24} sm={12} md={8} lg={6} className="footer-column">
            <h3 className="footer-title">FIVE M FASHION</h3>
            <p className="footer-text">Địa chỉ: Số 136, Xuân Thủy, Hà Nội</p>
            <p className="footer-text">Điện thoại: 0979026052</p>
            <p className="footer-text">Email: stu715105011@hnue.edu.vn</p>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} className="footer-column">
            <h3 className="footer-title">HỖ TRỢ</h3>
            <ul className="footer-list">
              <li><a href="/" className="footer-link">Chính sách khách hàng</a></li>
              <li><a href="/" className="footer-link">Vận chuyển & đổi trả</a></li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6} className="footer-column">
            <h3 className="footer-title">THÔNG TIN LIÊN HỆ</h3>
            <div className="social-icons">
              <FacebookOutlined className="social-icon facebook" />
              <InstagramOutlined className="social-icon instagram" />
              <ShoppingOutlined className="social-icon shopping" />
              <PhoneOutlined className="social-icon phone" />
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
