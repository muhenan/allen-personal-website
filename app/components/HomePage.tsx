"use client";

import { useState, useEffect, useRef } from "react";

type Lang = "en" | "zh";

const content = {
  en: {
    nav: { about: "About", timeline: "Timeline", openSource: "Open Source", chat: "Chat" },
    timeline: { label: "EXPERIENCE", heading: "Timeline" },
    hero: {
      badge: "Algorithm Engineer",
      greeting: "Hi, I'm",
      slogan:
        "Focused on LLM post-training, AI infrastructure, and Agent systems — I thrive at the intersection of cutting-edge research and high-scale engineering.",
    },
    about: {
      heading: "// About",
      left: (
        <>
          B.Eng. in Software Engineering from{" "}
          <span style={{ color: "#f1f5f9", fontWeight: 500 }}>Sun Yat-sen University</span>, M.S. in Software Engineering from{" "}
          <span style={{ color: "#f1f5f9", fontWeight: 500 }}>Northeastern University (US)</span>.
          Currently Algorithm Engineer at{" "}
          <span style={{ color: "#f1f5f9", fontWeight: 500 }}>Wayfair</span>{" "}
          <span style={{ color: "#64748b", fontSize: "0.85em" }}>NYSE: W</span>.
          Previously interned at{" "}
          <span style={{ color: "#f1f5f9", fontWeight: 500 }}>ByteDance</span>, audio &amp; video team of Toutiao.
        </>
      ),
      right: [
        "My current work focuses on large language model post-training, AI infrastructure, and the design and deployment of Agent systems at scale.",
        "I also work on the architecture and development of high-concurrency distributed systems.",
        "I'm also passionate about diving into open-source projects — from foundational frameworks to cutting-edge models — drawing inspiration from source code and applying it to real-world engineering.",
      ],
    },
    openSource: { label: "OPEN SOURCE", heading: "Open Source & Community" },
    footer: {
      built: "Built with Next.js & Tailwind CSS.",
      reach: "Reach me at",
    },
    toggleLabel: "中文",
  },
  zh: {
    nav: { about: "关于我", timeline: "经历", openSource: "开源", chat: "AI 对话" },
    timeline: { label: "EXPERIENCE", heading: "经历" },
    hero: {
      badge: "算法工程师",
      greeting: "你好，我是",
      slogan:
        "专注于大模型后训练、AI Infra 与 Agent 系统构建 —— 在前沿研究与大规模工程落地的交汇处深耕。",
    },
    about: {
      heading: "// 关于我",
      left: (
        <>
          本科就读于{" "}
          <span style={{ color: "#f1f5f9", fontWeight: 500 }}>中山大学</span>，硕士就读于{" "}
          <span style={{ color: "#f1f5f9", fontWeight: 500 }}>美国东北大学（Northeastern University）</span>，均为软件工程专业。
          现任{" "}
          <span style={{ color: "#f1f5f9", fontWeight: 500 }}>Wayfair</span>{" "}
          <span style={{ color: "#64748b", fontSize: "0.85em" }}>NYSE: W</span>{" "}
          算法工程师。曾于{" "}
          <span style={{ color: "#f1f5f9", fontWeight: 500 }}>字节跳动</span>
          实习，今日头条音视频组。
        </>
      ),
      right: [
        "目前工作聚焦于大语言模型后训练、AI 基础设施建设以及 Agent 系统的设计与落地。",
        "同时也负责公司高并发分布式系统的架构设计与开发。",
        "此外，我非常热衷于研究各类开源项目，从底层框架到前沿模型，乐于从源码中汲取灵感并将其应用于实际工程。",
      ],
    },
    openSource: { label: "OPEN SOURCE", heading: "开源与社区" },
    footer: {
      built: "基于 Next.js & Tailwind CSS 构建。",
      reach: "联系方式",
    },
    toggleLabel: "English",
  },
};



