import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const ProductDetail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [fileList, setFileList] = useState([]); // Always ensure it's an array
  const [form] = Form.useForm();

  // Dữ liệu mẫu sản phẩm
  const product = {
    productId: '1',
    name: 'Váy Xun',
    description: 'Váy xun kiểu 9x.',
    price: '500.000 VNĐ',
    stock: 15,
    category: 'Váy',
    colors: ['Đỏ', 'Xanh'],
    sizes: ['S', 'M'],
    image: 'https://pos.nvncdn.com/b153ea-53436/ps/20241018_7PYXHYEqT3.jpeg', // Ảnh đã có
  };

  // Khi modal mở và dữ liệu sản phẩm được thiết lập
  useEffect(() => {
    if (isEditing) {
      // Chuyển ảnh sẵn có thành đối tượng file giả và thêm vào fileList
      if (product.image) {
        const file = {
          uid: '-1', // Chỉ cần uid khác nhau, vì đây là ảnh đã có
          name: 'product-image.jpg',
          status: 'done',
          url: product.image, // URL ảnh sẵn có
        };
        setFileList([file]); // Thêm ảnh vào fileList
      }
    }
  }, [isEditing]);

  const handleEdit = () => {
    form.setFieldsValue(product); // Cập nhật giá trị cho form
    setIsEditing(true);
  };

  const handleFinish = (values) => {
    console.log('Updated Product:', values);
    setIsEditing(false);
  };

  const handleChangeFileList = (newFileList) => {
    setFileList(newFileList); // Cập nhật fileList với mảng mới
  };

  return (
    <div>
      <h2>Thông tin chi tiết sản phẩm</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <div style={{ flex: '1', padding: '0 20px' }}>
            <strong>ID:</strong>
          </div>
          <div style={{ flex: '2', padding: '0 20px' }}>{product.productId}</div>
        </div>
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <div style={{ flex: '1', padding: '0 20px' }}>
            <strong>Tên:</strong>
          </div>
          <div style={{ flex: '2', padding: '0 20px' }}>{product.name}</div>
        </div>
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <div style={{ flex: '1', padding: '0 20px' }}>
            <strong>Mô tả:</strong>
          </div>
          <div style={{ flex: '2', padding: '0 20px' }}>{product.description}</div>
        </div>
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <div style={{ flex: '1', padding: '0 20px' }}>
            <strong>Số lượng:</strong>
          </div>
          <div style={{ flex: '2', padding: '0 20px' }}>{product.stock}</div>
        </div>
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <div style={{ flex: '1', padding: '0 20px' }}>
            <strong>Danh mục:</strong>
          </div>
          <div style={{ flex: '2', padding: '0 20px' }}>{product.category}</div>
        </div>
        <div style={{ display: 'flex', marginBottom: '16px' }}>
          <div style={{ flex: '1', padding: '0 20px' }}>
            <strong>Ảnh sản phẩm:</strong>
          </div>
          <div style={{ flex: '2', padding: '0 20px' }}>
            <img src={product.image} alt="Product" style={{ width: '50px' }} />
          </div>
        </div>
      </div>

      <Button type="primary" onClick={handleEdit} style={{ marginBottom: '20px' }}>
        Chỉnh sửa
      </Button>

      <Modal
        title="Chỉnh sửa sản phẩm"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item label="Mô tả sản phẩm" name="description">
            <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
          </Form.Item>

          <Form.Item label="Giá" name="price" rules={[{ required: true, message: 'Vui lòng nhập giá' }]}>
            <Input placeholder="Nhập giá sản phẩm" />
          </Form.Item>

          <Form.Item
            label="Số lượng trong kho"
            name="stock"
            rules={[{ required: true, message: 'Vui lòng nhập số lượng trong kho' }]}
          >
            <Input placeholder="Nhập số lượng trong kho" type="number" />
          </Form.Item>

          <Form.Item label="Danh mục sản phẩm" name="category" rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}>
            <Select placeholder="Chọn danh mục sản phẩm">
              <Option value="categoryA">Áo</Option>
              <Option value="categoryB">Váy</Option>
              <Option value="categoryC">Quần</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Màu sắc sản phẩm" name="colors">
            <Select mode="multiple" placeholder="Chọn màu" style={{ width: '100%' }}>
              <Option value="Đỏ">Đỏ</Option>
              <Option value="Xanh">Xanh</Option>
              <Option value="Vàng">Vàng</Option>
              <Option value="Trắng">Trắng</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Size sản phẩm" name="sizes">
            <Select mode="multiple" placeholder="Chọn size" style={{ width: '100%' }}>
              <Option value="S">S</Option>
              <Option value="M">M</Option>
              <Option value="L">L</Option>
              <Option value="XL">XL</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Ảnh" name="image">
                  <Upload listType="picture" maxCount={1}>
                    <Button icon={<UploadOutlined />}>Tải các ảnh lên</Button>
                  </Upload>
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
