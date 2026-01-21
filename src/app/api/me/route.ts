import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const BE = process.env.NEXT_PUBLIC_BE_URL!

  const cookieHeader = (await cookies())
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ')

  const res = await fetch(`${BE}/api/auth/me`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
      Accept: 'application/json',
    },
    cache: 'no-store',
    redirect: 'manual',
  })

  const location = res.headers.get('location')
  const contentType = res.headers.get('content-type')

  // ✅ 302면 location만 바로 확인
  if (res.status === 302) {
    return NextResponse.json(
      { status: 302, location, contentType, sentCookies: cookieHeader.includes('access_token=') },
      { status: 502 },
    )
  }

  const text = await res.text()
  return new NextResponse(text, { status: res.status, headers: { 'Content-Type': contentType || 'text/plain' } })
}
