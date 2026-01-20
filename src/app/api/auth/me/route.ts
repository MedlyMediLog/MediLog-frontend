import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieHeader = (await cookies())
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ')

  const BE = process.env.NEXT_PUBLIC_BE_URL

  const res = await fetch(`${BE}/api/auth/me`, {
    method: 'GET',
    headers: {
      Cookie: cookieHeader,
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    // 백엔드 problem+json 그대로 전달(가능하면)
    const text = await res.text()
    return new NextResponse(text, {
      status: res.status,
      headers: { 'Content-Type': res.headers.get('content-type') || 'application/json' },
    })
  }

  const data = await res.json()
  return NextResponse.json(data, { status: 200 })
}
