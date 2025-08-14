await import("./env.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
  },
  experimental: {
    cssChunking: "strict",
    reactCompiler: true,
  },
};

export default nextConfig;
