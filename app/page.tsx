import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();

  // group posts by tags
  const groups: Record<string, typeof posts> = {};

  posts.forEach((post) => {
    if (!post.tags || post.tags.length === 0) {
      if (!groups["writing"]) groups["writing"] = [];
      groups["writing"].push(post);
      return;
    }

    post.tags.forEach((tag) => {
      if (!groups[tag]) groups[tag] = [];
      groups[tag].push(post);
    });
  });

  return (
    <main className="home">
      <h1 className="title">Oshio</h1>

      {Object.entries(groups).map(([group, posts]) => (
        <section key={group} className="section">
          <h2 className="section-title">{group}</h2>

          <div className="post-list">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="post">
                <div className="post-title">{post.title}</div>
                <div className="post-date">{post.date}</div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}