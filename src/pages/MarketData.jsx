import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  Paper,
  Text,
  Group,
  Badge,
  Title,
  Loader,
  Center,
  Notification,
} from "@mantine/core";
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown, Filter } from "lucide-react";
import { useMediaQuery } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

const MarketDataDashboard = () => {
  const navigate = useNavigate();
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const isMobile = useMediaQuery("(max-width: 768px)");


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/dashboard`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch stock data");
        const json = await res.json();
        setRawData(json.data || []); // extract the array
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load stock data");
        setLoading(false);
      });
  }, [navigate]);

  // Sorting
  const handleSort = (column) => {
    if (sortBy === column) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const SortButton = ({ column, children }) => (
    <Group gap={5} onClick={() => handleSort(column)} style={{ cursor: "pointer" }}>
      <Text size="sm" fw={500}>
        {children}
      </Text>
      {sortBy === column && (sortOrder === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
    </Group>
  );

  const sortedData = useMemo(() => {
    const sorted = [...rawData].sort((a, b) => {
      let aVal = sortBy === "date" ? new Date(a.date) : a[sortBy];
      let bVal = sortBy === "date" ? new Date(b.date) : b[sortBy];
      return sortOrder === "asc"
        ? aVal < bVal
          ? -1
          : aVal > bVal
          ? 1
          : 0
        : aVal > bVal
        ? -1
        : aVal < bVal
        ? 1
        : 0;
    });
    return sorted;
  }, [rawData, sortBy, sortOrder]);

  // Formatting helpers
  const formatNumber = (num) => {
    if (!num) return "0";
    if (num >= 1e9) return (num / 1e9).toFixed(2) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(2) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num.toLocaleString();
  };

  const formatCurrency = (num) =>
    `Rs.${num?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "0.00"}`;

  if (loading) return <Center style={{ height: "100vh" }}><Loader size="xl" /></Center>;
  if (error) return <Notification color="red" title="Error">{error}</Notification>;

  return (
    <div style={{ minHeight: "100vh", padding: "2rem", background: "#f8f9fa" }}>
      <div style={{ marginBottom: "1rem" }}>
        <Title order={2} mb="sm">LIVE Market Data</Title>
        <Group position="apart">
          <Group spacing={5}>
            <Filter size={16} color="gray" />
            <Text size="sm" c="dimmed">Total Records: {rawData.length}</Text>
          </Group>
        </Group>
      </div>

      <Paper shadow="sm" radius="md" p="md" withBorder bg="white">
        <div style={{ overflowX: isMobile ? "auto" : "visible" }}>
          <Table
            striped
            highlightOnHover
            withTableBorder
            withColumnBorders
            verticalSpacing="lg"
            style={{ minWidth: "900px" }}
          >
            <thead>
              <tr style={{ background: "#f1f3f5" }}>
                <th><SortButton column="date">Date</SortButton></th>
                <th><SortButton column="close">Close</SortButton></th>
                <th><SortButton column="high">High</SortButton></th>
                <th><SortButton column="low">Low</SortButton></th>
                <th><SortButton column="absolute_change">Abs Change</SortButton></th>
                <th><SortButton column="percentage_change">% Change</SortButton></th>
                <th><SortButton column="turnover_volume">Volume</SortButton></th>
                <th><SortButton column="total_transaction">Trades</SortButton></th>
                <th><SortButton column="turnover_values">Turnover</SortButton></th>
                <th>ID / Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item) => (
                <tr key={item.id}>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                  <td>{formatCurrency(item.close)}</td>
                  <td style={{ color: "green" }}>{formatCurrency(item.high)}</td>
                  <td style={{ color: "red" }}>{formatCurrency(item.low)}</td>
                  <td>
                    <Group gap={5}>
                      {item.absolute_change >= 0 ? <TrendingUp size={14} color="limegreen" /> : <TrendingDown size={14} color="red" />}
                      <Text fw={500} c={item.absolute_change >= 0 ? "green" : "red"}>
                        {item.absolute_change >= 0 ? "+" : ""}{(item.absolute_change ?? 0).toFixed(2)}
                      </Text>
                    </Group>
                  </td>
                  <td>
                    <Text fw={500} c={item.percentage_change >= 0 ? "green" : "red"}>
                      {item.percentage_change >= 0 ? "+" : ""}{(item.percentage_change ?? 0).toFixed(2)}%
                    </Text>
                  </td>
                  <td>{formatNumber(item.turnover_volume)}</td>
                  <td>{formatNumber(item.total_transaction)}</td>
                  <td>{formatCurrency(item.turnover_values)}</td>
                  <td>
                    <Group gap={5} justify="center">
                      <Text size="xs" c="dimmed" ff="monospace">#{item.id}</Text>
                      <Badge color={item.status === "active" ? "green" : "red"} variant="light">{item.status}</Badge>
                    </Group>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Paper>
    </div>
  );
};

export default MarketDataDashboard;
