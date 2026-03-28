import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
