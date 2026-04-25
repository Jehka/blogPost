import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { renderBlocks } from "@/lib/renderer";
import { notion } from "@/lib/notion";
import PostCover from "@/components/PostCover";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const posts = await getPosts();

  const cleanSlug = slug.toLowerCase().trim();

  const post = posts.find((p) => p.slug === cleanSlug);

  if (!post) {
    return <div className="post-container">Post not found</div>;
  }

  const blocksRes = await notion.blocks.children.list({
    block_id: post.pageId,
  });

  const blocks = blocksRes.results;

  const isPoetry = post.tags?.includes("poetry");

  return (
    <>
      {/* ===== COVER WITH BACK BUTTON ===== */}
      <div className="cover-container">
        <PostCover cover={post.cover} />

        <Link href="/" className="back-overlay">
          ← Back
        </Link>
      </div>

      <main className="post-container">
        <h1 className="post-title">{post.title}</h1>

        <p className="post-date">{post.date}</p>

        <div className={`post-content ${isPoetry ? "poetry" : ""}`}>
          {renderBlocks(blocks, isPoetry)}
        </div>
      </main>
    </>
  );
}