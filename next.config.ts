import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {hostname: 'lh3.googleusercontent.com',},
      {hostname: 'res.cloudinary.com',}
    ]
  },
  crossOrigin: 'use-credentials',
  eslint: {
    ignoreDuringBuilds: true,
  },
 
};

export default nextConfig;
