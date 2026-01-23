import { NextRequest, NextResponse } from 'next/server'

type Ctx = {
  params: Promise<{ productCode: string }>
}

export async function GET(req: NextRequest, { params }: Ctx) {
  const BE = process.env.BE_URL
  if (!BE) {
    return NextResponse.json({ ok: false, message: 'BE_URL is not set' }, { status: 500 })
  }


  const { productCode } = await params

  const cookie = req.headers.get('cookie') ?? ''

  const { searchParams } = new URL(req.url)
  const target = searchParams.get('target')
  const qs = target ? `?target=${encodeURIComponent(target)}` : ''


  const url = `https://api.medilog.today/v1/products/${encodeURIComponent(productCode)}${qs}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      cookie,
      accept: 'application/json',
    },
    cache: 'no-store',
  })

  // ✅ status + body 그대로 패스스루 (가장 안전)
  const text = await res.text().catch(() => '')
  return new NextResponse(text, {
    status: res.status,
    headers: {
      'content-type': res.headers.get('content-type') ?? 'application/json',
    },
  })
}
