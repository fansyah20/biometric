/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Kiosk terminals often run behind a controlled reverse proxy; expose the
  // build id for cache-busting on public-facing static assets.
  generateBuildId: async () => `govflow-${Date.now()}`,
};

module.exports = nextConfig;
