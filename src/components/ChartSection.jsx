import { Paper, Group, Button, Text } from '@mantine/core';
import { AreaChart, Area, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Volume2 } from 'lucide-react';
import { IconMoneybag } from '@tabler/icons-react';

const ChartSection = ({ chartData, selectedChart, setSelectedChart }) => {
  return (
    <Paper p="md" withBorder radius="md" bg="light.6">
      <Group position="apart" align="flex-start" wrap="wrap">
        <Text weight={700}>Price Movement</Text>
        <Group>
          {[{ key: 'price', label: 'Price', icon: IconMoneybag }, { key: 'volume', label: 'Volume', icon: Volume2 }].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={selectedChart === key ? 'filled' : 'outline'}
              color="blue"
              size="xs"
              onClick={() => setSelectedChart(key)}
            >
              <Icon size={14} style={{ marginRight: 4 }} />
              {label}
            </Button>
          ))}
        </Group>
      </Group>

      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          {selectedChart === 'price' ? (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="date" stroke="#94a3b8"/>
              <YAxis stroke="#94a3b8"/>
              <Tooltip />
              <Area type="monotone" dataKey="close" stroke="#3b82f6" fill="url(#colorPrice)" />
              <Line type="monotone" dataKey="high" stroke="#10b981" strokeDasharray="2 2" dot={false} />
              <Line type="monotone" dataKey="low" stroke="#ef4444" strokeDasharray="2 2" dot={false} />
            </AreaChart>
          ) : (
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis dataKey="date" stroke="#94a3b8"/>
              <YAxis stroke="#94a3b8"/>
              <Tooltip />
              <Bar dataKey="volume" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

export default ChartSection;
