import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Netlify handles output automatically via @netlify/plugin-nextjs
  // Do NOT use output: "standalone" for Netlify
};

export default nextConfig;
