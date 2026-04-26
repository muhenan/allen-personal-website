"use client";

interface Language {
  name: string;
  percent: number;
  text: string;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
  Go: "#00ADD8", Rust: "#dea584", Java: "#b07219", "C#": "#178600",
  "C++": "#f34b7d", CSS: "#563d7c", HTML: "#e34c26", Shell: "#89e051",
  Bash: "#89e051", JSON: "#292929", YAML: "#cb171e", Markdown: "#083fa1",
  Lua: "#000080", Ruby: "#701516", Swift: "#F05138", Kotlin: "#A97BFF",
  Docker: "#384d54", SQL: "#e38c00", TOML: "#9c4221", XML: "#0060ac",
};

export default function LanguageBar({ languages }: { languages: Language[] }) {
  return (
    <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Languages (Last 7 Days)</h3>

      {/* Stacked bar */}
      <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", height: 12, marginBottom: 20 }}>
        {languages.map(l => (
          <div key={l.name} style={{
            width: `${l.percent}%`,
            background: LANG_COLORS[l.name] || "#94a3b8",
            transition: "width 0.5s ease",
          }} />
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 20px" }}>
        {languages.map(l => (
          <div key={l.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: LANG_COLORS[l.name] || "#94a3b8", flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: "#334155", fontWeight: 500 }}>{l.name}</span>
            <span style={{ fontSize: 12, color: "#94a3b8" }}>{l.percent.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
