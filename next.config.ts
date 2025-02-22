import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.placeholder.com",
        port: "",
        pathname: "/**",
        search: "?text=No+Image",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/hpapi/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