const openSource = {
  en: [
    {
      title: "xiaohongshu-mcp",
      metrics: ["11,000+ stars", "500+ community users"],
      description:
        "Built an AI Agent for Xiaohongshu that enables end-to-end automated social media operations, from content generation to execution workflows.",
      tags: ["MCP", "AI Agent", "Automation", "Open Source"],
      href: "https://github.com/xpzouying/xiaohongshu-mcp",
    },
  ],
  zh: [
    {
      title: "xiaohongshu-mcp",
      metrics: ["12,000+ Stars", "社区用户超 500 人"],
      description:
        "基于 MCP 协议构建小红书 AI Agent，实现从内容生成到执行工作流的端到端自动化，支撑社交媒体账号的全自动运营。项目在 GitHub 获星超 12,000，社区活跃用户超 500 人。最近新增 Openclaw 🦞 深度集成，进一步扩展平台能力。",
      tags: ["MCP", "AI Agent", "自动化", "开源项目"],
      href: "https://github.com/xpzouying/xiaohongshu-mcp",
    },
  ],
};

type TimelineItem = {
  date: string;
  org: string;
  role: string;
  desc: string;
  type: "edu" | "work";
  logo: string;
  logoType: "square" | "wide";
};

const timeline: Record<Lang, TimelineItem[]> = {
  en: [
    {
      date: "Sep 2018",
      org: "Sun Yat-sen University",
      role: "B.Eng. · Software Engineering · GPA 3.8/4.0",
      desc: "",
      type: "edu",
      logo: "/logos/sysu.jpeg",
      logoType: "square",
    },
    {
      date: "Mar – Jun 2021",
      org: "ByteDance · Toutiao",
      role: "iOS Engineer Intern",
      desc: "Developed video-page features for Toutiao iOS app serving 160M+ DAU. Independently designed and shipped the Hot Topics Card module.",
      type: "work",
      logo: "/logos/bytedance.jpeg",
      logoType: "square",
    },
    {
      date: "Sep 2022",
      org: "Northeastern University (US)",
      role: "M.S. · Software Engineering · GPA 4.0/4.0",
      desc: "",
      type: "edu",
      logo: "/logos/neu.jpeg",
      logoType: "square",
    },
    {
      date: "Jul – Dec 2023",
      org: "Wayfair · NYSE: W",
      role: "Software Engineer Intern",
      desc: "Led PHP-to-C# microservice migration (3× scalability, 95% error rate reduction). Migrated 13B historical records to GCP PostgreSQL with zero downtime. Optimized peak read QPS to 10k+, P95 latency ↓60%.",
      type: "work",
      logo: "/logos/wayfair_logo.jpeg",
      logoType: "square",
    },
    {
      date: "Jun 2024 – Present",
      org: "Wayfair · NYSE: W",
      role: "Algorithm Engineer",
      desc: "Built LLM-powered customer service with MoE + multi-agent architecture (intent recognition ↑24%, task completion ↑32%). Developed AI Coding Agent automating Jira → GitHub PR (migration time 3–4 days → <1 day). Collaborated with Google Gemini team on Agentic Commerce, driving 10,000+ new orders/month.",
      type: "work",
      logo: "/logos/wayfair_logo.jpeg",
      logoType: "square",
    },
  ],
  zh: [
    {
      date: "2018.09 – 2022.06",
      org: "中山大学",
      role: "本科 · 软件工程 · GPA 3.8/4.0",
      desc: "",
      type: "edu",
      logo: "/logos/sysu.jpeg",
      logoType: "square",
    },
    {
      date: "2021.03 – 2021.06",
      org: "字节跳动 · 今日头条",
      role: "客户端研发工程师（实习）",
      desc: "为今日头条 iOS 客户端开发视频页功能，服务超 1.6 亿日活用户。独立负责【热点卡片】模块的设计与开发，按期高质量上线。",
      type: "work",
      logo: "/logos/bytedance.jpeg",
      logoType: "square",
    },
    {
      date: "2022.09 – 2024.05",
      org: "美国东北大学（Northeastern University）",
      role: "硕士 · 软件工程 · GPA 4.0/4.0",
      desc: "",
      type: "edu",
      logo: "/logos/neu.jpeg",
      logoType: "square",
    },
    {
      date: "2023.07 – 2023.12",
      org: "Wayfair · NYSE: W",
      role: "软件研发工程师（实习）",
      desc: "主导 PHP → C# 微服务迁移，系统可扩展性提升 3 倍，事件失败率降低 95%。将 130 亿条历史记录迁移至 GCP PostgreSQL，零宕机。优化峰值读 QPS 至 10k+，P95 响应时间降低 60%。",
      type: "work",
      logo: "/logos/wayfair_logo.jpeg",
      logoType: "square",
    },
    {
      date: "2024.06 – 至今",
      org: "Wayfair · NYSE: W",
      role: "算法工程师",
      desc: "构建基于 MoE + 多 Agent 架构的 LLM 智能客服，意图识别率 ↑24%，任务完成度 ↑32%。开发 AI Coding Agent 实现 Jira → GitHub PR 全自动化，迁移周期从 3–4 天压缩至 1 天内。与 Google Gemini 团队合作落地 Agentic Commerce，每月新增订单超 10,000 单。",
      type: "work",
      logo: "/logos/wayfair_logo.jpeg",
      logoType: "square",
    },
  ],
};

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SectionHeading({
  label,
  heading,
}: {
  label: string;
  heading: string;
}) {
  return (
    <div className="mb-10">
      <p
        className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em]"
        style={{ color: "#000000" }}
      >
        {label}
      </p>
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#000000" }}>
          {heading}
        </h2>
        <div
          className="h-px flex-1"
          style={{ background: "linear-gradient(90deg, rgba(37,99,235,0.42), rgba(217,70,239,0.22), rgba(15,23,42,0.04))" }}
        />
      </div>
    </div>
  );
}

