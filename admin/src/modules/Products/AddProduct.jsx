import React, { useState } from 'react';
import { Form, Input, Button, Select, Table, Modal, Upload } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddProduct = () => {
  const [colors, setColors] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleAddColor = () => {
    setColors([...colors, { key: colors.length + 1, color: [], size: [], quantity: 1 }]);
  };

  const handleDeleteColor = (key) => {
    setColors(colors.filter(color => color.key !== key));
  };

  const columns = [
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          icon={<MinusCircleOutlined />}
          onClick={() => handleDeleteColor(record.key)}
          danger
        >
          Xóa
        </Button>
      ),
    },
  ];

  const updateColor = (key, field, value) => {
    setColors(colors.map(color => color.key === key ? { ...color, [field]: value } : color));
  };

  const handleFinish = (values) => {
    console.log('Form Values:', values);
    console.log('Colors:', colors);
    // Thực hiện các thao tác thêm sản phẩm ở đây
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <h2>Thêm sản phẩm</h2>
      <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
        <Input placeholder="Nhập tên sản phẩm" />
      </Form.Item>

      <Form.Item label="Mã sản phẩm" name="code" rules={[{ required: true, message: 'Vui lòng nhập mã sản phẩm' }]}>
        <Input placeholder="Nhập mã sản phẩm" />
      </Form.Item>

      <Form.Item label="Danh mục sản phẩm" name="category" rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}>
        <Select placeholder="Chọn danh mục sản phẩm">
          <Option value="electronics">Áo</Option>
          <Option value="clothing">Quần</Option>
          <Option value="furniture">Váy</Option>
          {/* Thêm các danh mục khác ở đây */}
        </Select>
      </Form.Item>

      <Form.Item label="Mô tả sản phẩm" name="description">
        <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
      </Form.Item>

      <Form.Item label="Ảnh mẫu" name="image">
        <Upload listType="picture" maxCount={1}>
          <Button icon={<UploadOutlined />}>Tải các ảnh lên</Button>
        </Upload>
      </Form.Item>

      <Form.Item label="Số lượng sản phẩm" name="total" rules={[{ required: true, message: 'Vui lòng nhập số lượng sản phẩm' }]}>
        <Input placeholder="Nhập số lượng sản phẩm" />
      </Form.Item>

      {/* Màu và Size - không hiển thị trong bảng */}
      <Form.Item label="Màu sản phẩm" name="colors" rules={[{ required: true }]}>
        <Select
          mode="multiple"
          placeholder="Chọn màu"
          onChange={(value) => setColors(value)}
          style={{ width: '100%' }}
        >
          <Option value="red">Đỏ</Option>
          <Option value="blue">Xanh dương</Option>
          <Option value="green">Xanh lá</Option>
          {/* Thêm các màu khác ở đây */}
        </Select>
      </Form.Item>

      <Form.Item label="Size sản phẩm" name="sizes" rules={[{ required: true }]}>
        <Select
          mode="multiple"
          placeholder="Chọn size"
          style={{ width: '100%' }}
        >
          <Option value="S">S</Option>
          <Option value="M">M</Option>
          <Option value="L">L</Option>
          <Option value="XL">XL</Option>
          {/* Thêm các size khác ở đây */}
        </Select>
      </Form.Item>
      <Form.Item style={{ marginTop: '16px' }}>
        <Button type="primary" htmlType="submit">
          Thêm sản phẩm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProduct;
