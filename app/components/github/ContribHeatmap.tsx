"use client";

export default function ContribHeatmap({ heatmap }: { heatmap: Record<string, number> }) {
  // Build last 371 days (53 weeks) to always fill the grid
  const today = new Date();
  const days: { date: string; count: number }[] = [];
  for (let i = 370; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    days.push({ date: key, count: heatmap[key] || 0 });
  }

  // Pad front so grid starts on Sunday
  const firstDayOfWeek = new Date(days[0].date).getDay();
  const padded: ({ date: string; count: number } | null)[] = [
    ...Array(firstDayOfWeek).fill(null),
    ...days,
  ];

  const maxCount = Math.max(...days.map(d => d.count), 1);
  const totalContribs = days.reduce((s, d) => s + d.count, 0);

  function getColor(count: number) {
    if (count === 0) return "#eef2f7";
    const intensity = Math.min(count / maxCount, 1);
    if (intensity < 0.25) return "#bae6fd";
    if (intensity < 0.5)  return "#38bdf8";
    if (intensity < 0.75) return "#0ea5e9";
    return "#164e63";
  }

  // Group into weeks (columns of 7)
  const weeks: ({ date: string; count: number } | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }

  // Month labels: find the first week where a new month starts
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthLabels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstCell = week.find(c => c !== null);
    if (firstCell) {
      const m = new Date(firstCell.date).getMonth();
      if (m !== lastMonth) {
        monthLabels.push({ label: monthNames[m], weekIndex: wi });
        lastMonth = m;
      }
    }
  });

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <div style={{ background: "white", borderRadius: 16, padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Contributions (last year)</h3>
        <span style={{ fontSize: 13, color: "#64748b" }}>{totalContribs} contributions</span>
      </div>

      <div style={{ overflowX: "auto" }}>
        {/* Month labels row */}
        <div style={{ display: "flex", gap: 3, marginLeft: 24, marginBottom: 4 }}>
          {weeks.map((_, wi) => {
            const label = monthLabels.find(m => m.weekIndex === wi);
            return (
              <div key={wi} style={{ width: 13, fontSize: 10, color: "#94a3b8", flexShrink: 0 }}>
                {label ? label.label : ""}
              </div>
            );
          })}
        </div>

        {/* Grid */}
        <div style={{ display: "flex", gap: 3 }}>
          {/* Day labels */}
          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginRight: 4 }}>
            {dayLabels.map((d, i) => (
              <span key={i} style={{ fontSize: 10, color: "#94a3b8", height: 13, lineHeight: "13px" }}>{d}</span>
            ))}
          </div>
          {/* Weeks */}
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {Array(7).fill(null).map((_, di) => {
                const cell = week[di] ?? null;
                return (
                  <div key={di}
                    title={cell ? `${cell.date}: ${cell.count} contributions` : ""}
                    style={{
                      width: 13, height: 13, borderRadius: 3,
                      background: cell ? getColor(cell.count) : "transparent",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 12, justifyContent: "flex-end" }}>
        <span style={{ fontSize: 11, color: "#94a3b8" }}>Less</span>
        {["#eef2f7", "#bae6fd", "#38bdf8", "#0ea5e9", "#164e63"].map(c => (
          <div key={c} style={{ width: 13, height: 13, borderRadius: 3, background: c }} />
        ))}
        <span style={{ fontSize: 11, color: "#94a3b8" }}>More</span>
      </div>
    </div>
  );
}
