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
      cookie, 
      accept: 'application/json',
    },
    cache: 'no-store',
  })

  const out =
    res.status === 204
      ? new NextResponse(null, { status: 204 })
      : NextResponse.json(await res.json().catch(() => ({})), { status: res.status })

  const setCookie = res.headers.get('set-cookie')
  if (setCookie) out.headers.set('set-cookie', setCookie)

  return out
}
