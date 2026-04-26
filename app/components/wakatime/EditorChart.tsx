"use client";

interface Item {
  name: string;
  percent: number;
  text: string;
}

const EDITOR_COLORS: Record<string, string> = {
  "VS Code": "#007ACC", "Cursor": "#007ACC", "Neovim": "#57A143", "Vim": "#019733",
  "IntelliJ IDEA": "#FE315D", "GoLand": "#00D1B2", "PyCharm": "#21D789",
  "WebStorm": "#07C3F2", "Terminal": "#4d4d4d", "Zed": "#084CCF",
};

function BarRow({ item, color }: { item: Item; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
      <span style={{ fontSize: 13, fontWeight: 500, color: "#334155", width: 90, flexShrink: 0 }}>{item.name}</span>
      <div style={{ flex: 1, background: "#f1f5f9", borderRadius: 6, height: 8, overflow: "hidden" }}>
        <div style={{ width: `${item.percent}%`, height: "100%", background: color, borderRadius: 6, transition: "width 0.5s ease" }} />
      </div>
      <span style={{ fontSize: 12, color: "#94a3b8", width: 80, textAlign: "right", flexShrink: 0 }}>{item.text}</span>
    </div>
  );
}

export default function EditorChart({ editors, os }: { editors: Item[]; os: Item[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
      <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Editors</h3>
        {editors.map(e => (
          <BarRow key={e.name} item={e} color={EDITOR_COLORS[e.name] || "#64748b"} />
        ))}
      </div>
      <div style={{ background: "white", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
        <h3 style={{ margin: "0 0 20px", fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Operating Systems</h3>
        {os.map(o => (
          <BarRow key={o.name} item={o} color={o.name === "Mac" ? "#333" : o.name === "Linux" ? "#FCC624" : "#0078D4"} />
        ))}
      </div>
    </div>
  );
}
