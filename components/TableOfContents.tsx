"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll(".post-content h1, .post-content h2, .post-content h3")
    ) as HTMLElement[];

    const parsed: Heading[] = els.map((el, i) => {
      const id = el.id || `heading-${i}`;
      el.id = id;
      return {
        id,
        text: el.textContent ?? "",
        level: Number(el.tagName[1]),
      };
    });

    setHeadings(parsed);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "0px 0px -60% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  return (
    <div className="toc">
      <p className="toc-label">On this page</p>
      <nav>
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={`toc-link toc-level-${h.level} ${active === h.id ? "toc-active" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
