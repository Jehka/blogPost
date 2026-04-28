import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensures CSS is always processed through the build pipeline
  // and never served as a raw static file from a previous deploy
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.notion.so",
      },
    ],
  },
};

export default nextConfig;
