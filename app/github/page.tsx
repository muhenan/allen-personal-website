"use client";

import { useEffect, useState } from "react";
import ProfileCard from "../components/github/ProfileCard";
import LangChart from "../components/github/LangChart";
import ContribHeatmap from "../components/github/ContribHeatmap";
import RepoCards from "../components/github/RepoCards";
import ActiveTimeChart from "../components/github/ActiveTimeChart";
import ActivityFeed from "../components/github/ActivityFeed";

interface GitHubData {
  user: {
    login: string; name: string; avatar: string; bio: string;
    followers: number; following: number; publicRepos: number; createdAt: string; url: string;
  };
  languages: { name: string; count: number }[];
  topRepos: {
    name: string; description: string; url: string;
    stars: number; forks: number; language: string; pushedAt: string; topics: string[];
  }[];
  heatmap: Record<string, number>;
  activeHours: { hour: number; count: number }[];
  activeDays: { day: string; count: number }[];
  activityFeed: { type: string; repo: string; description: string; createdAt: string }[];
}

export default function GitHubPage() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/github")
      .then(r => r.json())
      .then(d => { if (d.error) setError(d.error); else setData(d); })
      .catch(e => setError(String(e)));
  }, []);

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #164e63, #4c1d95)", padding: "48px 0 40px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            ← back to muhenan.com
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "white" }}>GitHub Activity</h1>
          </div>
          <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.7)", fontSize: 15 }}>
            A live snapshot of my open source work and coding activity
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 24px 64px" }}>
        {error && (
          <div style={{ background: "#fee2e2", color: "#dc2626", padding: 16, borderRadius: 12, marginBottom: 24 }}>
            Failed to load GitHub data: {error}
          </div>
        )}

        {!data && !error && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "#94a3b8" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
            Loading GitHub data...
          </div>
        )}

        {data && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Profile */}
            <ProfileCard user={data.user} />

            {/* Heatmap */}
            <ContribHeatmap heatmap={data.heatmap} />

            {/* Lang + Activity time */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <LangChart languages={data.languages} />
              <ActiveTimeChart activeHours={data.activeHours} activeDays={data.activeDays} />
            </div>

            {/* Repos */}
            <RepoCards repos={data.topRepos} />

            {/* Feed */}
            <ActivityFeed feed={data.activityFeed} />
          </div>
        )}
      </div>
    </div>
  );
}
