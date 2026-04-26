"use client";

interface FeedItem {
  type: string;
  repo: string;
  description: string;
  createdAt: string;
}

const EVENT_ICON: Record<string, string> = {
  PushEvent: "📦",
  PullRequestEvent: "🔀",
  IssuesEvent: "🐛",
  CreateEvent: "✨",
  WatchEvent: "⭐",
  ForkEvent: "🍴",
  DeleteEvent: "🗑️",
};

const EVENT_LABEL: Record<string, string> = {
  PushEvent: "pushed to",
  PullRequestEvent: "PR on",
  IssuesEvent: "issue on",
  CreateEvent: "created in",
  WatchEvent: "starred",
  ForkEvent: "forked",
  DeleteEvent: "deleted from",
};

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

export default function ActivityFeed({ feed }: { feed: FeedItem[] }) {
  return (
    <div style={{ background: "white", borderRadius: 16, padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Recent Activity</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {feed.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < feed.length - 1 ? "1px solid #f1f5f9" : "none" }}>
            <span style={{ fontSize: 16, width: 24, flexShrink: 0, marginTop: 2 }}>{EVENT_ICON[item.type] ?? "🔧"}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, color: "#475569", marginBottom: 2 }}>
                <span style={{ color: "#64748b" }}>{EVENT_LABEL[item.type] ?? item.type} </span>
                <span style={{ fontWeight: 600, color: "#164e63" }}>{item.repo.split("/")[1] ?? item.repo}</span>
              </div>
              {item.description && (
                <div style={{ fontSize: 12, color: "#94a3b8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.description}</div>
              )}
            </div>
            <span style={{ fontSize: 11, color: "#94a3b8", flexShrink: 0, marginTop: 2 }}>{timeAgo(item.createdAt)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
