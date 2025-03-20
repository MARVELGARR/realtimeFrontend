import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    
    domains: ['res.cloudinary.com', 'lh3.googleusercontent.com'],

  },
  crossOrigin: 'use-credentials',
  eslint: {
    ignoreDuringBuilds: true,
  },
 
};

export default nextConfig;