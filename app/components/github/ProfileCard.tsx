"use client";

interface Profile {
  login: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  publicRepos: number;
  createdAt: string;
  url: string;
}

export default function ProfileCard({ user }: { user: Profile }) {
  const since = new Date(user.createdAt).getFullYear();

  return (
    <div style={{
      background: "white",
      borderRadius: 16,
      padding: "24px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      display: "flex",
      alignItems: "center",
      gap: 24,
      flexWrap: "wrap",
    }}>
      <img src={user.avatar} alt={user.name} style={{ width: 80, height: 80, borderRadius: "50%", border: "3px solid #e2e8f0" }} />
      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>{user.name}</span>
          <span style={{ fontSize: 14, color: "#64748b" }}>@{user.login}</span>
        </div>
        {user.bio && <p style={{ fontSize: 14, color: "#475569", margin: "0 0 12px" }}>{user.bio}</p>}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[
            { label: "Repos", value: user.publicRepos },
            { label: "Followers", value: user.followers },
            { label: "Following", value: user.following },
            { label: "On GitHub since", value: since },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, background: "linear-gradient(135deg, #164e63, #4c1d95)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{value}</div>
              <div style={{ fontSize: 11, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <a href={user.url} target="_blank" rel="noopener noreferrer" style={{
        padding: "8px 18px", borderRadius: 8, fontSize: 13, fontWeight: 600,
        background: "linear-gradient(135deg, #164e63, #4c1d95)", color: "white", textDecoration: "none",
      }}>View on GitHub</a>
    </div>
  );
}