type ModelId = "gpt5" | "deepseek";

const MODELS: { id: ModelId; label: string; icon: React.ReactNode }[] = [
  {
    id: "deepseek",
    label: "DeepSeek-V3",
    icon: <img src="/logos/deepseek-color.svg" alt="DeepSeek" className="w-4 h-4" />,
  },
  {
    id: "gpt5",
    label: "GPT-5",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.412-.663zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
      </svg>
    ),
  },
];

function ChatSection() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [selectedModel, setSelectedModel] = useState<ModelId>("deepseek");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (loading) {
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [loading]);

  async function handleSend() {
    const msg = input.trim();
    if (!msg || loading) return;
    setLoading(true);
    setReply("");
    setError("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, model: selectedModel }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "请求失败");
        return;
      }
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setReply((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="chat" className="max-w-4xl mx-auto px-8 py-12">
      <SectionHeading label="AI CHAT" heading="和 Allen 的 AI 聊聊" />
      <div
        className="rounded-2xl p-6 flex flex-col gap-4"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(15,23,42,0.08)",
          boxShadow: "0 18px 40px rgba(15,23,42,0.05)",
        }}
      >
        <div className="flex gap-2">
          {MODELS.map((m) => {
            const active = selectedModel === m.id;
            return (
              <button
                key={m.id}
                onClick={() => { setSelectedModel(m.id); setReply(""); setError(""); }}
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all"
                style={{
                  background: active ? "linear-gradient(135deg, #164e63, #4c1d95)" : "#f1f5f9",
                  color: active ? "#ffffff" : "#475569",
                  border: active ? "none" : "1px solid rgba(15,23,42,0.1)",
                }}
              >
                {m.icon}
                {m.label}
              </button>
            );
          })}
        </div>
        <p className="text-sm font-medium" style={{ color: "#64748b" }}>
          有任何问题，欢迎直接问 AI —— 它了解 Allen 的经历和技术方向。
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="输入你的问题..."
            className="flex-1 rounded-xl px-4 py-3 text-base font-medium outline-none"
            style={{
              background: "#f8fafc",
              border: "1px solid rgba(15,23,42,0.12)",
              color: "#000000",
            }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #164e63, #4c1d95)",
              color: "#ffffff",
              border: "none",
            }}
          >
            发送
          </button>
        </div>
        {loading && !reply && (
          <div className="flex items-center gap-2" style={{ color: "#64748b" }}>
            <span className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#94a3b8", animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#94a3b8", animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#94a3b8", animationDelay: "300ms" }} />
            </span>
            <span className="text-sm font-medium">思考中 {elapsed}s</span>
          </div>
        )}
        {reply && (
          <div
            className="rounded-xl px-5 py-4 text-base font-medium leading-relaxed"
            style={{
              background: "#f8fafc",
              border: "1px solid rgba(15,23,42,0.08)",
              color: "#000000",
            }}
          >
            {reply}
          </div>
        )}
        {error && (
          <p className="text-sm font-medium" style={{ color: "#dc2626" }}>{error}</p>
        )}
      </div>
    </section>
  );
}

