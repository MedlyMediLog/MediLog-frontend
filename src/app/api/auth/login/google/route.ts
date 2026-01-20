import { NextResponse } from 'next/server'

export async function GET() {
  const BE = process.env.NEXT_PUBLIC_BE_URL // 예: http://medly.deving.xyz:8080
  return NextResponse.redirect(`${BE}/oauth2/authorization/google`)
}
