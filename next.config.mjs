/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static.shopmy.us" },
      { protocol: "https", hostname: "www.adorebeauty.com.au" },
    ],
  },
};

export default nextConfig;
