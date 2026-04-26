"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface HourEntry { hour: number; count: number }
interface DayEntry { day: string; count: number }

export default function ActiveTimeChart({ activeHours, activeDays }: { activeHours: HourEntry[]; activeDays: DayEntry[] }) {
  const maxHour = Math.max(...activeHours.map(h => h.count), 1);
  const maxDay = Math.max(...activeDays.map(d => d.count), 1);

  const hourData = activeHours.map(h => ({
    ...h,
    label: `${h.hour}:00`,
  }));

  return (
    <div style={{ background: "white", borderRadius: 16, padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Activity Patterns</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, flexWrap: "wrap" } as React.CSSProperties}>
        <div>
          <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 12px", fontWeight: 600 }}>BY HOUR (UTC)</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={hourData} barSize={8}>
              <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#94a3b8" }} interval={3} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip formatter={(v) => [`${v} events`, "Count"]} labelFormatter={(l) => `Hour: ${l}`} />
              <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                {hourData.map((entry, i) => (
                  <Cell key={i} fill={entry.count / maxHour > 0.6 ? "#164e63" : entry.count / maxHour > 0.3 ? "#0e7490" : "#bae6fd"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 12px", fontWeight: 600 }}>BY DAY OF WEEK</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={activeDays} barSize={20}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip formatter={(v) => [`${v} events`, "Count"]} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {activeDays.map((entry, i) => (
                  <Cell key={i} fill={entry.count / maxDay > 0.6 ? "#4c1d95" : entry.count / maxDay > 0.3 ? "#7c3aed" : "#ddd6fe"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
