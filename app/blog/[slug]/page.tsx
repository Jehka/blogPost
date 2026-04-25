import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts } from "@/lib/posts";
import { notion } from "@/lib/notion";
import { renderBlocks } from "@/lib/renderer";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ unwrap params (NEW Next.js requirement)
  const { slug } = await params;

  const posts = await getPosts();

  const cleanSlug = slug.toLowerCase().trim();

  const post = posts.find((p) => p.slug === cleanSlug);

  if (!post) return notFound();

  const blocks = await notion.blocks.children.list({
    block_id: post.pageId,
  });

  return (
    <main className="post-container">
      <Link href="/" className="back">
        ← Back
      </Link>

      <h1 className="post-title">{post.title}</h1>
      <p className="post-date">{post.date}</p>

      <article className="post-content">
        {renderBlocks(blocks.results)}
      </article>
    </main>
  );
}