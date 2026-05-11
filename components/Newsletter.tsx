"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Redirect to Substack with email pre-filled
    window.open(
      `https://theologysubtext.substack.com/subscribe?email=${encodeURIComponent(email)}`,
      "_blank"
    );
  }

  return (
    <div className="newsletter">
      <p className="newsletter-eyebrow">Stay in the subtext</p>
      <h3 className="newsletter-title">Get new posts in your inbox</h3>
      <p className="newsletter-desc">
        No noise. Just writing — when it's ready.
      </p>

      <form className="newsletter-form" onSubmit={handleSubmit}>
        <input
          className="newsletter-input"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="newsletter-btn" type="submit">
          Subscribe
        </button>
      </form>

      <p className="newsletter-or">or</p>

      <a
        href="https://theologysubtext.substack.com"
        target="_blank"
        rel="noopener noreferrer"
        className="newsletter-substack-link"
      >
        Read on Substack →
      </a>
    </div>
  );
}