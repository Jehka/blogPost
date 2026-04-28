import { getPosts } from "@/lib/posts";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
// In any page that fetches from Notion, add:
export const revalidate = 60; // rebuild this page every 60 seconds
export default async function HomePage() {
  const posts = await getPosts();

  const grouped: Record<string, any[]> = {};
  posts.forEach((post) => {
    const tags = post.tags || [];
    if (!tags.length) {
      if (!grouped["uncategorised"]) grouped["uncategorised"] = [];
      grouped["uncategorised"].push(post);
      return;
    }
    tags.forEach((tag: string) => {
      if (!grouped[tag]) grouped[tag] = [];
      grouped[tag].push(post);
    });
  });

  const searchPosts = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    tags: p.tags,
    excerpt: p.excerpt,
  }));

  return (
    <main className="home">
      <div className="bg-layer" />

      <div className="home-content">
        <header className="home-header">
          <h1 className="home-title">Theology Subtext</h1>
          <p className="home-subtitle">
            A space for poetry, theology, and the systems beneath both.
          </p>
          <SearchBar posts={searchPosts} />
        </header>

        {Object.entries(grouped).map(([tag, tagPosts]) => (
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
        ))}
      </div>
    </main>
  );
}
