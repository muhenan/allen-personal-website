"use client";

interface Category {
  name: string;
  percent: number;
  text: string;
}

const CAT_COLORS: Record<string, string> = {
  Coding: "#164e63", Debugging: "#dc2626", Browsing: "#f59e0b",
  "Building": "#10b981", "Code Reviewing": "#8b5cf6", Designing: "#ec4899",
};

export default function CategoryBreakdown({ categories }: { categories: Category[] }) {
  if (!categories.length) return null;

  return (
    <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Activity Categories</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {categories.map(c => {
          const color = CAT_COLORS[c.name] || "#64748b";
          return (
            <div key={c.name} style={{
              flex: "1 1 140px", padding: "16px 20px", borderRadius: 12,
              border: "1px solid #e2e8f0", background: "#fafafa",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>{c.name}</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color, marginBottom: 2 }}>{c.percent.toFixed(1)}%</div>
              <div style={{ fontSize: 12, color: "#94a3b8" }}>{c.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
