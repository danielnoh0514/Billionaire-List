/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    remotePatsterns: [
      {
        protocol: "https",
        hostname: "specials-images.forbesimg.com",
        port: "",
        pathname: "/",
      },
    ],
  },
};
