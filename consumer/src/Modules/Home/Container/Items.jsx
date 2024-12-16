import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'antd';

const { Meta } = Card;

// Sample data for product items (replace with your own)
const products = [
  {
    id: 1,
    title: 'Sơ mi',
    image: 'https://pos.nvncdn.com/b153ea-53436/ps/20241014_cAEGGZZs1N.jpeg',
    link: '/skirt',
  },
  {
    id: 2,
    title: 'Quần',
    image: 'https://pos.nvncdn.com/b153ea-53436/ps/20241014_cAEGGZZs1N.jpeg',
    link: '/skirt',
  },
  {
    id: 4,
    title: 'Váy',
    image: 'https://pos.nvncdn.com/b153ea-53436/ps/20241014_cAEGGZZs1N.jpeg',
    link: '/floral-dress',
  },
  {
    id: 6,
    title: 'Áo thun',
    image: 'https://pos.nvncdn.com/b153ea-53436/ps/20241014_cAEGGZZs1N.jpeg',
    link: '/chic-combo',
  },
];

// FashionCatalog component to render the fashion items
const Items = () => {
  const navigate = useNavigate();

  const handleCardClick = (link) => {
    navigate(link); // Redirects to the specific route
  };

  return (
    <div style={{ paddingTop: '30px' }}>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <Card
              hoverable
              style={{ width: '100%' }}
              cover={
                <div
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    alt={product.title}
                    src={product.image}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              }
              onClick={() => handleCardClick(product.link)} // Navigates to the specific page on click
            >
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Items;
