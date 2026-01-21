import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const BE = process.env.BE_URL
  if (!BE) return NextResponse.json({ message: 'BE_URL is not set' }, { status: 500 })

  // 구글이 준 code/state 그대로 백엔드 콜백으로 전달
  const beUrl = new URL(`${BE}/api/auth/callback/google`)
  req.nextUrl.searchParams.forEach((v, k) => beUrl.searchParams.set(k, v))

  const res = await fetch(beUrl.toString(), {
    method: 'GET',
    headers: {
      cookie: req.headers.get('cookie') ?? '',
      accept: 'application/json',
    },
    cache: 'no-store',
    redirect: 'follow',
  })

  // ⭐ 백엔드가 내려준 Set-Cookie를 localhost에 심기
const out = NextResponse.redirect('https://localhost:3000/category')


  const setCookies = res.headers.getSetCookie?.() ?? []

  // 🔥 콘솔 추가
  console.log('🔍 Set-Cookie from backend:', setCookies)

  for (const sc of setCookies) out.headers.append('set-cookie', sc)

  return out
}
