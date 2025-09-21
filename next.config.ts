import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Disable Webpack persistent cache only on Vercel
    if (process.env.VERCEL) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
