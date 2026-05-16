import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Matches WordPress style URLs: /2025/08/26/slug
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug',
        destination: '/magazine/:slug',
        permanent: true,
      },
      {
        // Sometimes WordPress URLs have trailing slashes
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug/',
        destination: '/magazine/:slug',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
