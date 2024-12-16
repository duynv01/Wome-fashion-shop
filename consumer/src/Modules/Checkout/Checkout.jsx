import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, List, Typography, Card, Radio } from "antd";
import Footer from "../Home/Container/Footer";
import Header from "../Home/Container/Header";
import "./Checkout.css";

const { Option } = Select;

const Checkout = () => {
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

  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Default là COD

  // Lấy dữ liệu từ localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("Cart")) || mockCartData;
    setCartItems(storedCart);

    // Tính tổng giá
    const total = storedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  }, []);

  const handleSubmit = (values) => {
    console.log("Submitted:", values, "Phương thức thanh toán:", paymentMethod);
    alert("Đặt hàng thành công!");
  };

  return (
    <div className="check-out">
      <Header />
      <div style={{ padding: "40px", maxWidth: "1200px", margin: "auto" }}>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          FIVEM Fashion - Thanh Toán
        </Typography.Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={(errorInfo) => {
            console.log("Failed:", errorInfo); // In thông báo lỗi nếu form không hợp lệ
          }}
          style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
        >
          <div style={{ flex: "1", minWidth: "400px" }}>
            <Typography.Title level={4}>Thông tin giao hàng</Typography.Title>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
              >
                <Input placeholder="Nguyễn Văn A" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
              >
                <Input placeholder="0123456789" />
              </Form.Item>
            </div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <Input placeholder="123 Đường ABC, Phường XYZ" />
              </Form.Item>
              <Form.Item
                label="Tỉnh/ Thành phố"
                name="city"
                rules={[{ required: true, message: "Vui lòng chọn tỉnh/ thành phố" }]}
              >
                <Select placeholder="Chọn Tỉnh/ Thành phố">
                  <Option value="hanoi">Hà Nội</Option>
                  <Option value="hochiminh">Hồ Chí Minh</Option>
                  <Option value="danang">Đà Nẵng</Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          <div style={{ flex: "1", minWidth: "400px" }}>
            <Typography.Title level={4}>Giỏ hàng</Typography.Title>
            <List
              bordered
              dataSource={cartItems}
              renderItem={(item) => (
                <List.Item>
                  <img
                    src={item.image}
                    alt=""
                    style={{ width: "50px", height: "100px", marginRight: "10px" }}
                  />
                  <Card
                    title={item.name}
                    extra={`x${item.quantity}`}
                    style={{ width: "100%" }}
                  >
                    <p>Giá: {item.price.toLocaleString()} VND</p>
                    <p>Tổng: {(item.price * item.quantity).toLocaleString()} VND</p>
                  </Card>
                </List.Item>
              )}
            />
            <Typography.Title level={5} style={{ marginTop: "20px" }}>
              Tổng cộng: {totalPrice.toLocaleString()} VND
            </Typography.Title>
          </div>

          {/* Phương thức thanh toán */}
          <div style={{ marginTop: "20px" }}>
            <Typography.Title level={4}>Phương thức thanh toán</Typography.Title>
            <Radio.Group
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Radio value="cod">COD - Thanh toán khi nhận hàng</Radio>
              <Radio value="bank">Chuyển khoản ngân hàng</Radio>
            </Radio.Group>
            {paymentMethod === "cod" && (
              <Card style={{ marginTop: "20px" }}>
                <Typography.Title level={5}>Lưu ý cho COD</Typography.Title>
                <p>
                  <strong>Giao hàng nhận tiền:</strong> Quý khách vui lòng chuẩn bị đủ
                  tiền mặt để thanh toán khi nhận hàng.
                </p>
                <p>
                  Nhân viên giao hàng sẽ liên hệ trước khi giao. Hãy giữ điện thoại trong
                  trạng thái liên lạc được.
                </p>
              </Card>
            )}
            {paymentMethod === "bank" && (
              <Card style={{ marginTop: "20px" }}>
                <div style={{ display: "flex" }}>
                  <div>
                    <p>
                      <strong>Chuyển khoản ngân hàng:</strong>
                    </p>
                    <p>
                      Khách hàng vui lòng chuyển khoản theo nội dung: <br />
                      <strong>* Tên + SĐT</strong>
                    </p>
                    <p>
                      Ngân hàng: Techcombank <br />
                      STK: <strong>19037998295019</strong> <br />
                      Chủ TK: <strong>Trần Thái Dương</strong>
                    </p>
                  </div>
                  <img
                    src="https://img.vietqr.io/image/TCB-19037998295019-compact.png"
                    alt=""
                    style={{ width: "200px", height: "200px" }}
                  />
                </div>
              </Card>
            )}
            <Button type="primary" htmlType="submit" style={{ marginTop: "20px" }}>
              Hoàn tất đơn hàng
            </Button>
          </div>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
