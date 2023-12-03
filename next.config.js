/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeImages: true,
  compress: true,
  preload: true,
  images: {
    domains: [
      "fakestoreapi.com",
      "64.227.42.134",
      "avatars.githubusercontent.com",
      "140.82.121.5:443",
      "165.227.164.31"
    ],
  },
  sassOptions: {
    includePaths: ["path/to/sass/directory"],
  },
};

module.exports = nextConfig;
