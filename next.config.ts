import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["192.168.0.5"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ddeti5s7lf.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
