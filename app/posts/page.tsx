import Link from "next/link";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

export const metadata = { title: "博客 — Allen" };

export default function PostsPage() {
  const posts = getAllPostSlugs().map((slug) => {
    const { frontmatter } = getPostBySlug(slug);
    return { slug, ...frontmatter };
  });

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <header className="mb-10">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
          BLOG
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">博客</h1>
      </header>

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

      <div className="mt-10">
        <Link
          href="/"
          className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          ← 返回主页
        </Link>
      </div>
    </main>
  );
}
