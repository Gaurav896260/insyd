// src/components/charts/StockAgingChart.js
"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample trend data if real history isn't available from API yet
const sampleTrend = [
  { day: "Day 10", age: 5 },
  { day: "Day 30", age: 15 },
  { day: "Day 60", age: 45 },
  { day: "Day 90", age: 80 },
  { day: "Day 120", age: 110 },
];

export default function StockAgingChart({ data = [] }) {
  // If API provides items, we map them; otherwise, use trend sample
  const chartData =
    data.length > 0
      ? data.map((item) => ({ name: item.name, age: item.quantity }))
      : sampleTrend;

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e4e4e7"
          />
          <XAxis
            dataKey={data.length > 0 ? "name" : "day"}
            fontSize={10}
            fontWeight="bold"
            tickLine={false}
            axisLine={false}
            stroke="#000"
            tick={{ dy: 10 }}
          />
          <YAxis
            fontSize={10}
            fontWeight="bold"
            tickLine={false}
            axisLine={false}
            stroke="#000"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#000",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            itemStyle={{ color: "#fff" }}
            cursor={{ stroke: "#000", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey={data.length > 0 ? "age" : "age"}
            stroke="#000"
            strokeWidth={3}
            dot={{ r: 4, fill: "#000", strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, stroke: "#000", strokeWidth: 2, fill: "#fff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
