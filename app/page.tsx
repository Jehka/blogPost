import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();

  // 🔥 group posts by tags dynamically
  const grouped: Record<string, any[]> = {};

  posts.forEach((post) => {
    const tags = post.tags?.length ? post.tags : ["writing"];

    tags.forEach((tag: string) => {
      const key = tag.toLowerCase();

      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(post);
    });
  });

  return (
    <main className="home">
      <h1 className="home-title">Theology Subtext</h1>

      {Object.entries(grouped).map(([tag, posts]) => (
        <section key={tag} className="home-section">
          <h2 className="section-title">{tag}</h2>

          <div className="post-list">
            {posts.map((post: any) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="post-item"
              >
                <div className="post-name">{post.title}</div>
                <div className="post-date">{post.date}</div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}