"use client";

interface Repo {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  pushedAt: string;
  topics: string[];
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
  Go: "#00ADD8", Rust: "#dea584", Java: "#b07219", "C#": "#178600",
  "C++": "#f34b7d", CSS: "#563d7c", HTML: "#e34c26", Shell: "#89e051",
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function RepoCards({ repos }: { repos: Repo[] }) {
  return (
    <div style={{ background: "white", borderRadius: 16, padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Top Repositories</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {repos.map(repo => (
          <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: "none", display: "block", padding: 16, borderRadius: 12, border: "1px solid #e2e8f0", transition: "all 0.2s", background: "#fafafa" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#94a3b8"; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e2e8f0"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
          >
            <div style={{ fontWeight: 600, color: "#164e63", fontSize: 14, marginBottom: 6 }}>{repo.name}</div>
            {repo.description && <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 10px", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{repo.description}</p>}
            {repo.topics?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
                {repo.topics.slice(0, 3).map(t => (
                  <span key={t} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 10, background: "#e0f2fe", color: "#0369a1" }}>{t}</span>
                ))}
              </div>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "#94a3b8" }}>
              {repo.language && (
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: LANG_COLORS[repo.language] || "#64748b", display: "inline-block" }} />
                  {repo.language}
                </span>
              )}
              <span>⭐ {repo.stars}</span>
              <span>🍴 {repo.forks}</span>
              <span style={{ marginLeft: "auto" }}>{timeAgo(repo.pushedAt)}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
