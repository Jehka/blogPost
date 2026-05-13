import { getPosts } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Here",
  description: "New to Theology Subtext? Start with these.",
};

export const revalidate = 60;

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default async function StartHerePage() {
  const posts = await getPosts();
  const featured = posts.filter((p: any) => p.featured);

  return (
    <main className="start-here-page">
      <div className="start-here-content">
        <header className="start-here-header">
          <p className="start-here-eyebrow">New here?</p>
          <h1 className="start-here-title">Start Here</h1>
          <p className="start-here-lead">
            These are the best places to begin. Picked to give you a sense of
            what this blog is actually about.
          </p>
        </header>

        {featured.length === 0 ? (
          <p className="start-here-empty">
            Nothing featured yet — check back soon, or{" "}
            <Link href="/">browse all posts</Link>.
          </p>
        ) : (
          <div className="start-here-list">
            {featured.map((post: any, i: number) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="start-here-card"
              >
                <span className="start-here-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="start-here-card-body">
                  {post.cover && (
                    <div
                      className="start-here-cover"
                      style={{ backgroundImage: `url(${post.cover})` }}
                    />
                  )}
                  <div className="start-here-card-text">
                    <h2 className="start-here-post-title">{post.title}</h2>
                    {post.excerpt && (
                      <p className="start-here-excerpt">{post.excerpt}</p>
                    )}
                    <div className="start-here-meta">
                      {post.tags?.slice(0, 2).map((t: string) => (
                        <span key={t} className="meta-tag">{t}</span>
                      ))}
                      {post.date && (
                        <span className="start-here-date">{formatDate(post.date)}</span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="start-here-arrow">→</span>
              </Link>
            ))}
          </div>
        )}

        <div className="start-here-footer">
          <Link href="/" className="start-here-all">
            Browse all posts →
          </Link>
        </div>
      </div>
    </main>
  );
}