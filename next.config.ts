import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  crossOrigin: 'use-credentials',
  eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;
