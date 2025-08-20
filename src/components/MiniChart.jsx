import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function MiniChart({ data = [], positive = true }) {
  const chartData = (data || []).map((v, i) => ({ x: i, y: v }));
  return (
    <div style={{ width: 120, height: 40 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="y" stroke={positive ? "#22c55e" : "#ef4444"} dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
