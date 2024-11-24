import React, { useState } from 'react';
import { Menu, Space, Drawer, Input, Button } from 'antd';
import { UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CartDrawer from '../../CartDrawer/CartDrawer';

const Header = () => {
    const [visibleSearch, setVisibleSearch] = useState(false);

    const showSearchDrawer = () => {
        setVisibleSearch(true);
    };

    const onCloseSearch = () => {
        setVisibleSearch(false);
    };

    return (
        <header className="header" style={headerStyles}>
            <div className="header-container" style={containerStyles}>
                {/* Logo */}
                <div className="logo" style={logoStyles}>
                    <Link to="/">
                        <img src="YOUR_LOGO_URL" alt="FiveM Fashion" style={{ height: '50px' }} />
                    </Link>
                </div>

                {/* Navigation Menu */}
                <Menu mode="horizontal" className="nav-links" style={menuStyles}>
                    <Menu.Item key="home"><Link to="/">Trang chủ</Link></Menu.Item>
                    <Menu.Item key="ao"><Link to="/ao">Áo</Link></Menu.Item>
                    <Menu.Item key="quan"><Link to="/quan">Quần</Link></Menu.Item>
                    <Menu.Item key="dam"><Link to="/dam">Đầm</Link></Menu.Item>
                    <Menu.Item key="chan-vay"><Link to="/chan-vay">Chân váy</Link></Menu.Item>
                </Menu>

                {/* Icons */}
                <div className="header-icons" style={iconContainerStyles}>
                    <Space size="large">
                        <SearchOutlined style={iconStyles} onClick={showSearchDrawer} />
                        <Link to="/login">
                            <UserOutlined style={iconStyles} />
                        </Link>
                        <CartDrawer /> {/* Thêm CartDrawer vào đây */}
                    </Space>
                </div>
            </div>

            {/* Drawer cho tìm kiếm */}
            <Drawer
                title="Search"
                placement="right"
                closable={true}
                onClose={onCloseSearch}
                visible={visibleSearch}
                key="right"
            >
                <Space direction="vertical">
                    <Input placeholder="Search" />
                    <Button type="primary">Search</Button>
                </Space>
            </Drawer>
        </header>
    );
};

const headerStyles = {
    backgroundColor: '#fff',
    padding: '10px 20px',
    borderBottom: '1px solid #ddd',
};

const containerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
};

const logoStyles = {
    flex: '1',
};

const menuStyles = {
    flex: '2',
    justifyContent: 'center',
    fontWeight: '500',
};

const iconContainerStyles = {
    flex: '1',
    display: 'flex',
    justifyContent: 'flex-end',
};

const iconStyles = {
    fontSize: '20px',
    color: '#000',
};

export default Header;
