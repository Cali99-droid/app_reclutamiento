// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "caebucket.s3.us-west-2.amazonaws.com",
        port: "",
      },
    ],
  },
};
