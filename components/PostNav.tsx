import Link from "next/link";

interface PostNavProps {
  prev: { slug: string; title: string } | null;
  next: { slug: string; title: string } | null;
}

export default function PostNav({ prev, next }: PostNavProps) {
  if (!prev && !next) return null;

  return (
    <nav className="post-nav">
      <div className="post-nav-item">
        {prev && (
          <Link href={`/blog/${prev.slug}`} className="post-nav-link post-nav-prev">
            <span className="post-nav-direction">← Previous</span>
            <span className="post-nav-title">{prev.title}</span>
          </Link>
        )}
      </div>
      <div className="post-nav-item post-nav-item--right">
        {next && (
          <Link href={`/blog/${next.slug}`} className="post-nav-link post-nav-next">
            <span className="post-nav-direction">Next →</span>
            <span className="post-nav-title">{next.title}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
