import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'premiersoft.net',
       
      },
    ],
  }
};

export default nextConfig;
