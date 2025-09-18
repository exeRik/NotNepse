import { Group, Text, Title, Button } from '@mantine/core';
import { Paper } from '@mantine/core';

const HeaderSection = ({ selectedTimeframe, setSelectedTimeframe }) => {
  const timeframes = ['1D', '7D', '1M', '3M', '1Y'];

  return (
    <Paper p="md" withBorder radius="md" bg="light.7">
      <Group position="apart" align="flex-start" mb="md">
        <div>
          <Title order={2} color="blue.1">Market Index Dashboard</Title>
          <Text color="blue.4">Real-time stock market analysis and insights</Text>
        </div>
        <Group>
          {timeframes.map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? 'filled' : 'outline'}
              onClick={() => setSelectedTimeframe(timeframe)}
              color="blue"
              size="sm"
            >
              {timeframe}
            </Button>
          ))}
        </Group>
      </Group>
    </Paper>
  );
};

export default HeaderSection;
