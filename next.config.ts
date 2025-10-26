import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgur.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "nestle-cwa.com",
      },
      {
        protocol: "https",
        hostname: "www.nestle-cwa.com",
      },
      {
        protocol: "https",
        hostname: "dujis.nyc3.cdn.digitaloceanspaces.com",
      },
      {
        protocol: "https",
        hostname: "www.logo.wine",
      },
    ],
  },
};

export default nextConfig;
