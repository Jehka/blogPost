import React from "react";

export default function PostCover({ cover }: { cover?: string }) {
  if (!cover) return null;

  return (
    <div className="cover-wrapper">
      <div
        className="cover-full"
        style={{ backgroundImage: `url(${cover})` }}
      />
    </div>
  );
}