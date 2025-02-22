import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
    NEXT_PUBLIC_APPWRITE_DATABASE: process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
    NEXT_PUBLIC_APPWRITE_USERS_COLLECTION:
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION,
    NEXT_PUBLIC_APPWRITE_FILES_COLLECTION:
      process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION,
    NEXT_PUBLIC_APPWRITE_BUCKET: process.env.NEXT_PUBLIC_APPWRITE_BUCKET,
    NEXT_APPWRITE_KEY: process.env.NEXT_APPWRITE_KEY,
  },
};

export default nextConfig;
