await import("./env.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cssChunking: "strict",
  },
};

export default nextConfig;
