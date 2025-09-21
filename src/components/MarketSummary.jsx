import { Paper, Text, Group, Divider, Stack } from '@mantine/core';

const MarketSummary = ({ latestData, metrics, timeframe }) => {
  if (!latestData || !metrics) return null;

  const keyStats = [
    { label: 'Open', value: latestData.open || latestData.close, color: 'blue.6' },
    { label: 'High', value: latestData.high, color: 'green.6' },
    { label: 'Low', value: latestData.low, color: 'red.6' },
    { label: 'Volatility', value: `${metrics.volatility.toFixed(2)}%`, color: 'yellow.7' },
  ];

  const performanceStats = [
    { label: `Avg Volume (${timeframe})`, value: `${(metrics.avgVolume / 1000000).toFixed(1)}M`, color: 'blue' },
    { label: `Price Range (${timeframe})`, value: `Rs.${metrics.priceRange.toFixed(2)}`, color: 'green' },
  ];

  return (
    <Paper 
      p="lg" 
      withBorder 
      radius="md" 
      bg="gray.0" 
      shadow="sm"
      style={{ minWidth: 280 }}
    >
      {/* <Text 
        weight={900} 
        size="3xl" 
        mb="lg" 
        align="left" 
        style={{ letterSpacing: 0.5, color: "#1c1c1c" }}
      >
        Market Summary
      </Text> */}

      {/* Performance Section */}
      <Text weight={800} size="xl" mb="md" style={{ color: "#1c1c1c" }}>
        Performance ({timeframe})
      </Text>

      <Stack spacing={6}>
        {performanceStats.map((stat, idx) => (
          <Group key={idx} position="apart">
            <Text size="md" weight={600}>{stat.label}</Text>
            <Text size="lg" weight={800} color={stat.color}>{stat.value}</Text>
          </Group>
        ))}
      </Stack>

      <Divider my="md" />

      {/* Key Stats */}
      <Stack spacing={8} mb="md">
        {keyStats.map((stat, idx) => (
          <Group key={idx} position="apart">
            <Text weight={600} size="md" color={stat.color}>{stat.label}</Text>
            <Text weight={800} size="lg">{stat.value}</Text>
          </Group>
        ))}
      </Stack>
    </Paper>
  );
};

export default MarketSummary;
