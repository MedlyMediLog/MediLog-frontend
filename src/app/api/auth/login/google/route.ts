import { NextResponse } from 'next/server'

export async function GET() {
  const BE = process.env.BE_URL
  return NextResponse.redirect(`${BE}/oauth2/authorization/google`)
}
