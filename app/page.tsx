import { getPosts } from "@/lib/posts";
import Link from "next/link";

export default async function HomePage() {
  const posts = await getPosts();

  // ===== GROUP BY TAGS (SAFE) =====
  const grouped: Record<string, any[]> = {};

  posts.forEach((post) => {
    const tags = post.tags || [];

    // if no tags → skip (no "other" nonsense)
    if (!tags.length) return;

    tags.forEach((tag: string) => {
      if (!grouped[tag]) grouped[tag] = [];
      grouped[tag].push(post);
    });
  });

  return (
    <main className="home">
      {/* BACKGROUND */}
      <div className="bg-layer" />

      {/* CONTENT */}
      <div className="home-content">
        <h1 className="home-title">Theology Subtext</h1>

        {Object.entries(grouped).map(([tag, posts]) => (
          <section key={tag} className="home-section">
            <h2 className="home-tag">{tag}</h2>

            {posts.map((post: any) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="home-link"
              >
                <div className="home-post">
                  <h3>{post.title}</h3>
                  {post.date && <p>{post.date}</p>}
                </div>
              </Link>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}