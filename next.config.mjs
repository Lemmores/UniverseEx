/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // mantém boas práticas do React
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mars.nasa.gov',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images-assets.nasa.gov',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
