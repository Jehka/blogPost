import { getPosts } from "@/lib/posts";
import { notion } from "@/lib/notion";
import { NotionToMarkdown } from "notion-to-md";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts
    .filter((p) => p.slug) // 🚨 ensures no empty slugs
    .map((post) => ({
      slug: post.slug,
    }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ CORRECT way for Next 16
  const { slug } = await params;

  console.log("URL SLUG:", slug); // DEBUG

  const posts = await getPosts();

  console.log("ALL SLUGS:", posts.map((p) => p.slug)); // DEBUG

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main style={{ padding: "40px", color: "white", background: "#111", minHeight: "100vh" }}>
        <h1>Post not found</h1>
        <p>Slug: {slug}</p>
        <Link href="/">← Back</Link>
      </main>
    );
  }

  const n2m = new NotionToMarkdown({ notionClient: notion });
  const mdBlocks = await n2m.pageToMarkdown(post.pageId);
  const mdString = n2m.toMarkdownString(mdBlocks);

  return (
    <main style={{ padding: "40px", background: "#111", color: "#e5e5e5", minHeight: "100vh" }}>
      <Link href="/" style={{ color: "#aaa" }}>
        ← Back
      </Link>

      <h1 style={{ fontSize: "56px", marginTop: "20px" }}>{post.title}</h1>
      <p style={{ color: "#888" }}>{post.date}</p>

      <article style={{ marginTop: "40px", lineHeight: 1.8 }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
        >
          {mdString.parent}
        </ReactMarkdown>
      </article>
    </main>
  );
}