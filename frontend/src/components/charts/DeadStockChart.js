// src/components/charts/DeadStockChart.js
"use client";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { name: "Active Stock", value: 75 },
  { name: "Slow Moving", value: 15 },
  { name: "Dead Stock", value: 10 },
];

const COLORS = ["#000000", "#525252", "#a3a3a3"];

export default function DeadStockChart() {
  return (
    <div className="h-80 w-full bg-white p-6 rounded-2xl border border-gray-200">
      <h3 className="text-lg font-semibold mb-6 text-gray-900">
        Stock Vitality
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={65}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              fontFamily: "inherit",
              fontSize: "14px",
            }}
          />
          <Legend
            wrapperStyle={{
              fontSize: "14px",
              fontFamily: "inherit",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
