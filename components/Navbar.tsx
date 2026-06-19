"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link href="/" className="nav-title" onClick={() => setOpen(false)}>
          Theology Subtext
        </Link>
      </div>

      {/* Desktop nav */}
      <div className="nav-right nav-right--desktop">
        <Link href="/">Home</Link>
        <Link href="/start-here">Start Here</Link>
        <Link href="/about">About</Link>
        <Link href="/now">Now</Link>
        <Link href="/portfolio">Portfolio</Link>
        <ThemeToggle />
      </div>

      {/* Mobile right — toggle + theme */}
      <div className="nav-right nav-right--mobile">
        <ThemeToggle />
        <button
          className="nav-hamburger"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="nav-mobile-menu">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/start-here" onClick={() => setOpen(false)}>Start Here</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/now" onClick={() => setOpen(false)}>Now</Link>
          <Link href="/portfolio" onClick={() => setOpen(false)}>Portfolio</Link>
        </div>
      )}
    </nav>
  );
}