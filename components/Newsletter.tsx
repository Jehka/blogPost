"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(
        `https://theologysubtext.substack.com/api/v1/free?email=${encodeURIComponent(email)}`,
        { method: "POST", mode: "no-cors" }
      );
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="newsletter">
      <p className="newsletter-eyebrow">Stay in the subtext</p>
      <h3 className="newsletter-title">Get new posts in your inbox</h3>
      <p className="newsletter-desc">
        No noise. Just writing — when it's ready.
      </p>

      {status === "success" ? (
        <p className="newsletter-success">
          ✓ You're in. Check your inbox to confirm.
        </p>
      ) : (
        <>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              className="newsletter-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading"}
            />
            <button
              className="newsletter-btn"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "..." : "Subscribe"}
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
        </>
      )}

      {status === "error" && (
        <p className="newsletter-error">
          Something went wrong —{" "}
          <a href="https://theologysubtext.substack.com" target="_blank" rel="noopener noreferrer">
            subscribe directly on Substack
          </a>
        </p>
      )}
    </div>
  );
}