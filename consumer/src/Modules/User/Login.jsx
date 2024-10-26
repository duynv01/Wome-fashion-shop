import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const mockUser = {
  username: "admin",
  password: "123456",
};

const Login = () => {
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

    // Mock kiểm tra dữ liệu đăng nhập
    setTimeout(() => {
      if (values.username === mockUser.username && values.password === mockUser.password) {
        message.success("Login successful");
        navigate("/dashboard");
      } else {
        message.error("Incorrect username or password");
      }
      setLoading(false);
    }, 1000); // giả lập thời gian gọi API
  };

  return (
    <div className="login-container ">
      <Form name="login_form" onFinish={onFinish} className="auth-form">
        <h2>Đăng nhập</h2>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item>
          <Checkbox>Ghi nhớ</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block style={{ backgroundColor: 'black', color: 'white' }}>
            Đăng nhập
          </Button>
          Hoặc <a href="/register" style={{ color: 'black' }}>Đăng ký ngay!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
