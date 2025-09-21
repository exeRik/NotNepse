// // HammerCharts.jsx
// import React, { useEffect, useRef } from "react";
// import * as LightweightCharts from "lightweight-charts";

// const HammerChart = ({ data }) => {
//   const chartContainer = useRef();

//   useEffect(() => {
//     if (!data || data.length === 0) return;

//     const container = chartContainer.current;

//     const chart = LightweightCharts.createChart(container, {
//       width: container.clientWidth,
//       height: 400,
//       layout: { backgroundColor: "#fff", textColor: "#333" },
//       grid: { vertLines: { color: "#eee" }, horzLines: { color: "#eee" } },
//       rightPriceScale: { borderColor: "#ccc" },
//       timeScale: { borderColor: "#ccc" },
//     });

//     const candleSeries = chart.addCandlestickSeries({
//       upColor: "#4caf50",
//       downColor: "#f44336",
//       borderVisible: true,
//       wickUpColor: "#4caf50",
//       wickDownColor: "#f44336",
//     });

//     const formattedData = data.map((d, i) => ({
//       time: d.date,
//       open: d.open ?? (i > 0 ? data[i - 1].close : d.close),
//       high: d.high,
//       low: d.low,
//       close: d.close,
//     }));

//     candleSeries.setData(formattedData);

//     const handleResize = () => chart.applyOptions({ width: container.clientWidth });
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       chart.remove();
//     };
//   }, [data]);

//   return <div ref={chartContainer} style={{ width: "100%", height: "400px" }} />;
// };

// export default HammerChart;
