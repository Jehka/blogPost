import { getPosts } from "@/lib/posts";
import { notion } from "@/lib/notion";
import { NotionToMarkdown } from "notion-to-md";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

// Static routes
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>; // ✅ MUST be Promise
}) {
  // ✅ THIS is the real fix
  const { slug } = await params;

  const posts = await getPosts();

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main style={{ padding: "40px", background: "black", color: "white", minHeight: "100vh" }}>
        <h2>Post not found</h2>
        <p>Slug: {slug}</p>
        <Link href="/">← Back</Link>
      </main>
    );
  }

  const n2m = new NotionToMarkdown({ notionClient: notion });

  const mdBlocks = await n2m.pageToMarkdown(post.pageId);
  const mdString = n2m.toMarkdownString(mdBlocks);

  return (
    <main
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "0 auto",
        background: "black",
        color: "#e5e5e5",
        minHeight: "100vh",
        fontFamily: "Georgia, serif",
      }}
    >
      <Link href="/" style={{ color: "#9ca3af", marginBottom: "24px", display: "inline-block" }}>
        ← Back
      </Link>

      <h1 style={{ fontSize: "56px", marginBottom: "16px" }}>
        {post.title}
      </h1>

      <p style={{ color: "#9ca3af", marginBottom: "32px" }}>
        {post.date}
      </p>

      <article style={{ fontSize: "20px", lineHeight: 1.9 }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {mdString.parent}
        </ReactMarkdown>
      </article>
    </main>
  );
}