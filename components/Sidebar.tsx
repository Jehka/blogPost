"use client";

import { useState } from "react";
import AuthorBio from "./AuthorBio";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
        {open ? "←" : "→"}
      </button>

      <aside className={`sidebar ${open ? "open" : "closed"}`}>
        <AuthorBio />

        <div className="sidebar-links">
          <a href="/">Home</a>
          <a href="/now">Now</a>
        </div>
      </aside>
    </>
  );
}