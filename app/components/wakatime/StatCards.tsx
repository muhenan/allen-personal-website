"use client";

interface Props {
  dailyAvg: string;
  totalWeek: string;
  totalAllTime: string;
  bestDay: { date: string; text: string } | null;
}

export default function StatCards({ dailyAvg, totalWeek, totalAllTime, bestDay }: Props) {
  const cards = [
    { label: "Daily Average", value: dailyAvg, icon: "⏱" },
    { label: "This Week", value: totalWeek, icon: "📅" },
    { label: "All Time", value: totalAllTime, icon: "🔥" },
    ...(bestDay ? [{ label: `Best Day (${bestDay.date})`, value: bestDay.text, icon: "🏆" }] : []),
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
      {cards.map(c => (
        <div key={c.label} style={{
          background: "white", borderRadius: 16, padding: "20px 24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
          <div style={{
            fontSize: 20, fontWeight: 700, marginBottom: 4,
            background: "linear-gradient(135deg, #164e63, #4c1d95)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>{c.value}</div>
          <div style={{ fontSize: 12, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{c.label}</div>
        </div>
      ))}
    </div>
  );
}
