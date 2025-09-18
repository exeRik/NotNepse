import { Paper, Text, Group, Divider } from '@mantine/core';

const MarketSummary = ({ latestData, metrics }) => {
  return (
    <Paper p="md" withBorder radius="md" bg="light.6">
      <Text weight={700} mb="md">Market Summary</Text>

      <div className="space-y-2">
        <Group position="apart"><Text color="blue.4">Open</Text><Text>Rs.{latestData.low}</Text></Group>
        <Group position="apart"><Text color="blue.4">High</Text><Text color="green.5">Rs.{latestData.high}</Text></Group>
        <Group position="apart"><Text color="blue.4">Low</Text><Text color="red.5">Rs.{latestData.low}</Text></Group>
        <Group position="apart"><Text color="blue.4">Volatility</Text><Text color="yellow.5">{metrics.volatility.toFixed(2)}%</Text></Group>
      </div>

      <Divider my="sm" />

      <div>
        <Text weight={500} mb={2}>Performance</Text>
        <Text size="sm">7-day avg volume: {(metrics.avgVolume/1000000).toFixed(1)}M</Text>
        <Text size="sm">Price range: Rs.{metrics.priceRange.toFixed(2)}</Text>
      </div>
    </Paper>
  );
};

export default MarketSummary;
