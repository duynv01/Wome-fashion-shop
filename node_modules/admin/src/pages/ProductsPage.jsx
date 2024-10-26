// src/pages/ProductsPage.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductDetail from '../modules/Products/ProductDetail';
import { Outlet } from 'react-router-dom';
import ProductList from '../modules/Products/ProductList';
import AddProduct from '../modules/Products/AddProduct';
import Categories from '../modules/Products/Categories';

const ProductsPage = () => {
  return (
    <>
      <Routes>
        <Route index element={<ProductList />} />
        <Route path=":productId" element={<ProductDetail />} />
        <Route path="add" element={<AddProduct />} />
        <Route path="categories" element={<Categories />} />
      </Routes>
    </>
  );
};

export default ProductsPage;
