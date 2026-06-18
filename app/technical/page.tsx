import { getPosts } from "@/lib/posts";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Writing",
  description: "Engineering notes, case studies, and technical breakdowns by Jehkaran Singh.",
};

export const revalidate = 60;

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function TechnicalPage() {
  const posts = await getPosts("Technical");

  const grouped: Record<string, any[]> = {};
  posts.forEach((post) => {
    const tags = post.tags || [];
    if (!tags.length) {
      if (!grouped["general"]) grouped["general"] = [];
      grouped["general"].push(post);
      return;
    }
    tags.forEach((tag: string) => {
      if (!grouped[tag]) grouped[tag] = [];
      grouped[tag].push(post);
    });
  });

  return (
    <main className="home">
      <div className="bg-layer" />
      <div className="home-content">
        <header className="home-header">
          <p className="now-eyebrow">Engineering</p>
          <h1 className="home-title">Technical Writing</h1>
          <p className="home-subtitle">
            Notes on RTL design, FPGA systems, embedded pipelines, and
            the engineering problems worth writing about.
          </p>
          <div className="tech-nav">
            <Link href="/portfolio" className="tech-nav-link">← Portfolio</Link>
            <Link href="/technical/projects" className="tech-nav-link">Projects →</Link>
          </div>
        </header>

        {posts.length === 0 ? (
          <p style={{ color: "var(--muted)", fontSize: "15px" }}>
            Nothing published yet. Check back soon.
          </p>
        ) : (
          Object.entries(grouped).map(([tag, tagPosts]) => (
            <section key={tag} className="home-section">
              <div className="home-section-header">
                <span className="home-tag-pill">{tag}</span>
                <span className="home-section-count">
                  {tagPosts.length} post{tagPosts.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="home-post-list">
                {tagPosts.map((post: any) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="home-card">
                    {post.cover && (
                      <div
                        className="home-card-cover"
                        style={{ backgroundImage: `url(${post.cover})` }}
                      />
                    )}
                    <div className="home-card-body">
                      <h3 className="home-card-title">{post.title}</h3>
                      {post.excerpt && (
                        <p className="home-card-excerpt">{post.excerpt}</p>
                      )}
                      {post.date && (
                        <p className="home-card-date">{formatDate(post.date)}</p>
                      )}
                    </div>
                    <span className="home-card-arrow">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}