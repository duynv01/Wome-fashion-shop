import React, { useState } from 'react';
import { Card, Col, Row, Typography, Button, Modal, Form, Input, Alert } from 'antd';

const { Title, Text } = Typography;

const Account = () => {
  const adminInfo = {
    name: 'Admin',
    phone: '123-456-7890',
    email: 'admin@example.com',
  };

  // Mock mật khẩu
  const mockPassword = 'password123';

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(''); // Chỉ dùng cho form đổi mật khẩu

  const handleEditSubmit = (values) => {
    console.log('Thông tin admin đã được cập nhật:', values);
    setIsEditing(false);
  };

  const handleChangePassword = (values) => {
    // Reset lại lỗi trước đó
    setPasswordError('');

    // Kiểm tra nếu mật khẩu cũ không đúng
    if (values.oldPassword !== mockPassword) {
      setPasswordError('Mật khẩu cũ không chính xác!');
      return;
    }

    // Kiểm tra nếu mật khẩu mới và mật khẩu xác nhận không khớp
    if (values.newPassword !== values.confirmPassword) {
      setPasswordError('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      return;
    }

    // Nếu mọi thứ đúng
    console.log('Mật khẩu đã được đổi thành:', values.newPassword);
    setIsChangingPassword(false); // Đóng modal sau khi thành công
    setPasswordError(''); // Reset lỗi sau khi thành công
  };

  // Reset lỗi khi mở modal đổi mật khẩu
  const openChangePasswordModal = () => {
    setPasswordError(''); // Reset lỗi khi mở modal
    setIsChangingPassword(true); // Mở modal
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={1}>Thông tin tài khoản</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Tên" bordered={false}>
            <Text>{adminInfo.name}</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Số điện thoại" bordered={false}>
            <Text>{adminInfo.phone}</Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Email" bordered={false}>
            <Text>{adminInfo.email}</Text>
          </Card>
        </Col>
      </Row>
      <div style={{ marginTop: '20px' }}>
        <Button type="primary" onClick={() => setIsEditing(true)} style={{ backgroundColor: 'black', color: 'white' }}>Chỉnh sửa thông tin</Button>
        <Button type="default" onClick={openChangePasswordModal} style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }}>
          Đổi mật khẩu
        </Button>
      </div>

      {/* Modal Chỉnh sửa thông tin */}
      <Modal
        title="Chỉnh sửa thông tin"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        <Form initialValues={adminInfo} onFinish={handleEditSubmit}>
          <Form.Item
            name="name"
            label="Tên"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: 'black', color: 'white' }}>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Đổi mật khẩu */}
      <Modal
        title="Đổi mật khẩu"
        visible={isChangingPassword}
        onCancel={() => setIsChangingPassword(false)}
        footer={null}
      >
        <Form
          onFinish={handleChangePassword}
        >
          {/* Hiển thị lỗi nếu có */}
          {passwordError && <Alert message={passwordError} type="error" showIcon style={{ marginBottom: 16 }} />}

          <Form.Item
            name="oldPassword"
            label="Mật khẩu cũ"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="newPassword"
            label="Mật khẩu mới"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Nhập lại mật khẩu mới"
            rules={[
              { required: true, message: 'Vui lòng nhập lại mật khẩu mới!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu mới và xác nhận mật khẩu không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ backgroundColor: 'black', color: 'white' }}>
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Account;
