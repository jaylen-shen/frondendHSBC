// src/components/DashboardContent.js
import React from 'react';
import { Row, Col } from 'antd';
import DashboardCard from './DashboardCard.js';
import BuySellChart from './Charts/BuySellChart.js';
import PortfolioDistribution from './Charts/PortfolioDistribution.js';
import TransactionTable from './TransactionTable.js';

const DashboardContent = () => {
  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <DashboardCard title="Balance" value="$100,000" />
        </Col>
        <Col span={6}>
          <DashboardCard title="Total Buy" value="$50,000" />
        </Col>
        <Col span={6}>
          <DashboardCard title="Total Sell" value="$30,000" />
        </Col>
        <Col span={6}>
          <DashboardCard title="Net Profit" value="$20,000" />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <BuySellChart />
        </Col>
        <Col span={12}>
          <PortfolioDistribution />
        </Col>
      </Row>

      <Row style={{ marginTop: '20px' }}>
        <Col span={24}>
          <TransactionTable />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;
