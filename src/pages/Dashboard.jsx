import { useState, useMemo } from 'react';
import { Container, Grid } from '@mantine/core';

import HeaderSection from '../components/HeaderSection';
import MetricsCard from '../components/MetricsCard';
import ChartSection from '../components/ChartSection';
import MarketSummary from '../components/MarketSummary';
import RecentTransactions from '../components/RecentTransactions';

// Import JSON demo data
import stockJson from '../data/stockData.json';

const Dashboard = () => {
  // Extract actual array from JSON
  const [stockData] = useState(stockJson.data);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7D');
  const [selectedChart, setSelectedChart] = useState('price');

  // Prepare chart data
  const chartData = useMemo(() => stockData
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      volume: parseInt(item.turnover_volume || 0),
      turnover: (item.turnover_values || 0) / 1000000000
    }))
  , [stockData]);

  const latestData = stockData[0];

  // Calculate metrics
  const metrics = useMemo(() => {
    const avgVolume = stockData.reduce((sum, item) => sum + parseInt(item.turnover_volume || 0), 0) / stockData.length;
    const avgTurnover = stockData.reduce((sum, item) => sum + (item.turnover_values || 0), 0) / stockData.length;
    const volatility = Math.sqrt(stockData.reduce((sum, item) => sum + Math.pow(item.percentage_change || 0, 2), 0) / stockData.length);

    return {
      avgVolume,
      avgTurnover: avgTurnover / 1000000000,
      volatility,
      priceRange: (latestData.fifty_two_weeks_high || 0) - (latestData.fifty_two_weeks_low || 0)
    };
  }, [stockData, latestData]);

  return (
    <Container fluid style={{ minHeight: '100vh', padding: 20 }}>
      {/* Header */}
      <HeaderSection selectedTimeframe={selectedTimeframe} setSelectedTimeframe={setSelectedTimeframe} />

      {/* Metrics Cards */}
      <Grid gutter="md" mt="md">
        <Grid.Col span={3}><MetricsCard type="price" data={latestData} metrics={metrics} /></Grid.Col>
        <Grid.Col span={3}><MetricsCard type="volume" data={latestData} metrics={metrics} /></Grid.Col>
        <Grid.Col span={3}><MetricsCard type="range" data={latestData} metrics={metrics} /></Grid.Col>
        <Grid.Col span={3}><MetricsCard type="turnover" data={latestData} metrics={metrics} /></Grid.Col>
      </Grid>

      {/* Charts & Market Summary */}
      <Grid gutter="md" mt="md">
        <Grid.Col span={8}><ChartSection chartData={chartData} selectedChart={selectedChart} setSelectedChart={setSelectedChart} /></Grid.Col>
        <Grid.Col span={4}><MarketSummary latestData={latestData} metrics={metrics} /></Grid.Col>
      </Grid>

      {/* Recent Transactions */}
      <RecentTransactions stockData={stockData} />
    </Container>
  );
};

export default Dashboard;
