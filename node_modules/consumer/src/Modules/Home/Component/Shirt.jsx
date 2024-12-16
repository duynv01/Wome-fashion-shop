import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Breadcrumb, Card, Typography, Button, Pagination } from 'antd';
import Header from '../Container/Header';
import Footer from '../Container/Footer';
import './Shirt.css'

const { Content } = Layout;

const Shirt = () => {
  const nagitive = useNavigate();
  const products = [
    { id: 1, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241018_7PYXHYEqT3.jpeg', title: 'Áo Dài ADH78-899' },
    { id: 2, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241014_X2XL3Ch6Uy.jpeg', title: 'Áo Dài ADM02-569' },
    { id: 3, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg', title: 'Áo Gile Len 6329-359' },
    { id: 4, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241121_iM309snLp7.jpeg', title: 'Áo Gile Len 6329-359' },
    { id: 5, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg', title: 'Áo Gile Len 6329-359' },
    { id: 6, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg', title: 'Áo Gile Len 6329-359' },
    { id: 7, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg', title: 'Áo Gile Len 6329-359' },
    { id: 8, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg', title: 'Áo Gile Len 6329-359' },
    { id: 9, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg', title: 'Áo Gile Len 6329-359' },
    { id: 10, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg', title: 'Áo Gile Len 6329-359' },
    { id: 2, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg', title: 'Áo Gile Len 6329-359' },
    { id: 2, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg', title: 'Áo Gile Len 6329-359' },
    { id: 2, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg', title: 'Áo Gile Len 6329-359' },
    { id: 2, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg', title: 'Áo Gile Len 6329-359' },
    { id: 2, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg', title: 'Áo Gile Len 6329-359' },
    { id: 2, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg', title: 'Áo Gile Len 6329-359' },
    { id: 2, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg', title: 'Áo Gile Len 6329-359' },
    { id: 2, imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg', title: 'Áo Gile Len 6329-359' },
  ];

  // Số lượng sản phẩm mỗi trang
  const itemsPerPage1 = 12; // Trang 1 hiển thị 12 sản phẩm
  const itemsPerPage2 = 4; // Trang 2 hiển thị 4 sản phẩm

  // State để quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Hàm tính toán các sản phẩm cho mỗi trang
  const getCurrentProducts = () => {
    if (currentPage === 1) {
      return products.slice(0, itemsPerPage1); // Trang 1 hiển thị 12 sản phẩm đầu
    } else if (currentPage === 2) {
      return products.slice(itemsPerPage1, itemsPerPage1 + itemsPerPage2); // Trang 2 hiển thị 4 sản phẩm
    }
    return [];
  };

  // Hàm thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page); // Cập nhật trang hiện tại
  };

  const buyNow = (id) => {
    nagitive(`/product/${id}`);
  }

  return (
    <Layout className="layout">
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              <Link to="/">
                Trang chủ
              </Link>
            </Breadcrumb.Item>
          <Breadcrumb.Item>Áo</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          {/* Hiển thị sản phẩm cho trang hiện tại */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)', // 4 cột trong mỗi hàng
              gap: '16px', // Khoảng cách giữa các ảnh
            }}
          >
            {getCurrentProducts().map((product, index) => (
              <Card
                key={index}
                hoverable
                cover={<img alt={product.title} src={product.imageUrl} style={{ width: '100%', height: 'auto' }} />}
                style={{ marginBottom: '20px' }}
              >
                <Card.Meta
                  title={<Typography.Text strong>{product.title}</Typography.Text>}
                />
                <Button type="primary" style={{ marginTop: '10px' }}
                        onClick={() => buyNow(product.id)}
                >
                  Mua ngay
                </Button>
              </Card>
            ))}
          </div>

          {/* Phân trang */}
          <div style={{ display:'flex', justifyContent:'center' }}>
            <Pagination
              current={currentPage} 
              pageSize={itemsPerPage1}
              total={products.length}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Shirt;
