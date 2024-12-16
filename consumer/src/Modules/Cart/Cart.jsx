import React, { useEffect, useState } from "react";
import { Table, Button, InputNumber, Typography, Row, Col, message } from "antd";
import Header from "../Home/Container/Header";
import Footer from "../Home/Container/Footer";
import './Cart.css'
import { useNavigate } from "react-router-dom";const Cart = () => {

    const mockCartData = [
  {
    id: 1,
    name: "Chân váy ngắn vải",
    code: "ATN001",
    image: "https://pos.nvncdn.com/b153ea-53436/ps/20241014_cAEGGZZs1N.jpeg",
    price: 299000,
    quantity: 2,
  },
  {
    id: 2,
    name: "Chân váy ngắn dạ",
    code: "QJN002",
    image: "https://pos.nvncdn.com/b153ea-53436/ps/20241001_BzF7Fi53GP.jpeg",
    price: 329000,
    quantity: 1,
  },
];

  const { Text } = Typography;

  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || mockCartData;
    setCartItems(storedCart);
  }, []);

  const updateCartInLocalStorage = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (value, itemId) => {
    const updatedItems = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: value } : item
    );
    updateCartInLocalStorage(updatedItems);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = cartItems.filter((item) => item.id !== itemId);
    updateCartInLocalStorage(updatedItems);
  };

  const handleCheckout = () => {
    navigate("/checkout");
    setTimeout(() => {
      localStorage.removeItem("cart");
      setCartItems([]);
    }, 1000);
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <Row>
          <Col>
            <img
              src={record.image}
              alt={record.name}
              style={{ width: "100px", height: "auto" }}
            />
          </Col>
          <Col style={{ paddingLeft: "16px" }}>
            <Text strong style={{ paddingRight: "10px"}}>{record.name}</Text>
            <Text type="secondary">MSP: {record.code}</Text>
          </Col>
        </Row>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          defaultValue={quantity}
          onChange={(value) => handleQuantityChange(value, record.id)}
        />
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "price",
      key: "price",
      render: (price, record) => (
        <Text strong style={{ color: "red" }}>
          {(price * record.quantity).toLocaleString("vi-VN")} đ
        </Text>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          danger
          onClick={() => handleRemoveItem(record.id)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div className="Cart-page">
        <Header />
        <div style={{ padding: "24px", backgroundColor: "white", marginTop: "50px" }}>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
            GIỎ HÀNG
        </Typography.Title>

        <Row gutter={[16, 16]} style={{ marginLeft: "10vw" }}>
            {/* Bảng sản phẩm */}
            <Col span={18}>
            <Table
                dataSource={cartItems}
                columns={columns}
                pagination={false}
                rowKey="id"
                style={{ width: "60vw" }}
            />
            </Col>
            <Col span={8}>
            <div
                style={{
                border: "1px solid #e8e8e8",
                borderRadius: "8px",
                padding: "16px",
                }}
            >
                <Typography.Title level={4}>Thông tin đơn hàng</Typography.Title>
                <div style={{ marginBottom: "16px" }}>
                </div>
                <div style={{ marginBottom: "16px" }}>
                <Text>Tổng tiền:</Text>
                <Text strong style={{ float: "right", color: "red" }}>
                    {totalAmount.toLocaleString("vi-VN")} đ
                </Text>
                </div>
                <div style={{ textAlign: "center" }}>
                </div>
                <Button
                type="primary"
                block
                style={{ marginTop: "16px" }}
                onClick={handleCheckout}
                >
                THANH TOÁN
                </Button>
            </div>
            </Col>
        </Row>
        </div>
        <Footer />
    </div>
  );
};

export default Cart;
