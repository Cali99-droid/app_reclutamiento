// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plataforma-virtual.s3.us-west-2.amazonaws.com",
        port: "",
      },
    ],
  },
};
