import { Paper, Table, Text } from '@mantine/core';

const RecentTransactions = ({ stockData }) => {
  return (
    <Paper p="md" withBorder radius="md" bg="light.6">
      <Text weight={700} mb="md">Recent Trading Data</Text>
      <Table striped highlightOnHover verticalSpacing="sm">
        <thead>
          <tr>
            <th>Date</th>
            <th>Close</th>
            <th>Change</th>
            <th>Volume</th>
            <th>Turnover</th>
          </tr>
        </thead>
        <tbody>
          {stockData.slice(0, 6).map((item) => (
            <tr key={item.id}>
              <td>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
              <td>Rs.{item.close.toFixed(2)}</td>
              <td style={{ color: item.percentage_change >= 0 ? 'green' : 'red' }}>
                {item.percentage_change >= 0 ? '+' : ''}{item.percentage_change.toFixed(2)}%
              </td>
              <td>{(item.turnover_volume/1000000).toFixed(1)}M</td>
              <td>Rs.{(item.turnover_values/1000000000).toFixed(2)}B</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
};

export default RecentTransactions;
