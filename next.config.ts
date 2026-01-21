import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    const be = process.env.BE_URL
    if (!be) return []

    return [
      { source: '/v1/:path*', destination: `${be}/v1/:path*` },
      { source: '/api/:path*', destination: `${be}/api/:path*` },
      { source: '/oauth2/:path*', destination: `${be}/oauth2/:path*` },
      { source: '/login/oauth2/:path*', destination: `${be}/login/oauth2/:path*` },
    ]
  },
}

export default nextConfig
