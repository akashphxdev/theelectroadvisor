import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, 
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/api/serve-file/:path*",
      },
    ];
  },
};

export default nextConfig;
