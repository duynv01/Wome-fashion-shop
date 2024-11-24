import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import './BestSeller.css'; // Tạo một file CSS cho các hiệu ứng

const { Meta } = Card;

// Sample product data
const products = [
  {
    id: 1,
    title: 'CHÂN VÁY NGẮN VẢI CH48-299',
    price: '299,000 ₫',
    image: 'https://pos.nvncdn.com/b153ea-53436/ps/20241014_cAEGGZZs1N.jpeg',
  },
  {
    id: 2,
    title: 'CHÂN VÁY DÀI VẢI CH49-429',
    price: '429,000 ₫',
    image: 'https://pos.nvncdn.com/b153ea-53436/ps/20241001_BzF7Fi53GP.jpeg',
  },
  {
    id: 3,
    title: 'CHÂN VÁY NGẮN VẢI CH51-329',
    price: '329,000 ₫',
    image: 'https://pos.nvncdn.com/b153ea-53436/ps/20241001_6ltFc5WqN8.jpeg',
  },
  {
    id: 4,
    title: 'CHÂN VÁY NGẮN VẢI CVO11-299',
    price: '299,000 ₫',
    image: 'https://pos.nvncdn.com/b153ea-53436/ps/20241001_6ltFc5WqN8.jpeg',
  },
  {
    id: 5,
    title: 'Đầm tay ngắn',
    price: '299,000 ₫',
    image: 'https://pos.nvncdn.com/b153ea-53436/ps/20241001_amGuSfR2pl.jpeg',
  },
  {
    id: 6,
    title: 'Áo kiểu ngắn tay',
    price: '299,000 ₫',
    image: 'https://pos.nvncdn.com/b153ea-53436/ps/20240624_61hpCawsuk.jpeg',
  },
];

// Hàm để lấy nhóm sản phẩm 4 cái
const groupProducts = (products, itemsPerSlide) => {
  const grouped = [];
  for (let i = 0; i < products.length; i += 1) {
    grouped.push(products.slice(i, i + itemsPerSlide));
  }
  return grouped;
};

const BestSeller = () => {
  const [currentProducts, setCurrentProducts] = useState(products.slice(0, 4)); // Ban đầu hiển thị 4 sản phẩm đầu tiên

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProducts((prevProducts) => {
        const nextProducts = [
          ...prevProducts.slice(1), // Loại bỏ sản phẩm đầu tiên
          products[(products.indexOf(prevProducts[prevProducts.length - 1]) + 1) % products.length], // Thêm sản phẩm tiếp theo
        ];
        return nextProducts;
      });
    }, 3000); // Cập nhật mỗi 3 giây

    return () => clearInterval(interval); // Dọn dẹp khi component bị unmount
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <h1 style={{ textAlign: 'center' }}>SẢN PHẨM BÁN CHẠY</h1>
      <Row gutter={[16, 16]} className="products-wrapper">
        {currentProducts.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              style={{ width: '100%' }}
              cover={<img alt={product.title} src={product.image} style={{ height: '400px', objectFit: 'cover' }} />}
            >
              <Meta title={product.title} description={product.price} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BestSeller;
