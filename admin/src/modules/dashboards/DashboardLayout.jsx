import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import {
  UserOutlined,
  ShoppingCartOutlined,
  DashboardOutlined,
  HistoryOutlined,
  OrderedListOutlined,
  SettingOutlined
} from '@ant-design/icons';
import './Dashboard.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const DashboardLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible style={{ backgroundColor: 'white' }}>
        <div className="logo" style={{ height: '32px', margin: '16px', background: 'rgb(255, 255, 255)', fontWeight: 600, textAlign: 'center', fontSize: '32px' }}> 
          <img src="https://scontent.xx.fbcdn.net/v/t1.15752-9/467480380_1586263965344470_6165405973771492692_n.png?_nc_cat=105&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHg6RuzeaoqE50Tv_uUfRumLqY0vnwC_e4upjS-fAL97r6CKKjcDEqqR9R21dyxeRRbipHiPFSoGLUpf-53AD_q&_nc_ohc=9pvhetGnldkQ7kNvgFgo0uH&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.xx&oh=03_Q7cD1QFLtr7FNJjSDnBCXO4m7KA1IfzmQjDpjegA6uj9kVaALQ&oe=6786FF05" alt="" style={{ width: '50px' }} />
        </div>
        <Menu theme="light" defaultSelectedKeys={['account']} mode="inline">
          <Menu.Item key="account" icon={<SettingOutlined />}>
            <Link to="/account">Thiết lập tài khoản</Link>
          </Menu.Item>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/dashboard">Tổng quan</Link>
          </Menu.Item>
          {/* Submenu for Products */}
          <SubMenu key="products" icon={<ShoppingCartOutlined />} title="Sản Phẩm">
            <Menu.Item key="all-products">
              <Link to="/products">Tất cả sản phẩm</Link>
            </Menu.Item>
            <Menu.Item key="add-product">
              <Link to="/products/add">Thêm sản phẩm</Link>
            </Menu.Item>
            <Menu.Item key="categories">
              <Link to="/products/categories">Danh mục sản phẩm</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="orders" icon={<OrderedListOutlined />}>
            <Link to="/orders">Đơn hàng</Link>
          </Menu.Item>
          <Menu.Item key="delivery-history" icon={<HistoryOutlined />}>
            <Link to="/delivery-history">Lịch sử giao hàng</Link>
          </Menu.Item>
          <Menu.Item key="customers" icon={<UserOutlined />}>
            <Link to="/customers">Khách hàng</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Outlet /> {/* Đây là nơi sẽ render nội dung từ các route con */}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Admin Dashboard ©2024 Created by Trôn</Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
