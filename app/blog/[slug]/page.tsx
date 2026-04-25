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
  const { slug } = await params;

  const posts = await getPosts();

  const cleanSlug =
    typeof slug === "string" ? slug.toLowerCase().trim() : "";

  const post = posts.find((p) => p.slug === cleanSlug);

  if (!post) return notFound();

  const blocks = await notion.blocks.children.list({
    block_id: post.pageId,
  });

  const isPoetry = post.tags?.some(
    (t: string) => t.toLowerCase() === "poetry"
  );

  return (
    <main className={isPoetry ? "post-container poetry-page" : "post-container"}>
      <Link href="/" className="back">
        ← Back
      </Link>

      <h1 className="post-title">{post.title}</h1>
      <p className="post-date">{post.date}</p>

      <article
        className={
          isPoetry
            ? "post-content poetry centered-poetry"
            : "post-content"
        }
      >
        {renderBlocks(blocks.results, isPoetry)}
      </article>
    </main>
  );
}