"use client";

import { useEffect, useState } from "react";

interface GitHubData {
  user: { login: string; name: string; avatar: string; bio: string; publicRepos: number; followers: number; following: number; createdAt: string; url: string };
  languages: { name: string; count: number }[];
  topRepos: { name: string; description: string; url: string; stars: number; forks: number; language: string; pushedAt: string; topics: string[] }[];
  heatmap: Record<string, number>;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
  Go: "#00ADD8", Rust: "#dea584", Java: "#b07219", "C#": "#178600",
  "C++": "#f34b7d", CSS: "#563d7c", HTML: "#e34c26",
};

function timeAgo(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
  if (days === 0) return "today";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function GitHubSection() {
  const [data, setData] = useState<GitHubData | null>(null);

  useEffect(() => {
    fetch("/api/github").then(r => r.json()).then(d => { if (!d.error) setData(d); }).catch(() => {});
  }, []);

  // Heatmap: last year (52 weeks)
  function MiniHeatmap() {
    if (!data) return null;
    const today = new Date();
    const days: { date: string; count: number }[] = [];
    for (let i = 370; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({ date: key, count: data.heatmap[key] || 0 });
    }
    const max = Math.max(...days.map(d => d.count), 1);
    const firstDay = new Date(days[0].date).getDay();
    const padded = [...Array(firstDay).fill(null), ...days] as (typeof days[0] | null)[];
    const weeks: (typeof days[0] | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));

    function getColor(count: number) {
      if (count === 0) return "#eef2f7";
      const intensity = count / max;
      if (intensity < 0.25) return "#bae6fd";
      if (intensity < 0.5) return "#38bdf8";
      if (intensity < 0.75) return "#0ea5e9";
      return "#164e63";
    }

    return (
      <div style={{ overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 3 }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {Array(7).fill(null).map((_, di) => {
                const cell = week[di] ?? null;
                return (
                  <div key={di} title={cell ? `${cell.date}: ${cell.count}` : ""}
                    style={{
                      width: 11, height: 11, borderRadius: 2,
                      background: cell ? getColor(cell.count) : "transparent",
                    }} />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section style={{ padding: "64px 0", background: "#f1f5f9" }}>
      <div style={{ maxWidth: 896, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#0f172a">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#0f172a" }}>GitHub</h2>
            </div>
            <p style={{ margin: 0, color: "#64748b", fontSize: 15 }}>Open source activity and projects</p>
          </div>
          <a href="/github" style={{
            padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
            background: "linear-gradient(135deg, #164e63, #4c1d95)", color: "white", textDecoration: "none",
          }}>View all →</a>
        </div>

        {!data && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8" }}>Loading...</div>
        )}

        {data && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Profile Card */}
            <div style={{
              background: "white", borderRadius: 16, padding: "24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)", display: "flex",
              alignItems: "center", gap: 24, flexWrap: "wrap",
            }}>
              <img src={data.user.avatar} alt={data.user.name} style={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid #e2e8f0" }} />
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>{data.user.name}</span>
                  <span style={{ fontSize: 14, color: "#64748b" }}>@{data.user.login}</span>
                </div>
                {data.user.bio && <p style={{ fontSize: 14, color: "#475569", margin: "0 0 12px" }}>{data.user.bio}</p>}
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  {[
                    { label: "Repos", value: data.user.publicRepos },
                    { label: "Followers", value: data.user.followers },
                    { label: "Following", value: data.user.following },
                    { label: "On GitHub since", value: new Date(data.user.createdAt).getFullYear() },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 20, fontWeight: 700, background: "linear-gradient(135deg, #164e63, #4c1d95)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{value}</div>
                      <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <a href={data.user.url} target="_blank" rel="noopener noreferrer" style={{
                padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                background: "linear-gradient(135deg, #164e63, #4c1d95)", color: "white", textDecoration: "none",
              }}>View on GitHub</a>
            </div>

            {/* Heatmap + Languages */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "start" }}>
              <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
                <p style={{ margin: "0 0 12px", fontSize: 12, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Last year</p>
                <MiniHeatmap />
              </div>
              <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)", minWidth: 160 }}>
                <p style={{ margin: "0 0 12px", fontSize: 12, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Top Languages</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {data.languages.slice(0, 5).map(({ name, count }) => (
                    <div key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: "50%", background: LANG_COLORS[name] || "#64748b", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#475569", flex: 1 }}>{name}</span>
                      <span style={{ fontSize: 12, color: "#94a3b8" }}>{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top repos */}
            <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
              <p style={{ margin: "0 0 14px", fontSize: 12, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Top Repos by Stars</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {data.topRepos.slice(0, 5).map((repo, i) => (
                  <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 4 ? "1px solid #f1f5f9" : "none", textDecoration: "none" }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#164e63", flex: 1 }}>{repo.name}</span>
                    {repo.language && (
                      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#64748b" }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: LANG_COLORS[repo.language] || "#64748b" }} />
                        {repo.language}
                      </span>
                    )}
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>⭐ {repo.stars}</span>
                    <span style={{ fontSize: 11, color: "#cbd5e1" }}>{timeAgo(repo.pushedAt)}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
