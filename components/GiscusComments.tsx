"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    CUSDIS?: { initial: () => void };
  }
}

export default function GiscusComments({ pageTitle = "" }: { pageTitle?: string }) {
  const pathname = usePathname();
  const pageUrl = `https://theologysubtext.vercel.app${pathname}`;

  useEffect(() => {
    if (window.CUSDIS) {
      window.CUSDIS.initial();
    } else {
      const script = document.createElement("script");
      script.src = "https://cusdis.com/js/cusdis.es.js";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    // Force light theme inside the iframe
    const interval = setInterval(() => {
      const iframe = document.querySelector<HTMLIFrameElement>("#cusdis_thread iframe");
      if (iframe) {
        iframe.style.colorScheme = "light";
        try {
          const doc = iframe.contentDocument;
          if (doc) {
            const style = doc.createElement("style");
            style.textContent = `
              body { background: #ffffff !important; color: #1a1714 !important; }
              * { color-scheme: light !important; }
            `;
            doc.head.appendChild(style);
          }
        } catch {
          // cross-origin block — white wrapper handles it
        }
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [pathname]);

  return (
    <div className="giscus-wrapper">
      <div className="giscus-header">
        <span className="giscus-label">Comments</span>
      </div>
      <div style={{
        background: "#ffffff",
        borderRadius: "10px",
        padding: "8px",
        border: "1px solid rgba(0,0,0,0.1)"
      }}>
        <div
          id="cusdis_thread"
          data-host="https://cusdis.com"
          data-app-id="8de1f93c-1972-4873-acca-a3ffae63bdd5"
          data-page-id={pathname}
          data-page-url={pageUrl}
          data-page-title={pageTitle}
          data-theme="light"
        />
      </div>
    </div>
  );
}
