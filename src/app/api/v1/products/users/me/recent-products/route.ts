import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const BE = process.env.BE_URL
  if (!BE) {
    return NextResponse.json({ ok: false, message: 'BE_URL is not set' }, { status: 500 })
  }

  const cookie = req.headers.get('cookie') ?? ''
  const url = `${BE}/v1/users/me/recent-products`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      cookie,
      accept: 'application/json',
    },
    cache: 'no-store',
  })

  // ✅ 백엔드가 준 status 유지 + body 전달
  const text = await res.text().catch(() => '')
  return new NextResponse(text, {
    status: res.status,
    headers: {
      'content-type': res.headers.get('content-type') ?? 'application/json',
    },
  })

  
}