import React from 'react';
import { Row, Col, Card, Carousel } from 'antd';

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

// Helper function to group products into arrays of 4 items
const groupProducts = (products, itemsPerSlide) => {
  const grouped = [];
  for (let i = 0; i < products.length; i += 1) {
    grouped.push(products.slice(i, i + itemsPerSlide));
  }
  return grouped;
};

const BestSeller = () => {
  // Group products into chunks of 4
  const groupedProducts = groupProducts(products, 4);

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ textAlign: 'center' }}>SẢN PHẨM BÁN CHẠY</h1>
      <Carousel arrows={true} autoplay dots={true}>
        {groupedProducts.map((group, index) => (
          <div key={index}>
            <Row gutter={[16, 16]}>
              {group.map((product) => (
                <Col xs={24} sm={12} md={12} lg={6} key={product.id}>
                  <Card
                    hoverable
                    style={{ width: '100%' }}
                    cover={
                      <img
                        alt={product.title}
                        src={product.image}
                        style={{ height: '400px', objectFit: 'cover' }}
                      />
                    }
                  >
                    <Meta title={product.title} description={product.price} />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BestSeller;
