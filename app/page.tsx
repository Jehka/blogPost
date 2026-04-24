import { getPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main
      style={{
        padding: "40px",
        background: "black",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Georgia, serif",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "40px" }}>
        Oshio
      </h1>

      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "40px" }}>
          {/* ✅ THIS LINE IS THE IMPORTANT FIX */}
          <Link
            href={`/blog/${post.slug}`}
            style={{
              fontSize: "28px",
              textDecoration: "underline",
              color: "#8b5cf6",
            }}
          >
            {post.title}
          </Link>

          <p style={{ color: "#9ca3af", marginTop: "8px" }}>
            {post.date}
          </p>

          <p>{post.tags.join(", ")}</p>
          <p>Status: {post.status}</p>
        </div>
      ))}
    </main>
  );
}