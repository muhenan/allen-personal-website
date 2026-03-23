"use client";

import { useState } from "react";

type Lang = "en" | "zh";

const content = {
  en: {
    nav: { about: "About", skills: "Skills", projects: "Projects" },
    hero: {
      badge: "Software Engineer",
      greeting: "Hi, I'm",
      slogan:
        "Building reliable backend systems and exploring the frontier of AI — from LLMs to deep learning, I love turning complex ideas into clean, working software.",
    },
    about: {
      heading: "// About",
      left: (
        <>
          I&apos;m a software engineer based in{" "}
          <span style={{ color: "#f1f5f9", fontWeight: 500 }}>Boston, MA</span>, currently working on
          backend systems and internal tooling. I hold a{" "}
          <span style={{ color: "#f1f5f9", fontWeight: 500 }}>Master&apos;s degree from Northwestern University</span>,
          where I deepened my focus on software engineering and applied machine learning.
        </>
      ),
      right:
        "Outside of work I experiment with LLMs, contribute to open-source projects, and explore the intersection of classical software engineering with modern AI. I believe great software is readable, testable, and quietly reliable.",
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
    nav: { about: "关于我", skills: "技能", projects: "项目" },
    hero: {
      badge: "软件工程师",
      greeting: "你好，我是",
      slogan:
        "专注于构建可靠的后端系统，同时探索 AI 前沿 —— 从大语言模型到深度学习，我热衷于将复杂想法转化为简洁、可运行的软件。",
    },
    about: {
      heading: "// 关于我",
      left: (
        <>
          我是一名居住在{" "}
          <span style={{ color: "#f1f5f9", fontWeight: 500 }}>美国波士顿</span> 的软件工程师，
          目前专注于后端系统与内部工具的开发。我毕业于{" "}
          <span style={{ color: "#f1f5f9", fontWeight: 500 }}>西北大学（Northwestern University）</span>，
          获得硕士学位，研究方向为软件工程与应用机器学习。
        </>
      ),
      right:
        "工作之外，我热衷于探索大语言模型、参与开源项目，以及研究传统软件工程与现代 AI 的结合点。我相信优秀的软件应该具备可读性、可测试性，并在生产环境中静默而可靠地运行。",
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
    { category: "Backend", icon: "⚙️", items: ["C#", ".NET", "Python", "SQL", "REST APIs"] },
    { category: "Frontend", icon: "🖥️", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "AI / ML", icon: "🧠", items: ["PyTorch", "LLMs", "RAG", "Deep Learning", "Prompt Engineering"] },
    { category: "Infrastructure", icon: "☁️", items: ["Docker", "Azure", "PostgreSQL", "Redis", "CI/CD"] },
  ],
  zh: [
    { category: "后端", icon: "⚙️", items: ["C#", ".NET", "Python", "SQL", "REST API"] },
    { category: "前端", icon: "🖥️", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { category: "AI / 机器学习", icon: "🧠", items: ["PyTorch", "大语言模型", "RAG", "深度学习", "Prompt 工程"] },
    { category: "基础设施", icon: "☁️", items: ["Docker", "Azure", "PostgreSQL", "Redis", "CI/CD"] },
  ],
};

const projects = {
  en: [
    {
      title: "Order Processing System Optimization",
      description:
        "Re-architected a high-throughput order pipeline reducing average latency by 40%. Introduced async processing and distributed caching with Redis.",
      tags: ["C#", ".NET", "Redis", "SQL Server"],
    },
    {
      title: "Legacy Service Migration",
      description:
        "Led migration of a monolithic legacy service to a modern microservices architecture, improving deployment frequency and reducing on-call incidents.",
      tags: ["Python", "Docker", "Azure", "REST APIs"],
    },
    {
      title: "AI-Powered Document Q&A",
      description:
        "Built an internal RAG system that lets engineers query internal documentation using natural language, powered by LLMs and vector search.",
      tags: ["Python", "LLMs", "RAG", "Next.js"],
    },
    {
      title: "Real-time Analytics Dashboard",
      description:
        "Developed a live metrics dashboard for business stakeholders, pulling data from multiple sources with sub-second refresh via WebSockets.",
      tags: ["React", "TypeScript", "WebSocket", "PostgreSQL"],
    },
  ],
  zh: [
    {
      title: "订单处理系统优化",
      description:
        "对高并发订单处理管道进行重构，平均延迟降低 40%。引入异步处理机制并基于 Redis 实现分布式缓存。",
      tags: ["C#", ".NET", "Redis", "SQL Server"],
    },
    {
      title: "旧系统服务迁移",
      description:
        "主导将单体旧服务迁移至现代微服务架构，显著提升部署频率并减少线上告警事件。",
      tags: ["Python", "Docker", "Azure", "REST API"],
    },
    {
      title: "AI 驱动的文档问答系统",
      description:
        "构建内部 RAG 系统，使工程师可用自然语言检索内部文档，底层基于大语言模型与向量搜索。",
      tags: ["Python", "大语言模型", "RAG", "Next.js"],
    },
    {
      title: "实时数据分析看板",
      description:
        "为业务团队开发实时指标看板，通过 WebSocket 聚合多数据源，实现亚秒级刷新。",
      tags: ["React", "TypeScript", "WebSocket", "PostgreSQL"],
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
    <div className="min-h-screen" style={{ background: "#0f172a", color: "#e2e8f0" }}>
      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(15,23,42,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span className="font-mono text-sm" style={{ color: "#22d3ee" }}>allen.dev</span>
        <div className="flex items-center gap-5">
          <div className="flex gap-6 text-sm" style={{ color: "#94a3b8" }}>
            <a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a>
            <a href="#skills" className="hover:text-white transition-colors">{t.nav.skills}</a>
            <a href="#projects" className="hover:text-white transition-colors">{t.nav.projects}</a>
          </div>
          {/* Language Toggle */}
          <button
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
          </button>
        </div>
      </nav>

      <main>
        {/* ── Hero ── */}
        <section className="flex flex-col items-center justify-center text-center px-6 pt-40 pb-32">
          <p className="animate-fade-in-up delay-100 mb-4 font-mono text-sm tracking-widest uppercase" style={{ color: "#22d3ee" }}>
            {t.hero.badge}
          </p>
          <h1 className="animate-fade-in-up delay-200 text-5xl sm:text-7xl font-bold tracking-tight mb-6" style={{ color: "#f1f5f9" }}>
            {t.hero.greeting}{" "}
            <span style={{ background: "linear-gradient(135deg, #22d3ee, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Allen
            </span>
          </h1>
          <p className="animate-fade-in-up delay-300 max-w-xl text-lg leading-relaxed mb-10" style={{ color: "#94a3b8" }}>
            {t.hero.slogan}
          </p>
          <div className="animate-fade-in-up delay-400 flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#e2e8f0" }}
            >
              <GitHubIcon />
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105"
              style={{ background: "rgba(34,211,238,0.12)", border: "1px solid rgba(34,211,238,0.3)", color: "#22d3ee" }}
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about" className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-xs font-mono tracking-widest uppercase mb-8" style={{ color: "#22d3ee" }}>
            {t.about.heading}
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <p className="text-base leading-relaxed" style={{ color: "#cbd5e1" }}>{t.about.left}</p>
            <p className="text-base leading-relaxed" style={{ color: "#cbd5e1" }}>{t.about.right}</p>
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-xs font-mono tracking-widest uppercase mb-8" style={{ color: "#22d3ee" }}>
            {t.skills.heading}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {skillList.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl p-5"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">{group.icon}</span>
                  <span className="font-semibold text-sm" style={{ color: "#f1f5f9" }}>{group.category}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full text-xs font-mono"
                      style={{ background: "rgba(129,140,248,0.15)", color: "#a5b4fc", border: "1px solid rgba(129,140,248,0.25)" }}
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
        <section id="projects" className="max-w-3xl mx-auto px-6 py-20">
          <h2 className="text-xs font-mono tracking-widest uppercase mb-8" style={{ color: "#22d3ee" }}>
            {t.projects.heading}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {projectList.map((project) => (
              <div
                key={project.title}
                className="rounded-2xl p-5 flex flex-col gap-3 transition-all hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <h3 className="font-semibold text-sm leading-snug" style={{ color: "#f1f5f9" }}>{project.title}</h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "#94a3b8" }}>{project.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs font-mono"
                      style={{ background: "rgba(34,211,238,0.1)", color: "#67e8f9", border: "1px solid rgba(34,211,238,0.2)" }}
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
      <footer className="mt-20 py-10 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-sm" style={{ color: "#475569" }}>
          © {new Date().getFullYear()} Allen. {t.footer.built}
        </p>
        <p className="text-sm mt-1" style={{ color: "#475569" }}>
          {t.footer.reach}{" "}
          <a href="mailto:allen@example.com" className="hover:text-cyan-400 transition-colors" style={{ color: "#64748b" }}>
            allen@example.com
          </a>
        </p>
      </footer>
    </div>
  );
}
