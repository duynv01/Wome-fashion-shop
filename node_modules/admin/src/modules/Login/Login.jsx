import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Alert, Typography } from 'antd';
import './Login.css'; // Import file CSS

const { Text } = Typography;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State để theo dõi trạng thái đăng nhập

  const DUMMY_USER = {
    username: 'testuser',
    password: 'password123',
  };

  const handleSubmit = async (values) => {
    const { username, password } = values;

    if (username === DUMMY_USER.username && password === DUMMY_USER.password) {
      setIsLoggedIn(true); // Cập nhật trạng thái đăng nhập
      onLogin();
    } else {
      setError('Sai mật khẩu');
    }
  };

  const handleForgotPassword = async (values) => {
    const { email } = values;

    try {
      await axios.post('/api/forgot-password', { email });
      alert('Mật khẩu mới sẽ được gửi tới email của bạn.');
      setShowForgotPassword(false);
    } catch (err) {
      setError('Lỗi gửi mật khẩu');
    }
  };

  return (
    <div className={isLoggedIn ? "logged-in" : "login-container"}>
      {!showForgotPassword ? (
        <Form onFinish={handleSubmit} layout="vertical">
          <h2 style={{ textAlign:'center' }}>Đăng nhập tài khoản</h2>
          <Form.Item label="Tên đăng nhập" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          {error && <Alert message={error} type="error" />}
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: 'black' }}>
              Đăng nhập
            </Button>
          </Form.Item>
          <Text onClick={() => setShowForgotPassword(true)} style={{ cursor: 'pointer', color: 'black' }}>
            Quên mật khẩu?
          </Text>
        </Form>
      ) : (
        <div>
          <h2>Welcome!</h2>
          <p>You are now logged in.</p>
        </div>
      )}
    </div>
  );
};

export default Login;
