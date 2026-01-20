import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const BE = process.env.NEXT_PUBLIC_BE_URL
  const url = new URL(req.url)

  // 쿼리스트링 그대로 BE에 전달
  const beUrl = `${BE}/api/auth/callback/google?${url.searchParams.toString()}`
  const res = await fetch(beUrl, { redirect: 'manual' })

  // ✅ BE가 내려준 Set-Cookie를 그대로 전달 (=> localhost 쿠키로 저장됨)
  const headers = new Headers()
  const setCookie = res.headers.get('set-cookie')
  if (setCookie) headers.set('set-cookie', setCookie)

  // ✅ BE가 리다이렉트(Location)도 주면 그대로 전달
  const location = res.headers.get('location')
  if (location) headers.set('location', location)

  return new NextResponse(null, { status: res.status, headers })
}
