"use client";

import { useState } from "react";

type Lang = "en" | "zh";

const content = {
  en: {
    nav: { about: "About", timeline: "Timeline", skills: "Skills", projects: "Projects" },
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
    skills: { heading: "// Skills" },
    projects: { heading: "// Projects" },
    footer: {
      built: "Built with Next.js & Tailwind CSS.",
      reach: "Reach me at",
    },
    toggleLabel: "中文",
  },
  zh: {
    nav: { about: "关于我", timeline: "经历", skills: "技能", projects: "项目" },
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
    skills: { heading: "// 技能栈" },
    projects: { heading: "// 项目经验" },
    footer: {
      built: "基于 Next.js & Tailwind CSS 构建。",
      reach: "联系方式",
    },
    toggleLabel: "English",
  },
};

const skills = {
  en: [
    { category: "LLM Training", icon: "🎯", items: ["SFT", "RLHF", "DPO", "GRPO", "Vocab Optimization"] },
    { category: "AI Infra", icon: "⚡", items: ["CUDA", "vLLM", "DeepSpeed", "FSDP", "SGLang"] },
    { category: "Agent Systems", icon: "🤖", items: ["LangChain/LangGraph", "RAG", "Tool Calling", "Multi-Agent", "MCP", "Context Management"] },
    { category: "Distributed Systems", icon: "🌐", items: ["Python", "Go", "Kafka", "Redis", "Kubernetes", "Terraform", "SQL"] },
  ],
  zh: [
    { category: "大模型训练", icon: "🎯", items: ["SFT", "RLHF", "DPO", "GRPO", "预训练词表优化"] },
    { category: "AI Infra", icon: "⚡", items: ["CUDA", "vLLM", "DeepSpeed", "FSDP", "SGLang"] },
    { category: "Agent 系统", icon: "🤖", items: ["LangChain/LangGraph", "RAG", "Tool Calling", "多智能体", "MCP", "上下文管理"] },
    { category: "高并发分布式", icon: "🌐", items: ["Python", "Go", "Kafka", "Redis", "Kubernetes", "Terraform", "SQL"] },
  ],
};

const projects = {
  en: [
    {
      title: "LLM Post-Training Pipeline",
      description:
        "Designed and implemented an end-to-end post-training pipeline covering SFT, reward modeling, and RLHF/DPO alignment, significantly improving model instruction-following quality.",
      tags: ["Python", "PyTorch", "RLHF", "DPO", "DeepSpeed"],
    },
    {
      title: "High-Throughput LLM Inference Service",
      description:
        "Built a distributed LLM serving system based on vLLM, supporting thousands of concurrent requests with dynamic batching and multi-node tensor parallelism.",
      tags: ["vLLM", "CUDA", "Kubernetes", "Python", "gRPC"],
    },
    {
      title: "Multi-Agent Orchestration Framework",
      description:
        "Developed a multi-agent system supporting tool calling, long-horizon task planning, and reflection loops, enabling complex workflows to run autonomously end-to-end.",
      tags: ["LangChain", "MCP", "RAG", "Tool Use", "Python"],
    },
    {
      title: "Distributed Task Scheduling System",
      description:
        "Architected a high-concurrency task scheduling system capable of handling millions of jobs per day, with fault tolerance, priority queues, and real-time observability.",
      tags: ["Go", "Kafka", "Redis", "Kubernetes", "gRPC"],
    },
  ],
  zh: [
    {
      title: "大模型后训练流水线",
      description:
        "设计并实现覆盖 SFT、奖励建模、RLHF/DPO 对齐的端到端后训练流水线，显著提升模型指令跟随能力与输出质量。",
      tags: ["Python", "PyTorch", "RLHF", "DPO", "DeepSpeed"],
    },
    {
      title: "高吞吐 LLM 推理服务",
      description:
        "基于 vLLM 构建分布式大模型推理服务，支持千级并发请求，实现动态批处理与多节点张量并行，大幅降低推理延迟与成本。",
      tags: ["vLLM", "CUDA", "Kubernetes", "Python", "gRPC"],
    },
    {
      title: "多智能体编排框架",
      description:
        "开发支持工具调用、长程任务规划与反思循环的多 Agent 系统，使复杂工作流能够端到端自主完成，无需人工干预。",
      tags: ["LangChain", "MCP", "RAG", "工具调用", "Python"],
    },
    {
      title: "高并发分布式任务调度系统",
      description:
        "设计日处理百万级任务的高并发调度系统，具备容错机制、优先级队列与实时可观测性，系统可用性达 99.9%。",
      tags: ["Go", "Kafka", "Redis", "Kubernetes", "gRPC"],
    },
  ],
};

