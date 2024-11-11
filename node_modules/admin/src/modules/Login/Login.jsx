import React, { useState } from 'react';
import { Form, Input, Button, Alert, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import useLogin from '../Account/hooks/useLogin';
import useResetPassword from '../Account/hooks/useResetPassword';

const { Text } = Typography;

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const { login, error: loginError, loading: loginLoading } = useLogin();
  const { resetPassword, error: resetError, loading: resetLoading } = useResetPassword();

  const navigate = useNavigate();

  const handleLoginSubmit = async (values) => {
    const { username, password } = values;
    const response = await login(username, password);
    
    if (response) {
      const { token, role } = response;
      if (role === 'Admin') {
        onLogin(token, role);
      } else {
        alert('Bạn không có quyền truy cập vào trang này.');
      }
    } else {
      alert('Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.');
    }
  };
  const handleResetPasswordSubmit = async (values) => {
    const { email } = values;
    const message = await resetPassword(email);
    if (message) {
      setShowForgotPassword(false);
    }
  };

  return (
    <div className="login-container">
      {!showForgotPassword ? (
        <Form onFinish={handleLoginSubmit} layout="vertical">
          <h2 style={{ textAlign: 'center' }}>Đăng nhập tài khoản</h2>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          {loginError && <Alert message={loginError} type="error" />}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: '100%', backgroundColor: 'black' }}
              loading={loginLoading}
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <Text
            onClick={() => setShowForgotPassword(true)}
            style={{ cursor: 'pointer', color: 'black' }}
          >
            Quên mật khẩu?
          </Text>
        </Form>
      ) : (
        <div>
          <h2>Khôi phục mật khẩu</h2>
          <Form onFinish={handleResetPasswordSubmit} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
            >
              <Input onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            {resetError && <Alert message={resetError} type="error" />}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%', backgroundColor: 'black' }}
                loading={resetLoading}
              >
                Nhận mật khẩu mới
              </Button>
            </Form.Item>
            <Text
              onClick={() => setShowForgotPassword(false)}
              style={{
                cursor: 'pointer',
                color: 'black',
                display: 'block',
                textAlign: 'center'
              }}
            >
              Quay lại đăng nhập
            </Text>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Login;
