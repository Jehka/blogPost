import { getPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main style={{ padding: "40px", background: "#111", minHeight: "100vh", color: "white" }}>
      <h1 style={{ fontSize: "60px", marginBottom: "40px" }}>Oshio</h1>

      {posts.map((post) => (
        <div key={post.id} style={{ marginBottom: "30px" }}>
          <Link
            href={`/blog/${post.slug}`}
            style={{ fontSize: "28px", color: "#a78bfa", textDecoration: "underline" }}
          >
            {post.title}
          </Link>

          <p style={{ color: "#888" }}>{post.date}</p>
        </div>
      ))}
    </main>
  );
}