type TimelineItem = {
  date: string;
  org: string;
  role: string;
  desc: string;
  type: "edu" | "work" | "open";
};

const timeline: Record<Lang, TimelineItem[]> = {
  en: [
    {
      date: "Sep 2018",
      org: "Sun Yat-sen University",
      role: "B.Eng. · Software Engineering · GPA 3.8/4.0",
      desc: "",
      type: "edu",
    },
    {
      date: "Mar – Jun 2021",
      org: "ByteDance · Toutiao",
      role: "iOS Engineer Intern",
      desc: "Developed video-page features for Toutiao iOS app serving 160M+ DAU. Independently designed and shipped the Hot Topics Card module.",
      type: "work",
    },
    {
      date: "Sep 2022",
      org: "Northeastern University (US)",
      role: "M.S. · Software Engineering · GPA 4.0/4.0",
      desc: "",
      type: "edu",
    },
    {
      date: "Jul – Dec 2023",
      org: "Wayfair · NYSE: W",
      role: "Software Engineer Intern",
      desc: "Led PHP-to-C# microservice migration (3× scalability, 95% error rate reduction). Migrated 13B historical records to GCP PostgreSQL with zero downtime. Optimized peak read QPS to 10k+, P95 latency ↓60%.",
      type: "work",
    },
    {
      date: "Jun 2024 – Present",
      org: "Wayfair · NYSE: W",
      role: "Algorithm Engineer",
      desc: "Built LLM-powered customer service with MoE + multi-agent architecture (intent recognition ↑24%, task completion ↑32%). Developed AI Coding Agent automating Jira → GitHub PR (migration time 3–4 days → <1 day). Collaborated with Google Gemini team on Agentic Commerce, driving 10,000+ new orders/month.",
      type: "work",
    },
    {
      date: "Open Source",
      org: "xiaohongshu-mcp",
      role: "Contributor · 11,000+ ⭐ · 500+ community users",
      desc: "Built a Xiaohongshu AI Agent for fully automated social media operations.",
      type: "open",
    },
  ],
  zh: [
    {
      date: "2018.09",
      org: "中山大学",
      role: "本科 · 软件工程 · GPA 3.8/4.0",
      desc: "",
      type: "edu",
    },
    {
      date: "2021.03 – 2021.06",
      org: "字节跳动 · 今日头条",
      role: "客户端研发工程师（实习）",
      desc: "为今日头条 iOS 客户端开发视频页功能，服务超 1.6 亿日活用户。独立负责【热点卡片】模块的设计与开发，按期高质量上线。",
      type: "work",
    },
    {
      date: "2022.09",
      org: "美国东北大学",
      role: "硕士 · 软件工程 · GPA 4.0/4.0",
      desc: "",
      type: "edu",
    },
    {
      date: "2023.07 – 2023.12",
      org: "Wayfair · NYSE: W",
      role: "软件研发工程师（实习）",
      desc: "主导 PHP → C# 微服务迁移，系统可扩展性提升 3 倍，事件失败率降低 95%。将 130 亿条历史记录迁移至 GCP PostgreSQL，零宕机。优化峰值读 QPS 至 10k+，P95 响应时间降低 60%。",
      type: "work",
    },
    {
      date: "2024.06 – 至今",
      org: "Wayfair · NYSE: W",
      role: "算法工程师",
      desc: "构建基于 MoE + 多 Agent 架构的 LLM 智能客服，意图识别率 ↑24%，任务完成度 ↑32%。开发 AI Coding Agent 实现 Jira → GitHub PR 全自动化，迁移周期从 3–4 天压缩至 1 天内。与 Google Gemini 团队合作落地 Agentic Commerce，每月新增订单超 10,000 单。",
      type: "work",
    },
    {
      date: "开源项目",
      org: "xiaohongshu-mcp",
      role: "贡献者 · 11,000+ ⭐ · 社区用户超 500 人",
      desc: "构建小红书 AI Agent，实现社交媒体账号的全自动化运营。",
      type: "open",
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

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("zh");
  const t = content[lang];
  const skillList = skills[lang];
  const projectList = projects[lang];

  return (
    <div className="min-h-screen" style={{ background: "#f8fafc", color: "#0f172a" }}>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(248,250,252,0.88)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
      >
        <span className="font-mono text-sm font-bold" style={{ color: "#0891b2" }}>allen.dev</span>
        <div className="flex items-center gap-5">
          <div className="flex gap-6 text-sm" style={{ color: "#64748b" }}>
            <a href="#timeline" className="hover:text-slate-900 transition-colors">{t.nav.timeline}</a>
            <a href="#skills" className="hover:text-slate-900 transition-colors">{t.nav.skills}</a>
            <a href="#projects" className="hover:text-slate-900 transition-colors">{t.nav.projects}</a>
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
        <section className="flex flex-col items-center justify-center text-center px-6 pt-40 pb-32">
          <p className="animate-fade-in-up delay-100 mb-5 font-mono text-base tracking-widest uppercase" style={{ color: "#0891b2" }}>
            {t.hero.badge}
          </p>
          <h1 className="animate-fade-in-up delay-200 text-6xl sm:text-8xl font-bold tracking-tight mb-8" style={{ color: "#0f172a" }}>
            {t.hero.greeting}{" "}
            <span style={{ background: "linear-gradient(135deg, #0891b2, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Allen
            </span>
          </h1>
          <p className="animate-fade-in-up delay-300 max-w-2xl text-xl leading-relaxed mb-10" style={{ color: "#475569" }}>
            {t.hero.slogan}
          </p>
          <div className="animate-fade-in-up delay-400 flex gap-4">
            <a
              href="https://github.com/muhenan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{ background: "#0f172a", border: "1px solid #0f172a", color: "#f8fafc" }}
            >
              <GitHubIcon />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/henan-mu-519b6624b/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{ background: "#0077B5", border: "1px solid #0077B5", color: "#ffffff" }}
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          </div>
        </section>

        {/* ── Timeline ── */}
        <section id="timeline" className="max-w-4xl mx-auto px-8 py-24">
          <h2 className="text-2xl font-bold mb-12" style={{ color: "#0f172a" }}>
            {lang === "zh" ? "经历" : "Timeline"}
          </h2>
          <div className="flex flex-col gap-14">
            {(
              lang === "zh"
                ? [
                    { label: "工作经历", type: "work", color: "#0891b2" },
                    { label: "教育背景", type: "edu", color: "#7c3aed" },
                    { label: "开源项目", type: "open", color: "#059669" },
                  ]
                : [
                    { label: "Experience", type: "work", color: "#0891b2" },
                    { label: "Education", type: "edu", color: "#7c3aed" },
                    { label: "Open Source", type: "open", color: "#059669" },
                  ]
            ).map((group) => {
              const items = timeline[lang].filter((item) => item.type === group.type).reverse();
              return (
                <div key={group.label}>
                  <p className="text-base font-semibold tracking-wide mb-6" style={{ color: group.color }}>{group.label}</p>
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
                            <span className="text-sm font-mono mb-1.5 block" style={{ color: group.color }}>{item.date}</span>
                            <p className="font-bold text-base mb-1" style={{ color: "#0f172a" }}>{item.org}</p>
                            <p className="text-sm mb-3" style={{ color: "#94a3b8" }}>{item.role}</p>
                            {item.desc && (
                              <p className="text-base leading-relaxed" style={{ color: "#475569" }}>{item.desc}</p>
                            )}
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

        {/* ── Skills ── */}
        <section id="skills" className="max-w-4xl mx-auto px-8 py-24">
          <h2 className="text-2xl font-bold mb-10" style={{ color: "#0f172a" }}>
            {t.skills.heading}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {skillList.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl p-6"
                style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{group.icon}</span>
                  <span className="font-semibold text-base" style={{ color: "#0f172a" }}>{group.category}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-sm font-mono"
                      style={{ background: "rgba(124,58,237,0.08)", color: "#7c3aed", border: "1px solid rgba(124,58,237,0.2)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="max-w-4xl mx-auto px-8 py-24">
          <h2 className="text-2xl font-bold mb-10" style={{ color: "#0f172a" }}>
            {t.projects.heading}
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {projectList.map((project) => (
              <div
                key={project.title}
                className="rounded-2xl p-6 flex flex-col gap-4 transition-all hover:-translate-y-1"
                style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
              >
                <h3 className="font-semibold text-base leading-snug" style={{ color: "#0f172a" }}>{project.title}</h3>
                <p className="text-base leading-relaxed flex-1" style={{ color: "#475569" }}>{project.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded text-sm font-mono"
                      style={{ background: "rgba(8,145,178,0.08)", color: "#0891b2", border: "1px solid rgba(8,145,178,0.2)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="mt-20 py-10 text-center" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <p className="text-sm" style={{ color: "#94a3b8" }}>
          © {new Date().getFullYear()} Allen. {t.footer.built}
        </p>
        <p className="text-sm mt-1" style={{ color: "#94a3b8" }}>
          {t.footer.reach}{" "}
          <a href="mailto:allen@example.com" className="transition-colors hover:text-cyan-600" style={{ color: "#0891b2" }}>
            allen@example.com
          </a>
        </p>
      </footer>
    </div>
  );
}
