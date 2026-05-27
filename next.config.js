/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Force single-threaded compilation to save mobile RAM in Termux
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

module.exports = nextConfig;
