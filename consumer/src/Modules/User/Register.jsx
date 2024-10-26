import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Register = () => {

    useEffect(() => {
        // Thêm lớp `login-background` vào body khi component mount
        document.body.classList.add("login-background");
    
        // Xóa lớp `login-background` khi component unmount
        return () => {
     document.body.classList.remove("login-background");
    };
    }, []);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = (values) => {
    setLoading(true);

    // Mock đăng ký thành công
    setTimeout(() => {
      message.success("Registration successful");
      navigate("/login");
      setLoading(false);
    }, 1000); // giả lập thời gian gọi API
  };

  return (
    <div className="login-container">
      <Form name="register_form" onFinish={onFinish} className="auth-form">
        <h2>Đăng ký</h2>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, type: "email", message: "Please input your email!" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block style={{ backgroundColor: 'black', color: 'white' }}>
            Đăng ký
          </Button>
          Or <a href="/" style={{ color: 'black' }}>Đăng nhập ngay!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
