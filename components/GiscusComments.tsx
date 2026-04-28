"use client";

import { useEffect, useRef } from "react";

/*
  HOW TO CONFIGURE GISCUS:
  1. Go to https://giscus.app
  2. Enter your GitHub repo (e.g. Jehka/blogPost)
  3. Enable Discussions on that repo (Settings → Discussions)
  4. Choose "pathname" as the mapping
  5. Copy the data-repo-id and data-category-id values below
  6. Replace the placeholder strings with your real values
*/

const GISCUS_CONFIG = {
  repo: "Jehka/blogPost",           // ← your GitHub repo
  repoId: "YOUR_REPO_ID",           // ← from giscus.app
  category: "Announcements",        // ← your Discussion category
  categoryId: "YOUR_CATEGORY_ID",   // ← from giscus.app
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  theme: "dark_dimmed",
  lang: "en",
};

export default function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    // Clear any old instance (e.g. navigating between posts)
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    Object.entries(GISCUS_CONFIG).forEach(([key, value]) => {
      script.setAttribute(`data-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`, value);
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div className="giscus-wrapper">
      <div className="giscus-header">
        <span className="giscus-label">Discussion</span>
      </div>
      <div ref={containerRef} />
    </div>
  );
}
