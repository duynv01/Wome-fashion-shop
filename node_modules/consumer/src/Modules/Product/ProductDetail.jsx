import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Button, Radio, InputNumber, Divider, Image } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Footer from '../Home/Container/Footer';
import Header from '../Home/Container/Header';
import "./ProductDetail.css"

const { Content } = Layout;
const { Title, Text } = Typography;

const ProductDetail = () => {
  const [selectedColor, setSelectedColor] = useState('Hồng');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const handleAddToCart = () => {
    console.log(`Added to cart: ${quantity} item(s) of size ${selectedSize} and color ${selectedColor}`);
  };

  return (
    <div className="ProductDetail">
        <Header />
        <Layout style={{ padding: '100px', background: '#fff' }}>
        <Content>
            <Row gutter={[32, 32]}>
            <Col xs={24} md={10}>
                <Image
                src="https://pos.nvncdn.com/b153ea-53436/ps/20241014_X2XL3Ch6Uy.jpeg"
                alt="Áo Dài ADM02-569-01"
                style={{ width: '100%', borderRadius: '8px' }}
                />
                <Row gutter={16} style={{ marginTop: '16px' }}>
                <Col span={6}>
                    <Image
                    src="https://pos.nvncdn.com/b153ea-53436/ps/20241014_X2XL3Ch6Uy.jpeg"
                    alt="Thumbnail"
                    style={{ cursor: 'pointer', borderRadius: '4px' }}
                    />
                </Col>
                </Row>
            </Col>
            <Col xs={24} md={14}>
                <Title level={4}>Áo Dài ADM02-569-01</Title>
                <Text strong style={{ fontSize: '20px', color: '#d4380d' }}>
                569,000đ
                </Text>
                <Divider />
                <div>
                <Text strong>Màu sắc:</Text>
                <Radio.Group value={selectedColor} onChange={handleColorChange} style={{ marginLeft: '10px' }}>
                    <Radio.Button value="Hồng">Hồng</Radio.Button>
                    <Radio.Button value="Xanh">Xanh</Radio.Button>
                    <Radio.Button value="Trắng">Trắng</Radio.Button>
                </Radio.Group>
                </div>

                <div style={{ marginTop: '16px' }}>
                <Text strong>Size:</Text>
                <Radio.Group value={selectedSize} onChange={handleSizeChange} style={{ marginLeft: '10px' }}>
                    <Radio.Button value="S">S</Radio.Button>
                    <Radio.Button value="M">M</Radio.Button>
                    <Radio.Button value="L">L</Radio.Button>
                </Radio.Group>
                </div>

                <div style={{ marginTop: '16px' }}>
                <Text strong>Số lượng:</Text>
                <InputNumber
                    min={1}
                    value={quantity}
                    onChange={handleQuantityChange}
                    style={{ marginLeft: '10px', width: '80px' }}
                />
                </div>

                <div style={{ marginTop: '20px' }}>
                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    size="large"
                    style={{ backgroundColor: '#d4380d', borderColor: '#d4380d' }}
                    onClick={handleAddToCart}
                >
                    Thêm vào giỏ
                </Button>
                </div>

                <Divider />

                <Title level={5}>Mô tả</Title>
                <Text>
                - Mã sản phẩm: ADM02-01
                <br />
                - Size: S, M, L
                <br />
                - Màu sắc: Hồng
                <br />
                - Mô tả: Áo dài ngắn tay, tay bồng, có khoét giọt lệ, đính nhiều nơ.
                </Text>
            </Col>
            </Row>
        </Content>
        </Layout>
        <Footer />
    </div>
  );
};

export default ProductDetail;