export default function HomePage() {
  const lang: Lang = "zh";
  const t = content[lang];
  const openSourceList = openSource[lang];

  const surfaceStyle = {
    background: "#ffffff",
    border: "1px solid rgba(15,23,42,0.08)",
    boxShadow: "0 18px 40px rgba(15,23,42,0.05)",
  } as const;

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, rgba(34,211,238,0.24), transparent 30%), radial-gradient(circle at 85% 12%, rgba(59,130,246,0.24), transparent 26%), radial-gradient(circle at 50% 32%, rgba(217,70,239,0.18), transparent 32%), linear-gradient(180deg, #eef6ff 0%, #e9f1ff 38%, #f3f6ff 100%)",
        color: "#000000",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] overflow-hidden">
        <div
          className="absolute left-[-8%] top-[-6rem] h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(34,211,238,0.46), rgba(34,211,238,0.08) 68%, transparent 74%)" }}
        />
        <div
          className="absolute right-[-4%] top-8 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.38), rgba(59,130,246,0.08) 65%, transparent 74%)" }}
        />
        <div
          className="absolute left-1/2 top-28 h-72 w-[34rem] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(217,70,239,0.26), rgba(217,70,239,0.06) 60%, transparent 74%)" }}
        />
      </div>

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.78), rgba(255,255,255,0.58))",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(148,163,184,0.16)",
        }}
      >
        <span
          className="font-mono text-sm font-bold"
          style={{ color: "#000000" }}
        >
          muhenan.com
        </span>
        <div className="flex items-center gap-5">
          <div className="flex gap-6 text-sm font-medium" style={{ color: "#000000" }}>
            <a href="#chat" className="hover:text-slate-900 transition-colors">{t.nav.chat}</a>
            <a href="#timeline" className="hover:text-slate-900 transition-colors">{t.nav.timeline}</a>
            <a href="#open-source" className="hover:text-slate-900 transition-colors">{t.nav.openSource}</a>
          </div>
          {/* Language Toggle — temporarily hidden, English content preserved */}
          {/* <button
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            className="text-xs font-mono px-3 py-1.5 rounded-full transition-all hover:scale-105 active:scale-95"
            style={{
              background: "rgba(129,140,248,0.12)",
              border: "1px solid rgba(129,140,248,0.3)",
              color: "#a5b4fc",
              cursor: "pointer",
            }}
          >
            {t.toggleLabel}
          </button> */}
        </div>
      </nav>

      <main>
        {/* ── Hero ── */}
        <section className="relative flex flex-col items-center justify-center px-6 pb-16 pt-36 text-center sm:pt-40">
          <div
            className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-[26rem] max-w-5xl rounded-[3rem] blur-3xl"
            style={{ background: "radial-gradient(circle at 50% 42%, rgba(217,70,239,0.22), transparent 34%), radial-gradient(circle at 35% 55%, rgba(34,211,238,0.24), transparent 30%), radial-gradient(circle at 70% 35%, rgba(37,99,235,0.22), transparent 28%)" }}
          />
          <div
            className="animate-fade-in relative mx-auto max-w-5xl rounded-[2rem] px-6 py-12 sm:px-10"
            style={surfaceStyle}
          >
            <div
              className="mx-auto mb-6 inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.26em]"
              style={{
                background: "linear-gradient(90deg, rgba(34,211,238,0.14), rgba(217,70,239,0.14))",
                border: "1px solid rgba(255,255,255,0.72)",
                color: "#000000",
              }}
            >
              {t.hero.badge}
            </div>
            <h1 className="animate-fade-in-up delay-100 mb-8 text-6xl font-bold tracking-tight sm:text-8xl" style={{ color: "#000000" }}>
            {t.hero.greeting}{" "}
            <span style={{ background: "linear-gradient(135deg, #164e63, #4c1d95)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Allen
            </span>
            </h1>
            <p className="animate-fade-in-up delay-300 mx-auto mb-10 max-w-3xl text-xl font-medium leading-relaxed" style={{ color: "#000000" }}>
              {t.hero.slogan}
            </p>
            <div className="animate-fade-in-up delay-400 flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/muhenan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #0f172a, #1e293b)",
                  border: "1px solid rgba(15,23,42,0.9)",
                  color: "#f8fafc",
                  boxShadow: "0 12px 32px rgba(15,23,42,0.22)",
                }}
              >
                <GitHubIcon />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/henan-mu-519b6624b/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.86), rgba(255,255,255,0.68))",
                  border: "1px solid rgba(148,163,184,0.22)",
                  color: "#0f172a",
                  boxShadow: "0 10px 24px rgba(15,23,42,0.08)",
                }}
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* ── Chatbot ── */}
        <ChatSection />

        {/* ── Timeline ── */}
        <section id="timeline" className="max-w-4xl mx-auto px-8 py-12">
          <SectionHeading label={t.timeline.label} heading={t.timeline.heading} />
          <div className="flex flex-col gap-14">
            {(
              lang === "zh"
                ? [
                    { label: "工作经历", type: "work", color: "#164e63" },
                    { label: "教育背景", type: "edu", color: "#4c1d95" },
                  ]
                : [
                    { label: "Experience", type: "work", color: "#164e63" },
                    { label: "Education", type: "edu", color: "#4c1d95" },
                  ]
            ).map((group) => {
              const items = timeline[lang].filter((item) => item.type === group.type).reverse();
              return (
                <div
                  key={group.label}
                  className="rounded-[2rem] p-7 sm:p-8"
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(15,23,42,0.1)",
                    boxShadow: "0 16px 32px rgba(15,23,42,0.04)",
                  }}
                >
                  <p className="text-base font-semibold tracking-wide mb-6" style={{ color: "#000000" }}>{group.label}</p>
                  <div className="relative">
                    <div className="absolute left-3 top-0 bottom-0 w-px" style={{ background: `linear-gradient(to bottom, ${group.color}44, transparent)` }} />
                    <div className="flex flex-col gap-7">
                      {items.map((item, i) => (
                        <div key={i} className="flex gap-6">
                          <div className="relative flex-shrink-0 w-6 flex justify-center">
                            <div className="absolute top-1.5 w-2.5 h-2.5 rounded-full"
                              style={{ background: group.color, outline: `2px solid ${group.color}`, outlineOffset: "3px" }} />
                          </div>
                          <div className="flex-1 pb-2">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                              <img
                                src={item.logo}
                                alt={item.org}
                                className="flex-shrink-0 rounded-xl object-cover"
                                style={{ width: 56, height: 56, border: "1px solid rgba(0,0,0,0.08)" }}
                              />
                              <div className="flex-1">
                                {item.type === "edu" ? (
                                  <>
                                    <p className="text-lg font-bold mb-0.5" style={{ color: "#000000" }}>{item.org}</p>
                                    <span className="text-sm font-mono font-medium mb-0.5 block" style={{ color: "#64748b" }}>{item.date}</span>
                                    <p className="text-base font-semibold mb-3" style={{ color: "#000000" }}>{item.role}</p>
                                  </>
                                ) : (
                                  <>
                                    <p className="text-lg font-bold mb-0.5" style={{ color: "#000000" }}>{item.role}</p>
                                    <p className="text-base font-semibold mb-0.5" style={{ color: "#000000" }}>{item.org}</p>
                                    <span className="text-sm font-mono font-medium mb-3 block" style={{ color: "#64748b" }}>{item.date}</span>
                                  </>
                                )}
                                {item.desc && (
                                  <p className="text-base font-medium leading-relaxed" style={{ color: "#000000" }}>{item.desc}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Open Source ── */}
        <section id="open-source" className="max-w-4xl mx-auto px-8 py-12">
          <SectionHeading label={t.openSource.label} heading={t.openSource.heading} />
          <div className="flex flex-col gap-6">
            {openSourceList.map((project) => (
              <div
                key={project.title}
                className="rounded-2xl px-8 py-10"
                style={{
                  background: "linear-gradient(135deg, #ede9fe 0%, #dbeafe 50%, #dcfce7 100%)",
                  border: "2px solid rgba(109,40,217,0.5)",
                  boxShadow: "0 8px 40px rgba(109,40,217,0.18), 0 2px 8px rgba(0,0,0,0.1)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* 背景光晕 */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-[-10%] top-[-20%] h-64 w-64 rounded-full blur-3xl" style={{ background: "rgba(139,92,246,0.08)" }} />
                  <div className="absolute right-[-5%] bottom-[-10%] h-56 w-56 rounded-full blur-3xl" style={{ background: "rgba(59,130,246,0.07)" }} />
                </div>
                <div className="relative text-center">
                  <p className="mb-2 text-xs font-mono tracking-[0.3em] uppercase" style={{ color: "#7c3aed" }}>Open Source</p>
                  <h3 className="mb-6 text-3xl font-bold tracking-tight" style={{ color: "#0f172a" }}>{project.title}</h3>
                  <div className="mb-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12">
                    <div>
                      <p className="text-5xl font-bold tracking-tight" style={{ color: "#4c1d95" }}>12,000+</p>
                      <p className="text-sm mt-2 font-medium" style={{ color: "#64748b" }}>GitHub 获星数 ★</p>
                    </div>
                    <div className="hidden sm:block" style={{ width: 1, height: 60, background: "rgba(0,0,0,0.08)" }} />
                    <div>
                      <p className="text-5xl font-bold tracking-tight" style={{ color: "#1e40af" }}>500+</p>
                      <p className="text-sm mt-2 font-medium" style={{ color: "#64748b" }}>{lang === "zh" ? "社区活跃用户数" : "Community Users"}</p>
                    </div>
                  </div>
                  <p className="mx-auto mb-8 max-w-xl text-base font-medium leading-relaxed" style={{ color: "#475569" }}>
                    {project.description}
                  </p>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:scale-105"
                    style={{ background: "#0f172a", border: "1px solid #0f172a", color: "#ffffff" }}
                  >
                    <GitHubIcon />
                    {lang === "zh" ? "查看项目" : "View on GitHub"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="mt-20 py-10 text-center" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <p className="text-sm" style={{ color: "#000000" }}>
          © {new Date().getFullYear()} Allen. {t.footer.built}
        </p>
        <p className="text-sm mt-1" style={{ color: "#000000" }}>
          {t.footer.reach}{" "}
          <a href="mailto:allenmu31@gmail.com" className="transition-colors" style={{ color: "#000000" }}>
            allenmu31@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}
