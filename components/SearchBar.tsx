"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  date: string;
  tags: string[];
}

interface SearchBarProps {
  posts: Post[];
}

function fuzzyMatch(needle: string, haystack: string): boolean {
  const n = needle.toLowerCase();
  const h = haystack.toLowerCase();
  if (h.includes(n)) return true;
  // character-sequence fuzzy: every char of needle appears in order in haystack
  let ni = 0;
  for (let i = 0; i < h.length && ni < n.length; i++) {
    if (h[i] === n[ni]) ni++;
  }
  return ni === n.length;
}

function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return posts.filter(
      (p) =>
        fuzzyMatch(query, p.title) ||
        p.tags.some((t) => fuzzyMatch(query, t))
    );
  }, [query, posts]);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Keyboard shortcut: / to focus
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <div className="search-input-row">
        <span className="search-icon">⌕</span>
        <input
          ref={inputRef}
          className="search-input"
          type="text"
          placeholder='Search posts… or press "/"'
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          aria-label="Search posts"
        />
        {query && (
          <button className="search-clear" onClick={() => { setQuery(""); inputRef.current?.focus(); }}>
            ✕
          </button>
        )}
      </div>

      {open && query && (
        <div className="search-dropdown">
          {results.length === 0 ? (
            <p className="search-empty">No posts found for &ldquo;{query}&rdquo;</p>
          ) : (
            results.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="search-result"
                onClick={() => { setOpen(false); setQuery(""); }}
              >
                <span className="search-result-title">{highlight(p.title, query)}</span>
                <span className="search-result-meta">
                  {p.tags.slice(0, 2).join(" · ")}
                  {p.date && ` · ${p.date}`}
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
