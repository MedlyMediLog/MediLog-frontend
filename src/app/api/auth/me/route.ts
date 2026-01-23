import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const BE = process.env.BE_URL
  if (!BE) {
    return NextResponse.json(
      { ok: false, where: 'next', message: 'BE_URL is not set' },
      { status: 500 },
    )
  }

  // 들어온 쿠키(브라우저 -> Next)
  const cookie = req.headers.get('cookie') ?? ''
  const url = `https://api.medilog.today/api/auth/me`

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        cookie,
        accept: 'application/json',
      },
      cache: 'no-store',
      redirect: 'manual',
    })

    const data = await res.text()

    return new NextResponse(data, {
      status: res.status,
      headers: {
        'content-type': res.headers.get('content-type') ?? 'application/json',
        'x-proxy-url': url,
        'x-cookie-len': String(cookie.length),
        'x-be-location': res.headers.get('location') ?? '',
      },
    })
  } catch (e) {
    return NextResponse.json(
      { ok: false, where: 'next', message: 'fetch failed', error: String(e) },
      { status: 502 },
    )
  }
}
