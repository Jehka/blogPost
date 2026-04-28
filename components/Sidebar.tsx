"use client";

import Link from "next/link";
import { useState } from "react";

interface SidebarProps {
  tags?: string[];
  recentPosts?: { slug: string; title: string; date: string }[];
}

export default function Sidebar({ tags = [], recentPosts = [] }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle sidebar"
        style={{ left: collapsed ? "0px" : "calc(var(--sidebar-w) - 1px)" }}
      >
        {collapsed ? "›" : "‹"}
      </button>

      <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}>
        {/* Author card */}
        <div className="sb-author">
          <div className="sb-avatar"><span>J</span></div>
          <div className="sb-author-text">
            <p className="sb-name"></p>
            <p className="sb-bio">
              Writing on what inspires me, helps me evolve and lets me
              ponder the meaning in the subtext.
            </p>
          </div>
        </div>

        <div className="sb-divider" />

        <nav className="sb-nav">
          <p className="sb-label">Navigate</p>
          <Link href="/" className="sb-link"><span className="sb-link-icon">◈</span> All Posts</Link>
          <Link href="/about" className="sb-link"><span className="sb-link-icon">◎</span> About</Link>
          <Link href="/now" className="sb-link"><span className="sb-link-icon">◉</span> Now</Link>
          <a href="/feed.xml" className="sb-link" target="_blank" rel="noopener noreferrer">
            <span className="sb-link-icon">⊕</span> RSS Feed
          </a>
        </nav>

        {recentPosts.length > 0 && (
          <>
            <div className="sb-divider" />
            <div className="sb-section">
              <p className="sb-label">Recent</p>
              {recentPosts.slice(0, 5).map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="sb-recent-link">
                  <span className="sb-recent-title">{p.title}</span>
                  {p.date && <span className="sb-recent-date">{p.date}</span>}
                </Link>
              ))}
            </div>
          </>
        )}

        {tags.length > 0 && (
          <>
            <div className="sb-divider" />
            <div className="sb-section">
              <p className="sb-label">Topics</p>
              <div className="sb-tags">
                {tags.map((tag) => (
                  <span key={tag} className="sb-tag">{tag}</span>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="sb-divider" />
        <p className="sb-footer-text">Theology Subtext &copy; {new Date().getFullYear()}</p>
      </aside>
    </>
  );
}
