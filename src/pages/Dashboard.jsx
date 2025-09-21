import { useState, useMemo } from 'react';
import { Container, Grid, Paper, Button, Divider } from '@mantine/core';
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';

import HeaderSection from '../components/HeaderSection';
import MetricsCard from '../components/MetricsCard';
import ChartSection from '../components/ChartSection';
import MarketSummary from '../components/MarketSummary';
import RecentTransactions from '../components/RecentTransactions';

import stockJson from '../data/stockData.json';

const Dashboard = () => {
  const navigate = useNavigate(); // For redirect
  const [stockData] = useState(stockJson.data);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7D');
  const [selectedChart, setSelectedChart] = useState('price');

  const chartData = useMemo(
    () => stockData
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(item => ({
        ...item,
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        volume: parseInt(item.turnover_volume || 0),
        turnover: (item.turnover_values || 0) / 1000000000
      })),
    [stockData]
  );

  const latestData = stockData[0];

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
    <>
      
      <Helmet>
        <title>Dashboard </title>
        <meta name="description" content="View market overview, charts, and recent transactions on your stock dashboard." />
      </Helmet>

      <Container fluid style={{ minHeight: '100vh', padding: 20 }}>
        
        {/* Header Section */}
        <HeaderSection
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
          style={{ marginBottom: 30 }}
        />

        {/* Charts & Market Summary */}
        <Grid gutter="md" mt={20}>
          <Grid.Col xs={12} md={8}>
            <ChartSection
              chartData={chartData}
              selectedChart={selectedChart}
              setSelectedChart={setSelectedChart}
            />
          </Grid.Col>
        </Grid>

        {/* Metrics Cards */}
        <Grid gutter="md" mt="md">
          {['price', 'volume', 'range', 'turnover'].map((type, index) => (
            <Grid.Col span={6} sm={6} md={3} key={index}>
              <Paper shadow="sm" radius="md" p="md" style={{ minHeight: 120 }}>
                <MetricsCard type={type} data={latestData} metrics={metrics} />
              </Paper>
            </Grid.Col>
          ))}
        </Grid>

        <Grid mt={20}>
          <Grid.Col xs={12} md={4}>
            <MarketSummary latestData={latestData} metrics={metrics} />
          </Grid.Col>
        </Grid>

        {/* Recent Transactions */}
        <Grid mt={20}>
          <Grid.Col xs={12}>
            <RecentTransactions stockData={stockData} />

            {/* Divider for separation */}
            <Divider my="md" label=" " />

            {/* Show Full Chart Button */}
            <Button
              fullWidth
              size="md"
              radius="md"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
              onClick={() => navigate('/market')}
            >
              Show Full Chart
            </Button>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
