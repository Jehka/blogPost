import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getPosts } from "@/lib/posts";
import { getPageBlocks } from "@/lib/notion";
import { renderBlocks } from "@/lib/renderer";
import PostCover from "@/components/PostCover";
import PostMeta from "@/components/PostMeta";
import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents from "@/components/TableOfContents";
import GiscusComments from "@/components/GiscusComments";
import RelatedPosts from "@/components/RelatedPosts";
import PostNav from "@/components/PostNav";
import Newsletter from "@/components/Newsletter";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://theologysubtext.vercel.app";

// In any page that fetches from Notion, add:
export const revalidate = 30; // rebuild this page every 30 seconds

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  // Use excerpt if available, else fall back to tags + date
  const description =
    post.excerpt ||
    (post.tags?.length > 0
      ? `${post.tags.join(", ")} · ${post.date}`
      : post.date || "Theology Subtext");

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: "Theology Subtext",
      type: "article",
      publishedTime: post.date || undefined,
      tags: post.tags,
      ...(post.cover
        ? { images: [{ url: post.cover, width: 1200, height: 630, alt: post.title }] }
        : {}),
    },
    twitter: {
      card: post.cover ? "summary_large_image" : "summary",
      title: post.title,
      description,
      ...(post.cover ? { images: [post.cover] } : {}),
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPostBySlug(slug), getPosts()]);

  if (!post) notFound();

  const blocks = await getPageBlocks(post.pageId);
  const isPoetry = post.tags?.includes("poetry");

  const wordCount = blocks.reduce((acc: number, block: any) => {
    const rt = block[block.type]?.rich_text ?? [];
    const text = rt.map((t: any) => t.plain_text).join(" ");
    return acc + text.split(/\s+/).filter(Boolean).length;
  }, 0);

  // Prev / next by date order (allPosts is already newest-first)
  const idx = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = idx < allPosts.length - 1 ? allPosts[idx + 1] : null;
  const nextPost = idx > 0 ? allPosts[idx - 1] : null;

  return (
    <>
      <ReadingProgress />

      {post.cover && (
        <div className="cover-container">
          <PostCover cover={post.cover} />
          <Link href="/" className="back-overlay">← Back</Link>
        </div>
      )}

      <div className="post-layout">
        <article className="post-article">
          {!post.cover && (
            <Link href="/" className="back-inline">← Back to all posts</Link>
          )}

          <h1 className="post-title">{post.title}</h1>

          {post.excerpt && (
            <p className="post-excerpt">{post.excerpt}</p>
          )}

          <PostMeta date={post.date} tags={post.tags ?? []} wordCount={wordCount} />

          <div className={`post-content ${isPoetry ? "poetry" : ""}`}>
            {renderBlocks(blocks, isPoetry)}
          </div>

          <div className="post-footer">
            <div className="post-footer-tags">
              {post.tags?.map((t: string) => (
                <span key={t} className="meta-tag">{t}</span>
              ))}
            </div>
            <Link href="/" className="post-footer-back">← All Posts</Link>
          </div>

          <PostNav
            prev={prevPost ? { slug: prevPost.slug, title: prevPost.title } : null}
            next={nextPost ? { slug: nextPost.slug, title: nextPost.title } : null}
          />

          <RelatedPosts
            currentSlug={post.slug}
            currentTags={post.tags ?? []}
            allPosts={allPosts}
          />
          <Newsletter />
          <GiscusComments />
        </article>

        <aside className="post-rail">
          <TableOfContents />
        </aside>
      </div>
    </>
  );
}
