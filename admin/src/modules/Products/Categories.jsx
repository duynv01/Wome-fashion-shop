import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const Categories = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Áo', code: 'Shirt01' },
    { id: 2, name: 'Váy', code: 'Dress01' },
    { id: 3, name: 'Quần', code: 'Pants01' },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showAddCategoryModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleAddCategory = (values) => {
    const newCategory = {
      id: categories.length + 1,
      name: values.name,
      code: values.code,
    };
    setCategories([...categories, newCategory]);
    setIsModalVisible(false);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const columns = [
    { title: '#', dataIndex: 'id', key: 'id' },
    { title: 'Tên', dataIndex: 'name', key: 'name' },
    { title: 'Mã', dataIndex: 'code', key: 'code' },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => alert('Edit feature')}
          >
            Sửa
          </Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCategory(record.id)}
            danger
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        style={{ marginBottom: '16px', float: 'right' }}
        onClick={showAddCategoryModal}
      >
        Thêm mục sản phẩm
      </Button>
      <h2>
        Danh mục sản phẩm
      </h2>
      <Table columns={columns} dataSource={categories} rowKey="id" />

      <Modal
        title="Thêm mục sản phẩm"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleAddCategory}>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
          >
            <Input placeholder="Nhập tên danh mục" />
          </Form.Item>
          <Form.Item
            name="code"
            label="Mã danh mục"
            rules={[{ required: true, message: 'Vui lòng nhập mã danh mục' }]}
          >
            <Input placeholder="Nhập mã danh mục" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
