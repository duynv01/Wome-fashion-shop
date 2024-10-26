import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Input, Select, Table, Modal } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const ProductDetail = () => {
  const { productId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [colors, setColors] = useState([
    { key: 1, color: 'Đỏ', size: 'M', quantity: 10 },
    { key: 2, color: 'Xanh', size: 'L', quantity: 5 },
  ]);

  // Dữ liệu mẫu sản phẩm
  const product = 
  {
      productId: '1',
      name: 'Váy Xun',
      description: 'Váy xun kiểu 9x.',
      price: '500.000 VNĐ',
      stock: 15,
      category: 'Váy',
  };

  // Hàm xử lý chỉnh sửa sản phẩm
  const handleEdit = () => {
    form.setFieldsValue(product);
    setIsEditing(true);
  };

  const handleFinish = (values) => {
    console.log('Updated Product:', values);
    console.log('Colors:', colors);
    setIsEditing(false);
  };

  const handleAddColor = () => {
    setColors([...colors, { key: colors.length + 1, color: '', size: '', quantity: 1 }]);
  };

  const handleDeleteColor = (key) => {
    setColors(colors.filter(color => color.key !== key));
  };

  const updateColor = (key, field, value) => {
    setColors(colors.map(color => color.key === key ? { ...color, [field]: value } : color));
  };

  return (
    <div>
      <h2>Thông tin chi tiết sản phẩm</h2>
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <div style={{ flex: '1', padding: '0 20px' }}>
            <strong>ID:</strong>
          </div>
          <div style={{ flex: '2', padding: '0 20px' }}>
            {product.productId}
          </div>
        </div>
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <div style={{ flex: '1', padding: '0 20px' }}>
            <strong>Tên:</strong>
          </div>
          <div style={{ flex: '2', padding: '0 20px' }}>
            {product.name}
          </div>
        </div>
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <div style={{ flex: '1', padding: '0 20px' }}>
            <strong>Mô tả:</strong>
          </div>
          <div style={{ flex: '2', padding: '0 20px' }}>
            {product.description}
          </div>
        </div>
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <div style={{ flex: '1', padding: '0 20px' }}>
            <strong>Số lượng:</strong>
          </div>
          <div style={{ flex: '2', padding: '0 20px' }}>
            {product.stock}
          </div>
        </div>
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <div style={{ flex: '1', padding: '0 20px' }}>
            <strong>Danh mục:</strong>
          </div>
          <div style={{ flex: '2', padding: '0 20px' }}>
            {product.category}
          </div>
        </div>
      </div>

      <Button type="primary" onClick={handleEdit} style={{ marginBottom: '20px' }}>
        Chỉnh sửa
      </Button>

      <h3>Bảng màu sắc</h3>
      <Table
        columns={[
          {
            title: 'Màu',
            dataIndex: 'color',
            render: (_, record) => (
              <Select
                placeholder="Chọn màu"
                defaultValue={record.color}
                onChange={(value) => updateColor(record.key, 'color', value)}
                style={{ width: '100%' }}
              >
                <Option value="Đỏ">Đỏ</Option>
                <Option value="Xanh">Xanh</Option>
                <Option value="Vàng">Vàng</Option>
                <Option value="Trắng">Trắng</Option>
                {/* Thêm các màu khác ở đây */}
              </Select>
            ),
          },
          {
            title: 'Size',
            dataIndex: 'size',
            render: (_, record) => (
              <Select
                placeholder="Chọn size"
                defaultValue={record.size}
                onChange={(value) => updateColor(record.key, 'size', value)}
                style={{ width: '100%' }}
              >
                <Option value="S">S</Option>
                <Option value="M">M</Option>
                <Option value="L">L</Option>
                <Option value="XL">XL</Option>
              </Select>
            ),
          },
          {
            title: 'Số lượng',
            dataIndex: 'quantity',
            render: (_, record) => (
              <Input
                type="number"
                min={1}
                defaultValue={record.quantity}
                onChange={(e) => updateColor(record.key, 'quantity', e.target.value)}
              />
            ),
          },
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
        ]}
        dataSource={colors}
        pagination={false}
        rowKey="key"
      />
      <Button type="dashed" onClick={handleAddColor} style={{ width: '100%', marginTop: '16px' }}>
        <PlusOutlined /> Thêm màu
      </Button>

      <Modal
        title="Chỉnh sửa sản phẩm"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}>
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>
          <Form.Item label="Mô tả sản phẩm" name="description">
            <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
          </Form.Item>
          <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá' }]}>
            <Input placeholder="Nhập giá sản phẩm" />
          </Form.Item>
          <Form.Item label="Số lượng trong kho" name="stock" rules={[{ required: true, message: 'Vui lòng nhập số lượng trong kho' }]}>
            <Input placeholder="Nhập số lượng trong kho" type="number" />
          </Form.Item>
          <Form.Item label="Danh mục sản phẩm" name="category" rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}>
            <Select placeholder="Chọn danh mục sản phẩm">
              <Option value="categoryA">Áo</Option>
              <Option value="categoryB">Váy</Option>
              <Option value="categoryC">Quần</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật sản phẩm
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductDetail;
