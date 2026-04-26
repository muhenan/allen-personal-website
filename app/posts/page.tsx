import Link from "next/link";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

export const metadata = { title: "博客 — Allen" };

export default function PostsPage() {
  const posts = getAllPostSlugs().map((slug) => {
    const { frontmatter } = getPostBySlug(slug);
    return { slug, ...frontmatter };
  });

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg, #164e63, #4c1d95)", padding: "48px 0 40px" }}>
        <div style={{ maxWidth: 768, margin: "0 auto", padding: "0 24px" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20 }}>
            ← back to muhenan.com
          </a>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "white" }}>Blog</h1>
          </div>
          <p style={{ margin: "8px 0 0", color: "rgba(255,255,255,0.7)", fontSize: 15 }}>
            Thoughts on LLM, AI infrastructure, and engineering
          </p>
        </div>
      </div>

      <main style={{ maxWidth: 768, margin: "0 auto", padding: "32px 24px 64px" }}>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/post/${post.slug}`}
            className="group block rounded-2xl px-7 py-5 transition-all hover:scale-[1.01] hover:shadow-lg"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(15,23,42,0.08)",
              boxShadow: "0 4px 16px rgba(15,23,42,0.04)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2
                  className="text-lg font-bold mb-1 truncate group-hover:text-blue-700 transition-colors"
                  style={{ color: "#0f172a" }}
                >
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-sm font-medium leading-relaxed line-clamp-2 text-slate-500">
                    {post.description}
                  </p>
                )}
              </div>
              <time className="flex-shrink-0 text-xs font-mono font-medium text-slate-400">
                {post.date}
              </time>
            </div>
          </Link>
        ))}
      </div>

      </main>
    </div>
  );
}
