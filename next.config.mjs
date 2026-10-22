/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    turbo: {
      // react-insta-stories UMD bundle requests "React" in its AMD branch
      resolveAlias: {
        React: 'react',
      },
    },
  },
  images: {
    domains: ['cdn.inappstory.ru', 'utfs.io'],
  },
}

export default nextConfig
