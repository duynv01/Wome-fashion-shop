import React, { useState } from 'react';
import { Drawer, Button, List, InputNumber } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';


const CartDrawer = () => {
    const [visible, setVisible] = useState(false);
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Chân váy ngắn vải',
            price: 299000,
            quantity: 1,
            image: 'https://pos.nvncdn.com/b153ea-53436/ps/20241014_cAEGGZZs1N.jpeg', // Thay bằng URL ảnh thực tế
        },
        {
            id: 2,
            name: 'Chân váy ngắn dạ',
            price: 329000,
            quantity: 1,
            image: 'https://pos.nvncdn.com/b153ea-53436/ps/20241001_BzF7Fi53GP.jpeg', // Thay bằng URL ảnh thực tế
        },
    ]);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const handleQuantityChange = (id, value) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: value } : item
            )
        );
    };

    const handleRemoveItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return (
        <>
            {/* Icon Giỏ Hàng */}
            <ShoppingCartOutlined
                style={{ fontSize: '20px', cursor: 'pointer', color: '#000' }}
                onClick={showDrawer}
            />

            {/* Drawer */}
            <Drawer
                title="Giỏ hàng"
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
            >
                {cartItems.length === 0 ? (
                    <p>Chưa có sản phẩm nào trong giỏ hàng.</p>
                ) : (
                    <>
                        <List
                            dataSource={cartItems}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <InputNumber
                                            min={1}
                                            max={10}
                                            value={item.quantity}
                                            onChange={(value) =>
                                                handleQuantityChange(item.id, value)
                                            }
                                            style={{ width: '60px' }}
                                        />,
                                        <Button
                                            type="link"
                                            danger
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            Xóa
                                        </Button>,
                                    ]}
                                >
                                    <List.Item.Meta
                                        style={{
                                            width: '80px',
                                        }}
                                        avatar={
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        }
                                        title={
                                            <div
                                                style={{
                                                    whiteSpace: 'normal', // Hiển thị nhiều dòng nếu tên dài
                                                    wordBreak: 'break-word',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {item.name}
                                            </div>
                                        }
                                        description={`${item.price.toLocaleString()} ₫`}
                                    />
                                </List.Item>
                            )}
                        />
                        <div style={{ textAlign: 'right', marginTop: '16px' }}>
                            <p>
                                <strong>Tổng tiền:</strong>{' '}
                                {totalPrice.toLocaleString()} ₫
                            </p>
                            <div style={{ display: "flex" }}>
                                <Button type="primary" style={{ marginRight: '8px' }}>
                                    Mua thêm
                                </Button>
                                <div>
                                    <Link to="/checkout">
                                        <Button type="danger" style={{ backgroundColor: 'red'}}>Mua ngay</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Link to="/cart">
                                <Button type="link">Xem giỏ hàng</Button>
                            </Link>
                        </div>
                    </>
                )}
            </Drawer>
        </>
    );
};

export default CartDrawer;
