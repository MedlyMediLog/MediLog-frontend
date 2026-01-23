import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const BE = process.env.BE_URL
  if (!BE) return NextResponse.json({ message: 'BE_URL is not set' }, { status: 500 })

  const beUrl = new URL(`${BE}/api/auth/callback/google`)
  req.nextUrl.searchParams.forEach((v, k) => beUrl.searchParams.set(k, v))

  const res = await fetch(beUrl.toString(), {
    method: 'GET',
    headers: {
      cookie: req.headers.get('cookie') ?? '',
      accept: 'application/json',
    },
    cache: 'no-store',
    redirect: 'manual',
  })

  // 현재 요청의 host 기준으로 redirect (local/prod 자동)
const proto = req.headers.get('x-forwarded-proto') ?? 'https'
const host =
  req.headers.get('x-forwarded-host') ??
  req.headers.get('host') ??
  'medilog.today'

const origin = `${proto}://${host}`
const out = NextResponse.redirect(new URL('/category', origin))


  const setCookies = res.headers.getSetCookie?.() ?? []
  for (const sc of setCookies) out.headers.append('set-cookie', sc)

  return out
}
