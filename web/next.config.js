/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: "../build",
  images: {
    loader: "akamai",
    path: "/",
  },

  // output: "standalone",
};

module.exports = nextConfig;
