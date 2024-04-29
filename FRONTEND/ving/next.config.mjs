
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'

const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // async rewrites() {
  //   return [
  //     {
  //       source: '/ws/:path*',
  //       destination: `http://localhost:8080/ws/:path*`,
  //     },
  //   ];
  // },

  images: {
    domains: ['example.com'],
  },
  // basePath: '/public',
}

export default withVanillaExtract(nextConfig)
