import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const BE = process.env.BE_URL
  if (!BE) {
    return NextResponse.json(
      { ok: false, where: 'next', message: 'BE_URL is not set' },
      { status: 500 },
    )
  }

  const cookie = req.headers.get('cookie') ?? ''

  try {
    const url = `${BE}/api/auth/me`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        cookie,
        accept: 'application/json',
      },
      cache: 'no-store',
    })

    const data = await res.text()

    return new NextResponse(data, {
      status: res.status,
      headers: {
        'content-type': res.headers.get('content-type') ?? 'application/json',
        // 디버깅용: 지금 백엔드에 실제로 어떤 URL로 쐈는지
        'x-proxy-url': url,
      },
    })
  } catch (e) {
    return NextResponse.json(
      { ok: false, where: 'next', message: 'fetch failed', error: String(e) },
      { status: 502 },
    )
  }
}
