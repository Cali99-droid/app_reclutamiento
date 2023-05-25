/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/",
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
