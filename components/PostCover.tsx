import React from "react";

export default function PostCover({ cover }: { cover?: string }) {
  if (!cover) return null;

  return (
    <div className="cover-wrapper">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={cover}
        alt=""
        className="cover-full"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}
