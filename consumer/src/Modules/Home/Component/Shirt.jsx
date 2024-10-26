import React from 'react';
import { Layout, Menu, Breadcrumb, Row, Col, Card, Typography, Button } from 'antd';
import Header from '../Container/Header';
import Footer from '../Container/Footer';

const { Content } = Layout;
const { Title } = Typography;

const Shirt = () => {
  const products = [
    {
      imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241018_7PYXHYEqT3.jpeg',
      title: 'Áo Dài ADH78-899',
    },
    {
      imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241014_X2XL3Ch6Uy.jpeg',
      title: 'Áo Dài ADM02-569',
    },
    {
      imageUrl: 'https://pos.nvncdn.com/b153ea-53436/ps/20241017_6CievkXB33.jpeg',
      title: 'Áo Gile Len 6329-359',
    },
  ];

  return (
    <Layout className="layout">
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item>Áo</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col key={product.title} span={8}>
                <Card
                  hoverable
                  cover={<img alt={product.title} src={product.imageUrl} />}
                >
                  <Card.Meta
                    title={< Typography.Text strong>{product.title}</Typography.Text>}
                  />
                  <Button type="primary">Mua ngay</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};

export default Shirt;