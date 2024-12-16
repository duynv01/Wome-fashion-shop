// src/components/Auth/Login.jsx
import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, message, Modal } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const mockUser = {
  username: "admin",
  password: "123456",
};

const Login = () => {
  useEffect(() => {
    document.body.classList.add("login-background");
    return () => {
      document.body.classList.remove("login-background");
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle login form submission
  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (values.username === mockUser.username && values.password === mockUser.password) {
        message.success("Login successful");
        navigate("/dashboard");
      } else {
        message.error("Incorrect username or password");
      }
      setLoading(false);
    }, 1000); // Simulate API call
  };

  // Function to handle opening the Forgot Password modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle closing the Forgot Password modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to handle password reset form submission
  const handlePasswordReset = (values) => {
    setEmailLoading(true);
    setTimeout(() => {
      message.success("Email đã được gửi! Vui lòng kiểm tra hộp thư của bạn.");
      setEmailLoading(false);
      setIsModalVisible(false);
    }, 1000); // Simulate sending reset email
  };

  return (
    <div className="login-container">
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
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{ backgroundColor: "black", color: "white" }}
          >
            Đăng nhập
          </Button>
          Hoặc <a href="/register" style={{ color: "black" }}>Đăng ký ngay!</a>
        </Form.Item>
        <Form.Item>
          <a onClick={showModal} style={{ color: "black", cursor: "pointer" }}>
            Quên mật khẩu?
          </a>
        </Form.Item>
      </Form>

      {/* Forgot Password Modal */}
      <Modal
        title="Quên mật khẩu"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="forgot_password"
          onFinish={handlePasswordReset}
          className="auth-form"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Nhập email của bạn" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={emailLoading}
              style={{ backgroundColor: "black", color: "white" }}
            >
              Gửi yêu cầu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
