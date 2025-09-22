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

const timeframes = ['1D', '2D', '5D', '7D', '10D'];

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('5D');
  const [selectedChart, setSelectedChart] = useState('price');

  const allStockData = stockJson.data;


  const stockData = useMemo(() => {
    let days = parseInt(selectedTimeframe);
    return allStockData
      .sort((a, b) => new Date(b.date) - new Date(a.date)) 
      .slice(0, days)
      .reverse(); 
  }, [allStockData, selectedTimeframe]);


  const chartData = useMemo(() => 
    stockData.map(item => ({
      ...item,
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      volume: parseInt(item.turnover_volume || 0),
      turnover: (item.turnover_values || 0) / 1000000000
    })),
    [stockData]
  );

  const latestData = stockData[stockData.length - 1];


  const metrics = useMemo(() => {
    if (!stockData.length) return {};
    const avgVolume = stockData.reduce((sum, item) => sum + parseInt(item.turnover_volume || 0), 0) / stockData.length;
    const avgTurnover = stockData.reduce((sum, item) => sum + (item.turnover_values || 0), 0) / stockData.length;
    const volatility = Math.sqrt(stockData.reduce((sum, item) => sum + Math.pow(item.percentage_change || 0, 2), 0) / stockData.length);
    return {
      avgVolume,
      avgTurnover: avgTurnover / 1000000000,
      volatility,
      priceRange: (Math.max(...stockData.map(d => d.fifty_two_weeks_high)) - Math.min(...stockData.map(d => d.fifty_two_weeks_low)))
    };
  }, [stockData]);

  return (
    <>
      <Helmet>
        <title>Dashboard </title>
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
            <ChartSection
              chartData={chartData}
              selectedChart={selectedChart}
              setSelectedChart={setSelectedChart}
            />
          </Grid.Col>
        </Grid>


        <Grid mt={20}>
          <Grid.Col xs={12} md={4}>
            <MarketSummary latestData={latestData} metrics={metrics} timeframe={selectedTimeframe}  />
          </Grid.Col>
        </Grid>

        
      
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
          <Grid.Col xs={12}>
            <RecentTransactions stockData={stockData} />

            <Divider my="md" label=" " />

         
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
