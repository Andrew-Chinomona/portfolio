import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Ensure Turbopack uses this project directory (with its own package-lock)
    // instead of inferring C:\Users\Andrew as the root.
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing-page',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
