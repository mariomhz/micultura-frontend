import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  images: {
    remotePatterns: [
      { hostname: "picsum.photos" },
      { hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
