"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#164e63", "#4c1d95", "#0e7490", "#6d28d9", "#0369a1", "#7c3aed", "#0284c7", "#5b21b6", "#0ea5e9", "#8b5cf6"];

interface LangEntry { name: string; count: number }

export default function LangChart({ languages }: { languages: LangEntry[] }) {
  const top = languages.slice(0, 10);

  return (
    <div style={{ background: "white", borderRadius: 16, padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Language Distribution</h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={top} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={45} paddingAngle={2}>
            {top.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value} repos`, name]} />
          <Legend iconType="circle" iconSize={10} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
