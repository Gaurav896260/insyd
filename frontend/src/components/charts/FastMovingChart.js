// src/components/charts/FastMovingChart.js
"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function FastMovingChart({ chartData = [] }) {
  // Map backend data (_id as SKU, totalSold as value) to chart format
  const formattedData = chartData.map((item) => ({
    name: item._id, // This is the SKU from the aggregate group
    sales: item.totalSold,
  }));

  return (
    <div className="h-80 w-full bg-white p-6 rounded-2xl border border-gray-200">
      <h3 className="text-lg font-semibold mb-6 text-gray-900">
        Fast Moving Stock
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={
            formattedData.length > 0
              ? formattedData
              : [{ name: "No Data", sales: 0 }]
          }
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#e5e7eb"
          />
          <XAxis
            dataKey="name"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            stroke="#6b7280"
            fontFamily="inherit"
          />
          <YAxis
            fontSize={12}
            tickLine={false}
            axisLine={false}
            stroke="#6b7280"
            fontFamily="inherit"
          />
          <Tooltip
            cursor={{ fill: "#f9fafb" }}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              fontFamily: "inherit",
              fontSize: "14px",
            }}
          />
          <Bar
            dataKey="sales"
            fill="#000000"
            radius={[8, 8, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
