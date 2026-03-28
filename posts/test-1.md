---
title: "Test Blog Post #1 — This is a Test Blog"
date: "2026-03-28"
description: "A test post to verify the blog system is working correctly."
---

# This is a Test Blog

Welcome! This post exists purely to test that the blog routing and Markdown rendering pipeline is wired up correctly.

## What This Tests

- File-system based routing (`/post/test-1` → `posts/test-1.md`)
- YAML frontmatter parsing (title, date, description)
- GitHub Flavored Markdown rendering
- Syntax highlighting for code blocks

## Code Example

Here's a quick TypeScript snippet to make sure syntax highlighting works:

```typescript
interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
}

async function getPost(slug: string): Promise<Post> {
  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
  const raw = await fs.readFile(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { slug, ...data, content } as Post;
}
```

## Adding More Posts

To add a new blog post, just drop a `.md` file into the `/posts/` folder at the project root:

```
posts/
  test-1.md        ← this file → /post/test-1
  my-new-post.md   ← new file  → /post/my-new-post
```

No code changes needed. The route is generated automatically.

## Markdown Features

**Bold**, _italic_, ~~strikethrough~~, and `inline code` all work.

> Blockquotes look like this.

| Column A | Column B | Column C |
|----------|----------|----------|
| One      | Two      | Three    |
| Four     | Five     | Six      |

---

That's it — the blog system is working!
