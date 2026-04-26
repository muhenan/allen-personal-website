"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import StatCards from "../components/wakatime/StatCards";
import LanguageBar from "../components/wakatime/LanguageBar";
import EditorChart from "../components/wakatime/EditorChart";
import CategoryBreakdown from "../components/wakatime/CategoryBreakdown";

interface WakaData {
  dailyAvg: string;
  totalWeek: string;
  totalAllTime: string;
  languages: { name: string; percent: number; text: string }[];
  editors: { name: string; percent: number; text: string }[];
  os: { name: string; percent: number; text: string }[];
  categories: { name: string; percent: number; text: string }[];
  bestDay: { date: string; text: string } | null;
}

export default function CodingStatsPage() {
  const [data, setData] = useState<WakaData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/wakatime")
      .then(r => r.json())
      .then(d => {
        if (d.error) { setError(d.error); return; }
        setData(d);
      })
      .catch(e => setError(String(e)));
  }, []);

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #164e63, #4c1d95)", padding: "48px 0 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            ← back to muhenan.com
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28 }}>⌨️</span>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "white" }}>Coding Stats</h1>
          </div>
          <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.7)", fontSize: 15 }}>
            Live coding activity tracked by WakaTime
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px 64px" }}>
        {error && (
          <div style={{ background: "#fee2e2", color: "#dc2626", padding: 16, borderRadius: 12, marginBottom: 24 }}>
            Failed to load coding stats: {error}
          </div>
        )}

        {!data && !error && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#94a3b8" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
            Loading coding stats...
          </div>
        )}

        {data && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <StatCards
              dailyAvg={data.dailyAvg}
              totalWeek={data.totalWeek}
              totalAllTime={data.totalAllTime}
              bestDay={data.bestDay}
            />
            <LanguageBar languages={data.languages} />
            <EditorChart editors={data.editors} os={data.os} />
            <CategoryBreakdown categories={data.categories} />
          </div>
        )}
      </div>
    </div>
  );
}
