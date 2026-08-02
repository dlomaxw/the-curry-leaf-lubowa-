/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Default is 1MB — dish photo uploads need more room.
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hboeulthexflnvpkblwc.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
