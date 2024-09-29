/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // ... other configurations
};

module.exports = nextConfig;
