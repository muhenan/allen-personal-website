"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import Link from "next/link";

interface WakaData {
  dailyAvg: string;
  totalWeek: string;
  totalAllTime: string;
  languages: { name: string; percent: number; text: string }[];
  editors: { name: string; percent: number; text: string }[];
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f1e05a", Python: "#3572A5",
  Go: "#00ADD8", Rust: "#dea584", Java: "#b07219", "C#": "#178600",
  "C++": "#f34b7d", CSS: "#563d7c", HTML: "#e34c26", Shell: "#89e051",
  Bash: "#89e051", JSON: "#292929", YAML: "#cb171e", Markdown: "#083fa1",
};

const CACHE_KEY = "wakatime_section_cache";
let _mem: WakaData | null = null;

export default function CodingStatsSection() {
  const [data, setData] = useState<WakaData | null>(null);

  useLayoutEffect(() => {
    if (_mem) { setData(_mem); return; }
    try {
      const stored = sessionStorage.getItem(CACHE_KEY);
      if (stored) { _mem = JSON.parse(stored); setData(_mem); }
    } catch {}
  }, []);

  useEffect(() => {
    if (_mem) return;
    fetch("/api/wakatime").then(r => r.json()).then(d => {
      if (!d.error) {
        _mem = d;
        try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(d)); } catch {}
        setData(d);
      }
    }).catch(() => {});
  }, []);

  return (
    <section style={{ padding: "64px 0", background: "#ffffff" }}>
      <div style={{ maxWidth: 896, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>⌨️</span>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: "#0f172a" }}>Coding Stats</h2>
            </div>
            <p style={{ margin: 0, color: "#64748b", fontSize: 15 }}>Weekly coding activity via WakaTime</p>
          </div>
          <Link href="/coding-stats" style={{
            padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
            background: "linear-gradient(135deg, #164e63, #4c1d95)", color: "white", textDecoration: "none",
          }}>View all →</Link>
        </div>

        {!data && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#94a3b8" }}>Loading...</div>
        )}

        {data && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Summary cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                { label: "Daily Average", value: data.dailyAvg, icon: "⏱" },
                { label: "This Week", value: data.totalWeek, icon: "📅" },
                { label: "All Time", value: data.totalAllTime, icon: "🔥" },
              ].map(c => (
                <div key={c.label} style={{
                  background: "#f8fafc", borderRadius: 12, padding: "16px 20px",
                  border: "1px solid #e2e8f0",
                }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{c.icon}</div>
                  <div style={{
                    fontSize: 18, fontWeight: 700, marginBottom: 2,
                    background: "linear-gradient(135deg, #164e63, #4c1d95)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>{c.value}</div>
                  <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{c.label}</div>
                </div>
              ))}
            </div>

            {/* Language bar */}
            <div style={{ background: "#f8fafc", borderRadius: 12, padding: "16px 20px", border: "1px solid #e2e8f0" }}>
              <p style={{ margin: "0 0 12px", fontSize: 12, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Languages This Week</p>
              <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", height: 10, marginBottom: 12 }}>
                {data.languages.slice(0, 8).map(l => (
                  <div key={l.name} style={{ width: `${l.percent}%`, background: LANG_COLORS[l.name] || "#94a3b8" }} />
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px" }}>
                {data.languages.slice(0, 6).map(l => (
                  <div key={l.name} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: LANG_COLORS[l.name] || "#94a3b8" }} />
                    <span style={{ fontSize: 12, color: "#334155", fontWeight: 500 }}>{l.name}</span>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{l.percent.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
