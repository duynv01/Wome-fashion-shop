import React, { useState } from 'react';
import { Card, Col, Row, Typography, Select, DatePicker } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock dữ liệu
const mockData = {
  totalOrders: 25,
  totalRevenue: 12400000+' VNĐ',
  deliveredCodes: 20,
  newCustomers: 15,
  orderChartData: [
    { name: 'Day 1', Don_hang: 3 },
    { name: 'Day 2', Don_hang: 5 },
    { name: 'Day 3', Don_hang: 4 },
    { name: 'Day 4', Don_hang: 6 },
    { name: 'Day 5', Don_hang: 7 },
  ],
  revenueChartData: [
    { name: 'Day 1', Doanh_thu: 1000000 },
    { name: 'Day 2', Doanh_thu: 600000 },
    { name: 'Day 3', Doanh_thu: 800000 },
    { name: 'Day 4', Doanh_thu: 5000000 },
    { name: 'Day 5', Doanh_thu: 5000000},
  ],
};

const Dashboard = () => {
  const [dateRange, setDateRange] = useState([moment().subtract(6, 'days'), moment()]);
  
  const handleRangeChange = (dates) => {
    setDateRange(dates);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Tổng quan</Title>

      {/* Bộ lọc ngày */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Select defaultValue="Day" style={{ width: 120 }}>
          <Option value="Day">Ngày</Option>
          <Option value="Week">Tuần</Option>
          <Option value="Month">Tháng</Option>
        </Select>
        <RangePicker
          defaultValue={dateRange}
          format="DD-MM-YYYY"
          onChange={handleRangeChange}
        />
      </div>

      {/* Thống kê */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Text>Tổng đơn đặt hàng</Text>
            <Title level={3}>{mockData.totalOrders}</Title>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Text>Tổng doanh thu</Text>
            <Title level={3}>{mockData.totalRevenue}</Title>
          </Card>
        </Col>
      </Row>

      {/* Biểu đồ Order */}
      <Title level={4} style={{ marginTop: '30px' }}>Biểu đồ đơn hàng</Title>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockData.orderChartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Don_hang" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      {/* Biểu đồ Revenue */}
      <Title level={4} style={{ marginTop: '30px' }}>Biểu đồ doanh thu</Title>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockData.revenueChartData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Doanh_thu" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Dashboard;
