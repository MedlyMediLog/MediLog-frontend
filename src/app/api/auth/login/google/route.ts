import { NextResponse } from 'next/server'

export async function GET() {
  const BE = process.env.BE_URL
  return NextResponse.redirect(`https://api.medilog.today/oauth2/authorization/google`)
}
