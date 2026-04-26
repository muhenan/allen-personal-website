"use client";

export default function ContribHeatmap({ heatmap }: { heatmap: Record<string, number> }) {
  // Build last 91 days grid (13 weeks × 7 days)
  const today = new Date();
  const days: { date: string; count: number }[] = [];
  for (let i = 90; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({ date: key, count: heatmap[key] || 0 });
  }

  // Pad front so first day aligns to correct weekday column
  const firstDayOfWeek = new Date(days[0].date).getDay(); // 0=Sun
  const padded = [...Array(firstDayOfWeek).fill(null), ...days];

  const maxCount = Math.max(...days.map(d => d.count), 1);

  function getColor(count: number) {
    if (count === 0) return "#f1f5f9";
    const intensity = Math.min(count / maxCount, 1);
    if (intensity < 0.25) return "#bae6fd";
    if (intensity < 0.5) return "#38bdf8";
    if (intensity < 0.75) return "#0ea5e9";
    return "#164e63";
  }

  // Group into weeks (columns)
  const weeks: (typeof days[0] | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7) as (typeof days[0] | null)[]);
  }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const totalContribs = days.reduce((s, d) => s + d.count, 0);

  return (
    <div style={{ background: "white", borderRadius: 16, padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Contributions (last 90 days)</h3>
        <span style={{ fontSize: 13, color: "#64748b" }}>{totalContribs} events</span>
      </div>
      <div style={{ overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 4 }}>
          {/* Day labels */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginRight: 4, justifyContent: "space-around" }}>
            {dayLabels.map((d, i) => (
              <span key={d} style={{ fontSize: 10, color: "#94a3b8", height: 13, lineHeight: "13px", visibility: i % 2 === 1 ? "visible" : "hidden" }}>{d}</span>
            ))}
          </div>
          {/* Weeks */}
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {Array(7).fill(null).map((_, di) => {
                const cell = week[di] ?? null;
                return (
                  <div key={di} title={cell ? `${cell.date}: ${cell.count} events` : ""}
                    style={{
                      width: 13, height: 13, borderRadius: 3,
                      background: cell ? getColor(cell.count) : "transparent",
                      cursor: cell ? "default" : "default",
                    }} />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 12, justifyContent: "flex-end" }}>
        <span style={{ fontSize: 11, color: "#94a3b8" }}>Less</span>
        {["#f1f5f9", "#bae6fd", "#38bdf8", "#0ea5e9", "#164e63"].map(c => (
          <div key={c} style={{ width: 13, height: 13, borderRadius: 3, background: c }} />
        ))}
        <span style={{ fontSize: 11, color: "#94a3b8" }}>More</span>
      </div>
    </div>
  );
}
