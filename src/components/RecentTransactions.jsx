import { Paper, Table, Text } from '@mantine/core';

const RecentTransactions = ({ stockData }) => {
  return (
    <Paper p="md" withBorder radius="md" bg="light.6">
      <Text weight={700} mb="md" 
        style={{ letterSpacing: 0.5, color: "#1c1c1c" }}>Recent Trading Data</Text>
      <Table striped highlightOnHover verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Close</Table.Th>
            <Table.Th>Change</Table.Th>
            <Table.Th>Volume</Table.Th>
            <Table.Th>Turnover</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
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
         </Table.Tbody>
      </Table>
    </Paper>
  );
};

export default RecentTransactions;
