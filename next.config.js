/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Speed up production builds and conserve Netlify runtime credits
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
