import { Paper, Group, Text, ThemeIcon } from '@mantine/core';
import { IconMoneybag } from '@tabler/icons-react';
import {  Volume2, TrendingUp, Activity, ArrowUp, ArrowDown } from 'lucide-react';

const MetricsCard = ({ type, data, metrics }) => {
  const renderIcon = () => {
    switch (type) {
      case 'price': return <IconMoneybag size={20} />;
      case 'volume': return <Volume2 size={20} />;
      case 'range': return <TrendingUp size={20} />;
      case 'turnover': return <Activity size={20} />;
      default: return null;
    }
  };

  return (
    <Paper p="md" withBorder radius="md" bg="light.6">
      <Group position="apart" mb="sm">
        <ThemeIcon variant="light" color="blue">
          {renderIcon()}
        </ThemeIcon>
        {type === 'price' && (
          <Text color={data.percentage_change >= 0 ? 'green' : 'red'} size="xs">
            {data.percentage_change >= 0 ? <ArrowUp size={14}/> : <ArrowDown size={14}/>}
            {Math.abs(data.percentage_change).toFixed(2)}%
          </Text>
        )}
      </Group>

      {type === 'price' && (
        <>
          <Text size="xl" weight={700}>Rs.{data.close.toFixed(2)}</Text>
          <Text size="sm" color="blue.4">Current Price</Text>
          <Text size="sm" color={data.absolute_change >= 0 ? 'green' : 'red'}>
            {data.absolute_change >= 0 ? '+' : ''}{data.absolute_change.toFixed(2)} today
          </Text>
        </>
      )}

      {type === 'volume' && (
        <>
          <Text size="xl" weight={700}>{(data.turnover_volume/1000000).toFixed(1)}M</Text>
          <Text size="sm" color="blue.4">Trading Volume</Text>
          <Text size="sm" color="gray.4">{data.total_transaction} transactions</Text>
        </>
      )}

      {type === 'range' && (
        <>
          <Text size="xl" weight={700}>Rs.{data.fifty_two_weeks_high.toFixed(2)}</Text>
          <Text size="sm" color="blue.4">High</Text>
          <Text size="sm" color="gray.4">Low: Rs.{data.fifty_two_weeks_low.toFixed(2)}</Text>
        </>
      )}

      {type === 'turnover' && (
        <>
          <Text size="xl" weight={700}>Rs.{(data.turnover_values/1000000000).toFixed(2)}B</Text>
          <Text size="sm" color="blue.4">Daily Turnover</Text>
          <Text size="sm" color="gray.4">Avg: Rs.{metrics.avgTurnover.toFixed(2)}B</Text>
        </>
      )}
    </Paper>
  );
};

export default MetricsCard;
