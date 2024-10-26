// src/components/Modules/Products/ProductList.jsx
import React, { useState } from 'react';
import { Table, Space, Button, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import productAImage from '../../assets/5.jpeg';

const { Option } = Select;

const ProductList = () => {
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [products, setProducts] = useState([
    {
      productId: '1',
      name: 'Váy xun',
      price: '500.000 VNĐ',
      sku: '9824124',
      category: 'Váy',
      soldQuantity: 999,
      inventory: 15,
      image: productAImage,
    },
    {
      productId: '2',
      name: 'Quần JEAN',
      price: '300.000 VNĐ',
      sku: '5845842',
      category: 'Quần',
      soldQuantity: 9999,
      inventory: 190,
      image: productAImage,
    },
    // Additional products here...
  ]);

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleSortFieldChange = (value) => {
    setSortField(value);
  };

  const handleSortOrderChange = (value) => {
    setSortOrder(value);
  };

  const handleDelete = (productId) => {
    setProducts(products.filter((product) => product.productId !== productId));
  };

  const sortedAndFilteredProducts = [...products]
    .filter((product) =>
      product.name.toLowerCase().includes(searchText) ||
      product.sku.includes(searchText) ||
      product.category.toLowerCase().includes(searchText)
    )
    .sort((a, b) => {
      if (!sortField || !sortOrder) return 0;
      const valueA = a[sortField];
      const valueB = b[sortField];
      if (sortOrder === 'ascend') return valueA - valueB;
      if (sortOrder === 'descend') return valueB - valueA;
      return 0;
    });

  const columns = [
    {
      title: '#',
      dataIndex: 'productId',
      key: 'productId',
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="product" style={{ width: '50px', height: '50px' }} />,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Loại',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Số lượng đã bán',
      dataIndex: 'soldQuantity',
      key: 'soldQuantity',
    },
    {
      title: 'Tồn kho',
      dataIndex: 'inventory',
      key: 'inventory',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/products/${record.productId}`}>Chi tiết</Link>
          <Button type="primary" danger onClick={() => handleDelete(record.productId)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <Space style={{ marginBottom: '20px' }}>
        <Input
          placeholder="Tìm kiếm theo tên sản phẩm, mã sản phẩm, loại..."
          value={searchText}
          onChange={handleSearch}
          style={{ width: '300px' }}
        />
        <Select
          placeholder="Chọn trường sắp xếp"
          onChange={handleSortFieldChange}
          style={{ width: '200px' }}
          allowClear
        >
          <Option value="soldQuantity">Số lượng đã bán</Option>
          <Option value="inventory">Tồn kho</Option>
        </Select>
        <Select
          placeholder="Chọn thứ tự"
          onChange={handleSortOrderChange}
          style={{ width: '150px' }}
          allowClear
        >
          <Option value="ascend">ASC</Option>
          <Option value="descend">DESC</Option>
        </Select>
      </Space>
      <Table columns={columns} dataSource={sortedAndFilteredProducts} rowKey="productId" />
    </div>
  );
};

export default ProductList;
