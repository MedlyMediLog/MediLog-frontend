import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    const be = process.env.BE_URL
    if (!be) return []

    return [
      // ✅ API: 프론트도 /v1로 통일해서 백엔드 /v1로 프록시
      { source: '/v1/:path*', destination: `${be}/v1/:path*` },

      // ✅ OAuth endpoints 프록시
      { source: '/oauth2/:path*', destination: `${be}/oauth2/:path*` },
      { source: '/login/oauth2/:path*', destination: `${be}/login/oauth2/:path*` },
    ]
  },
}

export default nextConfig
