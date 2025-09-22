import { useState, useEffect, useMemo } from 'react'; 
import { Container, Grid, Paper, Button, Divider, Loader, Center, Notification } from '@mantine/core';
import { Helmet } from "react-helmet";
import { useNavigate } from 'react-router-dom';

import HeaderSection from '../components/HeaderSection';
import MetricsCard from '../components/MetricsCard';
import ChartSection from '../components/ChartSection';
import MarketSummary from '../components/MarketSummary';
import RecentTransactions from '../components/RecentTransactions';

const timeframes = ['1D', '2D', '5D', '7D', '10D'];

const Dashboard = () => {
  const navigate = useNavigate();

  const [selectedTimeframe, setSelectedTimeframe] = useState('5D');
  const [selectedChart, setSelectedChart] = useState('price');
  const [allStockData, setAllStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return;
  }

  fetch(`${import.meta.env.VITE_BASE_URL}/dashboard`, { 
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(async res => {
      if (!res.ok) throw new Error('Failed to fetch stock data');
      const json = await res.json();
      console.log('Backend data:', json);
      setAllStockData(json.data); // <-- extract the array here
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError('Could not load stock data');
      setLoading(false);
    });
}, [navigate]);


  // Filter stock data based on selected timeframe
  const filteredStockData = useMemo(() => {
    if (!allStockData.length) return [];
    const days = parseInt(selectedTimeframe);
    return allStockData
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, days)
      .reverse();
  }, [allStockData, selectedTimeframe]);

  // Chart data
  const chartData = useMemo(() =>
    filteredStockData.map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      volume: parseInt(item.turnover_volume || 0),
      turnover: (item.turnover_values || 0) / 1000000000
    })),
    [filteredStockData]
  );

  const latestData = filteredStockData[filteredStockData.length - 1] || {};

  // Metrics calculation
  const metrics = useMemo(() => {
    if (!filteredStockData.length) return {};
    const avgVolume = filteredStockData.reduce((sum, i) => sum + parseInt(i.turnover_volume || 0), 0) / filteredStockData.length;
    const avgTurnover = filteredStockData.reduce((sum, i) => sum + (i.turnover_values || 0), 0) / filteredStockData.length;
    const volatility = Math.sqrt(filteredStockData.reduce((sum, i) => sum + Math.pow(i.percentage_change || 0, 2), 0) / filteredStockData.length);
    return {
      avgVolume,
      avgTurnover: avgTurnover / 1000000000,
      volatility,
      priceRange: (Math.max(...filteredStockData.map(d => d.fifty_two_weeks_high)) - Math.min(...filteredStockData.map(d => d.fifty_two_weeks_low)))
    };
  }, [filteredStockData]);

  if (loading) return <Center style={{ height: '100vh' }}><Loader size="xl" /></Center>;
  if (error) return <Notification color="red" title="Error">{error}</Notification>;

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="View market overview, charts, and recent transactions on your stock dashboard." />
      </Helmet>

      <Container fluid style={{ minHeight: '100vh', padding: 20 }}>
        <HeaderSection
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
          timeframes={timeframes}
          style={{ marginBottom: 30 }}
        />

        <Grid gutter="md" mt={20}>
          <Grid.Col xs={12} md={8}>
            <ChartSection chartData={chartData} selectedChart={selectedChart} setSelectedChart={setSelectedChart} />
          </Grid.Col>
        </Grid>

        <Grid mt={20}>
          <Grid.Col xs={12} md={4}>
            <MarketSummary latestData={latestData} metrics={metrics} timeframe={selectedTimeframe} />
          </Grid.Col>
        </Grid>

        <Grid gutter="md" mt="md">
          {['price', 'volume', 'range', 'turnover'].map((type, i) => (
            <Grid.Col span={6} sm={6} md={3} key={i}>
              <Paper shadow="sm" radius="md" p="md" style={{ minHeight: 120 }}>
                <MetricsCard type={type} data={latestData} metrics={metrics} />
              </Paper>
            </Grid.Col>
          ))}
        </Grid>

        <Grid mt={20}>
          <Grid.Col xs={12}>
            <RecentTransactions stockData={filteredStockData} />
            <Divider my="md" />
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
