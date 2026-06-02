import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb", // Supports up to 25MB file uploads for screenshots and CV PDFs
    },
  },
  async rewrites() {
    return [
      {
        source: "/Lakshan Ekanayaka.pdf",
        destination: "/cv-pdf",
      },
      {
        source: "/Lakshan%20Ekanayaka.pdf",
        destination: "/cv-pdf",
      },
    ];
  },
};

export default nextConfig;

