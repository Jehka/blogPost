import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPosts } from "@/lib/posts";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://theologysubtext.vercel.app";



export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: "/favicon.svg",
  },
  title: {
    default: "Theology Subtext",
    template: "%s ยท Theology Subtext",
  },
  description: "A personal space for poetry, theology, and the systems beneath both.",
  verification: {
    google: "1xeWMmdIqZ6sE7zFSCyiWEZW5LdtPG4dpEgT6ipHu_8",
  },
  openGraph: {
    siteName: "Theology Subtext",
    type: "website",
    url: SITE_URL,
  },
  alternates: {
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = await getPosts();

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));
  const recentPosts = posts.slice(0, 5).map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
  }));

  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="app-shell">
          <Sidebar tags={allTags} recentPosts={recentPosts} />
          <div className="app-main">
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
