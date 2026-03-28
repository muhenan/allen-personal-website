import HomePage from "./components/HomePage";
import { getPostBySlug } from "@/lib/posts";
import { FEATURED_SLUGS } from "@/lib/featured-posts";

export default function Page() {
  const posts = FEATURED_SLUGS.map((slug) => {
    const { frontmatter } = getPostBySlug(slug);
    return { slug, ...frontmatter };
  });

  return <HomePage posts={posts} />;
}
