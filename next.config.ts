import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['https://medilog.today:3000'],

  images: {
    remotePatterns: [
      // ✅ CloudFront 이미지 허용
      {
        protocol: 'https',
        hostname: 'd20moetwu3555m.cloudfront.net',
        pathname: '/**',
      },
      // (옵션) 혹시 api에서도 이미지 내려오면 같이 허용
      {
        protocol: 'https',
        hostname: 'api.medilog.today',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    const be = process.env.BE_URL
    if (!be) return []

    return [
      { source: '/oauth2/:path*', destination: `${be}/oauth2/:path*` },
      { source: '/login/oauth2/:path*', destination: `${be}/login/oauth2/:path*` },
    ]
  },
}

export default nextConfig
