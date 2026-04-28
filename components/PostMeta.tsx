interface PostMetaProps {
  date: string;
  tags: string[];
  wordCount?: number;
}

function readingTime(words: number) {
  const mins = Math.ceil(words / 200);
  return mins < 1 ? "< 1 min read" : `${mins} min read`;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function PostMeta({ date, tags, wordCount = 0 }: PostMetaProps) {
  return (
    <div className="post-meta">
      {date && <span className="meta-date">{formatDate(date)}</span>}
      {wordCount > 0 && (
        <>
          <span className="meta-dot">ยท</span>
          <span className="meta-reading">{readingTime(wordCount)}</span>
        </>
      )}
      {tags.length > 0 && (
        <div className="meta-tags">
          {tags.map((t) => (
            <span key={t} className="meta-tag">{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}
