// src/components/Charts/PortfolioDistribution.js
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { getStockTransactions } from '../../services/api.js';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA336A', '#AA33AA'];

const PortfolioDistribution = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStockTransactions();
        const transactions = response.data;

        // Calculate total amount per stock
        const aggregated = transactions.reduce((acc, curr) => {
          if (!acc[curr.stock_name]) {
            acc[curr.stock_name] = 0;
          }
          acc[curr.stock_name] += parseFloat(curr.total_amount);
          return acc;
        }, {});

        const chartData = Object.keys(aggregated).map((key) => ({
          name: key,
          value: aggregated[key],
        }));

        setData(chartData);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card title="Portfolio Distribution">
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Card>
  );
};

export default PortfolioDistribution;
