/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "elevenaviation-anendqhwcsfwcjaf.z03.azurefd.net",
      },
    ],
  },
};

export default nextConfig;
