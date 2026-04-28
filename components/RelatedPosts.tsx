import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt?: string;
}

interface RelatedPostsProps {
  currentSlug: string;
  currentTags: string[];
  allPosts: Post[];
}

export default function RelatedPosts({
  currentSlug,
  currentTags,
  allPosts,
}: RelatedPostsProps) {
  // Score each post by how many tags overlap
  const scored = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => ({
      ...p,
      score: p.tags.filter((t) => currentTags.includes(t)).length,
    }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score || (b.date > a.date ? 1 : -1))
    .slice(0, 3);

  if (scored.length === 0) return null;

  return (
    <div className="related-posts">
      <p className="related-label">More to read</p>
      <div className="related-grid">
        {scored.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="related-card">
            <h4 className="related-title">{p.title}</h4>
            {p.excerpt && <p className="related-excerpt">{p.excerpt}</p>}
            <div className="related-tags">
              {p.tags.slice(0, 2).map((t) => (
                <span key={t} className="meta-tag">{t}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
