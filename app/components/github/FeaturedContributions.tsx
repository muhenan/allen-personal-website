"use client";

interface Contribution {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  prCount: number;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
  Go: "#00ADD8", Rust: "#dea584", Java: "#b07219", "C#": "#178600",
  "C++": "#f34b7d", CSS: "#563d7c", HTML: "#e34c26", Shell: "#89e051",
};

export default function FeaturedContributions({ contributions }: { contributions: Contribution[] }) {
  if (!contributions.length) return null;

  return (
    <div style={{ background: "white", borderRadius: 16, padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Featured Contributions</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {contributions.map(c => (
          <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: "none", display: "block", padding: 16, borderRadius: 12, border: "1px solid #e2e8f0", transition: "all 0.2s", background: "#fafafa" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#94a3b8"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            <div style={{ fontWeight: 600, color: "#164e63", fontSize: 14, marginBottom: 6 }}>{c.name}</div>
            {c.description && <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 10px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.description}</p>}
            {c.topics?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
                {c.topics.slice(0, 3).map(t => (
                  <span key={t} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 10, background: "#e0f2fe", color: "#0369a1" }}>{t}</span>
                ))}
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "#94a3b8" }}>
              {c.language && (
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: LANG_COLORS[c.language] || "#64748b", display: "inline-block" }} />
                  {c.language}
                </span>
              )}
              <span>⭐ {c.stars}</span>
              <span>🍴 {c.forks}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
