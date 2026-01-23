import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const BE = process.env.BE_URL
  if (!BE) {
    return NextResponse.json({ ok: false, message: 'BE_URL is not set' }, { status: 500 })
  }

  const cookie = req.headers.get('cookie') ?? ''
  const url = `${BE}/api/auth/logout`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      cookie, // ✅ 브라우저 쿠키를 백엔드로 전달
      accept: 'application/json',
    },
    cache: 'no-store',
  })

  // ✅ 백엔드가 Set-Cookie로 access_token 만료를 내려주면,
  // Next가 그 Set-Cookie를 그대로 브라우저에 전달해줘야 함
  const out =
    res.status === 204
      ? new NextResponse(null, { status: 204 })
      : NextResponse.json(await res.json().catch(() => ({})), { status: res.status })

  const setCookie = res.headers.get('set-cookie')
  if (setCookie) out.headers.set('set-cookie', setCookie)

  return out
}
