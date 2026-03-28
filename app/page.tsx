import HomePage from "./components/HomePage";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts";

export default function Page() {
  const slugs = getAllPostSlugs();
  const posts = slugs.map((slug) => {
    const { frontmatter } = getPostBySlug(slug);
    return { slug, ...frontmatter };
  });

  return <HomePage posts={posts} />;
}
