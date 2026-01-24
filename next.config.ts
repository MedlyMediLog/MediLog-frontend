import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['https://medilog.today:3000'],

  async rewrites() {
    const be = process.env.BE_URL
    if (!be) return []

    return [
      // OAuth 로그인 흐름만 백엔드로 직접 프록시
      { source: '/oauth2/:path*', destination: `${be}/oauth2/:path*` },
      { source: '/login/oauth2/:path*', destination: `${be}/login/oauth2/:path*` },
    ]
  },
}

export default nextConfig
